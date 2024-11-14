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
  addContribution,
  editContribution,
  getContribution,
} from "@/app/services/contributionServices";
import Spinner from "@/app/components/spinner";

const Page = ({ params }) => {
  const [uploading, setUploading] = useState(false);
  const { selectedChurch, setPageTitle } = useContext(ChurchContext);
  const router = useRouter();
  const searchparams = useSearchParams();
  const [selectedMember, setSelectedMember] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const uuid = params.uuid;

  useEffect(() => {
    getContribution(uuid).then((response) => {
      setSelectedItem(response.data.body);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    setPageTitle("Edit Contribution");
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
            amount: e.target.amount.value,
            pledge_uuid: uuid,
          };
          editContribution(uuid, payload)
            .then((response) => {
              console.log(response.data);
              setUploading(false);
              toast.success("Save changes");
              router.back();
              //   e.clear();
            })
            .catch((e) => {
              console.log(e);
              toast.error("Failed to add");
              setUploading(false);
            });
        }}
        className=" rounded-lg p-8"
      >
        <div className="grid grid-cols-3 gap-6 mb-8">
          <FormField
            placeholder={"Enter amount "}
            name={"amount"}
            defaultValue={selectedItem.amount}
            inputType={"number"}
            label={"Amount"}
          />
        </div>
        <Button loading={uploading} isFull={false} text={"Save Changes "} />
      </form>
    </div>
  );
};

export default Page;
