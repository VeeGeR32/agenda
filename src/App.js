import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import Application from "./pages/Application";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todo from "./App/TODO/Todo";
// Importez d'autres pages ici

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/application" element={<Application />} />
          <Route path="/account" element={<Account />} />
          <Route path="/todo" element={<Todo />} />

        </Routes>
    </BrowserRouter>
  );
}

export default App;
