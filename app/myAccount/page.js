"use client";
import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { LiaFemaleSolid, LiaMaleSolid } from "react-icons/lia";
import { MdChildCare } from "react-icons/md";
import TithingsHistory from "../components/memberAccountTabs/tithingsHistory";
import { getSingleMemberStats } from "../services/reportsServices";
import Spinner from "../components/spinner";
import MemberContributions from "../components/memberAccountTabs/membersContributions";
import MemberPledges from "../components/memberAccountTabs/membersPledges";
import MemberProjects from "../components/memberAccountTabs/membersProjects";
import { deleteAccessToken, getAccessToken } from "../utils/localStorageData";
import { useRouter } from "next/navigation";
import { FaBox, FaMoneyCheck } from "react-icons/fa";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { FaTruckRampBox } from "react-icons/fa6";

const Page = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const router = useRouter();
  useEffect(() => {
    if (getAccessToken()) {
      getSingleMemberStats().then((res) => {
        console.log(res.data.body);
        setData(res.data.body);
        setLoading(false);
      });
    } else {
      router.push("/memberSignin");
    }
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-dark text-blank  text-white font-semibold w-full py-3 text-center text-sm">
        <p>
          You are logged in to <span className="">{data.church.name}</span>{" "}
          Church,{" "}
          <span
            onClick={() => {
              deleteAccessToken();
              router.push("/memberSignin");
            }}
            className="font-bold text-white p-1 bg-secondary transition-all duration-200 me-2 cursor-pointer hover:underline"
          >
            Logout
          </span>
        </p>
      </div>
      <div className="w-11/12 md:w-10/12 2xl:w-8/12 mx-auto  ">
        <h1 className="font-semibold text-2xl mt-8">
          Welcome, {data.member?.name}
        </h1>
        <p className="text-muted text-sm">
          Below is an overview summary of your information{" "}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
          {[
            {
              title: "Tithings",
              value: `TZS ${data.tithings.toLocaleString()}`,
              icon: <FaMoneyCheck />,
              path: "",
            },
            {
              title: "Contributions",
              value: `TZS ${data.contributions.toLocaleString()}`,
              icon: <RiMoneyDollarBoxFill />,
              path: "",
            },
            {
              title: "Unpaid Pledges",
              value: `TZS ${data.unpaidPledges.toLocaleString()}`,
              icon: <FaBox />,
              path: "",
            },
            {
              title: "Projects",
              value: data.projects,
              icon: <FaTruckRampBox />,
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
                    // router.push("/dashboard/members/");
                  }}
                  className="text-muted hover:underline hover:text-primary transition-all text-xs cursor-pointer"
                >
                  All time
                </h1>
              </div>
            </div>
          ))}
        </div>
        <h1 className="font-semibold text-2xl mt-8">History</h1>
        <div className="flex space-x-4 text-muted text-sm mt-2">
          {["Tithings history", "Contiributions", "Pledges", "Projects"].map(
            (item, index) => {
              return (
                <div
                  onClick={() => {
                    setSelectedTab(index);
                  }}
                  key={item}
                  className={`${
                    index == selectedTab
                      ? "text-primary border-b-primary font-bold"
                      : "text-muted border-b-transparent"
                  } border-b-2 pb-2 cursor-pointer`}
                >
                  {item}
                </div>
              );
            }
          )}
        </div>
        <div className="bg-white rounded-lg">
          {selectedTab == 0 && (
            <div className=" shadow rounded-lg p-8 mt-4">
              <TithingsHistory />
            </div>
          )}
          {selectedTab == 1 && (
            <div className=" shadow rounded-lg p-8 mt-4">
              <MemberContributions />
            </div>
          )}
          {selectedTab == 2 && (
            <div className=" shadow rounded-lg p-8 mt-4">
              <MemberPledges />
            </div>
          )}
          {selectedTab == 3 && (
            <div className=" shadow rounded-lg p-8 mt-4">
              <MemberProjects />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
