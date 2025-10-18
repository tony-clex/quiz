import React from "react";
import { useQuiz } from "../../Context/QuizContext";
import { useNavigate } from "react-router-dom";
export default function ResultsPage() {
 const { state, dispatch } = useQuiz();
 const navigate = useNavigate();

 const { questions, answers, loading } = state;

 if (loading) return <p>Loading...</p>;
 if (!questions || !answers) return <p>Something went wrong. Please try again.</p>;

 const score = answers.reduce((acc, answer) => {  const question = questions.find((q) => q.id === answer.questionId);
 return question?.correct_answer === answer.userAnswer ? acc + 1 : acc;
 }, 0);

const didUserWin = () => {
 const percentage = (score / questions.length) * 100;
return percentage >= 70;
};

 const restartQuiz = () => {
 dispatch({ type: "RESET_QUIZ" });
 navigate("/");
 };

 return (
 <div className="resultsPag">
 <h1>Your Results</h1>
 <p>
 You scored {score} out of {questions.length} (
 {Math.round((score / questions.length) * 100)}%)
 </p>

 {didUserWin() ? (
 <h2 style={{ color: "green" }}>🎉 Congratulations, you won!</h2>
 ) : (
 <h2 style={{ color: "red" }}>😢 Better luck next time!</h2>
 )}

 <ul>
 {questions.map((q) => {
const userAnswer = answers.find((a) => a.questionId === q.id)?.userAnswer;
 const isCorrect = userAnswer === q.correct_answer;
 return (
 <li key={q.id} style={{ marginBottom: "1rem" }}>
 <p dangerouslySetInnerHTML={{ __html: q.question }} /> <p>
 Your answer:{" "}
 <strong style={{ color: isCorrect ? "green" : "red" }}>
 {userAnswer ?? "No answer"}
 </strong>{" "}
 - {isCorrect ? "Correct" : "Incorrect"}
 </p>
 {!isCorrect && (
 <p>
 Correct answer:{" "}
 <strong>{String(q.correct_answer)}</strong>
 </p>
 )}
 </li>
 );
 })}
 </ul>

 <button onClick={restartQuiz}>Start Again</button>
 </div>
 );
}
