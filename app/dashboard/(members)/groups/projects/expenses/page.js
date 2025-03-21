"use client";
import { useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import moment from "moment";
import { AiOutlineSearch } from "react-icons/ai";
import Spinner from "@/app/components/spinner";
import { ChurchContext } from "@/app/dashboard/layout";
import {
  getProjectExpenses,
  getProjectExpensesReport,
} from "@/app/services/projectExpenses.services";
import ProjectExpenseActions from "@/app/components/projectExpenseActions";
import Pagination from "@/app/components/pagination";
import TimeseriesChart from "@/app/components/TimeseriesChart";

const Page = () => {
  const { selectedChurch, setPageTitle, setAddPath } =
    useContext(ChurchContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const params = useSearchParams();
  const uuid = params.get("uuid");
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const [report, setReport] = useState([]);
  useEffect(() => {
    getProjectExpensesReport(uuid).then((response) => {
      setReport(response.data.body);
    });
  }, []);
  useEffect(() => {
    // alert(uuid);
    setPageTitle("Project Expenses");
    setAddPath(`/dashboard//groups/projects/expenses/add/?uuid=${uuid}`);
    const path = `${uuid}/?limit=${limit}&page=${page}`;
    getProjectExpenses(path).then((response) => {
      setCount(response.data.body.count);
      setData(response.data.body.data);
      setLoading(false);
    });
  }, [page, limit]);
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
                  <ProjectExpenseActions uuid={selectedGroups[0]} />
                )}
              </div>
              <div className="relative overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Used at</th>
                      <th>Amount</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => {
                      return (
                        <tr key={item.uuid} className=" even:bg-background ">
                          <td>
                            <input
                              onClick={() => {
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

                          <td>{item.amount}</td>
                          <td>{item.description}</td>
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
            <div className="mt-12">
              <TimeseriesChart
                title={"Expenses Trends"}
                description={
                  "This chart shows the trend of expenses over a selected period, providing insights into how expenses have changed over time."
                }
                xaxis={report.map((item) => item.createdAt)}
                yaxis={report.map((item) => item.amount)}
                xlabel={"Date"}
                ylabel={"Amount"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
