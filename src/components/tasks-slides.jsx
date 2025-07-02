import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "./card";
import React from "react";
import { Autoplay } from "swiper/modules";

const TasksSlides = ({ tasksData }) => {
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
    //   onSlideChange={() => console.log("slide change")}
    //   onSwiper={(swiper) => console.log(swiper)}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {tasksData?.map((data) => {
        const filteredTasks = data.tasks.filter(
          (task) => task.date === currentDate
        );

        return filteredTasks.map((task, index) => {
          //   console.log("Rendering task:", task);
          return (
            <SwiperSlide key={index}>
              <Card {...task} />
            </SwiperSlide>
          );
        });
      })}
    </Swiper>
  );
};

export default TasksSlides;
