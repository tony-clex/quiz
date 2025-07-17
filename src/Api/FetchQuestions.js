// src/api/fetchQuestions.js

export const fetchQuestions = async ({
  amount = 10,
  difficulty = "hard",
  type = "boolean"
} = {}) => {
  const API_URL = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}`;
  const response = await fetch(API_URL);

  if (response.status === 429) {
    throw new Error("Rate limit exceeded. Please wait before retrying.");
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch questions: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  if (!data.results || !Array.isArray(data.results)) {
    throw new Error("Invalid data format received from API.");
  }

  return data.results.map((q, index) => ({
    id: index + 1,
    question: q.question,
    correct_answer: q.correct_answer === "True",
    // Optionally include incorrect_answers, category, etc.
  }));
};
