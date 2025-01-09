"use client";
import Button from "@/app/components/button";
import FormField from "@/app/components/formForm";
import SelectField from "@/app/components/selectForm";
import { ChurchContext } from "@/app/dashboard/layout";
import { editMember, getMemberDetails } from "@/app/services/memberServices";
import Link from "next/link";
import toast from "react-hot-toast";
import { BsChevronRight } from "react-icons/bs";
import { useState, useEffect, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import Spinner from "@/app/components/spinner";
import moment from "moment";
import {
  editMemberReport,
  getMemberReportDetails,
} from "@/app/services/memberReportsServices";
import TextareaField from "@/app/components/textareaForm";

const Page = ({ params }) => {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { uuid } = params;
  const pathname = usePathname();
  const [data, setData] = useState({});
  const { selectedChurch, setPageTitle } = useContext(ChurchContext);

  useEffect(() => {
    setPageTitle("Edit Details");
  }, []);
  useEffect(() => {
    getMemberReportDetails(uuid)
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
      type: e.target.type.value,
      description: e.target.description.value,
      isActive: e.target.isActive.value,
    };

    editMemberReport(uuid, payload)
      .then((response) => {
        setUploading(false);
        toast.success("Details updated successfully");
        router.push("/dashboard/member-reports");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Failed to update details");
        setUploading(false);
      });
  };

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <form onSubmit={handleSubmit} className=" mt-4 pb-12 md:p-8">
        <div className="grid grid-cols-2 gap-6 mb-8">
          <SelectField
            placeholder={"Select gender"}
            name={"type"}
            defaultValue={data.type}
            items={["Sick", "Traveling", "Funeral", "Marriage", ""]}
            label={"Event Type"}
          />
          <SelectField
            placeholder={"Status"}
            name={"isActive"}
            defaultValue={data.isActive}
            values={[true, false]}
            items={["Active", "Not Active"]}
            label={"Status"}
          />
          <TextareaField
            placeholder={"Enter event descriptions"}
            name={"description"}
            defaultValue={data.description}
            label={"Description "}
          />
        </div>
        <Button loading={uploading} isFull={false} text="Save Changes" />
      </form>
    </div>
  );
};

export default Page;
