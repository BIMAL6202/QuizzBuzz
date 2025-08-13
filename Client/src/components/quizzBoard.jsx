import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizBoard = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600); 
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");

  
 useEffect(() => {
    fetch("http://localhost:5000/auth/questions")
      .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to fetch questions");
        }
        return res.json();
      })
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  useEffect(() => {
      setUsername(localStorage.getItem("loggedInUser") || "Guest");
    }, []);

 
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit(); 
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  
  const handleOptionSelect = (questionId, selectedOption) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a._id === questionId);
      if (existing) {
        return prev.map((a) =>
          a._id === questionId ? { ...a, selected: selectedOption } : a
        );
      } else {
        return [...prev, { _id: questionId, selected: selectedOption }];
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/questions/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      if (!res.ok) {
        throw new Error("Error submitting quiz");
      }

      const data = await res.json();
      navigate("/results", { state: data });
    } catch (err) {
      console.error("Error submitting quiz:", err);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  
  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (questions.length === 0) return <p className="text-white">Loading quiz...</p>;

  const currentQuestion = questions[currentIndex];
  const selectedAnswer =
    answers.find((a) => a._id === currentQuestion._id)?.selected || "";

  return (
    <div className="bg-gradient-to-bl from-gray-600 to-gray-900 min-h-screen m-0 p-0 text-white ">
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
      <div className="m-10 flex justify-between items-center mb-4 mt-15">
        <h2 className="text-xl font-bold">Quiz Time!</h2>
        <p className="text-lg">Time Left: {minutes}m : {seconds}s</p>
      </div>

      <div className=" m-10 bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">
          Q{currentIndex + 1}. {currentQuestion.question}
        </h3>
        <div className="space-y-2">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() =>
                handleOptionSelect(currentQuestion._id, option)
              }
              className={`block w-full text-left p-2 rounded ${
                selectedAnswer === option
                  ? "bg-blue-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="m-15 flex justify-between mt-6">
        <button
          onClick={prevQuestion}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        {currentIndex < questions.length - 1 ? (
          <button
            onClick={nextQuestion}
            className="px-4 py-2 bg-blue-600 rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 rounded"
          >
            Submit
          </button>
        )}
      </div>
       <footer className="bg-gray-800 text-white p-4 text-center">
            <p>&copy; 2025 QuizzBuzz. All rights reserved.</p>      
        </footer>
    </div>
  );
};

export default QuizBoard;
