"use client";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { useEffect } from "react";
import { getMyChurches } from "../services/churchServices";
import { useState } from "react";
import Sidebar from "../components/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { AiFillCloseCircle, AiOutlinePlus } from "react-icons/ai";
import { SlUser } from "react-icons/sl";

import Link from "next/link";
import Image from "next/image";
import { createContext } from "react";
import DashboardNavbar from "../components/dashboardNavbar";
import {
  getSelectedChurch,
  storeSelectedChurch,
} from "../utils/localStorageData";
export const ChurchContext = createContext();
const Layout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedChurch, setSelectedChurch] = useState(null);
  const [addPath, setAddPath] = useState(null);
  const [pageTitle, setPageTitle] = useState("");
  const pathname = usePathname();
  const [churches, setChurches] = useState([]);
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    getMyChurches()
      .then((response) => {
        console.log(response.data.body);
        const churches = response.data.body;
        setChurches(churches);
        if (churches.length > 0) {
          const uuid = getSelectedChurch();
          console.log(uuid);
          if (uuid) {
            const church = churches.filter((e) => e.uuid == uuid)[0];
            console.log(church);
            setSelectedChurch(church);
          } else {
            setSelectedChurch(churches[0]);
            storeSelectedChurch(churches[0].uuid);
          }
        } else {
          router.push("/addChurch");
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return loading ? (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className=" size-24 border-4 rounded-full border-primary border-b-transparent animate-spin " />
    </div>
  ) : (
    churches.length > 0 && (
      <div className={`${isDark ? "dark" : "light"} text-dark `}>
        {showMenu && (
          <div
            onClick={() => setShowMenu(false)}
            className=" inset-0 bg-black bg-opacity-20  fixed z-50"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-8/12 bg-white pt-4 h-screen"
            >
              <Sidebar
                churches={churches}
                setShowMenu={setShowMenu}
                selectedChurch={selectedChurch}
                setSelectedChurch={setSelectedChurch}
              />
            </div>
          </div>
        )}
        <div className="flex">
          <div className="w-[18%] 2xl:w-[14%] hidden md:block border-r border-border h-screen  dark:bg-dark text-dark dark:text-white transition-all   fixed  pt-4 ">
            <Sidebar
              churches={churches}
              setShowMenu={setShowMenu}
              selectedChurch={selectedChurch}
              setSelectedChurch={setSelectedChurch}
            />
          </div>
          <div className=" w-full md:w-[82%]  2xl:w-[86%] ms-auto   min-h-screen bg-white">
            <DashboardNavbar
              showMenu={showMenu}
              setShowMenu={setShowMenu}
              isDark={isDark}
              setIsDark={setIsDark}
              pathname={addPath}
              title={pageTitle}
            />
            <div className={`px-6 ${pathname ? "pt-20" : "pt-16"}`}>
              <ChurchContext.Provider
                value={{ selectedChurch, setAddPath, setPageTitle }}
              >
                {children}
              </ChurchContext.Provider>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Layout;
