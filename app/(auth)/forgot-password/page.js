"use client";
import Link from "next/link";
import Button from "../../components/button";
import FormField from "../../components/formForm";
import { FcGoogle } from "react-icons/fc";
import { getVerificationCode } from "@/app/services/authServices";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Page = () => {
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  return (
    <div className="bg-white w-screen h-screen text-dark ">
      <div className="grid grid-cols-12">
        <div className="col-span-5 bg-primary h-screen "></div>
        <div className="col-span-7 px-24 min-h-screen flex flex-col justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setUploading(true);
              const payload = {
                email: e.target.email.value,
              };
              getVerificationCode(payload)
                .then((res) => {
                  router.push(`/reset-password/${payload.email}`);
                })
                .catch((e) => {
                  setUploading(false);
                  if (e.response) {
                    toast.error(e.response.data.message);
                  }
                });
            }}
            className="w-9/12 2xl:w-6/12 mx-auto space-y-4"
          >
            <h1 className="text-3xl font-semibold">Forgot Password ?</h1>
            <p className="text-muted">
              Fill the form below to receive password recovery code
            </p>
            <FormField
              placeholder={"Enter email address"}
              name={"email"}
              label={"Email Address"}
            />
            <Button loading={uploading} text={"Send Recovery Code"} />
            <div className="flex justify-start font-medium text-muted space-x-2">
              <h1>Go back to ?</h1>
              <Link href="/signin" className="underline text-primary">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
