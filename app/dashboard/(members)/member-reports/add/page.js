"use client";
import Button from "@/app/components/button";
import FormField from "@/app/components/formForm";
import SelectField from "@/app/components/selectForm";
import { ChurchContext } from "@/app/dashboard/layout";
import { addMember } from "@/app/services/memberServices";
import Link from "next/link";
import toast from "react-hot-toast";
import { BsChevronRight } from "react-icons/bs";
import { useState } from "react/";
import { useContext } from "react";
import { useEffect } from "react";
import TextareaField from "@/app/components/textareaForm";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { addMemberReport } from "@/app/services/memberReportsServices";

const Page = () => {
  const [uploading, setUploading] = useState(false);
  const { selectedChurch, setPageTitle } = useContext(ChurchContext);
  const searchParams = useSearchParams();
  const uuid = searchParams.get("uuid");
  const router = useRouter();
  useEffect(() => {
    setPageTitle("Add Report");
  }, []);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUploading(true);
          const payload = {
            type: e.target.type.value,
            description: e.target.description.value,
            member_uuid: uuid,
          };
          addMemberReport(payload)
            .then((response) => {
              console.log(response.data);
              setUploading(false);
              toast.success("Added successfully");
              router.push("/dashboard/member-reports");
            })
            .catch((e) => {
              // console.log(e);
              toast.error("Failed to add member report");
              setUploading(false);
            });
        }}
        className=" rounded-lg pb-12 md:p-8"
      >
        <div className="grid grid-cols-2 gap-6 mb-8">
          <SelectField
            placeholder={"Select gender"}
            name={"type"}
            items={["Sick", "Traveling", "Funeral", "Marriage", ""]}
            label={"Event Type"}
          />
          <TextareaField
            placeholder={"Enter event descriptions"}
            name={"description"}
            label={"Description "}
          />
        </div>
        <Button loading={uploading} isFull={false} text={"Add report"} />
      </form>
    </div>
  );
};

export default Page;
