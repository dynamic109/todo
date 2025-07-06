import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const NewTask = ({ isOpen, onClose, onSave, categories }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    text: "",
    date: "",
    category: "",
    time: "",
    isCompleted: false,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!taskData.title.trim()) newErrors.title = "Title is required";
    if (!taskData.text.trim()) newErrors.text = "Description is required";
    if (!taskData.date) newErrors.date = "Date is required";
    if (!taskData.time) newErrors.category = "Time is required";
    if (!taskData.category) newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));

    console.log(value);

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(taskData);
      setTaskData({
        title: "",
        text: "",
        date: new Date().toISOString().split("T")[0],
        category: "",
        time: new Date().getHours,
        isCompleted: false,
      });
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={taskData.time}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.time ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4265D6]`}
                  placeholder="Task time"
                />
                {errors.time && (
                  <p className="mt-1 text-xs text-red-500">{errors.time}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                      <option key={index} value={category.category}>
                        {category.category}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.category}
                    </p>
                  )}
                </div>
              </div>

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
