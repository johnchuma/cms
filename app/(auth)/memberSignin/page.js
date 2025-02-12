"use client";
import Link from "next/link";
import Image from "next/image";
import Button from "../../components/button";
import FormField from "../../components/formForm";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login, loginWithGoogle } from "@/app/services/authServices";
import { storeAccessToken } from "@/app/utils/localStorageData";
import toast from "react-hot-toast";
import { loginMember } from "@/app/services/memberServices";

const Page = () => {
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  return (
    <div className="bg-white w-screen h-screen text-dark ">
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-6  bg-primary h-screen hidden md:flex flex-col justify-center">
          <div className="w-8/12 mx-auto"></div>
        </div>
        <div className="col-span-12 md:col-span-6 px-4 md:px-24 min-h-screen flex flex-col justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setUploading(true);
              const payload = {
                phone: e.target.phone.value,
                dob: e.target.dob.value,
              };
              loginMember(payload)
                .then((response) => {
                  console.log(response);
                  let token = response.data.tokens.ACCESS_TOKEN;
                  storeAccessToken(token);
                  setUploading(false);
                  toast.success("Logged in successfully");
                  console.log("Access tokens", token);
                  router.push(`/myAccount/?uuid=${response.data.member.uuid}`);
                })
                .catch((e) => {
                  console.log(e);
                  setUploading(false);
                  toast.error(e.response?.data?.message);
                });
            }}
            className="w-11/12 md:w-9/12 2xl:w-6/12 mx-auto "
          >
            <h1 className="font-semibold text-3xl ">Login to proceed</h1>
            <p className="font-muted text-sm  text-muted ">
              Enter your details below to continue
            </p>
            <div className="mt-4 space-y-2">
              <FormField
                placeholder={"Enter your phone number"}
                name={"phone"}
                label={"Phone number"}
              />
              <FormField
                placeholder={"Enter your date of birth"}
                inputType={"date"}
                name={"dob"}
                label={"Date of birth"}
              />

              <Button loading={uploading} text={"Continue"} />
              <div className="flex justify-start font-medium text-muted space-x-2">
                <h1>Go back to home page</h1>
                <Link
                  href="/registrationForm"
                  className="underline text-primary"
                >
                  Go back
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
