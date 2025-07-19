import { FileText } from "lucide-react";
import React from "react";

const DetailedBreakdown = ({ pieData }) => {
  return (
    <div className="bg-white py-6 px-4 md:px-6 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-[#061A40] mb-6 flex items-center">
        <FileText className="mr-2 h-5 w-5" />
        Detailed Breakdown
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {pieData.map((entry, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-2xl font-bold text-gray-700">
                {entry.value}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {entry.name}
              </p>
              <p className="text-xs text-gray-500">
                {entry.value === 1 ? "task" : "tasks"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailedBreakdown;
