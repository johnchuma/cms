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
    setPageTitle("Calendar");
    setAddPath(null);
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
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <div className="flex flex-col md:flex-row ">
              <div className=" w-full md:w-8/12 md:pr-24 ">
                <div className="flex justify-between   ">
                  <h1 className="text-lg font-bold">Upcomming Events</h1>
                  <div className="bg-background flex space-x-1 cursor-pointer rounded-lg text-sm px-2 py-1">
                    {["All", "This Month"].map((item, index) => {
                      return (
                        <div
                          onClick={() => {
                            setSelectTab(index);
                          }}
                          className={`${
                            index == selectTab &&
                            "bg-primary text-white rounded-lg"
                          } py-1 px-3`}
                        >
                          {item}
                        </div>
                      );
                    })}
                  </div>
                </div>
                {data.length < 1 && (
                  <NoData message={"No any uploaded events "} />
                )}
                <div className="space-y-3 mt-8">
                  {data.map((item) => {
                    return (
                      <div
                        className={`flex justify-between items-center py-3 px-6 rounded-lg ${
                          selectedEvents.filter((e) => item == e).length > 0 &&
                          "border-2 border-primary"
                        }`}
                      >
                        <div className="flex space-x-2 items-center">
                          <div className="size-14 rounded-full flex justify-center items-center bg-background">
                            <AiOutlineCalendar />
                          </div>
                          <div className="space-y-2">
                            <h1 className="font-medium">
                              {item.title} ({item.Group.name})
                            </h1>
                            <p className="text-sm text-muted">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm text-muted ms-auto">
                          <h1>{moment(item.from).format("yyy,MMM DD")}</h1>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="w-full md:w-4/12">
                <Calender setSelectedEvents={setSelectedEvents} events={data} />
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
