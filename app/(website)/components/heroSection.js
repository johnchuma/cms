import Image from "next/image";
import Link from "next/link";
import { BsCheck } from "react-icons/bs";
const HeroSection = () => {
  return (
    <div>
      <div className="flex flex-col items-center w-11/12 2xl:w-9/12 mx-auto ">
        <div className="grid grid-cols-12 md:gap-12  justify-between items-center">
          <div className=" col-span-12 md:col-span-6 space-y-8">
            <h1 className=" text-4xl md:text-6xl leading-[45px] md:leading-[80px] font-semibold">
              Simplify Church Operations with our Management Tool
            </h1>
            <p className="text-lg">
              Our tool streamlines member management, event planning, financial
              tracking, and communication.
            </p>
            <button>
              <Link
                href="/signup"
                className="bg-dark border-2 border-transparent   transition-all duration-200 hover:border-white hover:bg-opacity-0 rounded-lg py-3 px-6"
              >
                Get started for free
              </Link>
            </button>
            <div className="flex space-x-2 items-center texxt-base">
              <BsCheck className="text-2xl" />
              <div>No credit card needed, start for free</div>
            </div>
          </div>
          <div className="hidden md:block md:col-span-6">
            <Image height="60000" width="60000" src="/hero.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
