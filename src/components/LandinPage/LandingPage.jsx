// src/components/LandingPage.jsx
import React from "react";
import { useQuiz } from "../../Context/QuizContext";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const { dispatch } = useQuiz();

  const startQuiz = () => {
    dispatch({ type: "RESET_QUIZ" });
    navigate("/question/1");
  };

  return (
    <div className="landing-page">
      <h1>Welcome to the True or False Trivia Quiz!</h1>
      <p>You will be asked 10 true or false questions.</p>
      <p>Answer each question. You cannot go back once you answer.</p>
      <button onClick={startQuiz}>Start Quiz</button>
    </div>
  );
}
