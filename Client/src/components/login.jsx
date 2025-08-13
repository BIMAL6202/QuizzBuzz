import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        alert("Please fill in all fields");
        return;
      }
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      const { success, message, jwtToken, name, email: loggedEmail, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        localStorage.setItem("loggedInEmail", loggedEmail);
        setTimeout(() => navigate("/quizPage"), 1000);
      } else if (error) {
        const details = error?.details?.[0]?.message || "An error occurred";
        handleError(details);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="bg-gradient-to-bl from-gray-600 to-gray-900 min-h-screen flex flex-col">
      
      <nav className="bg-white font-semibold flex justify-between items-center p-4 text-black">
        <div className="logo text-2xl sm:text-3xl font-bold text-blue-400">
          <span className="text-orange-400">Quizz</span>Buzz
        </div>
        <div className="relative">
          <img
            src="/images/user.png"
            alt="User Icon"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer hover:opacity-80 transition"
          />
        </div>
      </nav>
      <div className="flex flex-col-reverse md:flex-row justify-center items-center flex-grow px-4 py-8 md:px-12 lg:px-20 gap-8">
        
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center bg-gray-400 p-6 sm:p-8 rounded-lg shadow-lg shadow-black w-full max-w-md"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-black mb-6 text-center">
            Login to QuizzBuzz
          </h1>

          <input
            type="text"
            placeholder="UserEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
            className="p-2 mb-4 rounded-lg w-full bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <input
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="p-2 mb-4 rounded-lg w-full bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 mt-3 rounded-lg hover:bg-blue-400 transition"
          >
            Login
          </button>

          <p className="text-slate-600 text-sm mt-6 text-center">
            Don't have an account?
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline ml-1"
            >
              Sign up here
            </Link>
          </p>
        </form>
        <img
          src="/images/login_side_image.png"
          alt="Quiz"
          className="w-full max-w-sm sm:max-w-md md:max-w-lg object-cover"
        />
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center text-sm sm:text-base">
        <p>&copy; 2025 QuizzBuzz. All rights reserved.</p>
      </footer>

      <ToastContainer />
    </div>
  );
};

export default Login;
