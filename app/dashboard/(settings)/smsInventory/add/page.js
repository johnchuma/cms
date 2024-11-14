"use client";
import Button from "@/app/components/button";
import FormField from "@/app/components/formForm";
import { useContext, useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { getMemberCount } from "@/app/services/memberServices";
import { ChurchContext } from "@/app/dashboard/layout";
const Page = () => {
  const { selectedChurch, setPageTitle, setAddPath } =
    useContext(ChurchContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [group, setGroup] = useState("All");
  const [count, setCount] = useState(0);
  useEffect(() => {
    setPageTitle("Buy Messages");
    setAddPath(null);
    getMemberCount(selectedChurch.uuid).then((res) => {
      console.log(res.data.body);
      setCount(res.data.body);
      setLoading(false);
    });
  }, [selectedChurch, limit, page, keyword, group]);
  return (
    <div>
      <div>
        <div className=" p-6 border border-slate-100  rounded-lg">
          <div className="flex justify-between">
            <div>
              <h1 className="font-bold text-lg">Purchase messages </h1>
              <p className="text-sm text-muted mb-8">
                Buy messages for 35TZS per SMS
              </p>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              const payload = {
                church_uuid: selectedChurch.uuid,
                count: e.target.count.value,
              };
            }}
            className="w-6/12 2xl:w-4/12  space-y-4"
          >
            <FormField
              label={"Messages Count"}
              name={"count"}
              setValue={setCount}
              inputType={"number"}
              placeholder={"Enter amount of messages you want"}
            />
            <FormField
              label={"Total Amount"}
              name={"count"}
              value={`${count * 35}`.toLocaleString()}
              placeholder={"Enter amount of messages you want"}
            />

            <FormField
              label={"Pay via mobile money"}
              name={"count"}
              rightContent={
                <div className="flex space-x-2">
                  {[
                    "https://uttamis.co.tz/assets/img/uploads/trademarks/halopesa.png",
                    "https://www.techafricanews.com/wp-content/uploads/2022/01/M-Pesa-charges-for-sending-money-abroad.jpeg",
                    "https://cdn.prod.website-files.com/64199d190fc7afa82666d89c/6491beebed5bfcd9b9608baf_tigo_pesa.png",
                    "https://nikulipe.com/wp-content/uploads/2022/09/Airtel_logo_PNG1.png",
                  ].map((item) => {
                    return <img className="h-6" src={item} />;
                  })}
                </div>
              }
              placeholder={"Enter your phone number"}
            />
            <div className="w-3/12">
              <Button text={"Buy Now"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
