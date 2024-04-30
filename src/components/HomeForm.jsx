import React from "react";
import './css/HomeForm.css'
import { Link } from "react-router-dom";

const HomeForm = () => {
  return (
  <div className="px-20 flex justify-center items-center flex-col">
    <h1 class="title text-center">exceed the limits of your potential</h1>
    <Link to={"/application"}>
      <button className="px-6 py-1 bg-black text-white border-none rounded-full text-[20px] font-medium">START</button>
    </Link>
  </div>
)};

export default HomeForm;
