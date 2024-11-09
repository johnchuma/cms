import Link from "next/link";
import { BsCheck } from "react-icons/bs";

const GetStartedSection = () => {
  return (
    <div className="w-11/12 mx-auto 2xl:w-9/12 bg-primary text-white rounded-xl">
      <div className=" w-11/12 md:w-4/12 2xl:w-4/12 mx-auto flex flex-col items-center py-24 space-y-4 md:space-y-6">
        <h1 className=" text-3xl md:text-4xl leading-[40px] md:leading-[60px] font-bold text-center">
          Starting with Hemani is easy, fast and free
        </h1>
        <p className="text-base">It only takes a few clicks to get started</p>
        <Link
          href="/signup"
          className="bg-dark border-2 border-transparent   transition-all duration-200 hover:border-white hover:bg-opacity-0 rounded-lg py-3 px-6"
        >
          Get started for free
        </Link>
        <div className="flex space-x-2 items-center">
          <BsCheck className="text-xl" />
          <div>No credit card needed, start for free </div>
        </div>
      </div>
    </div>
  );
};

export default GetStartedSection;
