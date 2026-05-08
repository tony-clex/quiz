import React, { createContext, useReducer, useContext } from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  answers: [], 
  loading: true,
  error: null,
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SET_QUESTIONS":
      return { ...state, questions: action.payload, loading: false };
    case "ANSWER_QUESTION":
      return {
        ...state,
        answers: [...state.answers, action.payload],
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    case "RESET_QUIZ":
      return initialState;
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
