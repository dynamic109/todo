import React from "react";
import TasksChart from "./tasks-chart";
import { useTask } from "../hooks/useTask";

import NewTaskButton from "./new-task-button";
import Insights from "./insights";

const Reports = ({ setIsNewTaskOpen }) => {
  const { tasksData, TASK_STATUS } = useTask();

  const calculateInsights = () => {
    if (tasksData.length === 0) return null;

    let pendingTasks = 0;
    let completedTasks = 0;
    let notCompletedTasks = 0;
    let totalTasks = 0;

    tasksData.forEach((category) => {
      category.tasks.forEach((task) => {
        totalTasks++;

        if (task.isCompleted) {
          completedTasks++;
        } else {
          const now = new Date();
          const taskDate = new Date(task.date);

          if (task.endTime) {
            const [hours, minutes] = task.endTime.split(":");
            taskDate.setHours(parseInt(hours), parseInt(minutes));
          } else {
            taskDate.setHours(23, 59, 59, 999);
          }

          if (now > taskDate) {
            notCompletedTasks++;
          } else {
            pendingTasks++;
          }
        }
      });
    });
    return {
      pendingTasks,
      completedTasks,
      notCompletedTasks,
      totalTasks,
      completionRate:
        totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
    };
  };

  const insights = calculateInsights();

  // console.log(insights);

  return (
    <div className="space-y-8 pb-20">
      <TasksChart />
      {insights && <Insights insights={insights} />}
      <NewTaskButton setIsNewTaskOpen={setIsNewTaskOpen} />
    </div>
  );
};

export default Reports;
