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
              src="/login.png"
            />
          </div>
        </div>
        <div className="col-span-6 px-24 min-h-screen flex flex-col justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setUploading(true);
              const payload = {
                email: e.target.email.value,
                password: e.target.password.value,
              };
              login(payload)
                .then((response) => {
                  let token = response.data.body.tokens.ACCESS_TOKEN;
                  storeAccessToken(token);
                  console.log("Access tokens", token);
                  router.push("/dashboard/");
                })
                .catch((e) => {
                  console.log(e);
                  setUploading(false);
                  toast.error(e.response.data.message);
                });
            }}
            className="w-9/12 2xl:w-6/12 mx-auto space-y-4"
          >
            <h1 className="font-semibold text-3xl">Sign In</h1>

            <button
              onClick={(event) => {
                event.preventDefault();
                loginWithGoogle()
                  .then((response) => {
                    console.log(response.data.body);
                    let token = response.data.body.tokens.ACCESS_TOKEN;
                    storeAccessToken(token);
                    console.log("Access tokens", token);
                    router.push("/dashboard/");
                  })
                  .catch((e) => {
                    console.log(e);
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
              <h1 className="text-muted w-full text-center">Or sign In with</h1>
              <div className="h-1 w-full bg-gray-200" />
            </div>
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
            <div>
              <Link href="/forgot-password" className="text-primary ">
                Forgot your password ?
              </Link>
            </div>
            <Button loading={uploading} text={"Login"} />
            <div className="flex justify-start font-medium text-muted space-x-2">
              <h1>Don't have an account ?</h1>
              <Link href="/signup" className="underline text-primary">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
