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
    getMemberDetails(uuid)
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
      name: e.target.name.value || data.name,
      gender: e.target.gender.value || data.gender,
      birthDate: e.target.birthDate.value || data.birthDate,
      address: e.target.address.value || data.address,
      church_uuid: selectedChurch.uuid,
      disability: e.target.disability.value || data.disability,
      email: e.target.email.value || data.email,
      isBaptized: e.target.isBaptized.value,
      phone: e.target.phone.value || data.phone,
      isHouseOwner: e.target.isHouseOwner.value,
      maritalStatus: e.target.maritalStatus.value || data.maritalStatus,
      work: e.target.work.value || data.work,
      isActive: e.target.isActive.value || data.isActive,
    };

    editMember(uuid, payload)
      .then((response) => {
        setUploading(false);
        toast.success("Member details updated successfully");
        router.push("/dashboard/members");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Failed to update member details");
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
            placeholder="Enter member's name"
            name="name"
            defaultValue={data.name || ""}
            label="Full Name"
          />
          <SelectField
            placeholder="Select gender"
            name="gender"
            defaultValue={data.gender || "Male"}
            items={["Male", "Female"]}
            label="Gender"
          />
          <FormField
            placeholder="Enter member's birth date"
            name="birthDate"
            defaultValue={
              moment(data.birthDate).format("yyy-MM-DD") || "2000-01-01"
            }
            inputType="date"
            label="Birth Date"
          />
          <FormField
            placeholder="Enter member's address"
            name="address"
            defaultValue={data.address || ""}
            label="Address"
          />
          <FormField
            placeholder="Enter disability (if any)"
            name="disability"
            defaultValue={data.disability || ""}
            required={false}
            label="Disability (optional)"
          />
          <FormField
            placeholder="Enter member's email"
            name="email"
            defaultValue={data.email || ""}
            inputType="email"
            required={false}
            label="Email"
          />
          <FormField
            placeholder="Enter phone number"
            name="phone"
            defaultValue={data.phone || ""}
            required={false}
            label="Phone Number"
          />
          <FormField
            placeholder="Enter member's occupation"
            name="work"
            defaultValue={data.work || ""}
            required={false}
            label="Occupation/Work"
          />
          <SelectField
            placeholder="Select marital status"
            name="maritalStatus"
            defaultValue={data.maritalStatus || "Not married"}
            items={["Married", "Not married"]}
            label="Marital Status"
          />
          {data.isBaptized}
          <SelectField
            placeholder="Is member baptized?"
            name="isBaptized"
            defaultValue={data.isBaptized}
            values={[true, false]}
            items={["Yes", "No"]}
            label="Is Baptized?"
          />
          <SelectField
            placeholder="Is member a house owner?"
            name="isHouseOwner"
            defaultValue={data.isHouseOwner}
            values={[true, false]}
            items={["Yes", "No"]}
            label="Is House Owner?"
          />
          <SelectField
            placeholder="Select if member is active "
            name="isActive"
            defaultValue={data.isActive}
            values={[true, false]}
            items={["Yes", "No"]}
            label="Is Active Member"
          />
        </div>
        <Button loading={uploading} isFull={false} text="Save Changes" />
      </form>
    </div>
  );
};

export default Page;
