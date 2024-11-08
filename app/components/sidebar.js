import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import {
  AiOutlineCalendar,
  AiOutlineContacts,
  AiOutlineDashboard,
  AiOutlineFolder,
  AiOutlineNotification,
  AiOutlineUser,
} from "react-icons/ai";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SideBarItem from "./sideBarItem";

const Sidebar = () => {
  const [showMemberItems, setShowMemberItems] = useState(false);
  const [showFinanceItems, setShowFinanceItems] = useState(false);
  const [showEventsItems, setShowEventsItems] = useState(false);
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
  ];

  useEffect(() => {
    if (membersItems.some((item) => item.activeOn.includes(pathname))) {
      setShowMemberItems(true);
      setShowFinanceItems(false);
      setShowEventsItems(false);
    } else if (financeItems.some((item) => item.activeOn.includes(pathname))) {
      setShowFinanceItems(true);
      setShowMemberItems(false);
      setShowEventsItems(false);
    } else if (eventsItems.some((item) => item.activeOn.includes(pathname))) {
      setShowEventsItems(true);
      setShowMemberItems(false);
      setShowFinanceItems(false);
    }
  }, [pathname]);

  return (
    <div>
      <div className="bg-black inset-0"></div>

      <div className="px-6 pt-3">
        <div
          onClick={() => {
            setShowMemberItems(!showMemberItems);
            setShowFinanceItems(false);
            setShowEventsItems(false);
          }}
          className="flex justify-between cursor-pointer items-center"
        >
          <h1 className="text-xs">MEMBERS</h1>
          <div>{showMemberItems ? <BsChevronUp /> : <BsChevronDown />}</div>
        </div>
        {showMemberItems && (
          <div className="mt-3">
            {membersItems.map((item) => {
              return <SideBarItem key={item.path} item={item} />;
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
          }}
          className="flex justify-between cursor-pointer items-center"
        >
          <h1 className="text-xs">FINANCES</h1>
          <div>{showFinanceItems ? <BsChevronUp /> : <BsChevronDown />}</div>
        </div>
        {showFinanceItems && (
          <div className="mt-3">
            {financeItems.map((item) => {
              return <SideBarItem key={item.path} item={item} />;
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
          }}
          className="flex justify-between cursor-pointer items-center"
        >
          <h1 className="text-xs">EVENTS</h1>
          <div>{showEventsItems ? <BsChevronUp /> : <BsChevronDown />}</div>
        </div>
        {showEventsItems && (
          <div className="mt-2">
            {eventsItems.map((item) => {
              return <SideBarItem key={item.path} item={item} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
