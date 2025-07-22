import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "./card";
import React from "react";
import { Autoplay } from "swiper/modules";
import { ClipboardList } from "lucide-react";

const TasksSlides = ({ tasksData }) => {
  const currentDate = new Date().toISOString().split("T")[0];

  const todaysTasks =
    tasksData?.flatMap((category) =>
      category.tasks.filter((task) => task.date === currentDate)
    ) || [];

  return (
    <div className="w-full">
      {todaysTasks.length > 0 ? (
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
        <div className=" w-full p-6 bg-white rounded-lg shadow-lg text-center">
          <div className="mb-8 animate-bounce">
            <ClipboardList className="w-16 h-16 mx-auto mb-4 text-gray-400 animate-pulse" />
          </div>
          <p className="text-[#061A40] text-xl font-semibold">
            {" "}
            No tasks for today 😪
          </p>
        </div>
      )}
    </div>
  );
};

export default TasksSlides;
