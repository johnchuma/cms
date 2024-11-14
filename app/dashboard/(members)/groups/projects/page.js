"use client";
import { useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import moment from "moment";
import { AiOutlineSearch } from "react-icons/ai";
import Spinner from "@/app/components/spinner";
import GroupActions from "@/app/components/groupActions";
import { getGroupMembers } from "@/app/services/groupsServices";
import { ChurchContext } from "@/app/dashboard/layout";
import GroupLeaderActions from "@/app/components/groupLeaderActions";
import GroupMemberActions from "@/app/components/groupMemberActions";
import {
  getGroupProjects,
  getGroupProjectsReport,
} from "@/app/services/projectServices";
import ProjectActions from "@/app/components/projectActions";
import Pagination from "@/app/components/pagination";
import TimeseriesChart from "@/app/components/TimeseriesChart";
import PieChart from "@/app/components/pieChart";

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
    // alert(uuid);
    setPageTitle("Projects");
    setAddPath(`/dashboard/groups/projects/add/?uuid=${uuid}`);
    const path = `${uuid}/?limit=${limit}&page=${page}`;
    getGroupProjects(path).then((response) => {
      setCount(response.data.body.count);
      setData(response.data.body.data);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    getGroupProjectsReport(uuid).then((response) => {
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
                  <ProjectActions uuid={selectedGroups[0]} />
                )}
              </div>
              <table className="w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th className="text-start py-2 px-4">Created At</th>
                    <th className="text-start py-2 px-4">Title</th>
                    <th className="text-start py-2 px-4">Pledges</th>
                    <th className="text-start py-2 px-4">Contributions</th>
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

                        <td className="py-4 px-4">{item.name}</td>
                        <td className="py-4 px-4">{item.pledges} TZS</td>
                        <td className="py-4 px-4">{item.contributions} TZS</td>
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

            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="">
                <PieChart
                  title={"Pledges Comparison Between Projects"}
                  description={
                    "This chart provides a comparison of total pledges made across different projects, offering insights into the relative distribution of pledges."
                  }
                  values={report.map((item) => item.pledges)}
                  labels={report.map((item) => item.name)}
                  xlabel={"Projects"}
                  ylabel={"Pledges"}
                />
              </div>
              <div className="">
                <PieChart
                  title={"Contributions Comparison Between Projects"}
                  description={
                    "This chart compares the total contributions made across various projects, helping you see which projects have received the most support."
                  }
                  values={report.map((item) => item.contributions)}
                  labels={report.map((item) => item.name)}
                  xlabel={"Projects"}
                  ylabel={"Contributions"}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
