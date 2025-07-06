import React, { useState } from "react";
import TopNav from "./components/top-nav";
import BottomNav from "./components/bottom-nav";
import { tasksData } from "./data";
import Task from "./components/task";
import Landing from "./components/landing";
import Reports from "./components/reports";
import NewTask from "./components/new-task";

const App = () => {
  const [currentPage, setCurrentPage] = useState("Home");
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [localTasksData, setLocalTasksData] = useState(tasksData);

  // console.log(localTasksData);

  const handleSaveTask = (newTask) => {
    const categoryIndex = localTasksData.findIndex(
      (category) => category.category === newTask.category
    );

    // console.log(categoryIndex)

    if (categoryIndex !== -1) {
      const updatedTasksData = [...localTasksData];

      updatedTasksData[categoryIndex] = {
        ...updatedTasksData[categoryIndex],
        tasks: [...updatedTasksData[categoryIndex].tasks, newTask],
      };

      setLocalTasksData(updatedTasksData);
    }
  };

  return (
    <div className="">
      <div>
        <TopNav />
      </div>
      <div className="max-w-[1200px] mx-auto font-jakarta h-screen overflow-y-auto mt-20 px-4">
        {currentPage === "Home" ? (
          <div className="space-y-6">
            <Landing tasksData={localTasksData} />
          </div>
        ) : currentPage === "Tasks" ? (
          <div className="flex flex-col mb-28">
            <Task tasksData={localTasksData} />
          </div>
        ) : (
          <div>
            <Reports />
          </div>
        )}
      </div>
      <div>
        <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
      <div className="fixed right-4 bottom-22 z-10">
        <button
          className="bg-[#4265D6] py-3 px-3 h-fit rounded-md shadow-xl text-white hover:bg-[#3254C5] transition-all"
          onClick={() => setIsNewTaskOpen(true)}
        >
          New Task +
        </button>
      </div>
      F
      <NewTask
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        onSave={handleSaveTask}
        categories={localTasksData}
      />
    </div>
  );
};

export default App;
