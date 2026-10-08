import { Brain, Clock, ListChecks, Play } from "lucide-react";

export default function StartScreen({
  numQuestions,
  timeLimitMinutes,
  hasProgress,
  onStart,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-slate-800 px-6 py-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-700 mb-4">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Assessment Task App innosoft</h1>
          <p className="text-slate-300 text-sm mt-1">
            Test your knowledge in web development
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl py-4">
              <ListChecks className="w-6 h-6 text-slate-700" />
              <span className="text-2xl font-bold text-slate-800">
                {numQuestions}
              </span>
              <span className="text-xs text-slate-500 uppercase tracking-wide">
                Questions
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl py-4">
              <Clock className="w-6 h-6 text-slate-700" />
              <span className="text-2xl font-bold text-slate-800">
                {timeLimitMinutes}
              </span>
              <span className="text-xs text-slate-500 uppercase tracking-wide">
                Minutes
              </span>
            </div>
          </div>

          {hasProgress && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center text-sm text-amber-800">
              You have an assessment in progress. Click below to continue.
            </div>
          )}

          <button
            onClick={onStart}
            className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 rounded-xl transition-colors duration-200"
          >
            <Play className="w-5 h-5" />
            {hasProgress ? "Continue Assessment" : "Start Assessment"}
          </button>
        </div>
      </div>
    </div>
  );
}
// Created by shubham Yadav