import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-[400px]">
      {/* <div className="w-10 h-10 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin flex justify-center items-center"> */}
      <div className="w-10 h-10  rounded-full border border-orange animate-[spin_.5s_linear_infinite] flex justify-center items-center">
        {/* <div className="w-[10px] h-[10px] rounded-2xl bg-orange animate-spin"></div> */}
        <div className="w-[10px] h-[10px]  bg-yellow-500 rounded-full animate-[pulse_1s_1s_linear_infinite]"></div>
        <div className="w-[10px] h-[10px]    bg-orange rounded-full  "></div>
        <div className="w-[10px] h-[10px]  bg-yellow-500 rounded-full  animate-[pulse_1s_linear_infinite]"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
