import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, LogOut, Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ConfirmationDialog, OptionCard, ProgressBar, QuestionCard, Timer, ToastNotification } from "../../components/quiz/QuizUI";
import { submitQuiz } from "../../services/quizService";

const optionLabels = ["A", "B", "C", "D"];

export default function QuizPlay() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const hasSubmitted = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(() => Array(state?.questions?.length || 0).fill(null));
  const [secondsRemaining, setSecondsRemaining] = useState(() => Math.max(0, Math.ceil((new Date(state?.expiresAt || 0).getTime() - Date.now()) / 1000)));
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const questions = useMemo(() => (state?.questions || []).map((question, index) => ({ id: index, question: question.question, options: question.options })), [state?.questions]);
  const currentQuestion = questions[currentIndex] || {};
  const selectedAnswer = answers[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const progress = questions.length ? ((currentIndex + 1) / questions.length) * 100 : 0;

  const handleSubmit = useCallback(async () => {
    if (hasSubmitted.current || submitting || !state?.quizId) return;
    hasSubmitted.current = true;
    setSubmitting(true);
    try {
      const result = await submitQuiz(state.quizId, answers);
      navigate("/quiz/result", { state: { ...result, subject: state.subject, examType: state.examType, examName: state.examName, difficulty: state.difficulty }, replace: true });
    } catch (error) {
      hasSubmitted.current = false;
      setSubmitting(false);
      setToast({ type: "error", title: "Submission Failed", message: error?.response?.data?.message || "Unable to submit quiz. Please try again." });
    }
  }, [answers, navigate, state, submitting]);

  useEffect(() => {
    if (!state?.quizId || !Array.isArray(state.questions) || !state.expiresAt) navigate("/quiz", { replace: true });
  }, [navigate, state]);

  useEffect(() => {
    if (!state?.expiresAt || secondsRemaining <= 0) {
      if (!state?.expiresAt) return undefined;
      const submitTimerId = window.setTimeout(handleSubmit, 0);
      return () => window.clearTimeout(submitTimerId);
    }
    const timerId = window.setTimeout(() => setSecondsRemaining(Math.max(0, Math.ceil((new Date(state.expiresAt).getTime() - Date.now()) / 1000))), 1000);
    return () => window.clearTimeout(timerId);
  }, [handleSubmit, secondsRemaining, state?.expiresAt]);

  if (!state?.quizId || !questions.length) return null;

  const handleSelect = (index) => setAnswers((previous) => previous.map((answer, questionIndex) => questionIndex === currentIndex ? index : answer));
  const handleNext = () => {
    if (selectedAnswer === null) {
      setToast({ type: "warning", title: "Select an answer first", message: "Choose one option before moving to the next question." });
      return;
    }
    setCurrentIndex((previous) => Math.min(previous + 1, questions.length - 1));
  };

  return (
    <div className="max-w-[1600px] py-4">
      <ToastNotification toast={toast} onClose={() => setToast(null)} />
      <ConfirmationDialog open={showExitDialog} title="Exit this quiz?" description="Your current progress will be lost if you leave this active session now." confirmLabel="Exit Quiz" onClose={() => setShowExitDialog(false)} onConfirm={() => navigate("/quiz", { replace: true })} />
      <div className="grid min-h-[calc(100vh-4rem)] gap-6 xl:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-6">
          <div className="rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_20px_45px_rgba(0,0,0,0.35)]"><div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"><div className="flex flex-wrap items-center gap-3"><span className="inline-flex items-center rounded-full border border-(--btn-primary)/30 bg-(--btn-primary)/15 px-4 py-2 text-sm font-semibold text-(--primary-400)">Question {currentIndex + 1} of {questions.length}</span><span className="inline-flex items-center rounded-full border border-(--border) bg-(--tertiary) px-4 py-2 text-sm font-medium text-(--text)">{state.subject} • {state.difficulty}</span><span className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--tertiary) px-4 py-2 text-sm font-medium text-(--text)"><Sparkles className="h-4 w-4 text-(--primary-400)" /> AI Generated Quiz</span></div><div className="flex flex-wrap items-center gap-3"><div className="rounded-2xl border border-(--border) bg-(--tertiary) px-4 py-2"><Timer secondsRemaining={secondsRemaining} /></div><button type="button" onClick={() => setShowExitDialog(true)} className="inline-flex items-center gap-2 rounded-2xl border border-(--border) bg-(--tertiary) px-5 py-3 font-semibold text-(--text) transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300"><LogOut className="h-4 w-4" /> Exit Quiz</button></div></div><div className="mt-6"><ProgressBar value={progress} /></div></div>
          <QuestionCard question={currentQuestion.question} index={currentIndex} total={questions.length} />
          <div className="grid gap-4 md:grid-cols-2">{currentQuestion.options?.map((option, index) => <OptionCard key={`${currentIndex}-${option}`} option={option} label={optionLabels[index]} selected={selectedAnswer === index} onClick={() => handleSelect(index)} />)}</div>
          <Navigation currentIndex={currentIndex} isLastQuestion={isLastQuestion} submitting={submitting} onPrevious={() => setCurrentIndex((previous) => Math.max(previous - 1, 0))} onNext={handleNext} onSubmit={handleSubmit} />
        </div>
        <aside className="rounded-[2rem] border border-white/50 bg-(--surface) p-5 shadow-[0_24px_80px_rgba(79,70,229,0.12)] backdrop-blur-xl"><p className="text-sm font-semibold uppercase tracking-[0.22em] text-indigo-700">Navigator</p><h3 className="mt-3 text-2xl font-black text-white">Track your flow</h3><div className="mt-5 grid grid-cols-5 gap-3">{questions.map((question, index) => <button key={question.id} type="button" onClick={() => setCurrentIndex(index)} className={`flex h-11 w-full items-center justify-center rounded-2xl text-sm font-bold transition ${index === currentIndex ? "bg-slate-950 text-white shadow-lg" : answers[question.id] !== null ? "bg-emerald-500/12 text-emerald-700" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>{index + 1}</button>)}</div><div className="mt-6 space-y-3 rounded-[1.6rem] bg-slate-950 p-5 text-white"><LegendDot color="bg-emerald-400" label="Answered" /><LegendDot color="bg-white" label="Current" /><LegendDot color="bg-slate-500" label="Unanswered" /></div></aside>
      </div>
      <div className="sticky bottom-3 mt-6 sm:hidden"><Navigation currentIndex={currentIndex} isLastQuestion={isLastQuestion} submitting={submitting} onPrevious={() => setCurrentIndex((previous) => Math.max(previous - 1, 0))} onNext={handleNext} onSubmit={handleSubmit} /></div>
    </div>
  );
}

function Navigation({ currentIndex, isLastQuestion, submitting, onPrevious, onNext, onSubmit }) {
  return <div className="flex items-center justify-between gap-4 rounded-[2rem] border border-white/50 bg-(--tertiary) p-4 shadow-[0_24px_80px_rgba(79,70,229,0.12)] backdrop-blur-xl"><button type="button" onClick={onPrevious} disabled={currentIndex === 0 || submitting} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"><ChevronLeft className="h-4 w-4" /> Previous</button>{!isLastQuestion ? <button type="button" onClick={onNext} disabled={submitting} className="inline-flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#38bdf8,#6366f1,#a855f7)] px-5 py-3 font-semibold text-white shadow-[0_18px_50px_rgba(79,70,229,0.28)] transition hover:scale-[1.01]">Next <ChevronRight className="h-4 w-4" /></button> : <button type="button" onClick={onSubmit} disabled={submitting} className="inline-flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#22c55e,#06b6d4,#6366f1)] px-5 py-3 font-semibold text-white shadow-[0_18px_50px_rgba(79,70,229,0.28)] transition hover:scale-[1.01]">{submitting ? "Submitting..." : "Submit Quiz"} <ChevronRight className="h-4 w-4" /></button>}</div>;
}

function LegendDot({ color, label }) {
  return <div className="flex items-center gap-3 text-sm"><span className={`h-3 w-3 rounded-full ${color}`} /><span>{label}</span></div>;
}
