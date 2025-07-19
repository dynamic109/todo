import React, { useState } from "react";
import TasksSlides from "./tasks-slides";
import MonthTasks from "./month-tasks";
import EmptyState from "./empty-state";
import { useTask } from "../hooks/useTask";
import { Calendar } from "lucide-react";
import NewTaskButton from "./new-task-button";

const Home = ({ onCreateTask, onNavigateToTasks, setIsNewTaskOpen }) => {
  const { tasksData } = useTask();
  const date = new Date();

  const [selectedMonth, setSelectedMonth] = useState("");

  const hours = date.getHours();
  let greetings = "";

  hours < 12
    ? (greetings = "Good morning 🌞")
    : hours < 18
    ? (greetings = "Good afternoon☀️ ")
    : (greetings = "Good evening 🌙 ");

  const handleChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filteredTasks =
    selectedMonth !== ""
      ? tasksData
          .map((taskCategory) => {
            const filteredTasksInCategory = taskCategory.tasks.filter(
              (task) => {
                const taskDate = new Date(
                  task.date || task.createdAt || task.dueDate
                );
                const taskMonth = taskDate.toLocaleString("default", {
                  month: "long",
                });
                return taskMonth === selectedMonth;
              }
            );
            return {
              ...taskCategory,
              tasks: filteredTasksInCategory,
            };
          })
          .filter((taskCategory) => taskCategory.tasks.length > 0)
      : tasksData;

  const hasAnyTasks =
    tasksData.length > 0 &&
    tasksData.some((category) => category.tasks.length > 0);
  const hasFilteredTasks =
    filteredTasks.length > 0 &&
    filteredTasks.some((category) => category.tasks.length > 0);

  if (!hasAnyTasks) {
    return (
      <>
        <div className="space-y-2">
          <div>
            <h1 className="text-2xl font-bold text-[#061A40]">{greetings}</h1>
          </div>
        </div>
        <EmptyState onCreateTask={onCreateTask} />
      </>
    );
  }

  return (
    <>
      <div className="space-y-2">
        <div>
          <h1 className="text-2xl font-bold text-[#061A40]">{greetings}</h1>
        </div>
      </div>
      <TasksSlides tasksData={tasksData} />
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 mb-4">
          <h1 className="text-xl font-bold text-[#F2AC20] font-poppins">
            Your tasks for
            <span className="ml-1">{selectedMonth || "All Months"}</span>
          </h1>
          <select
            onChange={handleChange}
            value={selectedMonth}
            className="border p-2 border-gray-300 rounded-md md:max-w-52 w-full focus:outline-none focus:ring-2 focus:ring-[#4265D6] focus:border-transparent"
          >
            <option value="">All Months</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {hasFilteredTasks ? (
          <MonthTasks
            tasksData={filteredTasks}
            onNavigateToTasks={onNavigateToTasks}
          />
        ) : (
          <div className="pb-24 md:pb-0">
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="max-w-md mx-auto">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  No tasks for {selectedMonth || "All Months"}
                </h3>
                <p className="text-gray-500 mb-4">
                  {selectedMonth
                    ? `You don't have any tasks scheduled for ${selectedMonth}. Try selecting a different month or create a new task with a ${selectedMonth} date.`
                    : "You don't have any tasks yet. Create your first task to get started!"}
                </p>
                <button
                  onClick={onCreateTask}
                  className="bg-[#4265D6] text-white px-4 py-2 rounded-lg hover:bg-[#3254C5] transition-colors font-medium"
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <NewTaskButton setIsNewTaskOpen={setIsNewTaskOpen} />
    </>
  );
};

export default Home;
