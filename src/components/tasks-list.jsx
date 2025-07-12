import React from "react";
import { useState } from "react";
import { useTask } from "../hooks/useTask";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  ClipboardList,
} from "lucide-react";

const TasksLists = () => {
  const { tasksData, updateTaskStatus, TASK_STATUS } = useTask();
  const [selectedCategory, setSelectedCategory] = useState("");

  function handleChange(event) {
    setSelectedCategory(event.target.value);
  }

  const getTaskStatus = (task) => {
    if (task.isCompleted) return TASK_STATUS.COMPLETED;

    const now = new Date();
    const taskDate = new Date(task.date);
    if (task.endTime) {
      const [hours, minutes] = task.endTime.split(":");
      taskDate.setHours(parseInt(hours), parseInt(minutes));
    }

    if (now > taskDate) {
      return TASK_STATUS.NOT_COMPLETED;
    } else {
      return TASK_STATUS.PENDING;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case TASK_STATUS.COMPLETED:
        return "#16A34A";
      case TASK_STATUS.NOT_COMPLETED:
        return "#DC2626";
      case TASK_STATUS.PENDING:
        return "#F2AC20";
      default:
        return "#F2AC20";
    }
  };

  const getStatusImage = (status) => {
    switch (status) {
      case TASK_STATUS.COMPLETED:
        return "/completed.svg";
      case TASK_STATUS.NOT_COMPLETED:
        return "/not-completed.svg";
      case TASK_STATUS.PENDING:
        return "/pending.svg";
      default:
        return "/pending.svg";
    }
  };

  const handleTaskStatusToggle = (taskId, categoryName, currentStatus) => {
    const newCompletionStatus = currentStatus !== TASK_STATUS.COMPLETED;
    updateTaskStatus(taskId, categoryName, newCompletionStatus);
  };

  if (tasksData.length === 0) {
    return (
      <div className="text-center py-12">
        <ClipboardList className="w-16 h-16 mx-auto mb-4 text-gray-400 animate-pulse" />
        <h3 className="text-xl font-bold text-gray-700 mb-2">No Tasks Yet</h3>
        <p className="text-gray-500">Create your first task to see it here!</p>
      </div>
    );
  }

  const filteredTasks = tasksData.filter((category) =>
    selectedCategory ? category.category === selectedCategory : true
  );

  return (
    <div>
      <div className="mb-6">
        <select
          onChange={handleChange}
          value={selectedCategory}
          className="border p-3 border-gray-300 rounded-lg md:max-w-xs w-full focus:outline-none focus:ring-2 focus:ring-[#4265D6] focus:border-transparent"
        >
          <option value="">All Categories</option>
          {tasksData.map((category) => (
            <option key={category.category} value={category.category}>
              {category.category}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {filteredTasks.map((category) => (
          <div key={category.category} className="space-y-4">
            <h3 className="text-lg font-semibold text-[#061A40] border-b border-gray-200 pb-2">
              {category.category} ({category.tasks.length} tasks)
            </h3>

            {category.tasks.map((task, index) => {
              const taskStatus = getTaskStatus(task);
              const statusColor = getStatusColor(taskStatus);
              const bgImage = getStatusImage(taskStatus);

              return (
                <div
                  key={index}
                  style={{
                    borderColor: statusColor,
                  }}
                  className="relative border-l-6 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow duration-200 border border-gray-100"
                >
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-lg text-[#061A40]">
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              taskStatus === TASK_STATUS.COMPLETED
                                ? "bg-green-100 text-green-800"
                                : taskStatus === TASK_STATUS.NOT_COMPLETED
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {taskStatus.replace("_", " ").toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {task.date}
                        </span>
                        {task.startTime && task.endTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {task.startTime} - {task.endTime}
                          </span>
                        )}
                      </div>

                      <p className="text-gray-700">{task.text}</p>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={() =>
                            handleTaskStatusToggle(
                              task.id,
                              category.category,
                              taskStatus
                            )
                          }
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                            task.isCompleted
                              ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              : "bg-[#4265D6] text-white hover:bg-[#3254C5]"
                          }`}
                        >
                          {task.isCompleted ? (
                            <>
                              <CheckCircle2 className="h-4 w-4" />
                              Completed
                            </>
                          ) : (
                            <>
                              <Circle className="h-4 w-4" />
                              Mark Complete
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="ml-6 flex-shrink-0 max-w-[120px] absolute right-0 md:static">
                      <img
                        src={bgImage}
                        alt={`Task ${taskStatus}`}
                        className="w-full h-auto"
                      />
                    </div>
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
