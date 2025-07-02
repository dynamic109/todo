import React from "react";
import TasksSlides from "./tasks-slides";
import MonthTasks from "./month-tasks";

const Landing = ({ tasksData }) => {
  const date = new Date();
  const monthName = date.toLocaleString("default", { month: "long" });

  const hours = date.getHours();
  let greetings = "";

  hours < 12
    ? (greetings = "Good morning 🌞")
    : hours < 18
    ? (greetings = "Good afternoon☀️ ")
    : (greetings = "Good evening 🌙 ");

  return (
    <>
      {" "}
      <div className="space-y-2">
        <div>
          <h1 className="text-2xl font-bold text-[#061A40]">{greetings}</h1>
        </div>
      </div>
      <TasksSlides tasksData={tasksData} />
      <div>
        <h1 className="text-xl font-bold text-[#F2AC20] font-poppins">
          Your tasks for {monthName}
        </h1>
        <MonthTasks tasksData={tasksData} />
      </div>{" "}
    </>
  );
};

export default Landing;
