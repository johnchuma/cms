"use client";
import { useContext, useEffect, useState } from "react";
import Spinner from "@/app/components/spinner";
import Calender from "@/app/components/calender";
import { ChurchContext } from "@/app/dashboard/layout";
import { getChurchCalenders } from "@/app/services/groupCalenderServices";
import { AiOutlineCalendar } from "react-icons/ai";
import moment from "moment";
import Pagination from "@/app/components/pagination";
import { FaBoxOpen } from "react-icons/fa";
import NoData from "@/app/components/noData";

const Page = () => {
  const { selectedChurch, setPageTitle, setAddPath } =
    useContext(ChurchContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [selectTab, setSelectTab] = useState(0);
  const [selectedEvents, setSelectedEvents] = useState([]);
  useEffect(() => {
    setPageTitle("Poster Requests");
    setAddPath("/dashboard/posterRequests/add");
    const path = `${selectedChurch.uuid}/?limit=${limit}&page=${page}&filter=${
      selectTab === 0 ? "All" : "This Month"
    }`;
    getChurchCalenders(path).then((response) => {
      console.log(response);
      setCount(response.data.body.count);
      setData(response.data.body.data);
      setLoading(false);
    });
  }, [selectedChurch, limit, page, selectTab]);

  return (
    <div>
      <div className=" bg-white  pb-12 md:p-8 rounded-lg">
        {loading ? <Spinner /> : <div></div>}
      </div>
    </div>
  );
};

export default Page;
