export async function fetchQuestions() {
  const API_URL =
    "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean";

  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch questions");

  const data = await response.json();

  return data.results.map((q, index) => ({
    id: index + 1,
    question: q.question,
    correct_answer: q.correct_answer === "True",
  }));
}
