import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Réinitialise le message d'erreur
    if (!login || !password) {
      setErrorMessage('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/login', {
        login, // email ou username
        password,
      });

      localStorage.setItem('token', response.data.token);
      navigate("/account");
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Invalid username or password'); // Message d'erreur générique pour le login
    }
  };

  const register = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {errorMessage && <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login">
              Email or Username
            </label>
            <input
              id="login"
              type="text" // Changez `type` en `text`
              placeholder="Email or Username" // Mettez à jour le `placeholder`
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-black hover:bg-black/80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Login
            </button>
            <button onClick={register} className="inline-block align-baseline font-bold text-sm text-black hover:text-black/80">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
