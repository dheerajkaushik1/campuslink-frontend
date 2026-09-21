import { createElement, useEffect, useMemo, useState } from "react";
import { Award, BookOpen, BrainCircuit, CalendarDays, CheckCircle2, ChevronRight, Clock3, FileQuestion, GraduationCap, Mail, RefreshCw, Target, Trophy, TrendingUp, UserRound, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { notify } from "../components/alertBus";

const statCards = [
  { key: "totalQuizzes", label: "Total Quizzes", description: "Completed AI sessions", icon: BrainCircuit, color: "from-cyan-500 to-blue-500" },
  { key: "totalQuestions", label: "Questions Attempted", description: "Across every quiz", icon: FileQuestion, color: "from-indigo-500 to-violet-500" },
  { key: "correctAnswers", label: "Correct Answers", description: "Knowledge in action", icon: CheckCircle2, color: "from-emerald-500 to-teal-500" },
  { key: "averagePercentage", label: "Average Score", description: "Your usual accuracy", icon: TrendingUp, color: "from-amber-500 to-orange-500", suffix: "%" },
  { key: "bestPercentage", label: "Best Score", description: "Your personal peak", icon: Trophy, color: "from-rose-500 to-pink-500", suffix: "%" },
];

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [examTypeFilter, setExamTypeFilter] = useState("all");
  const [sortFilter, setSortFilter] = useState("recent");

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await API.get("/profile/");
      setProfile(response.data);
    } catch (requestError) {
      console.error(requestError);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      notify("Please login first to view your profile.", "warning", "Login required");
      navigate("/login");
      return;
    }
    fetchProfile();
  }, [navigate]);

  const history = useMemo(() => profile?.recentHistory || [], [profile]);
  const filteredHistory = useMemo(() => {
    const filtered = history.filter((item) => (subjectFilter === "all" || item.subject === subjectFilter) && (difficultyFilter === "all" || item.difficulty?.toLowerCase() === difficultyFilter) && (examTypeFilter === "all" || item.examType === examTypeFilter));
    return [...filtered].sort((first, second) => {
      if (sortFilter === "highest") return (second.percentage || 0) - (first.percentage || 0);
      return new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime();
    });
  }, [difficultyFilter, examTypeFilter, history, sortFilter, subjectFilter]);

  if (loading) return <ProfileSkeleton />;
  if (error) return <ErrorState onRetry={fetchProfile} />;

  const user = profile?.user || {};
  const stats = profile?.stats || {};
  const subjects = profile?.subjectPerformance || [];
  const initials = (user.name || "CampusLink User").split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "CU";
  const average = Math.max(0, Math.min(100, Number(stats.averagePercentage) || 0));
  const totalQuestions = Number(stats.totalQuestions) || 0;
  const correctAnswers = Number(stats.correctAnswers) || 0;

  return (
    <main className="min-h-screen w-full bg-(--background) px-4 py-10 text-(--text)">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-(--border) bg-[linear-gradient(180deg,#243039_0%,#1B252B_100%)] p-6 shadow-[0_20px_55px_rgba(0,0,0,0.3)] md:p-10"><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(5,150,105,0.1),transparent_35%)]" /><div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"><div className="flex items-center gap-5"><div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[1.75rem] bg-[linear-gradient(135deg,#10B981,#047857)] text-3xl font-black text-white shadow-[0_12px_30px_rgba(16,185,129,0.25)]">{initials}</div><div><p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--primary-400)">Learning Dashboard</p><h1 className="mt-2 text-3xl font-black text-(--heading) md:text-5xl">{user.name || "CampusLink User"}</h1><p className="mt-2 text-lg text-(--text)">{user.occupation || "Student"}</p></div></div><div className="grid gap-3 text-sm sm:grid-cols-2"><Detail icon={Mail} value={user.email || "Not available"} /><Detail icon={GraduationCap} value={user.occupation || "Student"} /><Detail icon={CalendarDays} value={`Member since ${formatDate(user.createdAt)}`} /><Detail icon={Clock3} value={`Last active ${formatDate(user.lastLogin)}`} /></div></div></section>

        <section><SectionHeading icon={BrainCircuit} eyebrow="Performance Overview" title="Your progress at a glance" /><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{statCards.map((card) => <div key={card.key} className="group rounded-[1.5rem] border border-(--border) bg-(--surface) p-5 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-(--primary-500) hover:shadow-[0_20px_45px_rgba(16,185,129,0.12)]"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--text-muted)">{card.label}</p><p className="mt-3 text-3xl font-black text-(--heading)">{Number(stats[card.key]) || 0}{card.suffix || ""}</p><p className="mt-2 text-sm text-(--text)">{card.description}</p></div><span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} text-white transition group-hover:rotate-6`}>{createElement(card.icon, { className: "h-5 w-5" })}</span></div></div>)}</div></section>

        <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]"><div className="rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-lg md:p-8"><SectionHeading icon={Target} eyebrow="Overall Performance" title="Consistency compounds" /><div className="mt-8 flex flex-col items-center"><div className="relative flex h-52 w-52 items-center justify-center rounded-full" style={{ background: `conic-gradient(#10b981 ${average * 3.6}deg, rgba(148,163,184,0.16) 0deg)` }}><div className="absolute inset-4 flex flex-col items-center justify-center rounded-full bg-(--surface)"><span className="text-5xl font-black text-(--heading)">{average}%</span><span className="mt-1 text-sm text-(--text)">Average Score</span></div></div><div className="mt-6 grid w-full grid-cols-2 gap-3"><Metric label="Best Score" value={`${Number(stats.bestPercentage) || 0}%`} icon={Award} /><Metric label="Correct" value={`${correctAnswers} / ${totalQuestions}`} icon={CheckCircle2} /></div></div></div><div className="rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-lg md:p-8"><SectionHeading icon={BookOpen} eyebrow="Subject Performance" title="Where you are strongest" />{subjects.length === 0 ? <EmptyMessage icon={BookOpen} title="No subject data yet" text="Complete an AI quiz to start building your subject performance." /> : <div className="mt-6 grid gap-4 sm:grid-cols-2">{subjects.map((item) => <SubjectPerformance key={item.subject} item={item} />)}</div>}</div></section>

        <section className="rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-lg md:p-8"><div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><SectionHeading icon={Clock3} eyebrow="Quiz History" title="Recent Quiz History" /><div className="flex flex-wrap gap-3"><Filter value={subjectFilter} onChange={setSubjectFilter} label="All Subjects" options={[...new Set(history.map((item) => item.subject).filter(Boolean))]} /><Filter value={difficultyFilter} onChange={setDifficultyFilter} label="All Difficulties" options={[...new Set(history.map((item) => item.difficulty?.toLowerCase()).filter(Boolean))]} /><Filter value={examTypeFilter} onChange={setExamTypeFilter} label="All Exam Types" options={[...new Set(history.map((item) => item.examType).filter(Boolean))]} /><Filter value={sortFilter} onChange={setSortFilter} label="Recent" options={["highest"]} optionLabels={{ highest: "Highest Score" }} /></div></div>{history.length === 0 ? <EmptyMessage icon={BrainCircuit} title="No quizzes attempted yet" text="Start your first AI quiz and your performance will appear here." action={() => navigate("/quiz")} /> : filteredHistory.length === 0 ? <EmptyMessage icon={FileQuestion} title="No matching quizzes" text="Try adjusting the history filters." /> : <div className="mt-6 grid gap-4 lg:grid-cols-2">{filteredHistory.map((item) => <HistoryCard key={item._id} item={item} />)}</div>}</section>
      </div>
    </main>
  );
}

function SectionHeading({ icon, eyebrow, title }) { return <div className="flex items-start gap-3"><span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--btn-primary)/15 text-(--primary-400)">{createElement(icon, { className: "h-5 w-5" })}</span><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--primary-400)">{eyebrow}</p><h2 className="mt-2 text-2xl font-black text-(--heading) md:text-3xl">{title}</h2></div></div>; }
function Detail({ icon, value }) { return <div className="flex items-center gap-2 rounded-xl border border-(--border) bg-(--surface)/70 px-3 py-2 text-(--text)">{createElement(icon, { className: "h-4 w-4 shrink-0 text-(--primary-400)" })}<span className="max-w-[14rem] truncate">{value}</span></div>; }
function Metric({ icon, label, value }) { return <div className="rounded-2xl border border-(--border) bg-(--tertiary) p-4">{createElement(icon, { className: "h-5 w-5 text-(--primary-400)" })}<p className="mt-3 text-xs uppercase tracking-[0.16em] text-(--text-muted)">{label}</p><p className="mt-1 text-xl font-bold text-(--heading)">{value}</p></div>; }
function SubjectPerformance({ item }) { const percentage = Math.max(0, Math.min(100, Number(item.averagePercentage) || 0)); return <div className="group rounded-[1.4rem] border border-(--border) bg-(--tertiary) p-4 transition duration-300 hover:-translate-y-1 hover:border-(--primary-500)"><div className="flex items-start justify-between gap-3"><div><h3 className="font-bold text-(--heading)">{item.subject}</h3><p className="mt-1 text-sm text-(--text)">{item.attempts || 0} Attempts</p></div><span className="text-xl font-black text-(--primary-400)">{percentage}%</span></div><div className="mt-4 h-2.5 overflow-hidden rounded-full bg-(--surface)"><div className="h-full rounded-full bg-(--btn-primary) transition-all duration-700 group-hover:bg-(--primary-400)" style={{ width: `${percentage}%` }} /></div><div className="mt-4 flex justify-between text-xs text-(--text-muted)"><span>{item.correctAnswers || 0} / {item.totalQuestions || 0} correct</span><span>{item.totalQuestions || 0} questions</span></div></div>; }
function HistoryCard({ item }) { const percentage = Number(item.percentage) || 0; return <article className="group rounded-[1.5rem] border border-(--border) bg-(--tertiary) p-5 transition duration-300 hover:-translate-y-1 hover:border-(--primary-500) hover:shadow-[0_18px_40px_rgba(16,185,129,0.12)]"><div className="flex items-start justify-between gap-4"><div><div className="flex flex-wrap items-center gap-2"><BookOpen className="h-4 w-4 text-(--primary-400)" /><h3 className="font-bold text-(--heading)">{item.subject}</h3>{item.examName && <span className="rounded-full bg-(--surface) px-2.5 py-1 text-xs text-(--text)">{item.examName}</span>}</div><div className="mt-3 flex flex-wrap gap-2 text-xs"><span className="rounded-full bg-(--btn-primary)/15 px-3 py-1 font-semibold capitalize text-(--primary-400)">{item.difficulty || "Unknown"}</span><span className="rounded-full bg-(--surface) px-3 py-1 text-(--text)">{item.examType || "Exam"}</span></div></div><div className="text-right"><p className="text-2xl font-black text-(--heading)">{item.score} / {item.totalQuestions}</p><p className="mt-1 font-bold text-(--primary-400)">{percentage}%</p></div></div><div className="mt-5 flex items-center justify-between border-t border-(--border) pt-4 text-sm text-(--text)"><span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-(--primary-400)" />{formatDate(item.createdAt)}</span><Trophy className="h-4 w-4 text-amber-400 transition group-hover:scale-125" /></div></article>; }
function Filter({ value, onChange, label, options, optionLabels = {} }) { return <select value={value} onChange={(event) => onChange(event.target.value)} className="rounded-xl border border-(--border) bg-(--tertiary) px-3 py-2 text-sm text-(--heading) outline-none transition focus:border-(--primary-500)"><option value="all">{label}</option>{options.map((option) => <option key={option} value={option}>{optionLabels[option] || option}</option>)}</select>; }
function EmptyMessage({ icon, title, text, action }) { return <div className="mt-6 rounded-[1.5rem] border border-dashed border-(--border) bg-(--tertiary) px-6 py-10 text-center">{createElement(icon, { className: "mx-auto h-10 w-10 text-(--primary-400)" })}<h3 className="mt-4 text-xl font-bold text-(--heading)">{title}</h3><p className="mx-auto mt-2 max-w-md text-(--text)">{text}</p>{action && <button type="button" onClick={action} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-(--btn-primary) px-5 py-3 font-semibold text-white transition hover:bg-(--btn-primary-hover)">Start a Quiz <ChevronRight className="h-4 w-4" /></button>}</div>; }
function ProfileSkeleton() { return <main className="min-h-screen bg-(--background) px-4 py-10"><div className="mx-auto max-w-7xl space-y-8 animate-pulse"><div className="h-64 rounded-[2rem] bg-(--surface)" /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{[1, 2, 3, 4, 5].map((item) => <div key={item} className="h-36 rounded-[1.5rem] bg-(--surface)" />)}</div><div className="grid gap-6 lg:grid-cols-2"><div className="h-96 rounded-[2rem] bg-(--surface)" /><div className="h-96 rounded-[2rem] bg-(--surface)" /></div><div className="h-80 rounded-[2rem] bg-(--surface)" /></div></main>; }
function ErrorState({ onRetry }) { return <main className="flex min-h-[70vh] items-center justify-center bg-(--background) px-4"><div className="max-w-md rounded-[2rem] border border-(--border) bg-(--surface) p-8 text-center shadow-xl"><XCircle className="mx-auto h-12 w-12 text-red-400" /><h1 className="mt-5 text-2xl font-bold text-(--heading)">Unable to load your profile</h1><p className="mt-3 text-(--text)">We could not retrieve your learning dashboard right now.</p><button type="button" onClick={onRetry} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-(--btn-primary) px-5 py-3 font-semibold text-white"><RefreshCw className="h-4 w-4" /> Try Again</button></div></main>; }
function formatDate(value) { return value ? new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Not available"; }
