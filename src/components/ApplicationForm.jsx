import React from "react";
import { Link } from "react-router-dom";

const ApplicationForm = () => {
  return <div className="flex justify-center">
    <Link to={"/todo"}>
    <div className="hover:bg-black/10 backdrop-blur-md h-40 w-72 flex justify-center items-center rounded-md group border">
      <p className="group-hover:scale-100 scale-0 transition-all">TODO</p>
    </div>
    </Link>
    
  </div>;
};

export default ApplicationForm;