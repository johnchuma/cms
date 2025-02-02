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
import { addGroup } from "@/app/services/groupsServices";
import TextareaField from "@/app/components/textareaForm";
import { addService } from "@/app/services/serviceServices";

const Page = () => {
  const [uploading, setUploading] = useState(false);
  const { selectedChurch, setPageTitle } = useContext(ChurchContext);
  const router = useRouter();
  const searchparams = useSearchParams();
  const uuid = searchparams.get("uuid");
  useEffect(() => {
    setPageTitle("Add Service");
  }, []);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUploading(true);
          const payload = {
            name: e.target.name.value,
            repetition: e.target.repetition.value,
            description: e.target.description.value,
            date: e.target.date.value,
            group_uuid: uuid,
          };
          addService(payload)
            .then((response) => {
              console.log(response.data);
              setUploading(false);
              toast.success("Added successfully");
              router.push(`/dashboard/groups/services/?uuid=${uuid}`);
              //   e.clear();
            })
            .catch((e) => {
              console.log(e);
              toast.error("Failed to add group");
              setUploading(false);
            });
        }}
        className=" rounded-lg pb-12 md:p-8"
      >
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <FormField
            placeholder={"Enter service name"}
            name={"name"}
            label={"Service name"}
          />

          <SelectField
            name={"repetition"}
            defaultValue={"Weekly"}
            items={["Once", "Daily", "Weekly", "Monthly"]}
            label={"Repetition type"}
          />
          <FormField name={"date"} inputType={"date"} label={"Select Date"} />
          <TextareaField
            placeholder={"Write information about service here"}
            name={"description"}
            label={"Description"}
          />
        </div>
        <Button loading={uploading} isFull={false} text={"Add Service"} />
      </form>
    </div>
  );
};

export default Page;
