import { CalendarCheck, Flame } from "lucide-react";
import React from "react";

const TopNav = ({ onNavigateToHome, onNavigateToTasks }) => {
  return (
    <div className="fixed top-0 z-50 bg-white w-full">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 py-6 ">
        <div className="flex items-center space-x-2 cursor-pointer">
          {/* <Flame className="w-6 h-6 text-white fill-[#0353A4] " /> */}
          <h2
            onClick={onNavigateToHome}
            className="font-niconne text-2xl font-bold text-[#061A40]"
          >
            To-dos
          </h2>
        </div>
        <div className="cursor-pointer">
          <CalendarCheck
            className="text-[#061A40] "
            onClick={onNavigateToTasks}
          />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
