import React, { useState,useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const LandingPage = () => {
  const [funFact, setFunFact] = useState("");

  const testimonials = [
          { name: "Sarah", text: "Fun, fast-paced, and addictive!" },
          { name: "James", text: "I learn something new every day." },
          { name: "Mia", text: "Love competing with friends!" }
        ]
  
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login"); 
  };

  const handleGetStarted = () => {
    navigate("/signup"); 
  };

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const letters = titleRef.current.querySelectorAll(".letter");
        gsap.fromTo(
          letters,
          { y: -100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "bounce.out",
          }
        );
      }
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { x: -200, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 2,
            delay: 1.5,
            ease: "power3.out",
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    fetch("https://uselessfacts.jsph.pl/random.json?language=en")
      .then(res => res.json())
      .then(data => setFunFact(data.text))
      .catch(() => setFunFact("Fun fact loading..."));
  }, []);

  return (
    <div className="bg-gradient-to-bl from-gray-600 to-gray-900 min-h-screen m-0 p-0">
      <nav className=" bg-white font-semibold flex justify-between items-center p-4 text-black">
        <div className="logo text-3xl ml-5 font-bold text-blue-400"><span className="text-orange-400">Quizz</span>Buzz</div>
        <div className="pr-4">
          <button 
          onClick={handleLogin}
          className="text-blue-700 hover:text-blue-300 transition-colors duration-300 cursor-pointer font-bold">
            LOGIN
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-xl ml-4 hover:bg-blue-400 transition-colors duration-300 cursor-pointer"
          onClick={handleGetStarted}>
            GET STARTED <span className="text-xl text-bold">&rarr;</span>
          </button>
        </div>
      </nav>
      <header className="py-8 m-auto">
        <h1
          className="title text-5xl sm:text-6xl md:text-7xl flex justify-center text-orange-400 text-center"
          ref={titleRef}
        >
          {Array.from("Quizz").map((letter, i) => (
            <span key={i} className="letter inline-block">
              {letter}
            </span>
          ))}
          <span className="letter inline-block text-blue-300">B</span>
          {Array.from("uzz").map((letter, i) => (
            <span key={i} className="letter inline-block text-blue-300">
              {letter}
            </span>
          ))}
        </h1>

        <p
          className="text-lg sm:text-xl md:text-2xl mt-6 text-center font-semibold text-orange-200"
          ref={subtitleRef}
        >
          Test your knowledge, beat the clock, and top the leaderboard!
        </p>
      </header>
      <main>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-4 mt-10">
          <p className="text-white text-lg sm:text-xl md:text-4xl md:mt-8 sm:mt-5">
            Test your <span className="text-yellow-300 font-bold">
              Knowledge</span> in history, science, sports, and more!
            <br />
            Think fast, learn new facts, and climb the leaderboard.
          </p>
          <img
            src="/images/side.jpg"
            alt="Illustration"
            className="w-full max-w-md mx-auto rounded-xl shadow-lg object-cover"
          />
          <button
            onClick={handleGetStarted}
            className="button w-50 bg-blue-500 h-10 m-0 text-white px-4 rounded-xl inline-block hover:bg-blue-400 relative lg:bottom-20 hover:scale-105 transition-transform duration-300 cursor-pointer font-semibold"
          >
            GET STARTED <span className="text-xl text-bold">&rarr;</span>
          </button>
        </div>
        <div className="bg-white mt-15 py-10">
          <h1 className="text-3xl sm:text-4xl text-black text-center p-2 font-bold">
            How it Works?
          </h1>
          <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-6 mt-10">
              <div className="flex flex-col items-center">
                <img
                  src="/images/userLogin.jpg"
                  alt= "user image"
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full shadow-lg shadow-black transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-2 object-cover"
                />
                <p className="mt-6 text-center font-semibold text-lg">
                  1. Register / Login
                </p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images/timer.png"
                  alt= "timer image"
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full shadow-lg shadow-black transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-2 object-cover"
                />
                <p className="mt-6 text-center font-semibold text-lg">
                  2. Start the Quiz
                </p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images/results.jpg"
                  alt= "results image"
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full shadow-lg shadow-black transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-2 object-cover"
                />
                <p className="mt-6 text-center font-semibold text-lg">
                  3. View Results
                </p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images/leaderboard.jpeg"
                  alt= "leaderboard image"
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full shadow-lg shadow-black transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-2 object-cover"
                />
                <p className="mt-6 text-center font-semibold text-lg">
                  4. Check Leaderboard
                </p>
              </div>
          </div>
        </div>
      <section className="text-white p-8">
        <h3 className="text-2xl font-bold mb-2 text-center">Fun Fact of the Day</h3>
        <p className=" p-4 rounded text-center">{funFact}</p>
      </section>
      <hr className="border-t border-gray-600 my-8"></hr>
      <div className=" py-12">
      <h2 className="text-3xl font-bold text-center text-white mb-8">----- What <span className="bg-amber-300 text-gray-700 p-2 rounded">Players</span> Say-----</h2>
      <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-6">
        {testimonials.map((review, idx) => (
          <div key={idx} className="bg-gray-800 p-6 rounded-lg shadow-lg text-center text-white">
            <p className="italic">"{review.text}"</p>
            <p className="mt-4 font-bold">- {review.name}</p>
          </div>
              ))}
        </div>
      </div>
          <div className=" py-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4"><span className="bg-amber-300 text-gray-700 p-2 rounded">Upcoming</span>  Challenge</h2>
          <p className="text-lg mb-6">“Mega GK Marathon” – 50 Questions, 5 Minutes, Big Rewards!</p>
          <button className="bg-orange-500 px-6 py-3 rounded-lg hover:bg-orange-400 cursor-pointer">
            Join Challenge
          </button>
        </div>
      </main>
      <footer className="text-center py-6 bg-gray-900">
        <p className="text-sm text-gray-400">
          © 2025 QuizzBuzz. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
