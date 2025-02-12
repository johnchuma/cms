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
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { addGroup } from "@/app/services/groupsServices";
import TextareaField from "@/app/components/textareaForm";
import { AiFillFileAdd, AiOutlineFileAdd } from "react-icons/ai";
import { FaPiedPiper } from "react-icons/fa6";
import { ImAttachment } from "react-icons/im";
const Page = () => {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const { selectedChurch, setPageTitle } = useContext(ChurchContext);

  const router = useRouter();
  useEffect(() => {
    setPageTitle("New Poster request");
  }, []);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUploading(true);
          const payload = {
            name: e.target.name.value,
            church_uuid: selectedChurch.uuid,
          };
          addGroup(payload)
            .then((response) => {
              console.log(response.data);
              setUploading(false);
              toast.success("Added successfully");
              router.push("/dashboard/groups");
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
        <div className="grid md:grid-cols-3 gap-6 mb-2">
          <TextareaField
            placeholder={"Enter request description"}
            name={"name"}
            label={"Poster request description"}
          />
        </div>
        <div className="flex justify-between w-4/12 items-center mt-4">
          <h1>Attachments</h1>
          <label for="button">
            <h1 className="text-sm font-bold hover:text-primary cursor-pointer transition-all duration-200">
              Add
            </h1>
          </label>
          <input
            onChange={(e) => {
              console.log(e.target.files[0]);
              setFiles([...files, e.target.files[0]]);
              console.log(files);
            }}
            className=" sr-only"
            type="file"
            id="button"
          />
        </div>
        <div className="space-y-2 w-auto rounded mt-2 bg-background p-5 mb-8">
          {files.length < 1 && (
            <h1 className="text-sm text-muted">No Attachments</h1>
          )}
          {files.map((item) => {
            return (
              <div className="flex space-x-2 items-center text-sm">
                <div>
                  {" "}
                  <ImAttachment />
                </div>
                <h1 className="hover:text-primary cursor-pointer">
                  {item.name}
                </h1>
              </div>
            );
          })}
        </div>
        <Button
          loading={uploading}
          isFull={false}
          text={"Create Poster Request"}
        />
      </form>
    </div>
  );
};

export default Page;
