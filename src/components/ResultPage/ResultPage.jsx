// src/components/ResultsPage.jsx
import React from "react"
import { useQuiz } from "../../Context/QuizContext";
import { useNavigate } from "react-router-dom";
export default function ResultsPage() {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();

  const { questions, answers } = state;

  if (state.loading) return <p>Loading...</p>;

  const score = answers.reduce((acc, answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (question && question.correct_answer === answer.userAnswer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const restartQuiz = () => {
    dispatch({ type: "RESET_QUIZ" });
    navigate("/");
  };

  return (
    <div className="results-page">
      <h1>Your Results</h1>
      <p>
        You scored {score} out of {questions.length}
      </p>

      <ul>
        {questions.map((q, idx) => {
          const userAnswer = answers.find((a) => a.questionId === q.id)?.userAnswer;
          const isCorrect = userAnswer === q.correct_answer;
          return (
            <li key={q.id} style={{ marginBottom: "1rem" }}>
              <p dangerouslySetInnerHTML={{ __html: q.question }} />
              <p>
                Your answer: <strong>{String(userAnswer)}</strong> -{" "}
                {isCorrect ? "Correct" : "Incorrect"}
              </p>
              {!isCorrect && (
                <p>Correct answer: <strong>{String(q.correct_answer)}</strong></p>
              )}
            </li>
          );
        })}
      </ul>

      <button onClick={restartQuiz}>Start Again</button>
    </div>
  );
}
