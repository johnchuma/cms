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

const Page = () => {
  const [uploading, setUploading] = useState(false);
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
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <TextareaField
            placeholder={"Enter request description"}
            name={"name"}
            label={"Poster request description"}
          />
        </div>
        <Button loading={uploading} isFull={false} text={"Create Poster"} />
      </form>
    </div>
  );
};

export default Page;
