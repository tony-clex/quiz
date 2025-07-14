// src/components/QuestionPage.jsx
import React, { useEffect } from "react";
import { useQuiz } from "../../Context/QuizContext";
import { useParams, useNavigate } from "react-router-dom";

export default function QuestionPage() {
  const { state, dispatch } = useQuiz();
  const { currentQuestionIndex, questions, answers } = state;
  const { questionNumber } = useParams();
  const navigate = useNavigate();

  const questionIdx = Number(questionNumber) - 1;

  useEffect(() => {
    // Prevent user from accessing questions out of order or going back
    if (questionIdx > currentQuestionIndex) {
      navigate(`/question/${currentQuestionIndex + 1}`, { replace: true });
    }
    if (questionIdx < currentQuestionIndex) {
      navigate(`/question/${currentQuestionIndex + 1}`, { replace: true });
    }
  }, [questionIdx, currentQuestionIndex, navigate]);

  if (state.loading) return <p>Loading questions...</p>;
  if (state.error) return <p>Error: {state.error}</p>;

  const question = questions[questionIdx];
  if (!question) return <p>Question not found.</p>;

  const handleAnswer = (answer) => {
    dispatch({
      type: "ANSWER_QUESTION",
      payload: { questionId: question.id, userAnswer: answer },
    });

    // Navigate to next question or results
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
