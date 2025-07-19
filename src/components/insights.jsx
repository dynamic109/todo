import {
  TrendingUp,
  Lightbulb,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import React from "react";

const Insights = ({ insights }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 py-8 px-4 lg:px-8 rounded-2xl shadow-lg border border-indigo-100">
      <h3 className="text-lg md:text-2xl font-bold text-[#061A40] mb-6 flex items-center">
        <Lightbulb className="mr-3 h-6 w-6" />
        Quick Insights
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-6">
        <div className=" bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <Clock className="h-6 w-6 text-yellow-600" />
            <span className="text-2xl font-bold text-yellow-600">
              {insights.pendingTasks}
            </span>
          </div>
          <p className="text-sm font-semibold text-gray-700">Pending Tasks</p>
          <p className="text-xs text-gray-500">Tasks yet to be completed</p>
        </div>

        <div className=" bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <span className="text-2xl font-bold text-green-600">
              {insights.completedTasks}
            </span>
          </div>
          <p className="text-sm font-semibold text-gray-700">Completed Tasks</p>
          <p className="text-xs text-gray-500">Successfully finished tasks</p>
        </div>

        <div className=" bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <XCircle className="h-6 w-6 text-red-600" />
            <span className="text-2xl font-bold text-red-600">
              {insights.notCompletedTasks}
            </span>
          </div>
          <p className="text-sm font-semibold text-gray-700">Not Completed</p>
          <p className="text-xs text-gray-500">Tasks that missed deadline</p>
        </div>

        <div className=" bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-6 w-6 text-purple-600" />
            <span className="text-2xl font-bold text-purple-600">
              {insights.completionRate}%
            </span>
          </div>
          <p className="text-sm font-semibold text-gray-700">Completion Rate</p>
          <p className="text-xs text-gray-500">Overall task success rate</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-white rounded-xl border border-gray-100">
        <p className="text-sm text-gray-600 flex flex-col md:flex-row md:items-center">
          <Lightbulb className="mr-2 h-6 w-6 text-yellow-500" />
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
  );
};

export default Insights;
