import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  ClipboardList,
  CheckCircle,
  Target,
  PieChart as PieChartIcon,
  BarChart3,
  FileText,
  TrendingUp,
  Lightbulb,
} from "lucide-react";
import { useTask } from "../hooks/useTask";

const calculateTaskStats = (tasksData) => {
  const stats = { pending: 0, completed: 0, notCompleted: 0 };

  tasksData.forEach((category) => {
    category.tasks.forEach((task) => {
      if (task.isCompleted) {
        stats.completed++;
      } else {
        const now = new Date();
        const taskDate = new Date(task.date);

        if (task.endTime) {
          const [hours, minutes] = task.endTime.split(":");
          taskDate.setHours(parseInt(hours), parseInt(minutes));
        } else {
          taskDate.setHours(23, 59, 59, 999);
        }

        if (now > taskDate) {
          stats.notCompleted++;
        } else {
          stats.pending++;
        }
      }
    });
  });

  return [
    { name: "Pending", value: stats.pending, color: "#F2AC20" },
    { name: "Completed", value: stats.completed, color: "#16A34A" },
    { name: "Not Completed", value: stats.notCompleted, color: "#DC2626" },
  ].filter((item) => item.value > 0);
};

const calculateCategoryStats = (tasksData) => {
  const categoryStats = {};

  tasksData.forEach((category) => {
    const completed = category.tasks.filter((task) => task.isCompleted).length;
    const total = category.tasks.length;
    const pending = total - completed;

    categoryStats[category.category] = {
      name: category.category,
      completed,
      pending,
      total,
    };
  });

  return Object.values(categoryStats);
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

  const data = calculateTaskStats(tasksData);
  const categoryData = calculateCategoryStats(tasksData);

  const totalTasks = tasksData.reduce(
    (acc, category) => acc + category.tasks.length,
    0
  );
  const completedTasks = tasksData.reduce(
    (acc, category) =>
      acc + category.tasks.filter((task) => task.isCompleted).length,
    0
  );
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  if (totalTasks === 0) {
    return (
      <div className="mb-28">
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
    <div className="mb-28 space-y-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-[#061A40] mb-8 flex items-center">
        <BarChart3 className="mr-3 h-8 w-8" />
        Your Tasks Report
      </h2>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-lg md::text-xl font-bold text-[#061A40] mb-6 flex items-center">
            <PieChartIcon className="mr-2 h-5 w-5" />
            Task Status Distribution
          </h3>
          <div style={{ width: "100%", height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} tasks`, name]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-lg md:text-xl font-bold text-[#061A40] mb-6 flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            Progress by Category
          </h3>
          <div style={{ width: "100%", height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                />
                <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar dataKey="completed" fill="#16A34A" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="#F2AC20" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white py-6 px-4 md:px-6 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-[#061A40] mb-6 flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Detailed Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {data.map((entry, index) => (
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
    </div>
  );
};

export default TasksChart;
