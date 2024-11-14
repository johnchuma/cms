import Link from "next/link";
import { BsCheck } from "react-icons/bs";

const AboutUs = () => {
  return (
    <section
      id="about"
      className="w-11/12 mx-auto 2xl:w-9/12 bg-primary text-white rounded-xl"
    >
      <div className="w-11/12 md:w-4/12 2xl:w-4/12 mx-auto flex flex-col items-center py-24 space-y-4 md:space-y-6">
        <h1 className="text-3xl md:text-4xl leading-[40px] md:leading-[60px] font-bold text-center">
          About Us
        </h1>
        <p className="text-base text-center">
          Hemani is owned by{" "}
          <span className="font-bold hover:underline cursor-pointer transition-all duration-200">
            Business with Technology Investment Company Limited
          </span>
          , a tech company committed to revolutionizing Tech industries in
          Tanzania.
        </p>
        <a
          href="tel:+255627707434"
          aria-label="Contact us"
          className="bg-dark border-2 border-transparent transition-all duration-200 hover:border-white hover:bg-opacity-0 rounded-lg py-3 px-6"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
};

export default AboutUs;
