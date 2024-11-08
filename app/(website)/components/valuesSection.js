import Image from "next/image";

const ValuesSection = () => {
  return (
    <div className="w-11/12 2xl:w-9/12 mx-auto py-24 text-dark ">
      {/* First Section */}
      <div className="flex space-x-32 items-center">
        <div className="w-6/12">
          <Image height="60000" width="60000" src="/engagement.png" />
        </div>
        <div className="w-6/12 space-y-4">
          <h1 className=" font-medium text-muted ">Enhance Engagement</h1>
          <h1 className="text-4xl leading-[60px] font-bold ">
            Improve Church Member Engagement
          </h1>
          <p className="text-muted ">
            Encourage deeper connections with your congregation. Manage member
            activities, communications, and attendance, ensuring everyone stays
            engaged and involved in church life.
          </p>
          <h1 className="text-xl mt-8 font-bold ">Track Growth Metrics</h1>
          <p className="text-muted">
            Monitor attendance, donations, and event participation. Gain
            insights into your church's growth and overall impact through
            detailed analytics and reports.
          </p>
          <h1 className="text-xl mt-8 font-bold ">
            Simplify Church Operations
          </h1>
          <p className="text-muted">
            Easily manage church events, communications, and finances. Ensure
            smooth operations with tools that streamline the daily management of
            church activities and resources.
          </p>
        </div>
      </div>

      {/* Second Section (Finance and WhatsApp Integration) */}
      <div className="flex space-x-32 items-center mt-16">
        <div className="w-6/12 space-y-4">
          <h1 className=" font-medium text-muted ">
            Financial Management & Communication
          </h1>
          <h1 className="text-4xl leading-[60px] font-bold ">
            Manage Church Finances Effortlessly
          </h1>
          <p className="text-muted ">
            Track donations, tithes, and expenses with ease. Stay informed with
            real-time financial reports and insights for better financial
            planning.
          </p>
          <h1 className="text-xl mt-8 font-bold ">WhatsApp Integration</h1>
          <p className="text-muted ">
            Communicate seamlessly through WhatsApp. Send event reminders,
            updates, and bulk messages directly to members, ensuring that
            everyone stays informed and engaged.
          </p>
          <p className="text-muted ">
            Leverage WhatsApp for faster, more personal communication with your
            congregation, making sure important updates reach everyone in real
            time.
          </p>
        </div>
        <div className="w-6/12">
          <Image height="60000" width="60000" src="/finance.png" />
        </div>
      </div>
    </div>
  );
};

export default ValuesSection;
