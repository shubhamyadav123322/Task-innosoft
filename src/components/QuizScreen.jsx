import { ChevronLeft, ChevronRight, Send, Clock } from "lucide-react";
import { questions } from "@/data/questions";

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function QuizScreen({
  state,
  onSelect,
  onNext,
  onPrev,
  onGoTo,
  onSubmit,
}) {
  const q = questions[state.currentIndex];
  const isLast = state.currentIndex === questions.length - 1;
  const isFirst = state.currentIndex === 0;
  const isLowTime = state.timeRemaining <= 60;

  const answeredCount = state.answers.filter((a) => a !== null).length;

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Timer + progress header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-slate-600">
            Question {state.currentIndex + 1} / {questions.length}
          </span>
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-semibold text-lg tabular-nums transition-colors ${
              isLowTime
                ? "bg-red-50 text-red-600 border border-red-200 animate-pulse"
                : "bg-white text-slate-800 border border-slate-200"
            }`}
          >
            <Clock className="w-5 h-5" />
            {formatTime(state.timeRemaining)}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-slate-200 rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-slate-700 rounded-full transition-all duration-300"
            style={{
              width: `${((state.currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-6">
            {q.question}
          </h2>

          <div className="space-y-3">
            {q.options.map((option, i) => {
              const selected = state.answers[state.currentIndex] === i;
              return (
                <button
                  key={i}
                  onClick={() => onSelect(state.currentIndex, i)}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-150 flex items-center gap-3 ${
                    selected
                      ? "border-slate-800 bg-slate-50"
                      : "border-slate-200 hover:border-slate-400 bg-white"
                  }`}
                >
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                      selected
                        ? "bg-slate-800 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-slate-700 text-sm sm:text-base">
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 gap-3">
          <button
            onClick={onPrev}
            disabled={isFirst}
            className="flex items-center gap-1 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium text-sm hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <button
            onClick={onSubmit}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-800 text-white font-medium text-sm hover:bg-slate-900 transition-colors"
          >
            <Send className="w-4 h-4" />
            Submit
          </button>

          <button
            onClick={onNext}
            disabled={isLast}
            className="flex items-center gap-1 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium text-sm hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Question palette */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-600">
              Question Palette
            </span>
            <span className="text-xs text-slate-400">
              {answeredCount} answered
            </span>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {questions.map((_, i) => {
              const answered = state.answers[i] !== null;
              const isCurrent = i === state.currentIndex;
              return (
                <button
                  key={i}
                  onClick={() => onGoTo(i)}
                  className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                    isCurrent
                      ? "ring-2 ring-slate-800 ring-offset-1 bg-slate-800 text-white"
                      : answered
                      ? "bg-slate-200 text-slate-700 hover:bg-slate-300"
                      : "bg-white border border-slate-200 text-slate-500 hover:border-slate-400"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
// Created by Shubham Yadav