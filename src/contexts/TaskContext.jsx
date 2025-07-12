import React, { createContext, useState, useEffect, useCallback } from "react";

const TASK_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
  NOT_COMPLETED: "not_completed",
};

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const calculateTaskStatus = useCallback((task) => {
    if (task.isCompleted) return TASK_STATUS.COMPLETED;

    const now = new Date();
    const taskDate = new Date(task.date);
    const [hours, minutes] = task.endTime.split(":");
    taskDate.setHours(parseInt(hours), parseInt(minutes));

    if (now > taskDate) {
      return TASK_STATUS.NOT_COMPLETED;
    } else {
      return TASK_STATUS.PENDING;
    }
  }, []);

  const [tasksData, setTasksData] = useState([]);

  const addTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      isCompleted: false,
      status: TASK_STATUS.PENDING,
    };

    setTasksData((prevData) => {
      const categoryIndex = prevData.findIndex(
        (category) => category.category === newTask.category
      );

      if (categoryIndex !== -1) {
        const updatedData = [...prevData];
        updatedData[categoryIndex] = {
          ...updatedData[categoryIndex],
          tasks: [...updatedData[categoryIndex].tasks, taskWithId],
        };
        return updatedData;
      } else {
        return [
          ...prevData,
          {
            category: newTask.category,
            tasks: [taskWithId],
          },
        ];
      }
    });
  };

  const updateTaskStatus = (taskId, categoryName, isCompleted) => {
    setTasksData((prevData) => {
      return prevData.map((category) => {
        if (category.category === categoryName) {
          return {
            ...category,
            tasks: category.tasks.map((task) => {
              if (task.id === taskId) {
                const updatedTask = { ...task, isCompleted };
                return {
                  ...updatedTask,
                  status: calculateTaskStatus(updatedTask),
                };
              }
              return task;
            }),
          };
        }
        return category;
      });
    });
  };

  const getCategories = () => {
    return tasksData.map((category) => category.category);
  };

  useEffect(() => {
    const updateStatuses = () => {
      setTasksData((prevData) => {
        return prevData.map((category) => ({
          ...category,
          tasks: category.tasks.map((task) => ({
            ...task,
            status: calculateTaskStatus(task),
          })),
        }));
      });
    };

    updateStatuses();

    const interval = setInterval(updateStatuses, 60000);

    return () => clearInterval(interval);
  }, [calculateTaskStatus]);

  const value = {
    tasksData,
    addTask,
    updateTaskStatus,
    getCategories,
    TASK_STATUS,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export { TaskContext, TaskProvider };
