"use client";
import Link from "next/link";
import { useContext } from "react";
import { ChurchContext } from "../../layout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import moment from "moment";
import { AiOutlineSearch } from "react-icons/ai";
import Spinner from "@/app/components/spinner";
import GroupActions from "@/app/components/groupActions";
import { getChurchGroups } from "@/app/services/groupsServices";
import Pagination from "@/app/components/pagination";

const Page = () => {
  const { selectedChurch, setPageTitle, setAddPath } =
    useContext(ChurchContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const router = useRouter();
  const [report, setReport] = useState([]);

  useEffect(() => {
    setPageTitle("Groups");
    setAddPath("/dashboard/groups/add");
    const path = `${selectedChurch.uuid}/?limit=${limit}&page=${page}`;
    getChurchGroups(path).then((response) => {
      setCount(response.data.body.count);
      setData(response.data.body.data);
      setLoading(false);
    });
  }, [selectedChurch, page, limit]);
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
                <GroupActions uuid={selectedGroups[0]} />
              )}
            </div>
            <div className="relative overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Created At</th>
                    <th>Name</th>
                    <th>Members</th>
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
                        <td>{moment(item.createdAt).format("yyy, MMM DD")}</td>

                        <td>{item.name}</td>
                        <td>{item.members}</td>
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
