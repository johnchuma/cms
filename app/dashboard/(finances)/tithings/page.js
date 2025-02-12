"use client";
import { useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import moment from "moment";
import { AiOutlineSearch } from "react-icons/ai";
import Spinner from "@/app/components/spinner";
import { ChurchContext } from "@/app/dashboard/layout";
import { getProjectPledges } from "@/app/services/pledgeServices";
import PledgeActions from "@/app/components/contributionsActions";
import { getTithings } from "@/app/services/tithingsServices";
import TithingsActions from "@/app/components/tithingsActions";
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
    setPageTitle("Tithings");
    setAddPath(`/dashboard/tithings/add/`);
    const path = `${selectedChurch.uuid}/?limit=${limit}&page=${page}`;
    getTithings(path).then((response) => {
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
                <TithingsActions uuid={selectedGroups[0]} />
              )}
            </div>
            <div className="overflow-x-auto relative">
              <div className="relative overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Created At</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => {
                      return (
                        <tr key={item.uuid} className=" even:bg-background ">
                          <td className="px-4 py-4">
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

                          <td>{item.Member.name}</td>
                          <td>{item.Member.phone || "No phone"}</td>
                          <td>{item.amount} TZS</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
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
