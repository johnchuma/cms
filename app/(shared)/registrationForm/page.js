"use client";
import Button from "@/app/components/button";
import FormField from "@/app/components/formForm";
import SelectField from "@/app/components/selectForm";
import { ChurchContext } from "@/app/dashboard/layout";
import { addMember } from "@/app/services/memberServices";
import Link from "next/link";
import toast from "react-hot-toast";
import { BsCheckCircle, BsChevronRight } from "react-icons/bs";
import { useState } from "react/";
import { useContext } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getChurch } from "@/app/services/churchServices";
import Spinner from "@/app/components/spinner";

const Page = () => {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  const queryParams = useSearchParams();
  const uuid = queryParams.get("uuid");
  const router = useRouter();
  const [church, setChurch] = useState({});
  useEffect(() => {
    getChurch(uuid).then((res) => {
      setChurch(res.data.body);
      setLoading(false);
    });
  }, []);
  return loading ? (
    <Spinner />
  ) : registered ? (
    <div className=" min-h-[80vh] flex flex-col justify-center items-center text-center p-6">
      <BsCheckCircle className="size-24 text-green-500" />
      <h1 className="font-semibold text-2xl mt-3">Umejisajili Kikamilifu</h1>
      <p className=" text-muted">
        Karibu kwenye familia ya {church.name}, utatumia namba yako ya simu na
        tarehe ya kuzaliwa kuingia kwenye mfumo, ili kuona taarifa zako
      </p>
    </div>
  ) : (
    <div className="border-t-4 md:border-t-0 w-full md:w-8/12 mx-auto  border-primary">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUploading(true);
          const payload = {
            name: e.target.name.value,
            gender: e.target.gender.value,
            birthDate: e.target.birthDate.value,
            address: e.target.address.value,
            church_uuid: uuid,
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
              toast.success("Imeongezwa kwa mafanikio");
              setRegistered(true);
              //   e.clear();
            })
            .catch((e) => {
              console.log(e);
              toast.error("Tumeshindwa kukusajili");
              setUploading(false);
            });
        }}
        className="rounded-lg mt-4 pb-12 p-8 md:p-8"
      >
        <h1 className="text-2xl font-semibold">Jisajili {church.name}</h1>
        <p className="text-muted">
          Jaza taarifa zako, kujisajili kwenye kanisa letu
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8 mt-5">
          <FormField
            placeholder={"Andika jina lako"}
            name={"name"}
            label={"Jina Kamili"}
          />
          <SelectField
            placeholder={"Chagua jinsia"}
            name={"gender"}
            values={["Male", "Female"]}
            items={["Mwanaume", "Mwanamke"]}
            label={"Jinsia"}
          />
          <FormField
            placeholder={"Andika tarehe ya kuzaliwa"}
            name={"birthDate"}
            defaultValue={"2000-01-01"}
            inputType={"date"}
            label={"Tarehe ya Kuzaliwa"}
          />
          <FormField
            placeholder={"Andika Mahali/Mtaa unapoishi"}
            name={"address"}
            label={"Mahali/Mtaa unapoishi"}
          />
          <FormField
            placeholder={"Andika ulemavu (kama upo)"}
            name={"disability"}
            required={false}
            label={"Ulemavu (hiari)"}
          />
          <FormField
            placeholder={"Andika barua pepe yako"}
            name={"email"}
            required={false}
            inputType={"email"}
            label={"Barua Pepe"}
          />
          <FormField
            placeholder={"Andika namba ya simu"}
            name={"phone"}
            required={false}
            label={"Namba ya Simu"}
          />
          <FormField
            placeholder={"Andika kazi unayoifanya (kama ipo)"}
            name={"work"}
            required={false}
            label={"Kazi (kama ipo)"}
          />
          <SelectField
            placeholder={"Chagua hali ya ndoa"}
            name={"maritalStatus"}
            defaultValue={"Not married"}
            values={["Married", "Not Married"]}
            items={["Nimeoa/Nimeolewa", "Sijaolewa/Sijaoa"]}
            label={"Hali ya Ndoa"}
          />
          <SelectField
            placeholder={"Je, umebatizwa?"}
            name={"isBaptized"}
            values={[true, false]}
            defaultValue={true}
            items={["Ndio", "Hapana"]}
            label={"Umebatizwa?"}
          />
          <SelectField
            placeholder={"Je, wewe ni mmiliki wa nyumba?"}
            name={"isHouseOwner"}
            values={[true, false]}
            defaultValue={false}
            items={["Ndio", "Hapana"]}
            label={"Je unamiliki Nyumba?"}
          />
        </div>
        <Button loading={uploading} isFull={false} text={"Jisajili"} />
      </form>
    </div>
  );
};

export default Page;
