import Button from "@/app/components/button";
import { BsCheck } from "react-icons/bs";

const PricingSection = () => {
  return (
    <div className="w-11/12 2xl:w-9/12 mx-auto text-dark">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Simple, Flexible Pricing</h1>
        <p className="text-muted text-lg">Pricing based on church size</p>
      </div>
      <div className="grid grid-cols-3 gap-12 mt-12">
        {/* Pricing Option 1 */}
        {[
          { price: "50,000", members: "1-200" },
          { price: "100,000", members: "201-500" },
          { price: "150,000", members: "+501" },
        ].map((item) => {
          return (
            <div className="shadow-lg p-12 space-y-4 rounded-lg">
              <h1 className="text-xl">{item.members} Members</h1>
              <h1 className="text-2xl font-bold">
                {item.price} TSH
                <span className="text-lg font-medium text-muted"> /Month</span>
              </h1>
              <p className="text-muted">
                Ideal for small churches starting out.
              </p>
              <Button text={"Get Started"} />

              <div className="space-y-3 ">
                {[
                  "Member Management",
                  "Finance Management",
                  "Project Management",
                  "Expenses Management",
                  "Services Management",
                  "Events Management",
                  "Calendar Management",
                  "Reports & Analysis",
                  "WhatsApp Integration",
                  "Bulk SMS Integration",
                ].map((item, index) => (
                  <div key={index} className="flex space-x-2 items-center">
                    <BsCheck />
                    <div>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PricingSection;
