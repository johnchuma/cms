"use client";
import BarChart from "@/app/components/barChart";
import HorizontalBarChart from "@/app/components/horizontalBarChart";
import LineChart from "@/app/components/lineChart";
import PieChart from "@/app/components/pieChart";
import Spinner from "@/app/components/spinner";
import { ChurchContext } from "@/app/dashboard/layout";
import { GrMoney, GrSubtract, GrValidate } from "react-icons/gr";
import { getFinanceReport } from "@/app/services/reportsServices";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import { TbMoneybag, TbTimeDuration10 } from "react-icons/tb";

const Page = () => {
  const { selectedChurch, setPageTitle, setAddPath } =
    useContext(ChurchContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setPageTitle("Finance Overview");
    getFinanceReport(selectedChurch.uuid, year).then((response) => {
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
                title: "Total Tithings",
                value: data.stats.totalTithings,
                icon: <TbTimeDuration10 />,
                path: "",
              },
              {
                title: "Total Pledges",
                value: data.stats.totalPledges,
                icon: <TbMoneybag />,
                path: "",
              },
              {
                title: "Paid Pledges",
                value: data.stats.totalContributions,
                icon: <GrValidate />,
                path: "",
              },
              {
                title: "Unpaid Pledges",
                value: data.stats.unpaidPledges,
                icon: <GrSubtract />,
                path: "",
              },
              // {
              //   title: "Total Offrings",
              //   value: data.stats.totalOfferings,
              //   icon: <GrMoney />,
              //   path: "",
              // },
            ].map((item, index) => (
              <div key={index} className="bg-white shadow rounded-lg">
                <div className="flex space-x-4 p-4">
                  <div className="bg-primary bg-opacity-5  text-primary text-xl flex justify-center items-center size-12 rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-muted text-sm">{item.title}</p>
                    <h1 className="text-lg font-bold">{item.value} TZS</h1>
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
          <div className="grid grid-cols-2 gap-6">
            <HorizontalBarChart
              xaxis={Object.keys(data.tithingsByWeek)}
              setYear={setYear}
              yaxis={Object.values(data.tithingsByWeek)}
              title={"Tithings Trend"}
              description={"Weekly tithings contributions records"}
            />
            <PieChart
              title={"Project vs Contributions"}
              description={
                "A visual representation of Project vs Contributions"
              }
              labels={data.contributionsByProjects.map((item) => item.project)}
              values={data.contributionsByProjects.map(
                (item) => item.totalContribution
              )}
            />
            {/* <BarChart
              xaxis={Object.keys(data.expensesByMonth)}
              setYear={setYear}
              yaxis={Object.values(data.expensesByMonth)}
              title={"Expenses Trend"}
              description={"Monthly expenses contributions records"}
            /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
