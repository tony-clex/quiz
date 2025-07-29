import React from "react";
import { useQuiz } from "../../Context/QuizContext";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import CategorySelection from "../Category/CategorySelection";

export default function QuestionPage() {
  const { state, dispatch } = useQuiz();
  const { currentQuestionIndex, questions, loading, error } = state;
  const { questionNumber } = useParams();
  const navigate = useNavigate();

  const questionIdx = Number(questionNumber) - 1;

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!questions || questions.length === 0)
    return <p>No questions available.</p>;
  if (questionIdx !== currentQuestionIndex) {
    if (currentQuestionIndex < questions.length) {
      return <Navigate to={`/question/${currentQuestionIndex + 1}`} replace />;
    } else {
      return <Navigate to="/results" replace />;
    }
  }

  const question = questions[questionIdx];
  if (!question) return <p>Question not found.</p>;

  const handleAnswer = (answer) => {
    dispatch({
      type: "ANSWER_QUESTION",
      payload: { questionId: question.id, userAnswer: answer },
    });

    if (questionIdx + 1 < questions.length) {
      navigate(`/question/${questionIdx + 2}`);
    } else {
      navigate("/results");
    }
  };

  return (
    <div className="question-page">
      <h2>
        Question {questionNumber} of {questions.length}
      </h2>
      <p dangerouslySetInnerHTML={{ __html: question.question }} />
      <div className="answer-buttons">
        <button onClick={() => handleAnswer(true)}>True</button>
        <button onClick={() => handleAnswer(false)}>False</button>
      </div>
    </div>
  );
}
