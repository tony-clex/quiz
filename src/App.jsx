// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QuizProvider, useQuiz } from "./Context/QuizContext";
import { fetchQuestions } from "./Api/FetchQuestions";

import LandingPage from "./components/LandinPage/LandingPage";
import QuestionPage from "./components/Question/Question";
import ResultsPage from "./components/ResultPage/ResultPage";

function QuizApp() {
  const { state, dispatch } = useQuiz();

  useEffect(() => {
    async function loadQuestions() {
      try {
        const questions = await fetchQuestions();
        dispatch({ type: "SET_QUESTIONS", payload: questions });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: err.message });
      }
    }

    loadQuestions();
  }, [dispatch]);

  return (
    
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/question/:questionNumber" element={<QuestionPage />} />
      <Route path="/results" element={<ResultsPage />} />
    </Routes>
    
  );
}

export default function App() {
  return (
    <QuizProvider>
      <Router>
        <QuizApp />
      </Router>
    </QuizProvider>
  );
}
