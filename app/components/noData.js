import { FaBoxOpen } from "react-icons/fa";

const NoData = ({ message }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center py-24">
      <FaBoxOpen className="size-24 text-gray-300" />
      <p className="text-muted text-sm">{message ?? ""}</p>
    </div>
  );
};

export default NoData;
