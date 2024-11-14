"use client";
import { useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import moment from "moment";
import { AiOutlineSearch } from "react-icons/ai";
import Spinner from "@/app/components/spinner";
import { ChurchContext } from "@/app/dashboard/layout";
import GroupLeaderActions from "@/app/components/groupLeaderActions";
import { getGroupExpenses } from "@/app/services/groupExpenses.services";
import GroupExpenseActions from "@/app/components/groupExpenseActions";
import { getGroupCalenders } from "@/app/services/groupCalenderServices";
import GroupCalenderActions from "@/app/components/groupCalenderActions";
import Pagination from "@/app/components/pagination";

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
  useEffect(() => {
    setPageTitle("Group Calender");
    setAddPath(`/dashboard/groups/calender/add/?uuid=${uuid}`);
    const path = `${uuid}/?limit=${limit}&page=${page}`;
    getGroupCalenders(path).then((response) => {
      setCount(response.data.body.count);
      setData(response.data.body.data);
      setLoading(false);
    });
  }, [page, limit]);
  return (
    <div>
      <div className=" bg-white  p-8 rounded-lg">
        {loading ? (
          <Spinner />
        ) : (
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
                <GroupCalenderActions uuid={selectedGroups[0]} />
              )}
            </div>
            <table className="w-full">
              <thead>
                <tr>
                  <th></th>
                  <th className="text-start py-2 px-4">Date</th>
                  <th className="text-start py-2 px-4">Title</th>
                  <th className="text-start py-2 px-4">From</th>
                  <th className="text-start py-2 px-4">To</th>
                  <th className="text-start py-2 px-4">Repetition</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  return (
                    <tr key={item.uuid} className=" even:bg-background ">
                      <td className="py-4 px-4">
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

                      <td className="py-4 px-4">{item.title}</td>
                      <td className="py-4 px-4">
                        {moment(item.from).format("yyy, MMM DD")}
                      </td>
                      <td className="py-4 px-4">
                        {moment(item.to).format("yyy, MMM DD")}
                      </td>
                      <td className="py-4 px-4">{item.repetition}</td>
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
        )}
      </div>
    </div>
  );
};

export default Page;
