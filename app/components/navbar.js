"use client";
import { useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoIosMenu } from "react-icons/io";

const Navbar = () => {
  const [onScroll, setOnScroll] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (window.scrollY > 50) {
        setOnScroll(true);
      } else {
        setOnScroll(false);
      }
    });
  }, []);
  return (
    <div>
      {showMenu && (
        <div className="bg-black inset-0 fixed z-50 bg-opacity-10">
          <div className="w-8/12 h-screen bg-white p-5">
            <div className="flex  justify-between mt-4 items-center">
              <h1 className="text-2xl font-bold ">Menu</h1>
              <AiOutlineClose
                className="mt-2"
                onClick={() => {
                  setShowMenu(false);
                }}
              />
            </div>
            <div className="flex flex-col space-y-4 mt-8">
              {[
                { title: "Features", path: "#features" },
                { title: "Pricing", path: "#pricing" },
                { title: "FAQ", path: "#FAQ" },
                { title: "Contacts", path: "#contacts" },
                { title: "Sign In", path: "/signin" },
              ].map((item) => {
                return (
                  <Link
                    onClick={() => {
                      setShowMenu(false);
                    }}
                    href={item.path}
                    key={item.title}
                  >
                    {item.title}
                  </Link>
                );
              })}
              <Link
                href={"/signup"}
                className={`${
                  onScroll
                    ? "bg-primary hover:text-dark hover:bg-opacity-0 hover:border-dark"
                    : "bg-dark hover:bg-opacity-0 hover:border-white"
                } border-2 border-transparent text-white   transition-all duration-500   rounded-lg py-2 px-6`}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
      <div
        className={`  ${
          onScroll
            ? "bg-opacity-90 bg-white text-dark py-3 "
            : "bg-primary text-white py-8 "
        }   font-normal fixed w-full transition-all duration-500`}
      >
        <div className="flex justify-between items-center w-10/12 2xl:w-8/12 mx-auto ">
          <h1 className="text-2xl font-bold">Hemani</h1>
          <div
            onClick={() => {
              setShowMenu(true);
            }}
            className="block md:hidden"
          >
            <IoIosMenu className="text-3xl" />
          </div>
          <div className="hidden md:block">
            <div className="flex space-x-8 items-center font-medium">
              {[
                { title: "Features", path: "#features" },
                { title: "Pricing", path: "#pricing" },
                { title: "FAQ", path: "#FAQ" },
                { title: "Contacts", path: "#contacts" },
                { title: "Sign In", path: "/signin" },
              ].map((item) => {
                return (
                  <Link href={item.path} key={item.title}>
                    {item.title}
                  </Link>
                );
              })}
              <Link
                href={"/signup"}
                className={`${
                  onScroll
                    ? "bg-primary hover:text-dark hover:bg-opacity-0 hover:border-dark"
                    : "bg-dark hover:bg-opacity-0 hover:border-white"
                } border-2 border-transparent text-white   transition-all duration-500   rounded-lg py-2 px-6`}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
