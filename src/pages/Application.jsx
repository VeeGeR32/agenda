import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ApplicationForm from "../components/ApplicationForm";

const Application = () => {
  
  return (
    <div className="h-screen flex flex-col justify-between">
      <Navbar />
      <ApplicationForm />
      <Footer />
    </div>
  );
};

export default Application;
