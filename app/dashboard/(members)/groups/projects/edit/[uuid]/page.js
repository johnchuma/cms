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
import DraftEditor from "@/app/components/draftEditor";

const Page = ({ params }) => {
  const [uploading, setUploading] = useState(false);
  const { selectedChurch, setPageTitle } = useContext(ChurchContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const uuid = params.uuid;
  const [description, setDescription] = useState(""); // State for Quill editor content

  useEffect(() => {
    getProject(uuid).then((response) => {
      const project = response.data.body;
      setData(project);
      setDescription(project.description);
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
    <div className="border border-slate-100 p-6 mx-6 rounded-lg">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUploading(true);

          const payload = {
            name: e.target.name.value,
            description: description,
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
        className="rounded-lg"
      >
        <div className="grid grid-cols-1  gap-6 mb-8">
          <div className="w-6/12 2xl:w-4/12">
            <FormField
              placeholder={"Enter project name"}
              name={"name"}
              defaultValue={data.name}
              label={"Project name"}
            />
          </div>

          <div className="w-8/12 2xl:w-6/12">
            <DraftEditor value={description} onChange={setDescription} />
          </div>
        </div>
        <Button loading={uploading} isFull={false} text={"Save Changes"} />
      </form>
    </div>
  );
};

export default Page;
