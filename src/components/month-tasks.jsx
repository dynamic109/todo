import React from "react";

const MonthTasks = ({ tasksData }) => {
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const allTasks = tasksData.flatMap((data) => data.tasks);
  const monthTasks = allTasks.filter(
    (task) => task.date.split("-")[1] === currentMonth
  );
  const groupedTasks = monthTasks.reduce((acc, task) => {
    if (!acc[task.date]) acc[task.date] = [];
    acc[task.date].push(task);
    return acc;
  }, {});

  return (
    <div className="space-y-3 mt-6 mb-24">
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
            <button className="border px-2 py-2 rounded-[3px] text-[#1A1D29] text-xs hover:text-white hover:bg-[#1A1D29] hover:border-[#1A1D29] transition-colors duration-300">
              <a href="/#">View Tasks</a>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MonthTasks;
