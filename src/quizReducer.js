import { questions, TIME_LIMIT_SECONDS } from "@/data/questions";

export const initialState = {
  status: "idle",
  currentIndex: 0,
  answers: Array(questions.length).fill(null),
  timeRemaining: TIME_LIMIT_SECONDS,
  startTime: null,
};

export function quizReducer(state, action) {
  switch (action.type) {
    case "START":
      return {
        ...state,
        status: "active",
        startTime: Date.now(),
      };
    case "SELECT_ANSWER":
      return {
        ...state,
        answers: state.answers.map((ans, i) =>
          i === action.questionIndex ? action.answerIndex : ans
        ),
      };
    case "NEXT":
      return {
        ...state,
        currentIndex: Math.min(state.currentIndex + 1, questions.length - 1),
      };
    case "PREV":
      return {
        ...state,
        currentIndex: Math.max(state.currentIndex - 1, 0),
      };
    case "GO_TO":
      return {
        ...state,
        currentIndex: action.index,
      };
    case "TICK":
      if (state.status !== "active") return state;
      const newTime = state.timeRemaining - 1;
      if (newTime <= 0) {
        return {
          ...state,
          timeRemaining: 0,
          status: "submitted",
        };
      }
      return { ...state, timeRemaining: newTime };
    case "SUBMIT":
      return {
        ...state,
        status: "submitted",
      };
    case "RESTART":
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

export function calculateScore(state) {
  const total = questions.length;
  let score = 0;
  questions.forEach((q, i) => {
    if (state.answers[i] === q.correctAnswer) score++;
  });
  const percentage = Math.round((score / total) * 100);
  return { score, total, percentage };
}
