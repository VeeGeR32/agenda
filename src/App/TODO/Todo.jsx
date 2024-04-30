import Navbar from "../components/Navbar";
import TodoApp from "./components/TodoApp";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Todo = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  
  return (
    <div>
      <Navbar/>
      <TodoApp/>
    </div>
  );
};

export default Todo;
