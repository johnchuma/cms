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
import { addProject } from "@/app/services/projectServices";

const Page = () => {
  const [uploading, setUploading] = useState(false);
  const { selectedChurch, setPageTitle } = useContext(ChurchContext);
  const router = useRouter();
  const searchparams = useSearchParams();
  const uuid = searchparams.get("uuid");
  useEffect(() => {
    setPageTitle("Add Project");
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
            group_uuid: uuid,
          };
          addProject(payload)
            .then((response) => {
              console.log(response.data);
              setUploading(false);
              toast.success("Added successfully");
              router.push(`/dashboard/groups/projects/?uuid=${uuid}`);
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
            placeholder={"Enter project name"}
            name={"name"}
            label={"Project name"}
          />

          <TextareaField
            placeholder={"Write information about project here"}
            name={"description"}
            label={"Description"}
          />
        </div>
        <Button loading={uploading} isFull={false} text={"Add Project"} />
      </form>
    </div>
  );
};

export default Page;
