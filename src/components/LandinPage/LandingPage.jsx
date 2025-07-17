import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../Context/QuizContext";
import { fetchQuestions } from "../../Api/FetchQuestions";
import "./LandingPage.module.css";

export default function LandingPage() {
  const { dispatch } = useQuiz();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startQuiz = async () => {
    setLoading(true);
    setError(null); // Reset error state before making a new request
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
    <div className="landingbox">
      <h1>Welcome to the Quiz Game!</h1>
      <p>
        Challenge yourself with 10 thought-provoking questions! To succeed,
        you need to answer at least 5 correctly. Test your knowledge and see if
        you have what it takes to pass!
      </p>

      {error && (
        <div style={{ color: "red", marginBottom: "20px" }}>
          <p>{error}</p>
        </div>
      )}

      <button onClick={startQuiz} disabled={loading} className="start-btn">
        {loading ? (
          <span>Loading...</span> // Optionally add a spinner here
        ) : (
          "Start Quiz"
        )}
      </button>
    </div>
  );
}
