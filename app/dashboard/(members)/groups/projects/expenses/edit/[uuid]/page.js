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

import { getChurchMembers } from "@/app/services/memberServices";
import TextareaField from "@/app/components/textareaForm";

import {
  editProjectExpense,
  getProjectExpense,
} from "@/app/services/projectExpenses.services";
import Spinner from "@/app/components/spinner";

const Page = ({ params }) => {
  const [uploading, setUploading] = useState(false);
  const { selectedChurch, setPageTitle } = useContext(ChurchContext);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const uuid = params.uuid;

  useEffect(() => {
    getProjectExpense(uuid).then((response) => {
      setData(response.data.body);
      setLoading(false);
    });
  }, []);

  //Get members

  const router = useRouter();
  useEffect(() => {
    setPageTitle("Edit expense");
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
            amount: e.target.amount.value,
            description: e.target.description.value,
          };
          editProjectExpense(uuid, payload)
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
            placeholder={"Enter amount spent"}
            name={"amount"}
            defaultValue={data.amount}
            label={"Amount spent"}
          />

          <TextareaField
            placeholder={"Write information about service here"}
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
