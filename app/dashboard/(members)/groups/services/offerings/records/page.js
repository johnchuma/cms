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
import { getServiceGuests } from "@/app/services/guestsServices";
import GuestsActions from "@/app/components/guestsActions";
import {
  getOfferingRecords,
  getOfferingRecordsReport,
} from "@/app/services/offeringsRecordsServices copy";
import OfferingActions from "@/app/components/offeringActions";
import RecordActions from "@/app/components/recordActions";
import Pagination from "@/app/components/pagination";
import TimeseriesChart from "@/app/components/TimeseriesChart";

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
  const [report, setReport] = useState([]);

  useEffect(() => {
    // alert(uuid);
    setPageTitle("Offering records");
    setAddPath(
      `/dashboard/groups/services/offerings/records/add/?uuid=${uuid}`
    );
    const path = `${uuid}/?limit=${limit}&page=${page}`;
    getOfferingRecords(path).then((response) => {
      setCount(response.data.body.count);
      setData(response.data.body.data);
      setLoading(false);
    });
  }, [limit, page]);

  useEffect(() => {
    getOfferingRecordsReport(uuid).then((response) => {
      console.log(response.data.body);
      setReport(response.data.body);
    });
  }, []);
  return (
    <div>
      <div className=" bg-white  p-8 rounded-lg">
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
                  <RecordActions uuid={selectedGroups[0]} />
                )}
              </div>
              <table className="w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th className="text-start py-2 px-4">Recorded At</th>
                    <th className="text-start py-2 px-4">Amount collected</th>
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

                        <td className="py-4 px-4">{item.amount} TZS</td>
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
            <div className="mt-12">
              <TimeseriesChart
                title={"Service Offerings Trend"}
                description={
                  "This chart displays the trend of service offerings over a selected period, providing insights into how offering amounts change over time."
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
