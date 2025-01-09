"use client";
import { useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import moment from "moment";
import { AiOutlineSearch } from "react-icons/ai";
import Spinner from "@/app/components/spinner";
import { ChurchContext } from "@/app/dashboard/layout";
import { getGroupProjects } from "@/app/services/projectServices";
import ProjectActions from "@/app/components/projectActions";
import { getProjectPledges } from "@/app/services/pledgeServices";
import PledgeActions from "@/app/components/contributionsActions";
import { getPledgeContributions } from "@/app/services/contributionServices";
import Pagination from "@/app/components/pagination";
import ContributionActions from "@/app/components/contributionsActions";

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
    setPageTitle("Contributions");

    const path = `${uuid}/?limit=${limit}&page=${page}`;
    getPledgeContributions(path).then((response) => {
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
            </div>
            <div className="relative overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Paid</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => {
                    return (
                      <tr key={item.uuid} className=" even:bg-background ">
                        <td>{moment(item.createdAt).format("yyy, MMM DD")}</td>

                        <td>{item.amount} TZS</td>
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
