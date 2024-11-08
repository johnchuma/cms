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
import TextareaField from "@/app/components/textareaForm";
import { addGroupExpense } from "@/app/services/groupExpenses.services";
import { addGroupCalender } from "@/app/services/groupCalenderServices";

const Page = () => {
  const [uploading, setUploading] = useState(false);
  const { selectedChurch, setPageTitle } = useContext(ChurchContext);
  const searchParams = useSearchParams();
  const uuid = searchParams.get("uuid");
  const [byGroup, setByGroup] = useState("true");
  const [group, setGroup] = useState(null);
  const [repetition, setRepetition] = useState("Once");
  const [data, setData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    let query;
    setGroup(null);
    setSuggestions([]);
    if (keyword.length > 2) {
      query = `${selectedChurch.uuid}/?keyword=${keyword}`;
      getData(query);
    }
  }, [group, keyword]);

  //Get members

  const router = useRouter();
  useEffect(() => {
    setPageTitle("Add Calender");
  }, []);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUploading(true);
          const payload = {
            group_uuid: uuid,
            title: e.target.title.value,
            from: e.target.from.value,
            to: e.target.to.value || e.target.from.value,
            description: e.target.description.value,
            repetition: e.target.repetition.value,
          };
          console.log(payload);
          addGroupCalender(payload)
            .then((response) => {
              toast.success("Added successfully");
              router.back();
            })
            .catch((e) => {
              console.log(e);
            });
        }}
        className=" rounded-lg mt-4 p-8"
      >
        <div className="grid grid-cols-3 gap-6 mb-8">
          <FormField
            placeholder={"Enter event title"}
            name={"title"}
            label={"Title"}
          />
          <SelectField
            items={["Once", "Daily", "Weekly", "Monthly", "Yearly"]}
            placeholder={"From"}
            name={"repetition"}
            setValue={setRepetition}
            inputType={"date"}
            label={"Repetition"}
          />

          <FormField name={"from"} inputType={"date"} label={"Start Date"} />

          <FormField
            placeholder={"To"}
            name={"to"}
            required={false}
            inputType={"date"}
            label={"To (optional)"}
          />

          <TextareaField
            placeholder={"Write event description"}
            name={"description"}
            label={"Description"}
          />
        </div>

        <Button loading={uploading} isFull={false} text={"Add Calender"} />
      </form>
    </div>
  );
};

export default Page;
