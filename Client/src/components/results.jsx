import React from "react";
import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");
  const { score, total, results } = location.state || {};

  useEffect(() => {
    setUsername(localStorage.getItem("loggedInUser") || "Guest");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-bl from-gray-600 to-gray-900 w-full min-h-screen m-0 p-0  ">
       <nav className=" bg-white font-semibold flex justify-between items-center p-4 text-black">
        <div className="logo text-3xl ml-5 font-bold text-blue-400"><span className="text-orange-400">Quizz</span>Buzz</div>
         <div className="pr-4 relative">
          <div
            className="flex items-center shadow-lg rounded-full bg-gray-200 cursor-pointer"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <img
              src="/images/user.png"
              alt="User Icon"
              className="w-12 h-12 rounded-full ml-2 cursor-pointer hover:opacity-80 transition-opacity duration-300"
            />
            <p className="mr-3">{username}</p>
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-200 rounded-md shadow-lg py-2 z-50 cursor-pointer">
              <button
                className="block px-4 py-2 text-sm text-gray-700 w-full text-left cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
      <h1 className="text-center mt-5 text-3xl mb-6 text-white">Quiz Results</h1>
      <p className=" text-center mt-5 text-xl mb-4 text-white">Score: {score} / {total}</p>
      
      <div className="space-y-4">
        {results?.map((q) => (
          <div key={q.id} className="md:ml-115 md:m-10 p-4 border bg-gray-700 border-gray-700 rounded md:w-2xl shadow-md shadow-black">
            <p className="font-semibold text-white">{q.question}</p>
            <p className={`mt-2 ${q.isCorrect ? "text-green-400" : "text-red-400"}`}>
              Your answer: {q.selected || "Not answered"}
            </p>
            {!q.isCorrect && (
              <p className="text-yellow-400">Correct answer: {q.correctAnswer}</p>
            )}
          </div>
        ))}
      </div>
       <footer className="bg-gray-800 text-white p-4 text-center">
            <p>&copy; 2025 QuizzBuzz. All rights reserved.</p>      
        </footer>
    </div>
  );
};

export default Results;
