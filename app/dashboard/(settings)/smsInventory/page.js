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
  const router = useRouter();
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [group, setGroup] = useState("All");
  const [count, setCount] = useState(0);
  useEffect(() => {
    setPageTitle("SMS Inventory");
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
        <div className="flex justify-between">
          <div>
            <h1 className="font-bold text-lg">200 messages remaining</h1>
            <p className="text-sm text-muted mb-8">
              You have 200 remaining messages
            </p>
          </div>
          <div>
            <Button
              onClick={() => {
                router.push(`/dashboard/smsInventory/add`);
              }}
              text={"Buy Messages"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
