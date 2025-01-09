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
import {
  addGroup,
  addGroupMember,
  getGroupMembers,
} from "@/app/services/groupsServices";
import { getChurchMembers } from "@/app/services/memberServices";
import TextareaField from "@/app/components/textareaForm";
import { addGuest } from "@/app/services/guestsServices";
import { addOffering } from "@/app/services/offeringsServices";

const Page = () => {
  const [uploading, setUploading] = useState(false);
  const { setPageTitle } = useContext(ChurchContext);
  const searchParams = useSearchParams();
  const uuid = searchParams.get("uuid");

  const router = useRouter();
  useEffect(() => {
    setPageTitle("New Offering");
  }, []);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUploading(true);
          const payload = {
            name: e.target.name.value,
            description: e.target.description.value,
            service_uuid: uuid,
          };
          addOffering(payload)
            .then((response) => {
              console.log(response.data);
              setUploading(false);
              toast.success("Added successfully");
              router.back();
              //   e.clear();
            })
            .catch((e) => {
              console.log(e);
              toast.error("Failed to add offering");
              setUploading(false);
            });
        }}
        className=" rounded-lg pb-12 md:p-8"
      >
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* {byGroup} */}
          <FormField
            placeholder={"Enter offering name"}
            name={"name"}
            label={"Offering Name"}
          />
          <TextareaField
            placeholder={"Enter description about this offering"}
            name={"description"}
            label={"Description"}
          />
        </div>

        <Button loading={uploading} isFull={false} text={"Add Offering"} />
      </form>
    </div>
  );
};

export default Page;
