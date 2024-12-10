import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SideBarItem = ({ item, onClick }) => {
  const pathname = usePathname();
  const [paths, setPaths] = useState([]);
  useEffect(() => {
    setPaths(pathname.split("/").filter((e) => e != "" && e != "dashboard"));
  }, [pathname]);

  return (
    <Link
      onClick={() => {
        onClick();
      }}
      className={`flex items-center space-x-2 py-3 px-3 font-medium rounded-lg ${
        item.activeOn.includes(pathname)
          ? "bg-primary text-white"
          : "bg-transparent hover:bg-black hover:bg-opacity-10 "
      }`}
      href={item.path}
      key={item.title}
    >
      <div className="text-lg">{item.icon}</div>
      <div>{item.title}</div>
    </Link>
  );
};

export default SideBarItem;
