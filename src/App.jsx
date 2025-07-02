import React from "react";
import TopNav from "./components/top-nav";
import BottomNav from "./components/bottom-nav";
import TasksSlides from "./components/tasks-slides";
import MonthTasks from "./components/month-tasks";
import { tasksData } from "./data";
import Task from "./components/task";
import { useState } from "react";
import Landing from "./components/landing";

const App = () => {
  const [currentPage, setCurrentPage] = useState("Home");

  return (
    <div className="">
      <div>
        <TopNav />
      </div>
      <div className="max-w-[1200px] mx-auto font-jakarta h-screen overflow-y-auto mt-20 px-4">
        {currentPage == "Home" ? (
          <div className=" space-y-6">
            <Landing tasksData={tasksData} />
          </div>
        ) : currentPage === "Tasks" ? (
          <div className="flex flex-col mb-28">
            <Task tasksData={tasksData} />
          </div>
        ) : (
          <div>Reports here</div>
        )}
      </div>
      <div>
        <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default App;
