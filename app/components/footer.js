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
    <div>
      <div className="grid grid-cols-12 w-11/12 2xl:w-9/12 mx-auto py-24 text-dark">
        <div className=" col-span-3">
          <h1 className="text-2xl font-bold ">CMS</h1>
        </div>
        <div className=" col-span-2">
          <h1 className="text-lg font-bold">Company</h1>
          <div className="flex flex-col space-y-2 mt-4">
            {[
              { title: "About Us", path: "#aboutus" },
              { title: "Contact", path: "#aboutus" },
              { title: "Our Vision", path: "#aboutus" },
              { title: "Our Mission", path: "#aboutus" },
            ].map((item) => {
              return (
                <Link key={item.path} className="text-muted " href={item.path}>
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>

        <div className=" col-span-2">
          <h1 className="text-lg font-bold">Product</h1>
          <div className="flex flex-col space-y-2 mt-4">
            {[
              { title: "Pricing", path: "#aboutus" },
              { title: "How it work", path: "#aboutus" },
              { title: "FAQ", path: "#aboutus" },
              { title: "Help Center", path: "#aboutus" },
            ].map((item) => {
              return (
                <Link key={item.path} className="text-muted " href={item.path}>
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
        <div className=" col-span-2">
          <h1 className="text-lg font-bold">Legal</h1>
          <div className="flex flex-col space-y-2 mt-4">
            {[
              { title: "Terms of use", path: "#aboutus" },
              { title: "Privacy Policy", path: "#aboutus" },
              { title: "Cookie Policy", path: "#aboutus" },
              { title: "Sitemap", path: "#aboutus" },
            ].map((item) => {
              return (
                <Link key={item.path} className="text-muted " href={item.path}>
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
        <div className=" col-span-3 ">
          <h1 className="text-lg font-bold">Subscribe</h1>

          <div>
            <input
              className="input-style mt-4"
              placeholder="Enter your email"
            />
          </div>
          <div className="w-3/12 mt-3">
            <Button text={"Submit"} />
          </div>
        </div>
      </div>
      <div className="py-12 border-t-2  text-muted border-border text-opacity-70  flex justify-between w-11/12 2xl:w-9/12 mx-auto">
        <h1 className="">
          © {new Date().getFullYear()} CMS. All Rights Reserved
        </h1>
        <div className="flex items-center space-x-4 text-2xl text-muted text-opacity-70">
          {[
            { icon: <FaFacebook />, href: "" },
            { icon: <FaInstagramSquare />, href: "" },
            { icon: <FaWhatsappSquare />, href: "" },
            { icon: <FaLinkedin />, href: "" },
          ].map((item) => {
            return <Link href={item.href}>{item.icon}</Link>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;
