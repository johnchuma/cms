"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import moment from "moment";
import { AiOutlineSearch } from "react-icons/ai";
import Spinner from "@/app/components/spinner";
import { ChurchContext } from "@/app/dashboard/layout";
import {
  getGroupProjects,
  getGroupProjectsReport,
} from "@/app/services/projectServices";
import ProjectActions from "@/app/components/projectActions";
import Pagination from "@/app/components/pagination";
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
      <div className=" bg-white  pb-12 md:p-8 rounded-lg">
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
              <div className="relative overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Created At</th>
                      <th>Title</th>
                      <th>Pledges</th>
                      <th>Contributions</th>
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
                          <td>
                            {moment(item.createdAt).format("yyy, MMM DD")}
                          </td>

                          <td>{item.name}</td>
                          <td>{item.pledges} TZS</td>
                          <td>{item.contributions} TZS</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <Pagination
                limit={limit}
                count={count}
                setPage={setPage}
                page={page}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
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
