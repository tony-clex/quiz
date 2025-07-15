import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../Context/QuizContext";
import { fetchQuestions } from "../../Api/FetchQuestions";
import "./LandingPage.module.css"

export default function LandingPage() {
  const { dispatch } = useQuiz(); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startQuiz = async () => {
    setLoading(true);
    setError(null);
    try {
      const questions = await fetchQuestions();
      dispatch({ type: "SET_QUESTIONS", payload: questions });
      navigate("/question/1"); 
    } catch (err) {
      setError(err.message || "Failed to load questions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Welcome to the Quiz</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={startQuiz} disabled={loading}>
        {loading ? "Loading..." : "Start Quiz"}
      </button>
    </div>
  );
}
