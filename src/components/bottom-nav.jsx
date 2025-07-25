import { BarChart3, ClipboardList, HousePlug } from "lucide-react";
import React from "react";

const bottomNavItems = [
  { name: "Home", icon: HousePlug },
  { name: "Tasks", icon: ClipboardList },
  { name: "Reports", icon: BarChart3 },
];

const BottomNav = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="fixed bottom-0 bg-[#1A1D29] w-full px-6 py-3 font-jakarta z-50">
      <div className="flex justify-between items-center max-w-[1200px] mx-auto">
        {bottomNavItems.map((item, index) => {
          const isActive = currentPage === item.name;
          return (
            <div
              onClick={() => setCurrentPage(item.name)}
              key={index}
              className={`flex flex-col items-center cursor-pointer ${
                isActive && "transform scale-110 duration-300"
              }`}
            >
              <item.icon
                className={`text-[white] w-5 h-5 ${
                  isActive &&
                  "bg-[#293855] text-[#293855] p-2 rounded-lg h-fit w-fit animate-pulse"
                }`}
              />
              <span
                className={`text-white text-sm ${
                  isActive && "text-[#293855] animate-pulse"
                }`}
              >
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
