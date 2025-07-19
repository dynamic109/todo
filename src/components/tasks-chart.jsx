import React from "react";
import { PieChart as PieChartIcon, BarChart3, TrendingUp } from "lucide-react";
import { useTask } from "../hooks/useTask";
import DetailedBreakdown from "./detailed-breakdown";
import CBarChart from "./bar-chart";
import CPieChart from "./pie-chart";
import StatCards from "./stat-cards";

const STATUS_COLORS = {
  Pending: "#F2AC20",
  Completed: "#16A34A",
  "Not Completed": "#DC2626",
};

const calculateTaskStats = (tasksData) => {
  const totalStats = {
    Pending: 0,
    Completed: 0,
    "Not Completed": 0,
  };

  const categoryStats = {};

  tasksData.forEach((taskObj) => {
    const catName = taskObj.category;
    if (!categoryStats[catName]) {
      categoryStats[catName] = {
        name: catName,
        Pending: 0,
        Completed: 0,
        "Not Completed": 0,
      };
    }

    taskObj.tasks.forEach((task) => {
      let status = "Pending";
      const now = new Date();

      const { date, endTime, isCompleted } = task;
      const fullDateTime = new Date(`${date}T${endTime || "23:59"}`);

      if (isCompleted) {
        status = "Completed";
      } else if (now > fullDateTime) {
        status = "Not Completed";
      }

      totalStats[status]++;
      categoryStats[catName][status]++;
    });
  });

  const pieData = Object.entries(totalStats)
    .filter(([, value]) => value > 0)
    .map(([name, value]) => ({ name, value, color: STATUS_COLORS[name] }));

  const barData = Object.values(categoryStats);

  return { pieData, barData, totalStats };
};

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
  const { tasksData } = useTask();

  const { pieData, barData, totalStats } = calculateTaskStats(tasksData);

  const totalTasks = Object.values(totalStats).reduce((a, b) => a + b, 0);
  const completedTasks = totalStats["Completed"] || 0;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  if (totalTasks === 0) {
    return (
      <div className="">
        <h2 className="text-xl lg:text-3xl font-bold text-[#061A40] mb-8 flex items-center">
          <BarChart3 className="mr-3 h-8 w-8" />
          Your Tasks Report
        </h2>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-12 rounded-2xl text-center shadow-lg">
          <div className="max-w-md mx-auto">
            <TrendingUp className="w-16 h-16 mx-auto mb-4 text-blue-500 animate-pulse" />
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              No Data Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create some tasks to see your productivity insights and analytics
              here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" space-y-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-[#061A40] mb-8 flex items-center">
        <BarChart3 className="mr-3 h-8 w-8" />
        Your Tasks Report
      </h2>
      <StatCards
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        completionRate={completionRate}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CPieChart
          pieData={pieData}
          renderCustomizedLabel={renderCustomizedLabel}
        />
        <CBarChart barData={barData} STATUS_COLORS={STATUS_COLORS} />
      </div>
      <DetailedBreakdown pieData={pieData} />
    </div>
  );
};

export default TasksChart;
