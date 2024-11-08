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
import { BsChevronBarDown, BsChevronDown } from "react-icons/bs";
import MemberActions from "@/app/components/memberActions";
import Pagination from "@/app/components/pagination";

const Page = () => {
  const { selectedChurch, setPageTitle, setAddPath } =
    useContext(ChurchContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const router = useRouter();
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [group, setGroup] = useState("All");
  const [count, setCount] = useState(0);
  useEffect(() => {
    setPageTitle("Members");
    setAddPath("/dashboard/members/add");
    let path = `${selectedChurch.uuid}/?limit=${limit}&page=${page}&keyword=${keyword}`;
    if (group) {
      path = path + `&group=${group}`;
    }
    getChurchMembers(path).then((response) => {
      setCount(response.data.body.count);
      setData(response.data.body.data);
      setLoading(false);
    });
  }, [selectedChurch, limit, page, keyword, group]);
  return (
    <div>
      <div className=" bg-white  p-8 rounded-lg mt-4">
        {loading ? (
          <Spinner />
        ) : (
          <div className="">
            <div className="flex justify-between mb-4 space-x-2 ">
              <div className="flex space-x-2 items-center">
                <AiOutlineSearch className="text-lg" />
                <input
                  onChange={(e) => {
                    setKeyword(e.target.value);
                    setGroup(null);
                  }}
                  className="py-2 border-0 focus:border-0 focus:ring-0 "
                  placeholder="Search Keyword"
                />
              </div>
              <div className="flex items-center space-x-2">
                <div>
                  <select
                    onChange={(e) => {
                      setGroup(e.target.value);
                    }}
                    value={group}
                    className="search-input-style text-sm"
                  >
                    <option>Filter</option>
                    {[
                      "All",
                      "Men",
                      "Women",
                      "Children",
                      "Married",
                      "Not Married",
                      "Baptized",
                      "Not Baptized",
                      "Active",
                      "Not Active",
                    ].map((item) => {
                      return <option key={item}>{item}</option>;
                    })}
                  </select>
                </div>
                {selectedMembers.length > 0 && (
                  <MemberActions uuid={selectedMembers[0]} />
                )}
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr>
                  <th></th>
                  <th className="text-start py-2 px-4">Name</th>
                  <th className="text-start py-2 px-4">Gender</th>
                  <th className="text-start py-2 px-4">Age</th>
                  <th className="text-start py-2 px-4">Address</th>
                  <th className="text-start py-2 px-4">Is baptised</th>
                  <th className="text-start py-2 px-4">Is Married</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  return (
                    <tr
                      key={item.uuid}
                      className={`even:bg-background ${
                        !item.isActive && ""
                      }`}
                    >
                      <td className="px-4 py-4">
                        <input
                          onClick={() => {
                            // alert(value);
                            if (selectedMembers.includes(item.uuid)) {
                              setSelectedMembers([]);
                            } else {
                              setSelectedMembers([item.uuid]);
                            }
                          }}
                          checked={selectedMembers.includes(item.uuid)}
                          className="checkbox-style"
                          type="checkbox"
                        />
                      </td>
                      <td className="py-4 px-4">{item.name}</td>
                      <td className="py-4 px-4">{item.gender}</td>
                      <td className="py-4 px-4">
                        {moment(new Date(item.birthDate)).fromNow(true)}{" "}
                      </td>
                      <td className="py-4 px-4">{item.address}</td>
                      <td className="py-4 px-4">
                        {item.isBaptized ? "Yes" : "No"}
                      </td>
                      <td className="py-4 px-4">{item.maritalStatus}</td>
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
