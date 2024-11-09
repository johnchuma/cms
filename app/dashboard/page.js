"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Spinner from "../components/spinner";
import { ChurchContext } from "./layout";
import { AiOutlineUser } from "react-icons/ai";
import { LiaFemaleSolid, LiaMaleSolid } from "react-icons/lia";
import { MdChildCare } from "react-icons/md";
import LineChart from "../components/lineChart";
import PieChart from "../components/pieChart";
import BarChart from "../components/barChart";
import { getMembersStats } from "../services/reportsServices";

const Page = () => {
  const { selectedChurch, setPageTitle } = useContext(ChurchContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setPageTitle("Members Overview");
    getMembersStats(selectedChurch.uuid, year).then((response) => {
      setData(response.data.body);
      setLoading(false);
    });
  }, [selectedChurch, year]);

  return (
    <div className="bg-white p-8 rounded-lg mt-4">
      {loading ? (
        <Spinner />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-6">
            {[
              {
                title: "Total Members",
                value: data.stats.members,
                icon: <AiOutlineUser />,
                path: "",
              },
              {
                title: "Men",
                value: data.stats.men,
                icon: <LiaMaleSolid />,
                path: "",
              },
              {
                title: "Women",
                value: data.stats.women,
                icon: <LiaFemaleSolid />,
                path: "",
              },
              {
                title: "Children",
                value: data.stats.children,
                icon: <MdChildCare />,
                path: "",
              },
            ].map((item, index) => (
              <div key={item} className="bg-white shadow rounded-lg">
                <div className="flex space-x-4 p-4">
                  <div className="bg-primary bg-opacity-5  text-primary text-xl flex justify-center items-center size-12 rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-muted text-sm">{item.title}</p>
                    <h1 className="text-lg font-bold">{item.value}</h1>
                  </div>
                </div>
                <div className="bg-background bg-opacity-50 py-2 px-4">
                  <h1
                    onClick={() => {
                      router.push("/dashboard/members/");
                    }}
                    className="text-muted hover:underline hover:text-primary transition-all text-xs cursor-pointer"
                  >
                    View More
                  </h1>
                </div>
              </div>
            ))}
          </div>
          <div className="flex mt-8 space-x-6 items-stretch">
            <div className="w-7/12 ">
              <LineChart
                xaxis={Object.keys(data.membersIncrease)}
                setYear={setYear}
                yaxis={Object.values(data.membersIncrease)}
                title={"Church Growth Over Time"}
                description={"Tracking member growth month by month."}
              />
            </div>
            <div className="w-5/12 ">
              <PieChart
                title={"Membership Distribution by Gender"}
                description={
                  "A visual representation of our church's gender demographics."
                }
                labels={["Men", "Women"]}
                values={[parseInt(data.stats.men), parseInt(data.stats.women)]}
              />
            </div>
          </div>
          <div className="flex mt-8 space-x-6 items-stretch">
            <div className="w-6/12 ">
              <BarChart
                xaxis={Object.keys(data.sicknessReports)}
                setYear={setYear}
                yaxis={Object.values(data.sicknessReports)}
                title={"Monthly Sick Reports"}
                description={"Number of sick individuals reported each month."}
              />
            </div>
            <div className="w-6/12 ">
              <BarChart
                xaxis={Object.keys(data.traveledReports)}
                setYear={setYear}
                yaxis={Object.values(data.traveledReports)}
                title={"Monthly Travel Reports"}
                description={
                  "Tracking the number of members who traveled each month."
                }
              />
            </div>
          </div>
          {/* <div className="flex mt-8 space-x-6 items-stretch">
            <div className="w-6/12 ">
              <BarChart
                xaxis={Object.keys(data.guestsReports)}
                yaxis={Object.values(data.guestsReports)}
                title={"Monthly Guest Reports"}
                description={
                  "Tracking the number of guests visiting each month."
                }
              />
            </div>
            <div className="w-6/12"></div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Page;
