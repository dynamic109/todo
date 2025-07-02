import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const TaskCalendar = ({ events }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleEventClick = (clickInfo) => {
    const { title, start, extendedProps } = clickInfo.event;
    setSelectedTask({
      title,
      date: start.toISOString().split("T")[0],
      ...extendedProps,
    });
  };

//   console.log(events);
  return (
    <div className="w-fit overflow-x-auto mx-auto mb-28 bg-white">
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
              📝 {selectedTask.text || "No description"}
            </p>
            <p
              className={`text-xs font-medium ${
                selectedTask.isCompleted ? "text-green-600" : "text-red-600"
              }`}
            >
              {selectedTask.isCompleted ? "✅ Completed" : "⏳ Pending"}
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
