import React, { createContext, useState, useCallback } from "react";
import { toast } from "react-toastify";

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

  const [tasksData, setTasksData] = useState([
    {
      category: "Work",
      tasks: [
        {
          id: "work-1",
          date: "2025-07-20",
          startTime: "09:00",
          endTime: "23:00",
          title: "Team Meeting",
          text: "Discuss project milestones and assign new tasks.",
          isCompleted: false,
        },
        {
          id: "work-2",
          date: "2025-07-22",
          startTime: "10:30",
          endTime: "11:30",
          title: "Code Review",
          text: "Review PRs for the authentication module.",
          isCompleted: true,
        },
        {
          id: "work-3",
          date: "2025-07-23",
          startTime: "14:00",
          endTime: "15:00",
          title: "Design Feedback",
          text: "Give feedback on the new dashboard mockup.",
          isCompleted: true,
        },
      ],
    },
    {
      category: "Personal",
      tasks: [
        {
          id: "personal-1",
          date: "2025-07-24",
          startTime: "17:00",
          endTime: "18:00",
          title: "Grocery Shopping",
          text: "Buy ingredients for the weekend dinner party.",
          isCompleted: false,
        },
        {
          id: "personal-2",
          date: "2025-07-25",
          startTime: "18:00",
          endTime: "19:00",
          title: "Call Mom",
          text: "Catch up and check in on her health.",
          isCompleted: true,
        },
        {
          id: "personal-3",
          date: "2025-07-20",
          startTime: "07:00",
          endTime: "08:00",
          title: "Exercise",
          text: "Go for a 30‑minute run.",
          isCompleted: false,
        },
      ],
    },
    {
      category: "Learning",
      tasks: [
        {
          id: "learning-1",
          date: "2025-07-21",
          startTime: "15:00",
          endTime: "16:00",
          title: "React Tutorial",
          text: "Finish section on useContext and useReducer hooks.",
          isCompleted: false,
        },
        {
          id: "learning-2",
          date: "2025-07-23",
          startTime: "16:30",
          endTime: "17:30",
          title: "Compiler Notes",
          text: "Revise lexical analysis chapter.",
          isCompleted: false,
        },
        {
          id: "learning-3",
          date: "2025-07-25",
          startTime: "09:30",
          endTime: "10:30",
          title: "SQL Practice",
          text: "Solve 5 queries from HackerRank.",
          isCompleted: true,
        },
      ],
    },
    {
      category: "Health & Wellness",
      tasks: [
        {
          id: "health-1",
          date: "2025-07-22",
          startTime: "08:00",
          endTime: "09:00",
          title: "Drink Water",
          text: "Track 8 cups of water today.",
          isCompleted: true,
        },
        {
          id: "health-2",
          date: "2025-07-24",
          startTime: "06:30",
          endTime: "07:30",
          title: "Meditation",
          text: "Practice breathing exercises for 10 minutes.",
          isCompleted: false,
        },
        {
          id: "health-3",
          date: "2025-07-20",
          startTime: "17:30",
          endTime: "18:30",
          title: "Meal Prep",
          text: "Prepare healthy meals for the week.",
          isCompleted: false,
        },
      ],
    },
  ]);

  const deleteTask = (taskId) => {
    const updatedTasksData = tasksData.map((category) => {
      return {
        ...category,
        tasks: category.tasks.filter((task) => task.id !== taskId),
      };
    });
    toast.success("Task deleted successfully");
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
    toast.success(`Task updated successfully`);
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
    toast.success(`New task successfully created🎉🎉`);
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
