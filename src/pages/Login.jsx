import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
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
      <LoginForm/>
      <Footer />
    </div>
  );
};

export default Login;
