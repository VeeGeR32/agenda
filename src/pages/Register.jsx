import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      navigate("/account");
    }
  }, []);
  return (
    <div className='h-screen flex flex-col justify-between'>
      <Navbar />
      <RegisterForm/>
      <Footer />
    </div>
  );
};

export default Register;
