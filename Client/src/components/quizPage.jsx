import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(localStorage.getItem("loggedInUser") || "Guest");
  }, []);

  const handleStartQuiz = () => {
    navigate("/quizzBoard");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  
  return (
    <div className="bg-gradient-to-bl from-gray-600 to-gray-900 min-h-screen m-0 p-0">
    
      <nav className="bg-white font-semibold flex justify-between items-center p-4 text-black relative">
        <div className="logo text-3xl ml-5 font-bold text-blue-400">
          <span className="text-orange-400">Quizz</span>Buzz
        </div>

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

      <header className="bg-gray-800 text-white p-4 text-center">
        <h1 className="text-4xl font-bold">Welcome to QuizzBuzz</h1>
        <p className="mt-2">Test your knowledge with our quizzes</p>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex justify-center items-center h-screen p-8 text-md md:text-lg">
        <div className="mt-20 bg-gray-400 p-8 rounded-lg shadow-xl shadow-black w-4xl mb-30">
          <h1 className="text-3xl text-center font-bold mb-5 text-blue-900">
            Quiz Instructions
          </h1>
          <ul className="list-decimal list-inside space-y-3 text-gray-900">
            <li>
              You will have <strong className="text-red-600">10 minutes</strong>{" "}
              to complete the quiz.
            </li>
            <li>
              The quiz consists of{" "}
              <strong className="text-red-600">20 questions</strong>.
            </li>
            <li>
              You can move between questions, but unanswered questions will be
              marked incorrect.
            </li>
            <li>Once submitted, you cannot change your answers.</li>
            <li>
              The quiz will automatically submit when the timer runs out.
            </li>
            <li>
              Refreshing or closing the page may cause loss of progress.
            </li>
            <li>
              Each correct answer awards{" "}
              <strong className="text-red-600">1 mark</strong>.
            </li>
            <li>No external help is allowed.</li>
          </ul>
        </div>
      </main>

      {/* START BUTTON */}
      <section className="flex justify-center item-center relative bottom-20">
        <button
          onClick={handleStartQuiz}
          className="cursor-pointer bg-gradient-to-br from-yellow-600 to-yellow-400 text-white px-6 py-3 shadow-lg rounded-4xl hover:brightness-90 transition-colors duration-300 hover:scale-105 transition-scale ease-in-out font-semibold"
        >
          Start Quiz
        </button>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2025 QuizzBuzz. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default QuizPage;
