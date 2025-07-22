import { BarChart3 } from "lucide-react";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const CBarChart = ({ barData, STATUS_COLORS }) => {
  const filteredData = barData.filter(
    (item) =>
      item.Completed > 0 || item.Pending > 0 || item["Not Completed"] > 0
  );
  return (
    <div className="bg-white  rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-lg p-6 font-bold text-[#061A40] mb-6 flex items-center">
        <BarChart3 className="mr-2 h-5 w-5" />
        Progress by Category
      </h3>
      <div className="h-[300px] w-full pr-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={filteredData}
            margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#6b7280" />
            <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar
              dataKey="Completed"
              fill={STATUS_COLORS["Completed"]}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="Pending"
              fill={STATUS_COLORS["Pending"]}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="Not Completed"
              fill={STATUS_COLORS["Not Completed"]}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CBarChart;
