"use client";
import Link from "next/link";
import Button from "../../components/button";
import FormField from "../../components/formForm";
import { FcGoogle } from "react-icons/fc";
import { loginWithGoogle, register } from "@/app/services/authServices";
import toast from "react-hot-toast";
import { useState } from "react";
import { storeAccessToken } from "@/app/utils/localStorageData";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
              src="/register.png"
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
                email: e.target.email.value,
                phone: e.target.phone.value,
                password: e.target.password.value,
              };
              register(payload)
                .then((response) => {
                  let token = response.data.body.tokens.ACCESS_TOKEN;
                  storeAccessToken(token);
                  router.push("/dashboard");
                  setUploading(false);
                  toast.success("Registered successfully");
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
            <h1 className="font-semibold text-3xl">Sign Up</h1>

            <button
              onClick={(event) => {
                event.preventDefault();
                loginWithGoogle()
                  .then((response) => {
                    let token = response.data.body.tokens.ACCESS_TOKEN;
                    console.log("Access tokens", token);
                    storeAccessToken(token);
                    router.push("/dashboard/");
                  })
                  .catch((e) => {
                    toast.error(e.response.data.message);
                  });
              }}
              className="flex justify-center font-semibold py-3 rounded-lg space-x-2 items-center border-gray-200 w-full border-2"
            >
              <FcGoogle className="text-xl" />
              <h1>Sign in with google</h1>
            </button>
            <div className="flex items-center">
              <div className="h-1 w-full bg-gray-200" />
              <h1 className="text-muted w-full text-center">
                Or register below
              </h1>
              <div className="h-1 w-full bg-gray-200" />
            </div>
            <FormField
              placeholder={"Enter your full name"}
              name={"name"}
              label={"Full Name"}
            />
            <FormField
              placeholder={"Enter your phone number"}
              name={"phone"}
              label={"Phone number"}
            />
            <FormField
              placeholder={"Enter email address"}
              name={"email"}
              label={"Email Address"}
            />
            <FormField
              placeholder={"Enter your password"}
              inputType={"password"}
              name={"password"}
              label={"Password"}
            />
            <Button loading={uploading} text={"Register"} />
            <div className="flex justify-start font-medium text-muted space-x-2">
              <h1>Already have an account ?</h1>
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
