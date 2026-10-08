import { useEffect, useReducer, useRef } from "react";
import { questions, TIME_LIMIT_SECONDS } from "@/data/questions";
import { quizReducer, initialState } from "@/quizReducer";
import StartScreen from "@/components/StartScreen";
import QuizScreen from "@/components/QuizScreen";
import ResultScreen from "@/components/ResultScreen";

const STORAGE_KEY = "assessment-state";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw);
    if (parsed.status === "active" && parsed.startTime) {
      const elapsed = Math.floor((Date.now() - parsed.startTime) / 1000);
      const remaining = TIME_LIMIT_SECONDS - elapsed;
      if (remaining <= 0) {
        return { ...parsed, status: "submitted", timeRemaining: 0 };
      }
      return { ...parsed, timeRemaining: remaining };
    }
    return parsed;
  } catch {
    return initialState;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(quizReducer, undefined, loadState);
  const timerRef = useRef(null);

  // Persist to localStorage on every state change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Countdown timer
  useEffect(() => {
    if (state.status !== "active") {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state.status]);

  const hasProgress =
    state.status === "active" && state.answers.some((a) => a !== null);

  return (
    <>
      {state.status === "idle" && (
        <StartScreen
          numQuestions={questions.length}
          timeLimitMinutes={TIME_LIMIT_SECONDS / 60}
          hasProgress={hasProgress}
          onStart={() => dispatch({ type: "START" })}
        />
      )}

      {state.status === "active" && (
        <QuizScreen
          state={state}
          onSelect={(qi, ai) =>
            dispatch({
              type: "SELECT_ANSWER",
              questionIndex: qi,
              answerIndex: ai,
            })
          }
          onNext={() => dispatch({ type: "NEXT" })}
          onPrev={() => dispatch({ type: "PREV" })}
          onGoTo={(index) => dispatch({ type: "GO_TO", index })}
          onSubmit={() => dispatch({ type: "SUBMIT" })}
        />
      )}

      {state.status === "submitted" && (
        <ResultScreen
          state={state}
          onRestart={() => {
            localStorage.removeItem(STORAGE_KEY);
            dispatch({ type: "RESTART" });
          }}
        />
      )}
    </>
  );
}
// Created By Shubham Yadav