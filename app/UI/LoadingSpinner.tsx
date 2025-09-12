import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-[400px]">
      <div className="w-10 h-10 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
