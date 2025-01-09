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
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  addGroup,
  addGroupLeader,
  addGroupMember,
  editGroupLeader,
  getGroupLeader,
  getGroupMembers,
} from "@/app/services/groupsServices";
import { getChurchMembers } from "@/app/services/memberServices";
import Spinner from "@/app/components/spinner";
import moment from "moment";

const Page = ({ params }) => {
  const [uploading, setUploading] = useState(false);
  const { selectedChurch, setPageTitle } = useContext(ChurchContext);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null);
  const [keyword, setKeyword] = useState("");
  const uuid = params.uuid;

  useEffect(() => {
    getGroupLeader(uuid).then((response) => {
      setData(response.data.body);
      setLoading(false);
    });
  }, []);

  const router = useRouter();
  useEffect(() => {
    setPageTitle("Edit Leader details");
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUploading(true);

          const payload = {
            position: e.target.position.value,
            from: e.target.from.value,
            to: e.target.to.value,
          };

          editGroupLeader(uuid, payload)
            .then((response) => {
              toast.success("Changed successfully");
              router.back();
            })
            .catch((e) => {
              console.log(e);
            });
        }}
        className=" rounded-lg pb-12 md:p-8"
      >
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* {byGroup} */}
          <FormField
            placeholder={"Write leadership position"}
            name={"position"}
            defaultValue={data.position}
            label={"Leadership position"}
          />
          <FormField
            name={"from"}
            defaultValue={moment(data.from).format("yyy-MM-DD")}
            inputType="date"
            label={"From"}
          />
          <FormField
            name={"to"}
            inputType="date"
            defaultValue={moment(data.to).format("yyy-MM-DD")}
            label={"To"}
          />
        </div>

        <Button loading={uploading} isFull={false} text={"Save Changes"} />
      </form>
    </div>
  );
};

export default Page;
