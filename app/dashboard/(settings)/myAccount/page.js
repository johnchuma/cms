"use client";

import { useContext, useState, useEffect } from "react";
import { ChurchContext } from "../../layout";
import FormField from "@/app/components/formForm";
import Button from "@/app/components/button";
import {
  deleteAccessToken,
  getSelectedChurch,
} from "@/app/utils/localStorageData";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { editUser, getMyInfo } from "@/app/services/authServices";
import Spinner from "@/app/components/spinner";
import SelectField from "@/app/components/selectForm";
import { tanzaniaRegions } from "@/app/utils/regions";
import TextareaField from "@/app/components/textareaForm";
import { editChurch } from "@/app/services/churchServices";

const Page = () => {
  const { selectedChurch, setPageTitle, setAddPath } =
    useContext(ChurchContext);
  const [user, setUser] = useState(null);
  const [church, setChurch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingChurch, setUpdatingChurch] = useState(false);
  const [updatingUser, setUpdatingUser] = useState(false);
  const router = useRouter();
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [group, setGroup] = useState("All");
  const [count, setCount] = useState(0);
  useEffect(() => {
    setPageTitle("My Account");
    setAddPath(null);
    let path = `${selectedChurch.uuid}/?limit=${limit}&page=${page}&keyword=${keyword}`;
    if (group) {
      path = path + `&group=${group}`;
    }
    getMyInfo().then((res) => {
      const uuid = getSelectedChurch();
      const data = res.data.body;
      const church = data.Churches.filter((e) => e.uuid == uuid)[0];
      setUser(data);
      setChurch(church);
      setLoading(false);
    });
  }, [selectedChurch, limit, page, keyword, group]);
  return loading ? (
    <Spinner />
  ) : (
    <div className=" pt-0 md:px-6 space-y-4 pb-24">
      <div className="border border-slate-100 rounded-lg p-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const payload = {
              name: e.target.name.value,
              email: e.target.email.value,
              phone: e.target.phone.value,
            };
            setUpdatingUser(true);
            editUser(user.uuid, payload).then((data) => {
              toast.success("Changed successfully");
              setUpdatingUser(false);
            });
          }}
          className=" w-full md:w-6/12 2xl:w-4/12"
        >
          <h1 className="font-bold text-lg">Personal Information</h1>
          <p className="text-sm text-muted mb-8">Update personal information</p>
          <div className="space-y-4">
            <FormField
              defaultValue={user.name}
              name={"name"}
              label={"Username"}
            />
            <FormField
              defaultValue={user.email}
              disabled={true}
              name={"email"}
              label={"Email"}
            />
            <FormField
              name={"phone"}
              defaultValue={user.phone}
              label={"Phone number"}
            />
            <div className="w-4/12 mt-4">
              <Button loading={updatingUser} text={"Save Changes"} />
            </div>
          </div>
        </form>
      </div>
      <div className="border border-slate-100 rounded-lg p-5">
        <div className="md:w-6/12 2xl:w-4/12">
          <h1 className="font-bold text-lg">Church Information</h1>
          <p className="text-sm text-muted mb-8">Update church information</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const payload = {
                name: e.target.name.value,
                address: e.target.address.value,
                description: e.target.description.value,
              };
              setUpdatingChurch(true);
              editChurch(church.uuid, payload).then((res) => {
                toast.success("Changes saved");
                setUpdatingChurch(false);
              });
            }}
            className="space-y-4"
          >
            <FormField
              defaultValue={church.name}
              name={"name"}
              label={"Church Name"}
            />
            <SelectField
              placeholder={"Enter email address"}
              name={"address"}
              defaultValue={church.address}
              items={tanzaniaRegions}
              label={"Church Address"}
            />
            <TextareaField
              defaultValue={church.description}
              name={"description"}
              label={"Description"}
            />
            <div className="w-4/12 mt-4">
              <Button loading={updatingChurch} text={"Save Changes"} />
            </div>
          </form>
        </div>
      </div>
      <div className="border border-slate-100 rounded-lg p-5  ">
        <div className="w-full md:w-6/12 2xl:w-4/12">
          <h1 className="font-bold text-lg">Authentication</h1>
          <p className="text-sm text-muted mb-3">
            You are currently logged in, you can logout by pressing button below
          </p>
          <div className="w-4/12 mt-1">
            <h1
              onClick={() => {
                deleteAccessToken();
                toast.success("Logged out successfully");
                router.push("/signin");
              }}
              className="font-bold text-red-400 hover:text-red-500 cursor-pointer transition-all duration-200"
            >
              Sign Out
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
