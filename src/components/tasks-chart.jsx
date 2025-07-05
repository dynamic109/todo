import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { tasksData } from "../data";

// Process data for the chart
const calculateTaskStats = () => {
  // Count completed and pending tasks
  const stats = { completed: 0, pending: 0, overdue: 0, upcoming: 0 };
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  tasksData.forEach((category) => {
    category.tasks.forEach((task) => {
      const taskDate = new Date(task.date);
      taskDate.setHours(0, 0, 0, 0);

      if (task.isCompleted) {
        stats.completed++;
      } else if (taskDate < today) {
        stats.overdue++;
      } else if (taskDate > today) {
        stats.upcoming++;
      } else {
        stats.pending++;
      }
    });
  });

  return [
    { name: "Completed", value: stats.completed, color: "#16A34A" },
    { name: "Overdue", value: stats.overdue, color: "#DC2626" },
    { name: "Today's Tasks", value: stats.pending, color: "#F2AC20" },
    { name: "Upcoming", value: stats.upcoming, color: "#4265D6" },
  ].filter((item) => item.value > 0);
};

const data = calculateTaskStats();

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const TasksChart = () => {
  return (
    <div style={{ width: "100%", height: "400px" }} className="mb-28">
      <h2 className="text-xl font-bold text-[#061A40] mb-4">
        Your Tasks Report
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value} tasks`, name]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {data.map((entry, index) => (
          <div
            key={index}
            className="bg-white p-3 rounded-lg shadow flex items-center"
          >
            <div
              className="w-4 h-4 mr-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></div>
            <div>
              <p className="text-sm font-bold">{entry.name}</p>
              <p className="text-xs">{entry.value} tasks</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksChart;
