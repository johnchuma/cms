import Link from "next/link";
import { AiOutlineAccountBook } from "react-icons/ai";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiSolidEdit } from "react-icons/bi";

const OfferingActions = ({ uuid }) => {
  const [show, setShow] = useState(false);
  const staggerVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const variants = {
    hidden: {
      opacity: 0,
      x: 40,
    },
    show: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          setShow(!show);
        }}
        className=" py-2 px-3 items-center  bg-dark text-white rounded-lg flex space-x-2"
      >
        <h1>Action</h1>
        {/* */}
        <div>{show ? <BsChevronUp /> : <BsChevronDown />}</div>
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            animate="show"
            initial="hidden"
            exit="hidden"
            variants={staggerVariants}
            className="absolute right-0 z-50 font-semibold top-14 w-64 rounded-lg space-y-2  bg-white py-6 px-12 shadow-lg"
          >
            {[
              {
                title: "Records",
                path: `/dashboard/groups/services/offerings/records/?uuid=${uuid}`,
                icon: <AiOutlineAccountBook />,
              },
              {
                title: "Edit Service",
                path: `/dashboard/groups/services/offerings/edit/${uuid}`,
                icon: <BiSolidEdit />,
              },
            ].map((item) => {
              return (
                <motion.div
                  className=" cursor-pointer"
                  variants={variants}
                  onClick={() => {
                    setShow(false);
                  }}
                  key={item.title}
                >
                  <Link
                    className={`flex space-x-2 items-center text-muted ${
                      item.color ?? "hover:text-primary"
                    }`}
                    href={item.path}
                  >
                    <div className="text-lg "> {item.icon}</div>
                    <div className="">{item.title}</div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OfferingActions;
