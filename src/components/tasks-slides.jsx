import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "./card";
import React from "react";
import { Autoplay } from "swiper/modules";

const TasksSlides = ({ tasksData }) => {
  const currentDate = new Date().toISOString().split("T")[0];

  // Collect all today's tasks from all categories
  const todaysTasks =
    tasksData?.flatMap((category) =>
      category.tasks.filter((task) => task.date === currentDate)
    ) || [];

  // Check if we have any tasks for today
  const hasTasks = todaysTasks.length > 0;

  return (
    <div className="w-full">
      {hasTasks ? (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="w-full"
        >
          {todaysTasks.map((task, index) => (
            <SwiperSlide key={`task-${index}`}>
              <Card {...task} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="text-black w-full p-6 bg-white rounded-lg shadow-md text-center">
          No tasks for today
        </div>
      )}
    </div>
  );
};

export default TasksSlides;
