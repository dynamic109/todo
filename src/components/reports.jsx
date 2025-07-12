import React from "react";
import TasksChart from "./tasks-chart";
import { useTask } from "../hooks/useTask";
import {
  Calendar,
  TrendingUp,
  Flame,
  Zap,
  Lightbulb,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import NewTaskButton from "./new-task-button";

const Reports = ({ setIsNewTaskOpen }) => {
  const { tasksData, TASK_STATUS } = useTask();

  // Calculate insights based on task status
  const calculateInsights = () => {
    if (tasksData.length === 0) return null;

    let pendingTasks = 0;
    let completedTasks = 0;
    let notCompletedTasks = 0;
    let totalTasks = 0;
    let mostProductiveCategory = "";
    let categoryTaskCount = {};

    tasksData.forEach((category) => {
      categoryTaskCount[category.category] = category.tasks.length;

      category.tasks.forEach((task) => {
        totalTasks++;

        if (task.isCompleted) {
          completedTasks++;
        } else {
          const now = new Date();
          const taskDate = new Date(task.date);

          // Only check end time if it exists
          if (task.endTime) {
            const [hours, minutes] = task.endTime.split(":");
            taskDate.setHours(parseInt(hours), parseInt(minutes));
          } else {
            // If no end time, assume end of day
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

    // Find most productive category
    mostProductiveCategory = Object.keys(categoryTaskCount).reduce(
      (a, b) => (categoryTaskCount[a] > categoryTaskCount[b] ? a : b),
      ""
    );

    return {
      pendingTasks,
      completedTasks,
      notCompletedTasks,
      totalTasks,
      mostProductiveCategory,
      completionRate:
        totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
    };
  };

  const insights = calculateInsights();

  return (
    <div className="space-y-8">
      <TasksChart />

      {insights && (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-lg border border-indigo-100 pb-16">
          <h3 className="text-2xl font-bold text-[#061A40] mb-6 flex items-center">
            <Lightbulb className="mr-3 h-6 w-6" />
            Quick Insights
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <Clock className="h-6 w-6 text-yellow-600" />
                <span className="text-2xl font-bold text-yellow-600">
                  {insights.pendingTasks}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-700">
                Pending Tasks
              </p>
              <p className="text-xs text-gray-500">Tasks yet to be completed</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <span className="text-2xl font-bold text-green-600">
                  {insights.completedTasks}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-700">
                Completed Tasks
              </p>
              <p className="text-xs text-gray-500">
                Successfully finished tasks
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <XCircle className="h-6 w-6 text-red-600" />
                <span className="text-2xl font-bold text-red-600">
                  {insights.notCompletedTasks}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-700">
                Not Completed
              </p>
              <p className="text-xs text-gray-500">
                Tasks that missed deadline
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-6 w-6 text-purple-600" />
                <span className="text-2xl font-bold text-purple-600">
                  {insights.completionRate}%
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-700">
                Completion Rate
              </p>
              <p className="text-xs text-gray-500">Overall task success rate</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white rounded-xl border border-gray-100">
            <p className="text-sm text-gray-600 flex items-center">
              <Lightbulb className="mr-2 h-4 w-4 text-yellow-500" />
              <span>
                {insights.completionRate >= 80
                  ? "Excellent work! You're maintaining a high completion rate!"
                  : insights.completionRate >= 60
                  ? "Good progress! Keep up the momentum!"
                  : insights.completionRate >= 40
                  ? "You're doing well! Consider focusing on fewer tasks to improve completion rate."
                  : insights.notCompletedTasks > insights.completedTasks
                  ? "Don't worry about missed deadlines. Try breaking tasks into smaller, manageable pieces and set realistic timeframes."
                  : "Every step counts! Focus on completing your pending tasks and you'll see improvement."}
              </span>
            </p>
          </div>
        </div>
      )}

      <NewTaskButton setIsNewTaskOpen={setIsNewTaskOpen} />
    </div>
  );
};

export default Reports;
