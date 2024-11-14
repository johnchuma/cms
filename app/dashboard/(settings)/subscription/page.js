"use client";

import { useContext, useState, useEffect } from "react";
import { ChurchContext } from "../../layout";
import FormField from "@/app/components/formForm";
import Button from "@/app/components/button";
import {
  deleteAccessToken,
  getSelectedChurch,
} from "@/app/utils/localStorageData";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { editUser, getMyInfo } from "@/app/services/authServices";
import Spinner from "@/app/components/spinner";
import SelectField from "@/app/components/selectForm";
import { tanzaniaRegions } from "@/app/utils/regions";
import TextareaField from "@/app/components/textareaForm";
import { editChurch } from "@/app/services/churchServices";
import { BsCheck } from "react-icons/bs";
import { getMemberCount } from "@/app/services/memberServices";
const Page = () => {
  const { selectedChurch, setPageTitle, setAddPath } =
    useContext(ChurchContext);
  const [user, setUser] = useState(null);
  const [church, setChurch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingChurch, setUpdatingChurch] = useState(false);
  const [updatingUser, setUpdatingUser] = useState(false);
  const router = useRouter();
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [group, setGroup] = useState("All");
  const [count, setCount] = useState(0);
  useEffect(() => {
    setPageTitle("Subscription");
    setAddPath(null);
    getMemberCount(selectedChurch.uuid).then((res) => {
      console.log(res.data.body);
      setCount(res.data.body);
      setLoading(false);
    });
  }, [selectedChurch, limit, page, keyword, group]);
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <div className=" p-6 border border-slate-100  rounded-lg">
        <h1 className="font-bold text-lg">Current subscription plan</h1>
        <p className="text-sm text-muted mb-8">
          This is current subscription plan
        </p>
        <div className="grid grid-cols-3 gap-6 ">
          {[
            { price: "50,000", members: "1-200", isSelected: count <= 200 },
            {
              price: "100,000",
              members: "201-500",
              isSelected: count > 200 && count <= 500,
            },
            { price: "150,000", members: "+501", isSelected: count > 500 },
          ].map((item) => {
            if (item.isSelected) {
              return (
                <div
                  key={item.price}
                  className="shadow-lg p-12 space-y-4 rounded-lg"
                >
                  <h1 className="text-lg">{item.members} Members</h1>
                  <h1 className="text-2xl font-bold">
                    {item.price} TSH
                    <span className="text-lg font-medium text-muted">
                      {" "}
                      /Month
                    </span>
                  </h1>
                  <p className="text-muted">
                    Ideal for small churches starting out.
                  </p>
                  <Button color={"bg-green-500"} text={"Subscribed"} />

                  <div className="space-y-3 ">
                    {[
                      "Member Management",
                      "Finance Management",
                      "Project Management",
                      "Expenses Management",
                      "Services Management",
                      "Events Management",
                      "Calendar Management",
                      "Reports & Analysis",
                      "WhatsApp Integration",
                      "Bulk SMS Integration",
                    ].map((item, index) => (
                      <div key={index} className="flex space-x-2 items-center">
                        <BsCheck />
                        <div>{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
