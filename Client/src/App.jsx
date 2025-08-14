import { useState } from 'react'

import './App.css'
import QuizPage from './components/quizPage'
import Login from './components/login'
import SignUp from './components/signup'
import QuizzBoard from './components/quizzBoard'
import LandingPage from './components/LandingPage'
import { Route, Routes } from 'react-router-dom'
import Results from './components/results'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/quizzBoard" element={<QuizzBoard />} />
        <Route path="/quizPage" element={<QuizPage />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </>
  )
}

export default App;
