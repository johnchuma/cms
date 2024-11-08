"use client";
import Button from "@/app/components/button";
import FormField from "@/app/components/formForm";
import SelectField from "@/app/components/selectForm";
import { ChurchContext } from "@/app/dashboard/layout";
import Link from "next/link";
import toast from "react-hot-toast";
import { BsChevronRight } from "react-icons/bs";
import { useState, useEffect, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import Spinner from "@/app/components/spinner";
import {
  editOfferingRecord,
  getOfferingRecord,
} from "@/app/services/offeringsRecordsServices copy";

const Page = ({ params }) => {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { uuid } = params;
  const pathname = usePathname();
  const [data, setData] = useState({});
  const { selectedChurch, setPageTitle } = useContext(ChurchContext);

  useEffect(() => {
    setPageTitle("Edit Record");
  }, []);
  useEffect(() => {
    getOfferingRecord(uuid)
      .then((response) => {
        setData(response.data.body); // Pre-fill data when received
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [uuid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploading(true);
    const payload = {
      amount: e.target.amount.value,
    };
    editOfferingRecord(uuid, payload)
      .then((response) => {
        setUploading(false);
        toast.success("Updated successfully");
        router.back();
      })
      .catch((e) => {
        console.log(e);
        toast.error("Failed to update");
        setUploading(false);
      });
  };

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <form onSubmit={handleSubmit} className=" mt-4 p-8">
        <div className="grid grid-cols-3 gap-6 mb-8">
          <FormField
            placeholder={"Enter record amount"}
            name={"amount"}
            defaultValue={data.amount}
            label={"Amount"}
          />
        </div>
        <Button loading={uploading} isFull={false} text="Save Changes" />
      </form>
    </div>
  );
};

export default Page;
