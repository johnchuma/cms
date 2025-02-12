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
      query = `${selectedChurch.uuid}/?group=${group}&page=1&limit=2000`;
      getData(query);
    } else if (keyword.length > 2) {
      query = `${selectedChurch.uuid}/?keyword=${keyword}&page=1&limit=2000`;
      getData(query);
    } else {
      //   setData([]);
    }
  }, [group, keyword]);

  //Get members
  const getData = (query) => {
    getChurchMembers(query).then((response) => {
      console.log(response);
      if (byGroup == "true") {
        console.log(response.data.body.data);
        setData(response.data.body.data);
      } else {
        console.log(response.data.body.data);
        setSuggestions(response.data.body.data);
      }
    });
  };

  const router = useRouter();
  useEffect(() => {
    setPageTitle("Add group members");
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
              };
              setData([...data.filter((e) => e.name != item.name)]);
              return await addGroupMember(payload);
            });
            Promise.all(promises)
              .then((response) => {
                toast.success("Added successfully");
                router.push(`/dashboard/groups/members/?uuid=${uuid}`);
              })
              .catch((e) => {
                console.log(e);
              });
          } else {
            toast.error("No member selected");
          }
        }}
        className=" rounded-lg pb-12 md:p-8"
      >
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* {byGroup} */}
          <SelectField
            placeholder={"Select selection type"}
            name={"type"}
            required={false}
            values={[false, true]}
            showNullOption={false}
            setValue={setByGroup}
            defaultValue={true}
            items={["Select Manually", "Choose Group"]}
            label={"Selection type"}
          />

          {byGroup == "true" ? (
            <SelectField
              placeholder={"Select marital status"}
              name={"maritalStatus"}
              required={false}
              setValue={setGroup}
              items={[
                "All",
                "Men",
                "Women",
                "Children",
                "Married",
                "Not Married",
              ]}
              label={"Select group"}
            />
          ) : (
            <div className="relative">
              <FormField
                placeholder={"Enter name here"}
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
                                ...suggestions.filter(
                                  (e) => e.name != item.name
                                ),
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
          )}
        </div>

        {data.length > 0 && (
          <div>
            <h1 className="mb-2 text-muted ">
              Selected group members ({data.length})
            </h1>
            <div className=" py-2 px-10 rounded-lg mb-5">
              <div className="relative overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
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
          </div>
        )}

        <Button loading={uploading} isFull={false} text={"Add Group Members"} />
      </form>
    </div>
  );
};

export default Page;
