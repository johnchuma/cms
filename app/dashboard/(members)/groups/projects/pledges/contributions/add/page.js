"use client";
import Button from "@/app/components/button";
import FormField from "@/app/components/formForm";
import SelectField from "@/app/components/selectForm";
import { ChurchContext } from "@/app/dashboard/layout";
import Link from "next/link";
import toast from "react-hot-toast";
import { BsChevronRight } from "react-icons/bs";
import { useState } from "react/";
import { useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { addContribution } from "@/app/services/contributionServices";

const Page = () => {
  const [uploading, setUploading] = useState(false);
  const { selectedChurch, setPageTitle } = useContext(ChurchContext);
  const router = useRouter();
  const searchparams = useSearchParams();
  const uuid = searchparams.get("uuid");
  const [selectedMember, setSelectedMember] = useState({});

  useEffect(() => {
    setPageTitle("Record Pledge");
  }, []);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          setUploading(true);
          const payload = {
            amount: e.target.amount.value,
            pledge_uuid: uuid,
          };
          addContribution(payload)
            .then((response) => {
              console.log(response.data);
              setUploading(false);
              toast.success("Added successfully");
              router.back();
              //   e.clear();
            })
            .catch((e) => {
              console.log(e);
              toast.error("Failed to add");
              setUploading(false);
            });
        }}
        className=" rounded-lg mt-4 p-8"
      >
        <div className="grid grid-cols-3 gap-6 mb-8">
          <FormField
            placeholder={"Enter amount "}
            name={"amount"}
            inputType={"number"}
            label={"Amount"}
          />
        </div>
        <Button loading={uploading} isFull={false} text={"Add contribution "} />
      </form>
    </div>
  );
};

export default Page;
