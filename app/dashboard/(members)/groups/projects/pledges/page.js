"use client";
import { useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import moment from "moment";
import { AiOutlineSearch } from "react-icons/ai";
import Spinner from "@/app/components/spinner";
import { ChurchContext } from "@/app/dashboard/layout";
import {
  getGroupProjects,
  getGroupProjectsReport,
} from "@/app/services/projectServices";
import ProjectActions from "@/app/components/projectActions";
import {
  getProjectPledges,
  getProjectPledgesReport,
} from "@/app/services/pledgeServices";
import Pagination from "@/app/components/pagination";
import PledgeActions from "@/app/components/pledgeActions";
import TimeseriesChart from "@/app/components/TimeseriesChart";

const Page = () => {
  const { selectedChurch, setPageTitle, setAddPath } =
    useContext(ChurchContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const router = useRouter();
  const params = useSearchParams();
  const uuid = params.get("uuid");
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [report, setReport] = useState([]);

  useEffect(() => {
    setPageTitle("Pledges");
    setAddPath(`/dashboard/groups/projects/pledges/add/?uuid=${uuid}`);
    const path = `${uuid}/?limit=${limit}&page=${page}`;
    getProjectPledges(path).then((response) => {
      setCount(response.data.body.count);
      setData(response.data.body.data);
      setLoading(false);
    });

    getProjectPledgesReport(uuid).then((response) => {
      console.log(response.data.body);
      setReport(response.data.body);
    });
  }, []);
  return (
    <div>
      <div className=" bg-white  p-8 rounded-lg">
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <div className="">
              <div className="flex justify-between mb-4 space-x-2 ">
                <div className="flex space-x-2 items-center">
                  <AiOutlineSearch className="text-lg" />
                  <input
                    className="py-2 border-0 focus:border-0 focus:ring-0 "
                    placeholder="Search Keyword"
                  />
                </div>
                {selectedGroups.length > 0 && (
                  <PledgeActions uuid={selectedGroups[0]} />
                )}
              </div>
              <table className="w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th className="text-start py-2 px-4">Pledged</th>
                    <th className="text-start py-2 px-4">Name</th>
                    <th className="text-start py-2 px-4">Phone</th>
                    <th className="text-start py-2 px-4">Pledged Amount</th>
                    <th className="text-start py-2 px-4">Contributed Amount</th>
                    <th className="text-start py-2 px-4">Remaining Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => {
                    return (
                      <tr key={item.uuid} className=" even:bg-background ">
                        <td className="px-4 py-4">
                          <input
                            onClick={() => {
                              // alert(value);
                              if (selectedGroups.includes(item.uuid)) {
                                setSelectedGroups([]);
                              } else {
                                setSelectedGroups([item.uuid]);
                              }
                            }}
                            checked={selectedGroups.includes(item.uuid)}
                            className="checkbox-style"
                            type="checkbox"
                          />
                        </td>
                        <td className="py-4 px-4">
                          {moment(item.createdAt).format("yyy, MMM DD")}
                        </td>
                        <td className="py-4 px-4">{item.Member.name}</td>
                        <td className="py-4 px-4">
                          {item.Member.phone || "No phone"}
                        </td>
                        <td className="py-4 px-4">{item.amount} TZS</td>
                        <td className="py-4 px-4">
                          {item.contributedAmount || 0} TZS
                        </td>
                        <td className="py-4 px-4">
                          {item.remainingAmount} TZS
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Pagination
                limit={limit}
                count={count}
                setPage={setPage}
                page={page}
              />
            </div>

            <div className="mt-12">
              <TimeseriesChart
                title={"Pledges Trends"}
                description={
                  "This chart displays the trend of pledges over a selected period, providing insights into how pledge amounts change over time."
                }
                xaxis={report.map((item) => item.createdAt)}
                yaxis={report.map((item) => item.amount)}
                xlabel={"Date"}
                ylabel={"Pledge Amount"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
