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
import { addProject, getProject } from "@/app/services/projectServices";
import {
  addPledge,
  editPledge,
  getPledge,
} from "@/app/services/pledgeServices";
import { getChurchMembers } from "@/app/services/memberServices";
import Spinner from "@/app/components/spinner";
import { editTithing, getTithing } from "@/app/services/tithingsServices";

const Page = ({ params }) => {
  const [uploading, setUploading] = useState(false);
  const { selectedChurch, setPageTitle } = useContext(ChurchContext);
  const router = useRouter();
  const [data, setData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedMember, setSelectedMember] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const uuid = params.uuid;

  useEffect(() => {
    getTithing(uuid).then((response) => {
      setSelectedItem(response.data.body);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    let query;
    setSelectedMember({});
    setSuggestions([]);
    if (keyword.length > 2) {
      query = `${selectedChurch.uuid}/?keyword=${keyword}`;
      getData(query);
    }
  }, [keyword]);

  const getData = (query) => {
    getChurchMembers(query).then((response) => {
      setSuggestions(response.data.body);
    });
  };

  useEffect(() => {
    setPageTitle("Edit Pledge");
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
          };
          editTithing(uuid, payload)
            .then((response) => {
              console.log(response.data);
              setUploading(false);
              toast.success("Save Changes");
              router.back();
              //   e.clear();
            })
            .catch((e) => {
              console.log(e);
              toast.error("Failed to edit");
              setUploading(false);
            });
        }}
        className=" rounded-lg mt-4 p-8"
      >
        <div className="grid grid-cols-3 gap-6 mb-8">
          <FormField
            placeholder={"Enter amount"}
            name={"amount"}
            defaultValue={selectedItem.amount}
            inputType={"number"}
            label={"Amount"}
          />
          {/* <div className="relative">
            <FormField
              placeholder={"Find name here"}
              name={"name"}
              value={selectedMember.name}
              required={false}
              defaultValue={selectedItem.Member.name}
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
          </div> */}
        </div>
        <Button loading={uploading} isFull={false} text={"Save Changes"} />
      </form>
    </div>
  );
};

export default Page;
