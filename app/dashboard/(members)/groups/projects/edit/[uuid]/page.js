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
import { editGroupLeader, getGroupLeader } from "@/app/services/groupsServices";
import Spinner from "@/app/components/spinner";
import moment from "moment";
import { editProject, getProject } from "@/app/services/projectServices";
import TextareaField from "@/app/components/textareaForm";

const Page = ({ params }) => {
  const [uploading, setUploading] = useState(false);
  const { selectedChurch, setPageTitle } = useContext(ChurchContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const uuid = params.uuid;

  useEffect(() => {
    getProject(uuid).then((response) => {
      setData(response.data.body);
      setLoading(false);
    });
  }, []);

  const router = useRouter();
  useEffect(() => {
    setPageTitle("Edit Project");
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUploading(true);

          const payload = {
            name: e.target.name.value,
            description: e.target.description.value,
          };

          editProject(uuid, payload)
            .then((response) => {
              toast.success("Changed successfully");
              router.back();
            })
            .catch((e) => {
              console.log(e);
            });
        }}
        className=" rounded-lg mt-4 p-8"
      >
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* {byGroup} */}
          <FormField
            placeholder={"Enter project name"}
            name={"name"}
            defaultValue={data.name}
            label={"Project name"}
          />

          <TextareaField
            placeholder={"Write information about project here"}
            name={"description"}
            defaultValue={data.description}
            label={"Description"}
          />
        </div>

        <Button loading={uploading} isFull={false} text={"Save Changes"} />
      </form>
    </div>
  );
};

export default Page;
