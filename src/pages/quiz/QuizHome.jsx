import { createElement, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BrainCircuit, CheckCircle2, CircleHelp, Clock3, GraduationCap, LoaderCircle, Sparkles, Target, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";
import { DifficultyCard, QuizModuleShell, QuizNavbar, SubjectCard } from "../../components/quiz/QuizUI";
import { quizDifficulties, quizSubjects } from "../../data/quizData";
import { startQuiz } from "../../services/quizService";

const questionPresets = [5, 10, 15, 20, 25, 30, 40, 50];
const commonExams = ["NIMCET", "CUET PG", "SSC CGL", "GATE", "CAT", "Banking Exam"];
const examTypes = [
  { id: "college", title: "College Exam", description: "University subjects and course assessments.", icon: GraduationCap },
  { id: "competitive", title: "Competitive Exam", description: "General aptitude and competitive preparation.", icon: Trophy },
  { id: "specific", title: "Specific Exam", description: "Prepare for a named examination.", icon: Target },
];

export default function QuizHome() {
  const navigate = useNavigate();
  const subjectScrollerRef = useRef(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [customSubject, setCustomSubject] = useState("");
  const [examType, setExamType] = useState("college");
  const [examName, setExamName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const subject = customSubject.trim() || selectedSubject?.name || "";
  const selectedExamType = examTypes.find((item) => item.id === examType);
  const canStart = Boolean(subject && examType && difficulty && Number.isInteger(numberOfQuestions) && numberOfQuestions >= 5 && numberOfQuestions <= 50) && !isGenerating;
  const previewItems = useMemo(() => [
    { label: "Subject", value: subject || "Choose a subject" },
    { label: "Exam", value: examType === "specific" ? examName || "Choose exam" : selectedExamType?.title || "Choose exam type" },
    { label: "Difficulty", value: difficulty || "Choose level" },
    { label: "Questions", value: numberOfQuestions },
  ], [difficulty, examName, examType, numberOfQuestions, selectedExamType, subject]);

  const handleStartQuiz = async () => {
    if (!canStart) {
      setErrorMessage("Choose a subject, exam type, difficulty, and 5-50 questions before starting.");
      return;
    }
    if (examType === "specific" && !examName.trim()) {
      setErrorMessage("Enter or select an examination name to continue.");
      return;
    }
    try {
      setIsGenerating(true);
      setErrorMessage("");
      const data = await startQuiz({ subject, examType, examName: examType === "specific" ? examName.trim() : null, difficulty, numberOfQuestions });
      if (!data?.quizId || !Array.isArray(data.questions) || !data.expiresAt) throw new Error("The quiz response was incomplete. Please try again.");
      navigate("/quiz/play", { state: { quizId: data.quizId, questions: data.questions, subject: data.subject || subject, examType: data.examType || examType, examName: data.examName || (examType === "specific" ? examName.trim() : null), difficulty: data.difficulty || difficulty, totalQuestions: data.totalQuestions || data.questions.length, durationMinutes: data.durationMinutes, startedAt: data.startedAt, expiresAt: data.expiresAt } });
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || error?.response?.data?.error || error.message || "Failed to generate quiz. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const selectSubject = (value) => { setSelectedSubject(value); setCustomSubject(""); setErrorMessage(""); };

  return (
    <>
      <SEO title="Online Quizzes - CampusLink" description="Test your knowledge with interactive quizzes for college subjects on CampusLink." path="/quiz" />
      <QuizModuleShell className="pb-12 pt-8">
        <QuizNavbar title="AI Quiz" subtitle="Shape a quiz around your subject, examination, difficulty, and goals." actions={<button type="button" onClick={() => navigate("/quiz/leaderboard")} className="rounded-2xl border border-indigo-300/20 bg-white/10 px-5 py-3 font-semibold text-white transition hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/16">View Leaderboard</button>} />
        <section className="flex flex-col gap-8">
          <div className="relative overflow-hidden rounded-[2rem] border border-(--border) bg-[linear-gradient(180deg,#243039_0%,#1B252B_100%)] p-6 shadow-[0_20px_45px_rgba(0,0,0,0.35)] sm:p-8"><div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(5,150,105,0.08),transparent_35%)]" /><div className="relative"><div className="flex flex-wrap items-center gap-3"><span className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--tertiary) px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-(--primary-400)"><Sparkles className="h-4 w-4" /> AI Powered</span><span className="rounded-full border border-(--border) bg-(--surface) px-4 py-2 text-sm font-medium text-(--text)">{numberOfQuestions} Questions</span><span className="rounded-full border border-(--border) bg-(--surface) px-4 py-2 text-sm font-medium text-(--text)"><Clock3 className="mr-1 inline h-4 w-4" /> Backend timed</span></div><div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start"><div><h2 className="text-4xl font-black tracking-tight text-(--heading) sm:text-5xl">Generate Your Next AI Quiz</h2><p className="mt-4 max-w-2xl text-base leading-7 text-(--text)">Choose the exact practice context you need. The backend creates and times each quiz for you.</p></div><div className="rounded-[1.75rem] border border-(--border) bg-(--surface) p-5 shadow-[0_18px_45px_rgba(0,0,0,0.25)]"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--primary-400)">Quiz Summary</p><div className="mt-4 grid gap-3 sm:grid-cols-2">{previewItems.map((item) => <PreviewBlock key={item.label} label={item.label} value={item.value} />)}</div></div></div></div></div>

          <section className="rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_20px_45px_rgba(0,0,0,0.35)] sm:p-7"><StepLabel number="1" title="Choose Subject" description="Pick from CampusLink subjects or enter a new subject." /><div className="mt-5 flex flex-col gap-4 sm:flex-row"><input value={customSubject} onChange={(event) => { setCustomSubject(event.target.value); setSelectedSubject(null); setErrorMessage(""); }} placeholder="Enter a custom subject" className="flex-1 rounded-2xl border border-(--border) bg-(--tertiary) px-4 py-3 text-(--heading) outline-none focus:border-(--primary-500) focus:ring-4 focus:ring-(--primary-500)/20" />{customSubject && <button type="button" onClick={() => setCustomSubject("")} className="rounded-2xl border border-(--border) px-5 py-3 font-semibold text-(--text) transition hover:bg-(--tertiary)">Use list</button>}</div><div className="relative mt-5"><div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-16 items-center bg-[linear-gradient(90deg,var(--surface)_20%,transparent)]"><button type="button" aria-label="Show previous subjects" onClick={() => subjectScrollerRef.current?.scrollBy({ left: -320, behavior: "smooth" })} className="pointer-events-auto ml-1 rounded-full border border-emerald-300/40 bg-(--surface) p-3 text-emerald-300 transition hover:scale-105"><ArrowLeft className="h-5 w-5" /></button></div><div ref={subjectScrollerRef} className="flex gap-4 overflow-x-auto overflow-y-hidden overscroll-contain scroll-smooth px-1 pb-2">{quizSubjects.map((item) => <div key={item.id} className="flex w-[280px] shrink-0"><SubjectCard subject={item} selected={!customSubject && selectedSubject?.id === item.id} onSelect={selectSubject} /></div>)}</div><div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-16 items-center justify-end bg-[linear-gradient(270deg,var(--surface)_20%,transparent)]"><button type="button" aria-label="Show next subjects" onClick={() => subjectScrollerRef.current?.scrollBy({ left: 320, behavior: "smooth" })} className="pointer-events-auto mr-1 rounded-full border border-emerald-300/40 bg-(--surface) p-3 text-emerald-300 transition hover:scale-105"><ArrowRight className="h-5 w-5" /></button></div></div></section>

          <section className="rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_20px_45px_rgba(0,0,0,0.35)] sm:p-7"><StepLabel number="2" title="Choose Exam Type" description="Tell the AI what kind of examination you are preparing for." /><div className="mt-6 grid gap-4 md:grid-cols-3">{examTypes.map(({ id, title, description, icon }) => <button key={id} type="button" onClick={() => { setExamType(id); if (id !== "specific") setExamName(""); setErrorMessage(""); }} className={`group rounded-[1.5rem] border p-5 text-left transition duration-300 hover:-translate-y-1 ${examType === id ? "border-(--primary-500) bg-(--primary-500)/15 shadow-[0_18px_45px_rgba(16,185,129,0.18)]" : "border-(--border) bg-(--tertiary) hover:border-(--primary-500)"}`}>{createElement(icon, { className: "h-7 w-7 text-(--primary-400) transition group-hover:scale-110" })}<h3 className="mt-4 text-lg font-bold text-(--heading)">{title}</h3><p className="mt-2 text-sm leading-6 text-(--text)">{description}</p>{examType === id && <CheckCircle2 className="mt-4 h-5 w-5 text-(--primary-400)" />}</button>)}</div>{examType === "specific" && <div className="mt-5 animate-slide-up"><label className="text-sm font-semibold text-(--heading)" htmlFor="exam-name">Examination Name</label><div className="mt-2 flex flex-col gap-3 sm:flex-row"><select id="exam-name" value={commonExams.includes(examName) ? examName : "custom"} onChange={(event) => setExamName(event.target.value === "custom" ? "" : event.target.value)} className="rounded-2xl border border-(--border) bg-(--tertiary) px-4 py-3 text-(--heading) outline-none focus:border-(--primary-500)"><option value="custom">Custom Examination</option>{commonExams.map((name) => <option key={name} value={name}>{name}</option>)}</select><input value={examName} onChange={(event) => setExamName(event.target.value)} placeholder="Enter examination name" className="flex-1 rounded-2xl border border-(--border) bg-(--tertiary) px-4 py-3 text-(--heading) outline-none focus:border-(--primary-500)" /></div></div>}</section>

          <section className="rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_20px_45px_rgba(0,0,0,0.35)] sm:p-7"><StepLabel number="3" title="Set Difficulty and Length" description="Tune the challenge and choose between 5 and 50 questions." /><div className="mt-6 flex flex-wrap gap-3">{quizDifficulties.map((item) => <DifficultyCard key={item.id} difficulty={item} selected={difficulty === item.id} onSelect={setDifficulty} />)}</div><div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">{questionPresets.map((count) => <button key={count} type="button" onClick={() => setNumberOfQuestions(count)} className={`rounded-xl px-3 py-3 text-sm font-bold transition ${numberOfQuestions === count ? "bg-(--btn-primary) text-white shadow-lg" : "border border-(--border) bg-(--tertiary) text-(--heading) hover:border-(--primary-500)"}`}>{count}</button>)}</div></section>

          <section className="rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_20px_45px_rgba(0,0,0,0.35)] sm:p-7"><div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><StepLabel number="4" title="Generate Quiz" description="Review the summary above, then let AI build your private quiz session." /><div className="mt-4 flex items-center gap-2 text-sm text-(--text)"><CircleHelp className="h-4 w-4 text-(--primary-400)" /> Official scoring happens securely on the backend.</div></div><button type="button" disabled={!canStart} onClick={handleStartQuiz} className={`inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3.5 font-semibold transition ${canStart ? "bg-(--btn-primary) text-white shadow-[0_12px_30px_rgba(0,0,0,0.25)] hover:scale-[1.02] hover:bg-(--btn-primary-hover)" : "cursor-not-allowed bg-(--tertiary) text-(--text-disabled)"}`}>{isGenerating ? <><LoaderCircle className="h-4 w-4 animate-spin" /> Creating your quiz...</> : <>Generate Quiz <ArrowRight className="h-4 w-4" /></>}</button></div>{errorMessage && <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{errorMessage}<button type="button" onClick={handleStartQuiz} disabled={isGenerating} className="ml-3 font-bold underline">Retry</button></div>}</section>
        </section>
      </QuizModuleShell>
    </>
  );
}

function StepLabel({ number, title, description }) {
  return <div className="flex gap-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--btn-primary) font-bold text-white">{number}</span><div><h2 className="text-2xl font-black text-(--heading)">{title}</h2><p className="mt-1 text-(--text)">{description}</p></div></div>;
}

function PreviewBlock({ label, value }) {
  return <div className="min-w-0 rounded-[1.2rem] bg-white/8 p-3"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p><p className="mt-2 truncate font-semibold text-white">{value}</p></div>;
}