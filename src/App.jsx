import React, { useState } from "react";
import TopNav from "./components/top-nav";
import BottomNav from "./components/bottom-nav";
import Task from "./components/task";
import Landing from "./components/landing";
import Reports from "./components/reports";
import NewTask from "./components/new-task";
import { TaskProvider } from "./contexts/TaskContext";

const App = () => {
  const [currentPage, setCurrentPage] = useState("Home");
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);

  return (
    <TaskProvider>
      <div className="">
        <div>
          <TopNav
            onNavigateToHome={() => setCurrentPage("Home")}
            onNavigateToTasks={() => setCurrentPage("Tasks")}
          />
        </div>
        <div className="max-w-[1200px] mx-auto font-jakarta h-screen overflow-y-auto mt-20 px-4">
          {currentPage === "Home" ? (
            <div className="space-y-6">
              <Landing
                onCreateTask={() => setIsNewTaskOpen(true)}
                onNavigateToTasks={() => setCurrentPage("Tasks")}
                setIsNewTaskOpen={setIsNewTaskOpen}
              />
            </div>
          ) : currentPage === "Tasks" ? (
            <div className="flex flex-col mb-28">
              <Task setIsNewTaskOpen={setIsNewTaskOpen} />
            </div>
          ) : (
            <div>
              <Reports setIsNewTaskOpen={setIsNewTaskOpen} />
            </div>
          )}
        </div>
        <div>
          <BottomNav
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>

        <NewTask
          isOpen={isNewTaskOpen}
          onClose={() => setIsNewTaskOpen(false)}
        />
      </div>
    </TaskProvider>
  );
};

export default App;
