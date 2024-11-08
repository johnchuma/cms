"use client";
import Button from "@/app/components/button";
import FormField from "@/app/components/formForm";
import SelectField from "@/app/components/selectForm";
import { ChurchContext } from "@/app/dashboard/layout";
import { addMember } from "@/app/services/memberServices";
import Link from "next/link";
import toast from "react-hot-toast";
import { BsChevronRight } from "react-icons/bs";
import { useState } from "react/";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const [uploading, setUploading] = useState(false);
  const { selectedChurch, setPageTitle } = useContext(ChurchContext);
  const router = useRouter();
  useEffect(() => {
    setPageTitle("Add New Member");
  }, []);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUploading(true);
          const payload = {
            name: e.target.name.value,
            gender: e.target.gender.value,
            birthDate: e.target.birthDate.value,
            address: e.target.address.value,
            church_uuid: selectedChurch.uuid,
            disability: e.target.disability.value,
            email: e.target.email.value,
            isBaptized: e.target.isBaptized.value,
            phone: e.target.phone.value,
            isHouseOwner: e.target.isHouseOwner.value,
            maritalStatus: e.target.maritalStatus.value,
            work: e.target.work.value,
          };
          addMember(payload)
            .then((response) => {
              console.log(response.data);
              setUploading(false);
              toast.success("Added successfully");
              router.push("/dashboard/members");
              //   e.clear();
            })
            .catch((e) => {
              console.log(e);
              toast.error("Failed to add member");
              setUploading(false);
            });
        }}
        className=" rounded-lg mt-4 p-8"
      >
        <div className="grid grid-cols-3 gap-6 mb-8">
          <FormField
            placeholder={"Enter member's name"}
            name={"name"}
            label={"Full Name"}
          />
          <SelectField
            placeholder={"Select gender"}
            name={"gender"}
            items={["Male", "Female"]}
            label={"Gender"}
          />
          <FormField
            placeholder={"Enter member's birth date"}
            name={"birthDate"}
            defaultValue={"2000-01-01"}
            inputType={"date"}
            label={"Birth Date"}
          />
          <FormField
            placeholder={"Enter member's address"}
            name={"address"}
            label={"Address"}
          />
          <FormField
            placeholder={"Enter disability (if any)"}
            name={"disability"}
            required={false}
            label={"Disability (optional)"}
          />
          <FormField
            placeholder={"Enter member's email"}
            name={"email"}
            required={false}
            inputType={"email"}
            label={"Email"}
          />
          <FormField
            placeholder={"Enter phone number"}
            name={"phone"}
            required={false}
            label={"Phone Number"}
          />
          <FormField
            placeholder={"Enter member's occupation"}
            name={"work"}
            required={false}
            label={"Occupation/Work"}
          />
          <SelectField
            placeholder={"Select marital status"}
            name={"maritalStatus"}
            defaultValue={"Not married"}
            items={["Married", "Not married"]}
            label={"Marital Status"}
          />
          <SelectField
            placeholder={"Is member baptized?"}
            name={"isBaptized"}
            values={[true, false]}
            defaultValue={true}
            items={["Yes", "No"]}
            label={"Is Baptized?"}
          />
          <SelectField
            placeholder={"Is member a house owner?"}
            name={"isHouseOwner"}
            values={[true, false]}
            defaultValue={false}
            items={["Yes", "No"]}
            label={"Is House Owner?"}
          />
        </div>
        <Button loading={uploading} isFull={false} text={"Add member"} />
      </form>
    </div>
  );
};

export default Page;
