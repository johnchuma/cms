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
import { addAttendance } from "@/app/services/attendancesServices";

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
    setPageTitle("Record attendance");
  }, []);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUploading(true);
          const payload = {
            count: parseInt(e.target.count.value),
            service_uuid: uuid,
          };
          addAttendance(payload)
            .then((response) => {
              console.log(response.data);
              setUploading(false);
              toast.success("Added successfully");
              router.push(
                `/dashboard/groups/services/attendances/?uuid=${uuid}`
              );
              //   e.clear();
            })
            .catch((e) => {
              console.log(e);
              toast.error("Failed to record attendance");
              setUploading(false);
            });
        }}
        className=" rounded-lg mt-4 p-8"
      >
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* {byGroup} */}
          <FormField
            placeholder={"Enter member count "}
            inputType={"number"}
            name={"count"}
            label={"Members count"}
          />
        </div>

        <Button loading={uploading} isFull={false} text={"Record Attendance"} />
      </form>
    </div>
  );
};

export default Page;
