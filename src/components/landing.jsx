import React, { useState } from "react";
import TopNav from "./top-nav";
import BottomNav from "./bottom-nav";
import TasksSlides from "./tasks-slides";
import MonthTasks from "./month-tasks";
import { tasksData } from "../data";
import TaskCalendar from "./task-calendar";

const Landing = () => {
  const [currentPage, setCurrentPage] = useState("Home");
  const date = new Date();
  const monthName = date.toLocaleString("default", { month: "long" });
  const hours = date.getHours();
  let greetings = "";

  hours < 12
    ? (greetings = "Good morning 🌞")
    : hours < 18
    ? (greetings = "Good afternoon☀️ ")
    : (greetings = "Good evening 🌙 ");

  const calendarEvents = tasksData.reduce((acc, category) => {
    const events = category.tasks.map((task) => ({
      title: task.title,
      date: task.date,
      description: task.text,
      isCompleted: task.isCompleted,
    }));
    return acc.concat(events);
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto">
      <div>
        <TopNav />
      </div>
      <div className="font-jakarta h-screen overflow-y-auto mt-20 px-4">
        {currentPage == "Home" ? (
          <div className=" space-y-6">
            <div className="space-y-2">
              <div>
                <h1 className="text-2xl font-bold text-[#061A40]">
                  {greetings}
                </h1>
              </div>
            </div>
            <TasksSlides tasksData={tasksData} />
            <div>
              <h1 className="text-xl font-bold text-[#F2AC20] font-poppins">
                Your tasks for {monthName}
              </h1>
              <MonthTasks tasksData={tasksData} />
            </div>{" "}
          </div>
        ) : currentPage === "Tasks" ? (
          <div>
            <TaskCalendar events={calendarEvents} />
          </div>
        ) : (
          <div>Settings here</div>
        )}
      </div>
      <div>
        <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default Landing;
