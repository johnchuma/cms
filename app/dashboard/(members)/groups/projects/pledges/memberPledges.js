"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import moment from "moment";
import { AiOutlineSearch } from "react-icons/ai";
import Spinner from "@/app/components/spinner";

import TithingsActions from "@/app/components/tithingsActions";
import Pagination from "@/app/components/pagination";
import { getMemberPledges } from "@/app/services/pledgeServices";
import { ChurchContext } from "@/app/dashboard/layout";
import TimeseriesChart from "@/app/components/TimeseriesChart";
import PledgeActions from "@/app/components/pledgeActions";
import MemberPledgeActions from "@/app/components/memberPledgeActions";

const MemberPledges = ({ uuid }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedChurch, setPageTitle, setAddPath } =
    useContext(ChurchContext);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [memberpledges, setMemberPledges] = useState(1);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const path = `${uuid}/?limit=${limit}&page=${page}`;
    getMemberPledges(path).then((response) => {
      setCount(response.data.body.count);
      setData(response.data.body.data);
      setLoading(false);
    });
  }, [selectedChurch, memberpledges, limit]);
  return (
    <div>
      <div className=" rounded-lg ">
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
                  <MemberPledgeActions uuid={selectedGroups[0]} />
                )}
              </div>
              <table className="w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th className="text-start py-2 px-4">Pledged</th>
                    <th className="text-start py-2 px-4">Name</th>
                    <th className="text-start py-2 px-4">Pledged</th>
                    <th className="text-start py-2 px-4">Paid</th>
                    <th className="text-start py-2 px-4">Remained</th>
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
                        <td className="py-4 px-4">
                          {moment(item.createdAt).format("yyy, MMM DD")}
                        </td>

                        <td className="py-4 px-4">{item.Project.name}</td>
                        <td className="py-4 px-4">{item.amount} TZS</td>
                        <td className="py-4 px-4">
                          {item.contributedAmount || 0} TZS
                        </td>
                        <td className="py-4 px-4">
                          {item.remainingAmount} TZS
                        </td>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberPledges;
