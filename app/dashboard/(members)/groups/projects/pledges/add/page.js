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
import { addGroup } from "@/app/services/groupsServices";
import TextareaField from "@/app/components/textareaForm";
import { addService } from "@/app/services/serviceServices";
import { addProject } from "@/app/services/projectServices";
import { addPledge } from "@/app/services/pledgeServices";
import { getChurchMembers } from "@/app/services/memberServices";

const Page = () => {
  const [uploading, setUploading] = useState(false);
  const { selectedChurch, setPageTitle } = useContext(ChurchContext);
  const router = useRouter();
  const searchparams = useSearchParams();
  const uuid = searchparams.get("uuid");
  const [data, setData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedMember, setSelectedMember] = useState({});

  useEffect(() => {
    let query;
    setSelectedMember({});
    setSuggestions([]);
    if (keyword.length > 2) {
      query = `${selectedChurch.uuid}/?keyword=${keyword}&limit=10&page=1`;
      getData(query);
    }
  }, [keyword]);

  const getData = (query) => {
    getChurchMembers(query).then((response) => {
      console.log(response.data);
      setSuggestions(response.data.body.data);
    });
  };

  useEffect(() => {
    setPageTitle("Record Pledge");
  }, []);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (selectedMember.name) {
            setUploading(true);
            const payload = {
              amount: e.target.amount.value,
              project_uuid: uuid,
              member_uuid: selectedMember.uuid,
            };
            addPledge(payload)
              .then((response) => {
                console.log(response.data);
                setUploading(false);
                toast.success("Added successfully");
                router.back();
                //   e.clear();
              })
              .catch((e) => {
                console.log(e);
                toast.error("Failed to add");
                setUploading(false);
              });
          } else {
            toast.error("Member is not selected");
          }
        }}
        className=" rounded-lg p-8"
      >
        <div className="grid grid-cols-3 gap-6 mb-8">
          <FormField
            placeholder={"Enter pledged amount"}
            name={"amount"}
            inputType={"number"}
            label={"Amount"}
          />
          <div className="relative">
            <FormField
              placeholder={"Find name here"}
              name={"name"}
              value={selectedMember.name}
              required={false}
              setValue={setKeyword}
              label={"Member Name"}
            />
            {suggestions.length > 0 && (
              <div className="shadow-lg p-5 absolute top-24 rounded-lg z-50 right-0 w-72 ">
                <h1 className="text-muted text-sm mb-2">Search results</h1>
                {suggestions.map((item, index) => {
                  return (
                    data.filter((e) => e.name == item.name).length < 1 && (
                      <div
                        key={item.uuid}
                        className="flex space-x-2 justify-between pt-1 "
                      >
                        <h1>{item.name}</h1>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedMember(item);
                            setSuggestions([]);
                          }}
                          className="py-1 px-2 cursor-pointer text-sm rounded-md bg-green-200"
                        >
                          Select
                        </button>
                      </div>
                    )
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <Button loading={uploading} isFull={false} text={"Add Pledge"} />
      </form>
    </div>
  );
};

export default Page;
