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
  addGroupLeader,
  addGroupMember,
  getGroupMembers,
} from "@/app/services/groupsServices";
import { getChurchMembers } from "@/app/services/memberServices";

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
    if (keyword.length > 2) {
      query = `${selectedChurch.uuid}/?keyword=${keyword}`;
      getData(query);
    }
  }, [group, keyword]);

  //Get members
  const getData = (query) => {
    getChurchMembers(query).then((response) => {
      setSuggestions(response.data.body);
    });
  };

  const router = useRouter();
  useEffect(() => {
    setPageTitle("Add group leaders");
  }, []);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (data.length > 0) {
            setUploading(true);
            const promises = data.map(async (item) => {
              const payload = {
                group_uuid: uuid,
                member_uuid: item.uuid,
                position: e.target.position.value,
                from: e.target.from.value,
                to: e.target.to.value,
              };
              setData([...data.filter((e) => e.name != item.name)]);
              return await addGroupLeader(payload);
            });
            Promise.all(promises)
              .then((response) => {
                toast.success("Added successfully");
                router.push(`/dashboard/groups/leaders/?uuid=${uuid}`);
              })
              .catch((e) => {
                console.log(e);
              });
          } else {
            toast.error("No member selected");
          }
        }}
        className=" rounded-lg p-8"
      >
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* {byGroup} */}
          <FormField
            placeholder={"Write leadership position"}
            name={"position"}
            required={false}
            setValue={setKeyword}
            label={"Leadership position"}
          />
          <FormField
            name={"from"}
            required={false}
            inputType="date"
            setValue={setKeyword}
            label={"From"}
          />
          <FormField
            name={"to"}
            inputType="date"
            required={false}
            setValue={setKeyword}
            label={"To"}
          />
          <div className="relative">
            <FormField
              placeholder={"Find name here"}
              name={"name"}
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
                            setData([...data, item]);
                            setSuggestions([
                              ...suggestions.filter((e) => e.name != item.name),
                            ]);
                          }}
                          className="py-1 px-2 text-sm rounded-md bg-green-200"
                        >
                          Add
                        </button>
                      </div>
                    )
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {data.length > 0 && (
          <div>
            <h1 className="mb-2 text-muted ">
              Selected group members ({data.length})
            </h1>
            <div className=" py-2 px-10 rounded-lg mb-5">
              <table className="w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th className="text-start py-2 px-4">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => {
                    return (
                      <tr key={item.uuid} className=" even:bg-background ">
                        <td className="px-4 py-4">
                          <input
                            onClick={() => {
                              setData([...data.filter((e) => e != item)]);
                            }}
                            checked={true}
                            className="checkbox-style"
                            type="checkbox"
                          />
                        </td>

                        <td className="py-1 px-4">{item.name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <Button
          loading={uploading}
          isFull={false}
          text={"Add Leader/Leaders"}
        />
      </form>
    </div>
  );
};

export default Page;
