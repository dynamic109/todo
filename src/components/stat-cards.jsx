import { CheckCircle, ClipboardList, Target } from "lucide-react";
import React from "react";

const StatCards = ({ totalTasks, completedTasks, completionRate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Total Tasks</p>
            <p className="text-3xl font-bold">{totalTasks}</p>
          </div>
          <ClipboardList className="h-10 w-10 opacity-80" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl shadow-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">Completed</p>
            <p className="text-3xl font-bold">{completedTasks}</p>
          </div>
          <CheckCircle className="h-10 w-10 opacity-80" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl shadow-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">
              Completion Rate
            </p>
            <p className="text-3xl font-bold">{completionRate}%</p>
          </div>
          <Target className="h-10 w-10 opacity-80" />
        </div>
      </div>
    </div>
  );
};

export default StatCards;
