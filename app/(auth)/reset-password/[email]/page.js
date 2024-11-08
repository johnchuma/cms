"use client";
import Link from "next/link";
import Button from "../../../components/button";
import FormField from "../../../components/formForm";
import { FcGoogle } from "react-icons/fc";
import { resetPassword } from "@/app/services/authServices";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BsCheck2,
  BsCheckAll,
  BsCheckCircle,
  BsMailbox,
  BsMailbox2,
} from "react-icons/bs";

const Page = ({ params }) => {
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const email = params.email.replace("%40", "@");

  return (
    <div className="bg-white w-screen h-screen text-dark ">
      <div className="grid grid-cols-12">
        <div className="col-span-5 bg-primary h-screen"></div>
        <div className="col-span-7 px-24 min-h-screen flex flex-col justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setUploading(true);
              if (e.target.password.value == e.target.newPassword.value) {
                const payload = {
                  recoveryCode: e.target.code.value,
                  password: e.target.password.value,
                };
                console.log(payload);
                resetPassword(email, payload)
                  .then((res) => {
                    setUploading(false);
                    router.push(`/signin`);
                    toast.success("Password changed successfully");
                  })
                  .catch((e) => {
                    setUploading(false);
                    if (e.response) {
                      toast.error(e.response.data.message);
                    }
                  });
              } else {
                toast.error("Passwords doesn't match");
              }
            }}
            className="w-9/12 2xl:w-6/12 mx-auto space-y-4"
          >
            <div className="bg-green-400 bg-opacity-10 rounded-lg w-full p-4">
              <div className="flex space-x-3 font-medium items-center">
                <div>
                  {" "}
                  <h1>Please check your email for the recovery code.</h1>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-semibold">Reset password </h1>
              <p className="text-muted mt-1">
                Fill the form below to recover your password
              </p>
            </div>
            <FormField
              placeholder={"Enter verification code"}
              name={"code"}
              inputType={"number"}
              label={"Recovery Code"}
            />
            <FormField
              placeholder={"Enter your password"}
              name={"password"}
              inputType={"password"}
              label={"New Password"}
            />
            <FormField
              placeholder={"Re-enter your password"}
              name={"newPassword"}
              inputType={"password"}
              label={"Re-write Password"}
            />
            <Button loading={uploading} text={"Reset Password"} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
