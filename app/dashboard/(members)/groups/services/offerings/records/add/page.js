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
  addGroupMember,
  getGroupMembers,
} from "@/app/services/groupsServices";
import { getChurchMembers } from "@/app/services/memberServices";
import TextareaField from "@/app/components/textareaForm";
import { addGuest } from "@/app/services/guestsServices";
import { addOfferingRecords } from "@/app/services/offeringsRecordsServices copy";

const Page = () => {
  const [uploading, setUploading] = useState(false);
  const { selectedChurch, setPageTitle } = useContext(ChurchContext);
  const searchParams = useSearchParams();
  const uuid = searchParams.get("uuid");
  const [byGroup, setByGroup] = useState("true");
  const [group, setGroup] = useState(null);
  const [data, setData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    let query;
    setGroup(null);
    setSuggestions([]);
    if (group) {
      query = `${selectedChurch.uuid}/?group=${group}`;
      getData(query);
    } else if (keyword.length > 2) {
      query = `${selectedChurch.uuid}/?keyword=${keyword}`;
      getData(query);
    } else {
      //   setData([]);
    }
  }, [group, keyword]);

  //Get members
  const getData = (query) => {
    getChurchMembers(query).then((response) => {
      if (byGroup == "true") {
        setData(response.data.body);
      } else {
        setSuggestions(response.data.body);
      }
    });
  };

  const router = useRouter();
  useEffect(() => {
    setPageTitle("Add offering records");
  }, []);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUploading(true);
          const payload = {
            amount: e.target.amount.value,
            offering_uuid: uuid,
          };
          addOfferingRecords(payload)
            .then((response) => {
              console.log(response.data);
              setUploading(false);
              toast.success("Added successfully");
              router.back();
              //   e.clear();
            })
            .catch((e) => {
              console.log(e);
              toast.error("Failed to add record");
              setUploading(false);
            });
        }}
        className=" rounded-lg pb-12 md:p-8"
      >
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* {byGroup} */}
          <FormField
            placeholder={"Enter offering amount"}
            name={"amount"}
            inputType={"number"}
            label={"Amount collected"}
          />
        </div>

        <Button loading={uploading} isFull={false} text={"Add Record"} />
      </form>
    </div>
  );
};

export default Page;
