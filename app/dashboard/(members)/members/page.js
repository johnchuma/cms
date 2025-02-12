"use client";
import { useContext } from "react";
import { ChurchContext } from "../../layout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getChurchMembers } from "@/app/services/memberServices";
import moment from "moment";
import { AiOutlineSearch } from "react-icons/ai";
import Spinner from "@/app/components/spinner";
import MemberActions from "@/app/components/memberActions";
import Pagination from "@/app/components/pagination";
import toast from "react-hot-toast";

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
      <div className=" bg-white  p-0 md:pb-12 md:p-8 rounded-lg">
        {loading ? (
          <Spinner />
        ) : (
          <div className="">
            <h1>
              You can share the link with your members so they can register
              themselves.
              <a
                onClick={() => {
                  const urlToCopy = `https://hemani.io/registrationForm/?uuid=${selectedChurch.uuid}`;
                  navigator.clipboard
                    .writeText(urlToCopy)
                    .then(() => {
                      toast.success("Copied successfully");
                    })
                    .catch((err) => {
                      console.error("Failed to copy: ", err);
                      toast.error("Failed to copy");
                    });
                }}
                className=" cursor-pointer text-primary underline ms-3"
              >
                Copy the link
              </a>
            </h1>
            <div className="flex  flex-row justify-between mb-4 space-y-2 md:space-x-2 mt-2">
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
                    className="search-input-style text-xs md:text-sm"
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
            <div className="relative overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>Birth Date</th>
                    <th>Age</th>
                    <th>Address</th>
                    <th>Is baptised</th>
                    <th>Is Married</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => {
                    return (
                      <tr
                        key={item.uuid}
                        className={`even:bg-background ${!item.isActive && ""}`}
                      >
                        <td className="">
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
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.gender}</td>
                        <td>{moment(item.birthDate).format("yyy, MMM DD")}</td>
                        <td>
                          {moment(new Date(item.birthDate)).fromNow(true)}{" "}
                        </td>
                        <td>{item.address}</td>
                        <td>{item.isBaptized ? "Yes" : "No"}</td>
                        <td>{item.maritalStatus}</td>
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
