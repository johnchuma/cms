"use client";
import { useState } from "react";
import moment from "moment";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Calendar = ({ events, setSelectedEvents }) => {
  const [currentDate, setCurrentDate] = useState(moment());
  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

  // Function to get days of the current month with padding for previous/next month's dates
  const generateCalendar = (date) => {
    const startOfMonth = moment(date).startOf("month");
    const endOfMonth = moment(date).endOf("month");

    const startDay = startOfMonth.isoWeekday();
    const daysInMonth = date.daysInMonth();

    let calendarDays = [];

    // Add padding days for the previous month
    for (let i = startDay - 1; i > 0; i--) {
      calendarDays.push({
        day: moment(startOfMonth).subtract(i, "days").date(),
        isCurrentMonth: false,
        fullDate: moment(startOfMonth).subtract(i, "days"),
      });
    }

    // Add days for the current month
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        day: i,
        isCurrentMonth: true,
        fullDate: moment(startOfMonth).date(i),
      });
    }

    // Add padding days for the next month to fill the calendar
    const remainingCells = 42 - calendarDays.length; // 42 cells for a full 6-week calendar
    for (let i = 1; i <= remainingCells; i++) {
      calendarDays.push({
        day: i,
        isCurrentMonth: false,
        fullDate: moment(endOfMonth).add(i, "days"),
      });
    }

    return calendarDays;
  };

  const calendarDays = generateCalendar(currentDate);

  // Functions to change the month
  const prevMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, "months"));
  };

  const nextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, "months"));
  };

  // Function to get all events on a given day
  const getEventsOnDay = (day) => {
    return events.filter((event) =>
      moment(event.from).isSame(day.fullDate, "day")
    );
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="text-muted text-opacity-40 text-sm"
        >
          <FaChevronLeft />
        </button>
        <h2 className="text-sm font-bold">{currentDate.format("MMMM YYYY")}</h2>
        <button
          onClick={nextMonth}
          className="text-muted text-opacity-40 text-sm"
        >
          <FaChevronRight />
        </button>
      </div>
      <div className="grid grid-cols-7 mb-2">
        {daysOfWeek.map((item, index) => (
          <div key={index} className="text-center text-sm text-gray-500">
            {item}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {calendarDays.map((item, index) => {
          const dayEvents = getEventsOnDay(item);

          return (
            <div
              onClick={() => {
                if (dayEvents.length > 0) {
                  setSelectedEvents(dayEvents); // Set selected events for that day
                }
              }}
              key={index}
              className={`text-start border size-14 flex justify-center items-center ${
                currentDate.format("MMMM YYYY") ===
                  moment(new Date()).format("MMMM YYYY") &&
                item.day === parseInt(moment(new Date()).format("DD")) &&
                item.isCurrentMonth &&
                "text-primary font-bold"
              } ${
                item.isCurrentMonth ? "bg-white" : "bg-background text-muted"
              } ${
                dayEvents.length > 0
                  ? "cursor-pointer text-primary font-bold hover:bg-primary transition-all duration-150 hover:text-white"
                  : ""
              } relative`}
            >
              {item.day}
              {dayEvents.length > 1 && (
                <div className="absolute bottom-1 right-1 text-xs text-primary hover:text-white">
                  +{dayEvents.length}
                </div> /* Shows a marker for multiple events */
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
