"use client";
import Link from "next/link";
import { useContext } from "react";
import { ChurchContext } from "../../layout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getChurchMembers } from "@/app/services/memberServices";
import moment from "moment";
import {
  AiOutlineBook,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineSearch,
  AiOutlineUserAdd,
} from "react-icons/ai";
import Spinner from "@/app/components/spinner";
import {
  getChurchMemberReports,
  getMemberReports,
} from "@/app/services/memberReportsServices";
import MemberReportActions from "@/app/components/memberReportsActions";
import Pagination from "@/app/components/pagination";

const MemberReports = ({ uuid }) => {
  const { selectedChurch, setPageTitle, setAddPath } =
    useContext(ChurchContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const router = useRouter();
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const path = `${uuid}/?limit=${limit}&page=${page}`;
    getMemberReports(path).then((response) => {
      setCount(response.data.body.count);
      setData(response.data.body.data);
      setLoading(false);
    });
  }, [selectedChurch, page, limit]);
  return (
    <div>
      <div className="  rounded-lg">
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
            </div>
            <div className="relative overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Report Type</th>
                    <th>description</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => {
                    return (
                      <tr key={item.uuid} className=" even:bg-background ">
                        <td>{item.type}</td>
                        <td className="py-4 px-4 line-clamp-1">
                          {item.description}
                        </td>
                        <td>
                          <div
                            className={`${
                              item.isActive ? "bg-green-100" : "bg-gray-100"
                            } text-center py-1 rounded-lg `}
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

export default MemberReports;
