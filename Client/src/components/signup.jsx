import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/login"), 2000);
      } else if (error) {
        handleError(error?.details?.[0]?.message || "An error occurred");
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message);
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
      <div className="flex-grow flex flex-col-reverse md:flex-row items-center justify-center p-6 gap-6">
        <form
          onSubmit={handleSignUp}
          className="w-full max-w-md bg-gray-400 rounded-lg shadow-lg shadow-black p-6 sm:p-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-black mb-6 text-center">
            Sign Up for QuizzBuzz
          </h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder="Name"
            className="p-2 mb-4 rounded-lg w-full bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-2 mb-4 rounded-lg w-full bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-2 mb-4 rounded-lg w-full bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="p-2 mb-4 rounded-lg w-full bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white w-full py-2 mt-3 rounded-lg hover:bg-blue-400 transition-colors duration-300"
          >
            Sign Up
          </button>
          <p className="text-slate-700 text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline ml-1"
            >
              Login here
            </Link>
          </p>
          <ToastContainer />
        </form>
        <img
          src="/images/login_side_image.png"
          alt="Quiz"
          className="w-full max-w-sm sm:max-w-md md:max-w-lg object-cover"
        />
      </div>
      <footer className="bg-gray-800 text-white p-4 text-center text-sm sm:text-base">
        <p>&copy; 2025 QuizzBuzz. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SignUp;
