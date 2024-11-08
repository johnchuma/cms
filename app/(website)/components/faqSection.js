const FAQSection = () => {
  return (
    <div className="text-dark w-11/12 2xl:w-9/12 mx-auto py-24 ">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold ">Frequently Asked Questions</h1>
        <p className="text-muted text-lg">Check out the most asked questions</p>
      </div>

      <div className="grid grid-cols-2 gap-12 mt-16">
        {[
          {
            title: "What features are included?",
            description: `Our system provides features like event management, member tracking, financial reports, communication tools (SMS and email), and more.`,
          },
          {
            title: "How do I manage churches?",
            description: `You can manage multiple churches under a single account by creating separate profiles and customizing settings for each one.`,
          },
          {
            title: "Is it easy to use?",
            description: `Yes, the interface is user-friendly and designed for non-technical staff to easily navigate and operate.`,
          },
          {
            title: "Can I send bulk SMS?",
            description: `Yes, the platform allows you to send bulk SMS to your members for event reminders and announcements.`,
          },
          {
            title: "How secure is the system?",
            description: `We use data encryption, regular backups, and strict access controls to ensure the security of your information.`,
          },
          {
            title: "What is the pricing?",
            description: `Our pricing is based on church size and SMS usage, with flexible subscription options to meet various needs.`,
          },
        ].map((item, index) => {
          return (
            <div key={index} className="space-y-3">
              <h1 className="text-xl font-bold">
                {index + 1}. {item.title}
              </h1>
              <p className=" text-muted">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQSection;
