import React from "react";
import TaskCalendar from "./task-calendar";
import TasksLists from "./tasks-list";
import { useTask } from "../hooks/useTask";
import NewTaskButton from "./new-task-button";

const Task = ({ setIsNewTaskOpen }) => {
  const { tasksData } = useTask();

  const calendarEvents = tasksData.reduce((acc, category) => {
    const events = category.tasks.map((task) => ({
      title: task.title,
      date: task.date,
      description: task.text,
      isCompleted: task.isCompleted,
    }));
    return acc.concat(events);
  }, []);
  // console.log(calendarEvents);

  return (
    <>
      <TaskCalendar events={calendarEvents} />
      <TasksLists tasksData={tasksData} />
      <NewTaskButton setIsNewTaskOpen={setIsNewTaskOpen} />
    </>
  );
};

export default Task;
