import { useEffect, useState } from "react";
import Pagination from "../pagination";
import { useRouter } from "next/navigation";
import { getSingleMemberTithings } from "@/app/services/tithingsServices";
import moment from "moment";
import { AiOutlineSearch } from "react-icons/ai";
import Spinner from "../spinner";
import { getSingleMemberContributions } from "@/app/services/contributionServices";

const MemberContributions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [count, setCount] = useState(0);
  useEffect(() => {
    getSingleMemberContributions(page, limit, keyword).then((res) => {
      console.log(res.data.body.data);
      setCount(res.data.body.count);
      setData(res.data.body.data);
      setLoading(false);
    });
  }, [keyword, page]);
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <div className="relative overflow-x-auto">
        <div className="flex justify-end">
          <div className="flex space-x-2 items-center">
            <AiOutlineSearch className="text-lg" />
            <input
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              className="py-2 border-0 focus:border-0 focus:ring-0 "
              placeholder="Search Keyword"
            />
          </div>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th>Date</th>
                <th>Project</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                return (
                  <tr key={item.uuid} className={`even:bg-background `}>
                    <td>{moment(item.createdAt).format("yyy,MMM DD")}</td>
                    <td>{item.Pledge.Project.name}</td>
                    <td>TZS {item.amount.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination limit={limit} count={count} setPage={setPage} page={page} />
    </div>
  );
};

export default MemberContributions;
