import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTask } from "../hooks/useTask";

const NewTask = ({ isOpen, onClose }) => {
  const { addTask, getCategories } = useTask();
  const categories = getCategories();

  const [taskData, setTaskData] = useState({
    title: "",
    text: "",
    date: "",
    category: "",
    startTime: "",
    endTime: "",
  });
  const [newCategory, setNewCategory] = useState("");
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!taskData.title.trim()) newErrors.title = "Title is required";
    if (!taskData.text.trim()) newErrors.text = "Description is required";
    if (!taskData.date) newErrors.date = "Date is required";
    if (!taskData.startTime) newErrors.startTime = "Start time is required";
    if (!taskData.endTime) newErrors.endTime = "End time is required";
    if (taskData.endTime < taskData.startTime)
      newErrors.endTime = "End time is less than start time";
    if (!taskData.category && !newCategory.trim())
      newErrors.category = "Category is required";
    if (taskData.category === "new" && !newCategory.trim())
      newErrors.category = "Category name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));

    if (name === "category" && value === "new") {
      setShowNewCategory(true);
    } else if (name === "category") {
      setShowNewCategory(false);
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const finalCategory =
        taskData.category === "new" ? newCategory : taskData.category;

      addTask({ ...taskData, category: finalCategory });

      setTaskData({
        title: "",
        text: "",
        date: "",
        category: "",
        startTime: "",
        endTime: "",
      });
      setNewCategory("");
      setShowNewCategory(false);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl mx-4"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Create New Task
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={taskData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4265D6]`}
                  placeholder="Task title"
                />
                {errors.title && (
                  <p className="mt-1 text-xs text-red-500">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="text"
                  value={taskData.text}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-4 py-2 border ${
                    errors.text ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4265D6]`}
                  placeholder="Task description"
                ></textarea>
                {errors.text && (
                  <p className="mt-1 text-xs text-red-500">{errors.text}</p>
                )}
              </div>

              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={taskData.startTime}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${
                      errors.startTime ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4265D6]`}
                    placeholder="Task startTime"
                  />
                  {errors.startTime && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.startTime}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={taskData.endTime}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${
                      errors.endTime ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4265D6]`}
                    placeholder="Task endTime"
                  />
                  {errors.endTime && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.endTime}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={taskData.date}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${
                      errors.date ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4265D6]`}
                  />
                  {errors.date && (
                    <p className="mt-1 text-xs text-red-500">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={taskData.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${
                      errors.category ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4265D6]`}
                  >
                    <option value="">Select category</option>
                    {categories?.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                    <option value="new">+ Create New Category</option>
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.category}
                    </p>
                  )}
                </div>
              </div>

              {showNewCategory && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Category Name
                  </label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4265D6]"
                    placeholder="Enter category name"
                  />
                  {errors.category && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.category}
                    </p>
                  )}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#4265D6] hover:bg-[#3254C5] text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-md"
                >
                  Create Task
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewTask;
