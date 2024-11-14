"use client"; // Enforce client-side rendering
import { useState, useEffect } from "react";
import Spinner from "@/app/components/spinner";
import { getProject } from "@/app/services/projectServices";
import draftToHtml from "draftjs-to-html"; // Ensure this is imported
import { convertFromRaw, Editor, EditorState } from "draft-js";
import DraftReader from "@/app/components/draftReader";
import moment from "moment";
import {
  AiFillClockCircle,
  AiFillHome,
  AiOutlineClockCircle,
  AiOutlineHome,
} from "react-icons/ai";
import { RiHome2Line } from "react-icons/ri";
import { FaCross } from "react-icons/fa";
import { LiaCrossSolid } from "react-icons/lia";
import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";

const Page = ({ params }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const uuid = params.uuid;

  useEffect(() => {
    getProject(uuid).then((response) => {
      const project = response.data.body;
      setData(project);
      setLoading(false);
    });
  }, [uuid]);

  return loading ? (
    <div className="mt-4">
      <Spinner />
    </div>
  ) : !data ? (
    <div className="flex justify-center items-center p-8 text-muted">
      No Project available
    </div>
  ) : (
    <div className=" ">
      <div
        className="w-screen h-36 bg-no-repeat"
        style={{
          backgroundImage: "url('https://i2.ppvise.site/gimg/bf01a63dd3.jpg')",
          backgroundSize: "cover",
        }}
      >
        <div className="bg-black h-36 bg-opacity-30 py-6 text-white">
          <div className="w-11/12 2xl:w-9/12 mx-auto  px-10 flex justify-between items-start ">
            <div>
              <h1 className="text-2xl font-bold mb-2">{data.name}</h1>
              <p className="text-opacity-70 text-white  text-sm"></p>
              <div className="flex space-x-4">
                <div className="text-opacity-80 text-white  cursor-pointer text-sm flex items-center space-x-1">
                  <p> Shared by {data.Group.Church.name}</p>
                </div>
                {/* <div className="text-opacity-70 text-white hover:text-primary cursor-pointer  text-sm flex items-center space-x-1">
                  <AiOutlineClockCircle className="text-lg" />
                  <p>{moment(data.createdAt).format("yyy, MMM DD")}</p>
                </div> */}
              </div>
            </div>
            <div className="space-x-3 ">
              <button className="bg-green-500 hover:bg-green-400 transition-all text-white  py-2 px-4 rounded-lg">
                Contribute
              </button>
              <button className="bg-primary hover:bg-opacity-80 transition-all text-white  py-2 px-4 rounded-lg">
                Pledge
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-11/12 mx-auto py-6 text-dark">
        <div className="w-8/12 2xl:w-6/12 mx-auto ">
          <DraftReader value={data.description} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
