"use client";
import { useState, useEffect, useContext } from "react";
import Button from "@/app/components/button";
import FormField from "@/app/components/formForm";
import { ChurchContext } from "@/app/dashboard/layout";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { addProject } from "@/app/services/projectServices";
import DraftEditor from "@/app/components/draftEditor";

const Page = () => {
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState(""); // State for Quill editor content
  const { selectedChurch, setPageTitle } = useContext(ChurchContext);
  const router = useRouter();
  const searchparams = useSearchParams();
  const uuid = searchparams.get("uuid");

  useEffect(() => {
    setPageTitle("Add Project");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploading(true);
    const payload = {
      name: e.target.name.value,
      description: description, // Get description from Quill editor
      group_uuid: uuid,
    };
    addProject(payload)
      .then((response) => {
        console.log(response.data);
        setUploading(false);
        toast.success("Added successfully");
        router.push(`/dashboard/groups/projects/?uuid=${uuid}`);
      })
      .catch((e) => {
        console.log(e);
        toast.error("Failed to add");
        setUploading(false);
      });
  };

  return (
    <div className="border border-slate-100 rounded-lg p-5 mx-6">
      <form onSubmit={handleSubmit} className="rounded-lg">
        <div className="grid grid-cols-1  gap-6 mb-8">
          <div className="w-6/12 2xl:w-4/12">
            <FormField
              placeholder={"Enter project name"}
              name={"name"}
              label={"Project name"}
            />
          </div>

          <div className="w-8/12 2xl:w-6/12">
            <DraftEditor value={description} onChange={setDescription} />
          </div>
        </div>
        <Button loading={uploading} isFull={false} text={"Add Project"} />
      </form>
    </div>
  );
};

export default Page;
