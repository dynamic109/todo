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
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-lg font-bold text-[#061A40] mb-6 flex items-center">
        <BarChart3 className="mr-2 h-5 w-5" />
        Progress by Category
      </h3>
      <div style={{ width: "100%", height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={barData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
