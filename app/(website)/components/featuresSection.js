import { BiMessageRounded } from "react-icons/bi";
import { FaRegUser, FaUser } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";

const FeatureSection = () => {
  return (
    <div
      id="features"
      className="text-dark w-11/12 2xl:w-9/12 mx-auto py-12 md:py-24 border-b-2 border-border"
    >
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">Software Features</h1>
        <p className="text-muted text-base md:text-lg">
          Explore the key features of our church management system
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
        {[
          {
            icon: <FaRegUser />,
            title: "Member Management",
            description: `Manage members, track attendance, and group activities.`,
          },
          {
            icon: <GiMoneyStack />,
            title: "Finance Management",
            description: `Track donations, tithes, and other financial contributions.`,
          },
          {
            icon: <SlCalender />,
            title: "Event Management",
            description: `Organize church events, manage registrations and reminders.`,
          },
          {
            icon: <BiMessageRounded />,
            title: "Communication Tools",
            description: `Send bulk SMS, email newsletters, and announcements easily.`,
          },
        ].map((item, index) => {
          return (
            <div
              key={index}
              className="space-y-3 flex flex-col items-center text-center"
            >
              <div className="bg-primary bg-opacity-5 text-primary text-xl md:text-3xl p-8 rounded-full">
                {item.icon}
              </div>
              <h1 className="text-xl font-bold">{item.title}</h1>
              <p className="text-base text-muted">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureSection;
