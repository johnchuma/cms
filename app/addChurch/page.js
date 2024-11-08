"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addChurch } from "../services/churchServices";
import FormField from "../components/formForm";
import SelectField from "../components/selectForm";
import { tanzaniaRegions } from "../utils/regions";
import TextareaField from "../components/textareaForm";
import Button from "../components/button";
import Image from "next/image";
import toast from "react-hot-toast";

const Page = () => {
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  return (
    <div className="bg-white w-screen h-screen text-dark ">
      <div className="grid grid-cols-12">
        <div className="col-span-6 bg-primary h-screen flex flex-col justify-center">
          <div className="w-8/12 mx-auto">
            <Image
              height="9000"
              width="9000"
              className=" hover:scale-95 transition-all duration-300"
              src="/login.svg"
            />
          </div>
        </div>
        <div className="col-span-6 px-24 min-h-screen flex flex-col justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setUploading(true);
              const payload = {
                name: e.target.name.value,
                address: e.target.address.value,
                description: e.target.description.value,
              };
              addChurch(payload)
                .then((response) => {
                  router.push("/dashboard");
                  toast.success("Church added successfully");
                })
                .catch((e) => {
                  setUploading(false);
                  console.log(e);
                });
            }}
            className="w-9/12 2xl:w-6/12 mx-auto space-y-4"
          >
            <div className="space-y-2 ">
              <h1 className="font-semibold text-3xl">Register a Church</h1>
              <p className="text-muted">
                Fill the form below to add a new church
              </p>
            </div>

            <FormField
              placeholder={"Enter church name"}
              name={"name"}
              label={"Church Name"}
            />
            <SelectField
              placeholder={"Enter email address"}
              name={"address"}
              items={tanzaniaRegions}
              label={"Church Address"}
            />
            <TextareaField
              placeholder={"Enter short description about the church"}
              name={"description"}
              label={"About Church (Short description)"}
            />

            <Button loading={uploading} text={"Save Details"} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
