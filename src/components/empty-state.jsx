import React from "react";
import { Rocket, Plus, Lightbulb } from "lucide-react";

const EmptyState = ({ onCreateTask }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="max-w-md mx-auto flex flex-col items-center pb-16">
        <div className="mb-8 animate-bounce">
          <img
            src="/todo-img-01.svg"
            alt="No tasks"
            className="w-32 h-32 mx-auto opacity-60 hover:opacity-80 transition-opacity duration-300"
          />
        </div>

        <h2 className="text-3xl font-bold text-[#061A40] mb-4 flex items-center justify-center">
          Ready to get organized?
          <Rocket className="ml-2 h-8 w-8 animate-pulse" />
        </h2>

        <p className="text-gray-600 mb-8 text-lg">
          Create your first task to get started with organizing your day and
          boosting your productivity!
        </p>

        <button
          onClick={onCreateTask}
          className="cursor-pointer text-sm md:text-lg bg-gradient-to-r from-[#4265D6] to-[#3254C5] text-white px-8 py-4 rounded-xl hover:from-[#3254C5] hover:to-[#2447B8] transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
        >
          <Plus className="mr-2 h-5 w-5" />
          Create Your First Task
        </button>

        <div className="mt-8 text-sm text-gray-500">
          <p className="flex items-start md:items-center justify-center">
            <Lightbulb className="mr-2 h-4 w-4" />
            Pro tip: Start with small, achievable tasks!
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
