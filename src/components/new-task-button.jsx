import React from "react";

const NewTaskButton = ({ setIsNewTaskOpen }) => {
  return (
    <div className="max-w-[1200px] mx-auto w-full pr-24 lg:pr-24 z-50">
      <div className="w-fit ml-auto ">
        <button
          className="bg-[#4265D6] fixed bottom-22 py-3 px-3 h-fit rounded-md shadow-xl text-white hover:bg-[#3254C5] transition-all cursor-pointer"
          onClick={() => setIsNewTaskOpen(true)}
        >
          New Task +
        </button>
      </div>
    </div>
  );
};

export default NewTaskButton;
