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
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { addPledge } from "@/app/services/pledgeServices";
import { getChurchMembers } from "@/app/services/memberServices";
import { addTithing } from "@/app/services/tithingsServices";

const Page = () => {
  const [uploading, setUploading] = useState(false);
  const { selectedChurch, setPageTitle } = useContext(ChurchContext);
  const router = useRouter();
  const [data, setData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedMember, setSelectedMember] = useState({});

  useEffect(() => {
    let query;
    setSelectedMember({});
    setSuggestions([]);
    if (keyword.length > 2) {
      query = `${selectedChurch.uuid}/?keyword=${keyword}&page=1&limit=1000`;
      getData(query);
    }
  }, [keyword]);

  const getData = (query) => {
    getChurchMembers(query).then((response) => {
      setSuggestions(response.data.body.data);
    });
  };

  useEffect(() => {
    setPageTitle("Record Tithings");
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
              member_uuid: selectedMember.uuid,
            };
            addTithing(payload)
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
        className=" rounded-lg pb-12 md:p-8"
      >
        <div className="grid md:grid-cols-3 gap-6 mb-8">
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
        <Button loading={uploading} isFull={false} text={"Add Tithing"} />
      </form>
    </div>
  );
};

export default Page;
