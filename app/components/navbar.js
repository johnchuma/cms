"use client";
import { useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [onScroll, setOnScroll] = useState(false);
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
      <div
        className={`  ${
          onScroll
            ? "bg-opacity-90 bg-white text-dark py-3 "
            : "bg-primary text-white py-8 "
        }   font-normal fixed w-full transition-all duration-500`}
      >
        <div className="flex justify-between items-center w-10/12 2xl:w-8/12 mx-auto ">
          <h1 className="text-2xl font-bold">CMS</h1>
          <div className="flex space-x-8 items-center font-medium">
            {[
              { title: "Features", path: "/about" },
              { title: "Pricing", path: "/about" },
              { title: "FAQ", path: "/about" },
              { title: "Contacts", path: "/about" },
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
  );
};

export default Navbar;
