import Link from "next/link";
import Button from "./button";
import {
  FaFacebook,
  FaInstagram,
  FaInstagramSquare,
  FaLinkedin,
  FaWhatsapp,
  FaWhatsappSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div id="contacts">
      <div className="grid grid-cols-12   w-11/12 2xl:w-9/12 mx-auto py-12 md:py-24 text-dark">
        <div className="  col-span-12 md:col-span-3 pb-6 md:py-0">
          <h1 className="text-2xl font-bold ">Hemani</h1>
        </div>

        <div className=" col-span-4 md:col-span-2">
          <h1 className="text-lg font-bold">Product</h1>
          <div className="flex flex-col space-y-2 mt-4">
            {[
              { title: "Features", path: "#features" },
              { title: "Pricing", path: "#pricing" },
              { title: "FAQ", path: "#FAQ" },
            ].map((item) => {
              return (
                <Link
                  key={item.path}
                  className="text-muted hover:text-primary transition-all duration-200  "
                  href={item.path}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
        <div className=" col-span-4 md:col-span-2  ">
          <h1 className="text-lg font-bold">Legal</h1>
          <div className="flex flex-col space-y-2 mt-4">
            {[
              { title: "Terms of use", path: "#aboutus" },
              { title: "Privacy Policy", path: "#aboutus" },
              { title: "Cookie Policy", path: "#aboutus" },
              { title: "Sitemap", path: "#aboutus" },
            ].map((item) => {
              return (
                <Link
                  key={item.path}
                  className="text-muted hover:text-primary transition-all duration-200 "
                  href={item.path}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
        <div className=" col-span-4 md:col-span-2 ">
          <h1 className="text-lg font-bold">Contacts</h1>
          <div className="flex flex-col space-y-2 mt-4">
            {[
              { title: "info@hemani.io", path: "#aboutus" },
              { title: "+255627707434", path: "#aboutus" },
            ].map((item) => {
              return (
                <Link
                  key={item.path}
                  className="text-muted hover:text-primary transition-all duration-200  "
                  href={item.path}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>

        <div className=" col-span-12 md:col-span-3">
          <h1 className="text-lg font-bold  pt-6 md:pt-0">Subscribe</h1>

          <div className="flex items-center space-x-2 w-full">
            <div className="w-8/12">
              <input
                className="input-style mt-4"
                placeholder="Enter your email"
              />
            </div>
            <div className="w-4/12  mt-3">
              <button className="text-white w-full bg-primary font-bold text-sm py-4 rounded-lg px-4 ">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="py-12 border-t-2  text-muted border-border text-opacity-70 items-center space-y-2  flex md:flex-row flex-col justify-between w-11/12 2xl:w-9/12 mx-auto">
        <h1 className="">
          © {new Date().getFullYear()} Hemani. All Rights Reserved
        </h1>
        <div className="flex items-center justify-center md:justify-start space-x-4 text-2xl text-muted text-opacity-70">
          {[
            { icon: <FaFacebook />, href: "" },
            { icon: <FaInstagramSquare />, href: "" },
            { icon: <FaWhatsappSquare />, href: "" },
            { icon: <FaLinkedin />, href: "" },
          ].map((item) => {
            return (
              <Link key={item.icon} href={item.href}>
                {item.icon}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;
