import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AiOutlineCustomerService, AiOutlineMenu } from "react-icons/ai";
import {
  BsChevronRight,
  BsLightbulb,
  BsLightbulbOff,
  BsPlus,
} from "react-icons/bs";
import { FaLightbulb, FaWhatsapp } from "react-icons/fa";
import { SlUser } from "react-icons/sl";
import { useEffect, useState } from "react";
import { CgMenuLeft } from "react-icons/cg";

const DashboardNavbar = ({
  title,
  pathname,
  showMenu,
  setShowMenu,
  setIsDark,
  isDark,
}) => {
  const currentPathname = usePathname();
  const queryParams = useSearchParams();
  const uuid = queryParams.get("uuid");
  const router = useRouter();
  const [paths, setPaths] = useState([]);
  useEffect(() => {
    setPaths(
      currentPathname
        .split("/")
        .filter((e) => e != "" && e != "dashboard" && e.length < 30)
    );
  }, [currentPathname]);
  return (
    <div>
      <div className="  w-full fixed bg-white z-40 border-b-2 border-slate-50 md:border-transparent py-3">
        <div className="flex py-2 w-full md:w-[82%] 2xl:w-[86%] px-4 md:px-12 justify-between items-center  ">
          <div className="flex space-x-2 items-center">
            <CgMenuLeft
              className="text-2xl block md:hidden"
              onClick={() => {
                setShowMenu(true);
              }}
            />
            <div className="space-y-1">
              <h1 className=" text-xl  md:text-2xl font-bold">{title ?? ""}</h1>
              {paths.length > 1 && (
                <p className="flex items-center text-sm text-muted space-x-2">
                  {paths.map((item, index) => {
                    return (
                      <div
                        key={item}
                        className="flex space-x-2 items-center cursor-pointer "
                      >
                        <div
                          className="hover:text-primary hover:underline capitalize"
                          onClick={() => {
                            const newArray = [];
                            for (let i = 0; i < paths.length; i++) {
                              if (i <= index) {
                                newArray.push(paths[i]);
                              }
                            }
                            if (newArray.length > 1) {
                              router.back();
                            } else {
                              router.push(`/dashboard/${newArray.join("/")}`);
                            }
                          }}
                        >
                          {item}
                        </div>
                        {index != paths.length - 1 && (
                          <BsChevronRight className="text-sm" />
                        )}
                      </div>
                    );
                  })}
                </p>
              )}
            </div>
          </div>
          <div className="flex space-x-2 md:space-x-4 items-center">
            <div>
              <AiOutlineCustomerService className=" text-2xl md:text-lg" />
            </div>
            <div
              onClick={() => {
                setIsDark(!isDark);
              }}
              className="cursor-pointer hidden md:block"
            >
              {!isDark ? (
                <BsLightbulbOff />
              ) : (
                <BsLightbulb className="text-sm" />
              )}
            </div>
            <div
              onClick={() => {
                // setShowLogoutModal(true);
                router.push("/dashboard/myAccount");
              }}
              className={`${
                pathname ? "size-6 md:size-6" : "size-6 md:size-12"
              } flex cursor-pointer justify-center  items-center bg-muted  bg-opacity-10 rounded-full`}
            >
              <img src="/face.jpg" className="rounded-full " />
            </div>
            {pathname != null && (
              <Link
                href={pathname ?? ""}
                className="size-8 md:size-12 flex cursor-pointer justify-center text-xl md:text-2xl text-white items-center bg-primary  rounded-full"
              >
                <BsPlus />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
