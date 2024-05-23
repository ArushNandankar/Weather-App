import React from "react";
import { ScaleLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <ScaleLoader color="#ffffff" />
    </div>
  );
};

export default Spinner;
