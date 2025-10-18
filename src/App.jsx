import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QuizProvider } from "./Context/QuizContext";
import LandingPage from "./components/LandinPage/LandingPage";
import QuestionPage from "./components/Question/Question";
import ResultsPage from "./components/ResultPage/ResultPage";
import CategorySelection from "./components/Category/CategorySelection"; // import CategorySelection

function QuizApp() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/category" element={<CategorySelection />} /> {/* Added category route */}
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
