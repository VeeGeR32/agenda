import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

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
        <Link to={"/application"}>
            <IoIosArrowBack />
        </Link>
      </div>
      <div className="hidden md:block">
        <Link to={"/"}>
            <p className="logo">hupomone</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
