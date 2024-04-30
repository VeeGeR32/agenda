import React, { useEffect, useState } from 'react';
import { MdArrowOutward } from "react-icons/md";
import "./css/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {

    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
    else {
      setIsLoggedIn(false);
    }
  } , []);
  return (
    <div className="flex items-center px-20 justify-between h-16">
      <div className="flex-shrink-0">
        <Link to={"/"}>
          <p className="logo">hupomone</p>
        </Link>
      </div>
      <div className="hidden md:block">
        <div className="ml-10 flex items-baseline space-x-4">
          <Link to={"/application"}>
            <p className="flex items-center border-b-2 border-transparent hover:border-black">Application</p>
          </Link>
          <Link to={"/account"}>
            <p className="flex items-center border-b-2 border-transparent hover:border-black gap-[2px]">
              Account {isLoggedIn && <span className="p-[3px] bg-green-500 rounded-full -mt-1"></span>}
            </p>
          </Link>
          <Link to={"/about"}>
            <p className="flex items-center border-b-2 border-transparent hover:border-black">About us <MdArrowOutward/></p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
