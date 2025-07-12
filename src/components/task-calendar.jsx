import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const TaskCalendar = ({ events }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  let taskStatus = "";
  let statusColor = "";
  const day = String(new Date().getDate()).padStart(2, "0");
  const newCurrentDate = Number(day);
  let newTaskDate;

  const handleEventClick = (clickInfo) => {
    const { title, start, extendedProps } = clickInfo.event;
    console.log(start);

    setSelectedTask({
      title,
      date: start.toLocaleDateString("en-CA"),
      ...extendedProps,
    });
  };

  if (selectedTask) {
    newTaskDate = Number(selectedTask.date.split("-")[2]);
    if (newCurrentDate < newTaskDate && !selectedTask.isCompleted) {
      taskStatus = "⏳ Pending";
      statusColor = "#F2AC20";
    } else if (newCurrentDate > newTaskDate && !selectedTask.isCompleted) {
      taskStatus = "❌ Not completed";
      statusColor = "#DC2626";
    } else if (newCurrentDate === newTaskDate && !selectedTask.isCompleted) {
      taskStatus = "⏳ Pending";
      statusColor = "#F2AC20";
    } else {
      taskStatus = "✅ Completed";
      statusColor = "#16A34A";
    }
  }

  console.log(taskStatus);

  return (
    <div className="w-fit overflow-x-auto mx-auto mb-10 bg-white font-jakarta">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          left: "title",
          center: "",
          right: "",
        }}
        height="auto"
        eventDisplay="block"
        eventClick={handleEventClick}
      />

      {selectedTask && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-xl font-bold mb-2">{selectedTask.title}</h2>
            <p className="text-sm text-gray-700 mb-1">
              📅 Date: {selectedTask.date}
            </p>
            <p className="text-sm text-gray-700 mb-4">
              📝 {selectedTask.description || "No description"}
            </p>
            {/* <p>🕒 {selectedTask.time || "No set time"}</p> */}
            <p className={`text-xs font-medium`} style={{ color: statusColor }}>
              {taskStatus}
            </p>
            <button
              onClick={() => setSelectedTask(null)}
              className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCalendar;
