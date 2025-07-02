import { Activity } from "lucide-react";
import React from "react";

const Card = ({ text, title, time }) => {
  return (
    <div className="bg-[#1A1D29] rounded-lg shadow-2xl shadow-gray-50 px-4 py-10 overflow-hidden h-full">
      <div className="space-y-2">
        <span className="text-[#B1B2B5]">Happening</span>
        {"Today".split("").map((letter, index) => (
          <span
            key={index}
            className="ml-1 text-sm font-bold font-urbanist text-[#4265D6] inline-block animate-bounce"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="w-full relative flex flex-row items-center justify-between">
        <div className="text-lg font-bold text-[white] space-y-1 max-w-[2220px]">
          <div className="flex items-center space-x-2">
            {" "}
            <p>{title}</p>
            <Activity className="animate-pulse" />
          </div>
          <p className="font-medium text-sm">{text}</p>

          <p>{time}</p>
        </div>
        <div className="bottom-4 right-0 max-w-[100px] max-h-[100px]">
          <img src="/todo-img-01.svg" />
        </div>
      </div>
    </div>
  );
};

export default Card;
