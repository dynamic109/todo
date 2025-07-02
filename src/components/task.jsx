import React from "react";
import TaskCalendar from "./task-calendar";
import TasksLists from "./tasks-list";

const Task = ({ tasksData }) => {
  const calendarEvents = tasksData.reduce((acc, category) => {
    const events = category.tasks.map((task) => ({
      title: task.title,
      date: task.date,
      description: task.text,
      isCompleted: task.isCompleted,
    }));
    return acc.concat(events);
  }, []);
  // console.log("Task component rendered with events:", calendarEvents);

  return (
    <>
      <TaskCalendar events={calendarEvents} />
      <TasksLists tasksData={tasksData} />
    </>
  );
};

export default Task;
