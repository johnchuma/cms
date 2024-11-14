"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import moment from "moment";
import { AiOutlineSearch } from "react-icons/ai";
import Spinner from "@/app/components/spinner";
import {
  getMemberTithings,
  getTithings,
} from "@/app/services/tithingsServices";
import TithingsActions from "@/app/components/tithingsActions";
import Pagination from "@/app/components/pagination";
import { ChurchContext } from "../../layout";

const MemberTithings = ({ uuid }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedChurch, setPageTitle, setAddPath } =
    useContext(ChurchContext);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [membertithings, setMemberTithings] = useState(1);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const path = `${uuid}/?limit=${limit}&page=${page}`;
    getMemberTithings(path).then((response) => {
      setCount(response.data.body.count);
      setData(response.data.body.data);
      setLoading(false);
    });
  }, [selectedChurch, membertithings, limit]);
  return (
    <div>
      <div className=" bg-white   rounded-lg">
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
              {/* {selectedGroups.length > 0 && (
                <TithingsActions uuid={selectedGroups[0]} />
              )} */}
            </div>
            <table className="w-full">
              <thead>
                <tr>
                  {/* <th></th> */}
                  <th className="text-start py-2 px-4">Recorded At</th>
                  <th className="text-start py-2 px-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  return (
                    <tr
                      key={item.uuid}
                      className=" even:bg-background rounded-lg   "
                    >
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
              page={page}
              count={count}
              setMemberTithings={setMemberTithings}
              membertithings={membertithings}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberTithings;
