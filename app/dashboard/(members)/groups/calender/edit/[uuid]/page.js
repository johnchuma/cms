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
  getGroupMembers,
} from "@/app/services/groupsServices";
import { getChurchMembers } from "@/app/services/memberServices";
import TextareaField from "@/app/components/textareaForm";
import {
  editGroupExpenses,
  getGroupExpense,
} from "@/app/services/groupExpenses.services";
import { getProjectExpense } from "@/app/services/projectExpenses.services";
import Spinner from "@/app/components/spinner";
import {
  editGroupCalenders,
  getGroupCalender,
} from "@/app/services/groupCalenderServices";
import moment from "moment";

const Page = ({ params }) => {
  const [uploading, setUploading] = useState(false);
  const { selectedChurch, setPageTitle } = useContext(ChurchContext);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const uuid = params.uuid;

  useEffect(() => {
    getGroupCalender(uuid).then((response) => {
      setData(response.data.body);
      setLoading(false);
    });
  }, []);

  //Get members

  const router = useRouter();
  useEffect(() => {
    setPageTitle("Edit Calender");
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
            group_uuid: uuid,
            title: e.target.title.value,
            from: e.target.from.value,
            to: e.target.to.value,
            description: e.target.description.value,
            repetition: e.target.repetition.value,
          };
          editGroupCalenders(uuid, payload)
            .then((response) => {
              toast.success("Added successfully");
              router.back();
            })
            .catch((e) => {
              console.log(e);
            });
        }}
        className=" rounded-lg pb-12 md:p-8"
      >
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <FormField
            placeholder={"Enter event title"}
            name={"title"}
            defaultValue={data.title}
            label={"Title"}
          />
          <SelectField
            items={["Once", "Daily", "Weekly", "Monthly", "Yearly"]}
            placeholder={"From"}
            name={"repetition"}
            defaultValue={data.repetition}
            inputType={"date"}
            label={"Repetition"}
          />

          <FormField
            name={"from"}
            defaultValue={moment(data.from).format("yyy-MM-DD")}
            inputType={"date"}
            label={"Start Date"}
          />

          <FormField
            placeholder={"To"}
            name={"to"}
            required={false}
            defaultValue={moment(data.to).format("yyy-MM-DD")}
            inputType={"date"}
            label={"To (optional)"}
          />

          <TextareaField
            placeholder={"Write event description"}
            name={"description"}
            defaultValue={data.description}
            label={"Description"}
          />
        </div>

        <Button loading={uploading} isFull={false} text={"Save Changes"} />
      </form>
    </div>
  );
};

export default Page;
