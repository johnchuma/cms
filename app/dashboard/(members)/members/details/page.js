"use client";
import Spinner from "@/app/components/spinner";
import MemberTithings from "@/app/dashboard/(finances)/tithings/memberTithings";
import { ChurchContext } from "@/app/dashboard/layout";
import { getMemberDetails } from "@/app/services/memberServices";
import moment from "moment";
import { useEffect, useState, useContext } from "react";
import MemberPledges from "../../groups/projects/pledges/memberPledges";
import { useSearchParams } from "next/navigation";
import MemberReports from "../../member-reports/memberReport";

const Page = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const uuid = searchParams.get("uuid");
  const { selectedChurch, setPageTitle } = useContext(ChurchContext);

  useEffect(() => {
    setPageTitle("Member Details");
  }, []);
  useEffect(() => {
    getMemberDetails(uuid)
      .then((response) => {
        setData(response.data.body); // Pre-fill data when received
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [uuid]);
  return loading ? (
    <Spinner />
  ) : (
    <div className=" ">
      {!data.isActive && (
        <div className="p-4 mt-6 px-6 border-2 border-red-200 bg-red-50 rounded-lg">
          This person is currently inactive as a member.
        </div>
      )}
      <div className=" bg-background p-6 rounded-lg">
        <div className="">
          <h1 className="text-lg font-bold">Primary Information</h1>
          <p className="text-sm text-muted pt-2">
            Below are the basic personal details of the church member.
          </p>
        </div>
        <div className="grid grid-cols-4  pt-8 gap-6 ">
          {[
            { title: "Full Name", value: data.name },
            { title: "Phone", value: data.phone || "No phone" },
            { title: "Address", value: data.address },
            { title: "Gender", value: data.gender },
            { title: "Age", value: moment(data.birthDate).fromNow(true) },
            { title: "Marital Status", value: data.maritalStatus },
            { title: "Work", value: data.work || "Not Specified" },
            { title: "Email", value: data.email || "Not Specified" },
            {
              title: "Is Baptised ?",
              value: data.isBaptised ? "Yes" : "No",
            },
            {
              title: "Is House owner",
              value: data.isHouseOwner ? "Yes" : "No",
            },
          ].map((item) => {
            return (
              <div key={item.title} className="space-y-1 ">
                <h1 className="font-semibold">{item.title}</h1>
                <p className="text-muted ">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className=" mt-12  rounded-lg">
        <div className="">
          <h1 className="text-lg font-bold">Tithings Records</h1>
          <p className="text-sm text-muted pt-2">
            Below are member tithings records.
          </p>
        </div>
        <MemberTithings uuid={uuid} />
      </div>
      <div className=" mt-12  rounded-lg">
        <div className="">
          <h1 className="text-lg font-bold">Pledges Records</h1>
          <p className="text-sm text-muted pt-2">
            Below are member pledges records.
          </p>
        </div>
        <MemberPledges uuid={uuid} />
      </div>
      <div className=" mt-12  rounded-lg">
        <div className="">
          <h1 className="text-lg font-bold">Recent member events</h1>
          <p className="text-sm text-muted pt-2">
            Below are member event records.
          </p>
        </div>
        <MemberReports uuid={uuid} />
      </div>
    </div>
  );
};

export default Page;
