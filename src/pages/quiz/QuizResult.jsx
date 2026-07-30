import { PartyPopper } from "lucide-react";
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
