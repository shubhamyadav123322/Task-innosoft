import { CheckCircle2, XCircle, RotateCcw, Trophy } from "lucide-react";
import { questions } from "@/data/questions";
import { calculateScore } from "@/quizReducer";

export default function ResultScreen({ state, onRestart }) {
  const { score, total, percentage } = calculateScore(state);
  const passed = percentage >= 50;

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Score summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div
            className={`px-6 py-8 text-center ${
              passed ? "bg-slate-800" : "bg-slate-700"
            }`}
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 mb-3">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {passed ? "Well Done!" : "Keep Practicing!"}
            </h2>
            <p className="text-slate-300 text-sm">
              You have completed the assessment
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center">
              <div className="py-3">
                <div className="text-3xl font-bold text-slate-800">{score}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide mt-1">
                  Score
                </div>
              </div>
              <div className="py-3 border-x border-slate-200">
                <div className="text-3xl font-bold text-slate-800">{total}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide mt-1">
                  Total
                </div>
              </div>
              <div className="py-3">
                <div className="text-3xl font-bold text-slate-800">
                  {percentage}%
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wide mt-1">
                  Percentage
                </div>
              </div>
            </div>

            <button
              onClick={onRestart}
              className="w-full mt-6 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 rounded-xl transition-colors duration-200"
            >
              <RotateCcw className="w-5 h-5" />
              Restart Assessment
            </button>
          </div>
        </div>

        {/* Review section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            Review Answers
          </h3>
          <div className="space-y-4">
            {questions.map((q, i) => {
              const userAnswer = state.answers[i];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`rounded-xl border-2 p-4 ${
                    isCorrect
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 text-sm sm:text-base">
                        {i + 1}. {q.question}
                      </p>
                      <div className="mt-2 space-y-1 text-sm">
                        <p className="text-slate-600">
                          <span className="font-medium text-slate-700">
                            Your answer:
                          </span>{" "}
                          {userAnswer !== null
                            ? q.options[userAnswer]
                            : "Not answered"}
                        </p>
                        {!isCorrect && (
                          <p className="text-green-700">
                            <span className="font-medium">Correct answer:</span>{" "}
                            {q.options[q.correctAnswer]}
                          </p>
                        )}
                      </div>
                      <span
                        className={`inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded-full ${
                          isCorrect
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
// Created By Shubham Yadav