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
import { getGroupServices } from "@/app/services/serviceServices";
import ServicesActions from "@/app/components/servicesActions";
import GuestsActions from "@/app/components/guestsActions";
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
    // alert(uuid);
    setPageTitle("Services");
    setAddPath(`/dashboard/groups/services/add/?uuid=${uuid}`);
    const path = `${uuid}/?limit=${limit}&page=${page}`;
    getGroupServices(path).then((response) => {
      setCount(response.data.body.count);
      setData(response.data.body.data);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      {/* <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Groups</h1>
        <Link
          href="/dashboard/groups/add"
          className="bg-primary py-2 px-4 rounded-lg text-white text-sm"
        >
          Add Group
        </Link>
      </div> */}
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
                <ServicesActions uuid={selectedGroups[0]} />
              )}
            </div>
            <div className="relative overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Service</th>
                    <th>Repetition</th>
                    <th>Description</th>
                    <th>Date</th>
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
                        <td>{item.name}</td>
                        <td>{item.repetition}</td>
                        <td>{item.description}</td>
                        <td>{moment(item.date).format("yyy, MMM DD")}</td>
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
