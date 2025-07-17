import React, { createContext, useState, useCallback } from "react";

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

  const deleteTask = (taskId) => {
    const updatedTasksData = tasksData.map((category) => {
      return {
        ...category,
        tasks: category.tasks.filter((task) => task.id !== taskId),
      };
    });
    alert(`Task deleted successfully✅`);
    setTasksData(updatedTasksData);
    console.log("updated task data:", updatedTasksData);
  };

  const editTask = (taskId, categoryName, updatedFields) => {
    setTasksData((prevData) =>
      prevData.map((cat) => {
        if (cat.category === categoryName) {
          return {
            ...cat,
            tasks: cat.tasks.map((task) =>
              task.id === taskId ? { ...task, ...updatedFields } : task
            ),
          };
        }
        return cat;
      })
    );
    alert(`Task updated successfully✅`);
  };

  const addTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: Date.now().toString(),
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
    alert(`New task successfully created🎉🎉`);
  };

  const updateTaskStatus = (taskId, categoryName, isCompleted) => {
    setTasksData((prevData) => {
      return prevData.map((taskObj) => {
        if (taskObj.category === categoryName) {
          return {
            ...taskObj,
            tasks: taskObj.tasks.map((task) => {
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
        return taskObj;
      });
    });
  };

  const getCategories = () => {
    return tasksData.map((category) => category.category);
  };

  const value = {
    tasksData,
    addTask,
    updateTaskStatus,
    deleteTask,
    editTask,
    getCategories,
    TASK_STATUS,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export { TaskContext, TaskProvider };
