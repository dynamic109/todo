import React from "react";
import { useState } from "react";

const TasksLists = ({ tasksData }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const day = String(new Date().getDate()).padStart(2, "0");
  const newCurrentDate = Number(day);
  let newTaskDate;
  let statusColor = "";
  let bgImage = "";

  function handleChange(event) {
    setSelectedCategory(event.target.value);
  }

  return (
    <div>
      <select
        onChange={handleChange}
        value={selectedCategory}
        className="border p-2 border-gray-300 rounded-md md:max-w-1/3 w-full"
      >
        <option value="">Select a category</option>
        {tasksData.map((category) => {
          console.log(category.category);
          return (
            <option key={category.category} value={category.category}>
              {category.category}
            </option>
          );
        })}
      </select>

      <div className="mt-6">
        {tasksData
          .filter((category) =>
            selectedCategory ? category.category === selectedCategory : true
          )
          .map((category) => (
            <div key={category.category} className="mb-3 space-y-3">
              {category.tasks.map((task) => {
                newTaskDate = Number(task.date.split("-")[2]);

                if (newCurrentDate < newTaskDate && !task.isCompleted) {
                  statusColor = "#F2AC20";
                  bgImage = "/pending.svg";
                } else if (newCurrentDate > newTaskDate && !task.isCompleted) {
                  statusColor = "#DC2626";
                  bgImage = "/not-completed.svg";
                } else if (
                  newCurrentDate === newTaskDate &&
                  !task.isCompleted
                ) {
                  statusColor = "#F2AC20";
                  bgImage = "/pending.svg";
                } else {
                  statusColor = "#16A34A";
                  bgImage = "/completed.svg";
                }
                return (
                  <div
                    key={task.title}
                    style={{
                      borderColor: statusColor,
                    }}
                    className="relative border-l-6 shadow-lg rounded-md h-fit bg-gray-300 flex items-center justify-between "
                  >
                    <div className="pl-4 py-8 space-y-3 w-2/3 text-[#061A40]">
                      <h3 className="font-bold text-lg font-manrope">
                        {task.title}{" "}
                      </h3>
                      <p className="text-xs">{task.date}</p>
                      <p className="text-sm">{task.text}</p>
                    </div>
                    <div className="bottom-4 right-0 max-w-[150px] h-full">
                      <img src={bgImage} />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TasksLists;
