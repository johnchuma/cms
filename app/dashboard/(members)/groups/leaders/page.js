"use client";
import { useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import moment from "moment";
import { AiOutlineSearch } from "react-icons/ai";
import Spinner from "@/app/components/spinner";
import GroupActions from "@/app/components/groupActions";
import {
  getGroupLeaders,
  getGroupMembers,
} from "@/app/services/groupsServices";
import { ChurchContext } from "@/app/dashboard/layout";
import GroupLeaderActions from "@/app/components/groupLeaderActions";
import Pagination from "@/app/components/pagination";

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
  useEffect(() => {
    setPageTitle("Group Leaders");
    setAddPath(`/dashboard/groups/leaders/add/?uuid=${uuid}`);
    const path = `${uuid}/?limit=${limit}&page=${page}`;
    getGroupLeaders(path).then((response) => {
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
                <GroupLeaderActions uuid={selectedGroups[0]} />
              )}
            </div>
            <div className="absolute overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Position</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Is Active</th>
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

                        <td>{item.Member.name}</td>
                        <td>{item.position}</td>
                        <td>{moment(item.from).format("yyy, MMM DD")}</td>
                        <td>{moment(item.to).format("yyy, MMM DD")}</td>
                        <td>
                          <div
                            className={`${
                              item.isActive ? "bg-green-100" : "bg-gray-100"
                            } text-center py-1 rounded-lg`}
                          >
                            {item.isActive ? "Active" : "Not Active"}
                          </div>
                        </td>
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
        )}
      </div>
    </div>
  );
};

export default Page;
