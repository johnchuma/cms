import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import {
  AiOutlineCalendar,
  AiOutlineContacts,
  AiOutlineDashboard,
  AiOutlineFolder,
  AiOutlineLogout,
  AiOutlineNotification,
  AiOutlinePlus,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FiMessageCircle } from "react-icons/fi";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SideBarItem from "./sideBarItem";
import { storeSelectedChurch } from "../utils/localStorageData";
import Link from "next/link";
import { IoMdImages } from "react-icons/io";

const Sidebar = ({
  churches,
  selectedChurch,
  setSelectedChurch,
  setShowMenu,
}) => {
  const [showMemberItems, setShowMemberItems] = useState(false);
  const [showFinanceItems, setShowFinanceItems] = useState(false);
  const [showEventsItems, setShowEventsItems] = useState(false);
  const [showSettingsItems, setShowSettingsItems] = useState(false);
  const pathname = usePathname();

  const membersItems = [
    {
      title: "Overview",
      path: "/dashboard",
      activeOn: ["/dashboard"],
      icon: <AiOutlineDashboard />,
    },
    {
      title: "Members",
      path: "/dashboard/members",
      activeOn: [
        "/dashboard/members",
        "/dashboard/members/details",
        "/dashboard/members/details/contributions",
      ],
      icon: <AiOutlineUser />,
    },
    {
      title: "Member Reports",
      path: "/dashboard/member-reports",
      activeOn: ["/dashboard/member-reports"],
      icon: <AiOutlineNotification />,
    },
    {
      title: "Groups",
      path: "/dashboard/groups",
      activeOn: [
        "/dashboard/groups",
        "/dashboard/groups/members",
        "/dashboard/groups/projects",
        "/dashboard/groups/projects/pledges",
        "/dashboard/groups/projects/pledges/contributions",
        "/dashboard/groups/projects/expenses",
        "/dashboard/groups/services",
        "/dashboard/groups/expenses",
        "/dashboard/groups/calender",
      ],
      icon: <AiOutlineFolder />,
    },
  ];

  const financeItems = [
    {
      title: "Overview",
      path: "/dashboard/finances/overview",
      activeOn: ["/dashboard/finances/overview"],
      icon: <AiOutlineDashboard />,
    },
    {
      title: "Tithings",
      path: "/dashboard/tithings",
      activeOn: ["/dashboard/tithings"],
      icon: <AiOutlineContacts />,
    },
  ];

  const eventsItems = [
    {
      title: "Calender",
      path: "/dashboard/calender",
      activeOn: ["/dashboard/calender"],
      icon: <AiOutlineCalendar />,
    },
    {
      title: "Posters Requests",
      path: "/dashboard/posterRequests",
      activeOn: ["/dashboard/posters", "/dashboard/posters/add"],
      icon: <IoMdImages />,
    },
  ];
  const settingsItems = [
    {
      title: "My Account",
      path: "/dashboard/myAccount",
      activeOn: ["/dashboard/myAccount"],
      icon: <AiOutlineUser />,
    },
    {
      title: "Subscription",
      path: "/dashboard/subscription",
      activeOn: ["/dashboard/subscription"],
      icon: <RiSecurePaymentLine />,
    },
    {
      title: "SMS Inventory",
      path: "/dashboard/smsInventory",
      activeOn: ["/dashboard/smsInventory"],
      icon: <FiMessageCircle />,
    },
  ];
  useEffect(() => {
    if (membersItems.some((item) => item.activeOn.includes(pathname))) {
      setShowMemberItems(true);
      setShowFinanceItems(false);
      setShowEventsItems(false);
      setShowSettingsItems(false);
    } else if (financeItems.some((item) => item.activeOn.includes(pathname))) {
      setShowFinanceItems(true);
      setShowMemberItems(false);
      setShowEventsItems(false);
      setShowSettingsItems(false);
    } else if (eventsItems.some((item) => item.activeOn.includes(pathname))) {
      setShowEventsItems(true);
      setShowMemberItems(false);
      setShowFinanceItems(false);
      setShowSettingsItems(false);
    } else if (settingsItems.some((item) => item.activeOn.includes(pathname))) {
      setShowEventsItems(false);
      setShowMemberItems(false);
      setShowFinanceItems(false);
      setShowSettingsItems(true);
    }
  }, [pathname]);

  return (
    <div>
      <div className="bg-black inset-0"></div>
      <div className="  pb-3 mb-2">
        <Link href="/" className="px-6 text-xl md:text-2xl font-bold">
          Hemani
        </Link>
        <div className="w-10/12 mx-auto flex items-center space-x-2 mt-6 md:mt-12">
          <select
            defaultValue={selectedChurch?.uuid}
            onChange={(e) => {
              const selectedChurchUuid = e.target.value;
              const selectedChurchObj = churches.find(
                (church) => church.uuid === selectedChurchUuid
              );
              console.log(selectedChurchObj);
              setSelectedChurch(selectedChurchObj);
              storeSelectedChurch(selectedChurchObj.uuid);
            }}
            className="py-3 rounded-lg border font-medium text-sm border-transparent w-full bg-black focus:bg-black focus:bg-opacity-5 bg-opacity-5 dark:bg-opacity-10 focus:border-primary focus:ring-primary"
          >
            <option>Select church</option>
            {churches.map((item) => (
              <option key={item.uuid} value={item.uuid}>
                {item.name}
              </option>
            ))}
          </select>

          <Link href="/addChurch" className="cursor-pointer">
            <AiOutlinePlus title="Add New Church" />
          </Link>
        </div>
      </div>
      <div className="px-6 pt-3">
        <div
          onClick={() => {
            setShowMemberItems(!showMemberItems);
            setShowFinanceItems(false);
            setShowEventsItems(false);
            setShowSettingsItems(false);
          }}
          className="flex justify-between cursor-pointer items-center"
        >
          <h1 className="text-xs">MEMBERS</h1>
          <div>{showMemberItems ? <BsChevronUp /> : <BsChevronDown />}</div>
        </div>
        {showMemberItems && (
          <div className="mt-3">
            {membersItems.map((item) => {
              return (
                <SideBarItem
                  onClick={() => {
                    setShowMenu(false);
                  }}
                  key={item.path}
                  item={item}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="px-6 pt-8">
        <div
          onClick={() => {
            setShowFinanceItems(!showFinanceItems);
            setShowMemberItems(false);
            setShowEventsItems(false);
            setShowSettingsItems(false);
          }}
          className="flex justify-between cursor-pointer items-center"
        >
          <h1 className="text-xs">FINANCES</h1>
          <div>{showFinanceItems ? <BsChevronUp /> : <BsChevronDown />}</div>
        </div>
        {showFinanceItems && (
          <div className="mt-3">
            {financeItems.map((item) => {
              return (
                <SideBarItem
                  onClick={() => {
                    setShowMenu(false);
                  }}
                  key={item.path}
                  item={item}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="px-6 pt-8">
        <div
          onClick={() => {
            setShowEventsItems(!showEventsItems);
            setShowMemberItems(false);
            setShowFinanceItems(false);
            setShowSettingsItems(false);
          }}
          className="flex justify-between cursor-pointer items-center"
        >
          <h1 className="text-xs">EVENTS</h1>
          <div>{showEventsItems ? <BsChevronUp /> : <BsChevronDown />}</div>
        </div>
        {showEventsItems && (
          <div className="mt-2">
            {eventsItems.map((item) => {
              return (
                <SideBarItem
                  onClick={() => {
                    setShowMenu(false);
                  }}
                  key={item.path}
                  item={item}
                />
              );
            })}
          </div>
        )}
      </div>
      <div className="px-6 pt-8">
        <div
          onClick={() => {
            setShowSettingsItems(!showSettingsItems);
            setShowEventsItems(false);
            setShowMemberItems(false);
            setShowFinanceItems(false);
          }}
          className="flex justify-between cursor-pointer items-center"
        >
          <h1 className="text-xs">SETTINGS</h1>
          <div>{showEventsItems ? <BsChevronUp /> : <BsChevronDown />}</div>
        </div>
        {showSettingsItems && (
          <div className="mt-2">
            {settingsItems.map((item) => {
              return (
                <SideBarItem
                  onClick={() => {
                    setShowMenu(false);
                  }}
                  key={item.path}
                  item={item}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
