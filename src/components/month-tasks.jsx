import React from "react";
import { Eye } from "lucide-react";

const MonthTasks = ({ tasksData, onNavigateToTasks }) => {
  const allTasks = tasksData.flatMap((data) => data.tasks);

  const groupedTasks = allTasks.reduce((acc, task) => {
    if (!acc[task.date]) acc[task.date] = [];
    acc[task.date].push(task);
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 mb-24">
      {Object.entries(groupedTasks).map(([date, taskArray]) => (
        <div
          key={date}
          className="bg-gray-200 px-4 py-6 rounded-lg flex justify-between items-center"
        >
          <div>
            <p className="text-sm text-[#1A1D29] font-bold font-jakarta">
              {date}: {taskArray.length} task
              {taskArray.length > 1 ? "s" : ""}
            </p>
          </div>
          <div>
            <button
              onClick={onNavigateToTasks}
              className="bg-[#4265D6] text-white px-3 py-2 rounded-lg text-xs hover:bg-[#3254C5] transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center"
            >
              <Eye className="mr-1 h-3 w-3" />
              View Tasks
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MonthTasks;
