import {
  AlertCircle,
  CheckCircle,
  PartyPopper,
  XCircle,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  EmptyState,
  QuizModuleShell,
  QuizNavbar,
  ResultCard,
  StatisticCard,
} from "../../components/quiz/QuizUI";

export default function QuizResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state;

  if (!result) {
    return (
      <QuizModuleShell className="py-8">
        <EmptyState
          title="No result available"
          description="This page needs a completed quiz submission. Start a new AI quiz to generate a fresh result snapshot."
          actionLabel="Go to Quiz Home"
          onAction={() => navigate("/quiz")}
        />
      </QuizModuleShell>
    );
  }

  const wrongQuestions = result.wrongQuestions || [];

  return (
    <QuizModuleShell className="pb-12 pt-8">
      <QuizNavbar
        title="Quiz Result"
        subtitle="A premium result screen with polished feedback, performance insight, and strong next actions for the learner."
      />

      <div className="mb-6 flex justify-center">
        <div className="inline-flex animate-float-soft items-center gap-3 rounded-full border border-indigo-200/80 bg-white/75 px-5 py-3 text-sm font-semibold text-indigo-700 shadow-sm">
          <PartyPopper className="h-4 w-4" />
          Celebration unlocked
        </div>
      </div>

      <ResultCard
        score={result.score}
        percentage={result.percentage}
        subject={result.subject}
        difficulty={result.difficulty}
      />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <StatisticCard
          label="Correct Answers"
          value={result.correctAnswers}
          helper="Questions answered correctly"
          icon="CheckCircle"
          accent="from-green-500 to-emerald-500"
        />

        <StatisticCard
          label="Wrong Answers"
          value={result.wrongAnswers}
          helper="Questions answered incorrectly"
          icon="XCircle"
          accent="from-red-500 to-orange-500"
        />

        <StatisticCard
          label="Accuracy"
          value={`${result.percentage}%`}
          helper="Overall quiz accuracy"
          icon="Target"
          accent="from-sky-500 to-violet-500"
        />
      </div>

      {/* Incorrect Answers Review */}
      <div className="mt-8 rounded-[2rem] border border-white/50 bg-white/70 p-6 shadow-[0_24px_80px_rgba(79,70,229,0.12)] backdrop-blur-xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />

              <h2 className="text-2xl font-black text-slate-950">
                Review Incorrect Answers
              </h2>
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review the questions you missed and compare your answer with the
              correct answer.
            </p>
          </div>

          <div className="w-fit rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-600">
            {wrongQuestions.length}{" "}
            {wrongQuestions.length === 1 ? "Mistake" : "Mistakes"}
          </div>
        </div>

        {wrongQuestions.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-green-200 bg-green-50/80 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-green-800">
                  Perfect score! 🎉
                </h3>

                <p className="mt-1 text-sm leading-6 text-green-700">
                  You answered every question correctly. Excellent work!
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            {wrongQuestions.map((item, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80"
              >
                {/* Question */}
                <div className="border-b border-slate-200/80 bg-slate-50/70 px-5 py-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-black text-red-600">
                      {index + 1}
                    </span>

                    <p className="pt-1 text-base font-bold leading-7 text-slate-900">
                      {item.question}
                    </p>
                  </div>
                </div>

                {/* Answers */}
                <div className="grid gap-4 p-5 md:grid-cols-2">
                  {/* Your Answer */}
                  <div className="rounded-2xl border border-red-200 bg-red-50/70 p-4">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />

                      <span className="text-xs font-bold uppercase tracking-wide text-red-600">
                        Your Answer
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-semibold leading-6 text-red-900">
                      {item.yourAnswer}
                    </p>
                  </div>

                  {/* Correct Answer */}
                  <div className="rounded-2xl border border-green-200 bg-green-50/70 p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />

                      <span className="text-xs font-bold uppercase tracking-wide text-green-600">
                        Correct Answer
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-semibold leading-6 text-green-900">
                      {item.correctAnswer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 rounded-[2rem] border border-white/50 bg-white/70 p-6 shadow-[0_24px_80px_rgba(79,70,229,0.12)] backdrop-blur-xl">
        <h2 className="text-3xl font-black text-slate-950">Keep building consistency.</h2>
        <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
          Great effort! Review your answers, keep practicing consistently, and challenge
          yourself with more quizzes to improve your score.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => navigate("/quiz")}
            className="rounded-2xl bg-[linear-gradient(135deg,#38bdf8,#6366f1,#a855f7)] px-5 py-3 font-semibold text-white shadow-[0_18px_50px_rgba(79,70,229,0.28)] transition hover:scale-[1.01]"
          >
            Play Again
          </button>
          <button
            type="button"
            onClick={() => navigate("/quiz/leaderboard")}
            className="rounded-2xl border border-white/60 bg-white/85 px-5 py-3 font-semibold text-slate-700 transition hover:bg-white"
          >
            View Leaderboard
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="rounded-2xl border border-white/60 bg-white/85 px-5 py-3 font-semibold text-slate-700 transition hover:bg-white"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </QuizModuleShell>
  );
}
