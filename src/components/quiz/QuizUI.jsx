import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  CircleDashed,
  Clock3,
  Medal,
  Search,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";
import * as Icons from "lucide-react";

const glassPanel =
  "rounded-[2rem] border border-cyan-200/15 bg-[#0b1426]/70 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl";

const subtlePanel =
  "rounded-[1.6rem] border border-cyan-200/12 bg-[#101a2e]/65 shadow-[0_18px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl";

const resolveIcon = (iconName, className) => {
  const Icon = Icons[iconName] || BrainCircuit;
  return <Icon className={className} />;
};

export function QuizModuleShell({ children, className = "" }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_90%_18%,rgba(217,70,239,0.12),transparent_26%),linear-gradient(180deg,#050816_0%,#0b1426_52%,#050816_100%)] text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-8rem] h-72 w-72 rounded-full bg-cyan-400/12 blur-3xl" />
        <div className="absolute right-[-6%] top-[10%] h-80 w-80 rounded-full bg-fuchsia-400/10 blur-3xl" />
        <div className="absolute bottom-[-6rem] left-[18%] h-64 w-64 rounded-full bg-violet-300/9 blur-3xl" />
      </div>
      <div className={`relative mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ${className}`}>{children}</div>
    </div>
  );
}

export function QuizNavbar({ title, subtitle, actions }) {
  return (
    <div className={`${glassPanel} animate-slide-up mb-8 flex flex-col gap-4 px-5 py-5 sm:px-7 lg:flex-row lg:items-center lg:justify-between`}>
      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200">
          <Sparkles className="h-3.5 w-3.5" />
          AI Quiz Module
        </div>
        <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300/70 sm:text-base">{subtitle}</p>}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}

export function StatisticCard({ label, value, helper, icon: iconName, accent = "from-sky-500 to-indigo-500" }) {
  return (
    <div className={`${subtlePanel} group animate-slide-up p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(79,70,229,0.18)]`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{label}</p>
          <h3 className="mt-3 text-3xl font-black text-slate-950 dark:text-white">{value}</h3>
          {helper ? <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{helper}</p> : null}
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-lg`}>
          {resolveIcon(iconName, "h-5 w-5")}
        </div>
      </div>
    </div>
  );
}

export function SubjectCard({ subject, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(subject)}
      className={`${subtlePanel} group animate-slide-up relative overflow-hidden p-5 text-left transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(79,70,229,0.18)] ${selected ? "ring-2 ring-indigo-500/80 shadow-[0_30px_80px_rgba(79,70,229,0.24)]" : ""
        }`}
    >
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${subject.accent}`} />
      <div className="flex items-start justify-between gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${subject.accent} text-white shadow-lg`}>
          {resolveIcon(subject.icon, "h-5 w-5")}
        </div>
        {selected ? <BadgeCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-300" /> : null}
      </div>
      <h3 className="mt-5 text-xl font-bold text-slate-950 dark:text-white">{subject.name}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{subject.description}</p>
      <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slate-500 dark:text-slate-300">
        <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-white/10">{subject.questions} Questions</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-white/10">{subject.duration}</span>
      </div>
    </button>
  );
}

export function DifficultyCard({ difficulty, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(difficulty.id)}
      className={`rounded-full px-5 py-3 text-sm font-semibold transition duration-300 ${selected
        ? `bg-gradient-to-r ${difficulty.tone} text-white shadow-[0_18px_50px_rgba(79,70,229,0.26)]`
        : "border border-slate-200 bg-white/70 text-slate-700 hover:border-indigo-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
        }`}
    >
      {difficulty.label}
    </button>
  );
}

export function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <label className="relative block">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-cyan-100/15 bg-black/20 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10"
      />
    </label>
  );
}

export function FilterDropdown({ label, value, onChange, options }) {
  return (
    <label className="relative flex min-w-[160px] items-center">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none rounded-2xl border border-white/60 bg-white/75 px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-200 dark:border-white/10 dark:bg-slate-950/40 dark:text-white"
      >
        <option value="all">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 h-4 w-4 text-slate-400" />
    </label>
  );
}

export function ProgressBar({ value }) {
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-white/70 dark:bg-white/10">
      <div
        className="h-full rounded-full bg-[linear-gradient(90deg,#38bdf8_0%,#6366f1_48%,#a855f7_100%)] transition-all duration-500"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

export function Timer({ secondsRemaining }) {
  const minutes = String(Math.floor(secondsRemaining / 60)).padStart(2, "0");
  const seconds = String(secondsRemaining % 60).padStart(2, "0");
  const isWarning = secondsRemaining <= 120;
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${isWarning
        ? "bg-rose-500/12 text-rose-600 ring-1 ring-rose-300 dark:bg-rose-500/16 dark:text-rose-200"
        : "bg-white/75 text-slate-700 ring-1 ring-white/60 dark:bg-white/8 dark:text-slate-100"
        }`}
    >
      <Clock3 className="h-4 w-4" />
      {minutes}:{seconds}
    </div>
  );
}

export function QuestionCard({ question, index, total }) {
  return (
    <div className={`${glassPanel} animate-scale-in p-6 sm:p-8`}>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">
        Question {index + 1} of {total}
      </p>
      <h2 className="mt-4 text-2xl font-black leading-tight text-slate-950 sm:text-[2rem] dark:text-white">
        {question}
      </h2>
    </div>
  );
}

export function OptionCard({ option, label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${subtlePanel} flex w-full items-start gap-4 p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-[0_20px_60px_rgba(79,70,229,0.16)] ${selected ? "border-indigo-400 bg-indigo-500/10 ring-2 ring-indigo-300 dark:bg-indigo-500/16" : ""
        }`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-bold ${selected
          ? "bg-gradient-to-br from-sky-500 to-violet-500 text-white"
          : "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-200"
          }`}
      >
        {label}
      </span>
      <span className="pt-1 text-base leading-7 text-slate-700 dark:text-slate-200">{option}</span>
    </button>
  );
}

export function ResultCard({ score, percentage, subject, difficulty }) {
  return (
    <div className={`${glassPanel} animate-scale-in p-6 sm:p-8`}>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col items-center justify-center rounded-[1.75rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.75),rgba(237,242,255,0.95))] p-6 text-center dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.86),rgba(15,23,42,0.72))]">
          <div className="relative flex h-44 w-44 items-center justify-center">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(#6366f1 ${percentage * 3.6}deg, rgba(148,163,184,0.18) 0deg)`,
              }}
            />
            <div className="absolute inset-[14px] rounded-full bg-white/90 backdrop-blur dark:bg-slate-900/90" />
            <div className="relative">
              <p className="text-4xl font-black text-slate-950 dark:text-white">{score}</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-300">{percentage}%</p>
            </div>
          </div>
          <span className="mt-6 rounded-full bg-indigo-500/12 px-4 py-2 text-sm font-semibold text-indigo-700 dark:text-indigo-200">
            Quiz Completed
          </span>
        </div>

        <div>
          <div className="inline-flex animate-float-soft items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-700 dark:border-indigo-400/20 dark:text-indigo-200">
            <Trophy className="h-3.5 w-3.5" />
            Performance Snapshot
          </div>
          <h2 className="mt-4 text-3xl font-black text-slate-950 dark:text-white">A polished finish and a clear next step.</h2>
          <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
            Great effort! Review your performance, strengthen weaker areas, and keep
            practicing to improve your score.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <MetaChip label="Subject" value={subject} />
            <MetaChip label="Difficulty" value={difficulty} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaChip({ label, value }) {
  return (
    <div className="rounded-[1.4rem] border border-white/50 bg-white/75 p-4 dark:border-white/10 dark:bg-white/5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-bold text-slate-950 dark:text-white">{value}</p>
    </div>
  );
}

export function LeaderboardRow({ entry }) {
  return (
    <tr
      className={`transition ${entry.isCurrentUser ? "bg-indigo-500/8" : "bg-transparent"} hover:bg-white/60 dark:hover:bg-white/5`}
    >
      <td className="rounded-l-2xl px-4 py-4 font-bold text-slate-900 dark:text-white">
        <div className="flex items-center gap-2">
          <Trophy className={`h-4 w-4 ${entry.rank <= 3 ? "text-amber-500" : "text-slate-400"}`} />
          #{entry.rank}
        </div>
      </td>
      <td className="px-4 py-4 font-semibold text-slate-700 dark:text-slate-200">{entry.name}</td>
      <td className="px-4 py-4 text-slate-700 dark:text-slate-200">{entry.score}</td>
      <td className="px-4 py-4 text-slate-700 dark:text-slate-200">{entry.percentage}%</td>
      <td className="px-4 py-4 text-slate-700 dark:text-slate-200">{entry.subject}</td>
      <td className="px-4 py-4 text-slate-700 dark:text-slate-200">{entry.difficulty}</td>
      <td className="rounded-r-2xl px-4 py-4 text-slate-500 dark:text-slate-400">{entry.date}</td>
    </tr>
  );
}

export function EmptyState({ icon = CircleDashed, title, description, actionLabel, onAction }) {
  const Icon = icon;
  return (
    <div className={`${glassPanel} animate-scale-in px-6 py-14 text-center`}>
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.8rem] bg-gradient-to-br from-sky-500 to-violet-500 text-white shadow-lg">
        <Icon className="h-9 w-9" />
      </div>
      <h2 className="mt-6 text-3xl font-black text-slate-950 dark:text-white">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">{description}</p>
      {actionLabel ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#38bdf8,#6366f1,#a855f7)] px-5 py-3 font-semibold text-white shadow-[0_18px_50px_rgba(79,70,229,0.28)] transition hover:scale-[1.01]"
        >
          {actionLabel}
          <ArrowRight className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}

export function SkeletonLoader({ type = "quiz" }) {
  if (type === "leaderboard") {
    return (
      <div className={`${glassPanel} p-6`}>
        <div className="quiz-shimmer mb-6 h-12 w-64 rounded-2xl" />
        <div className="grid gap-4 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="rounded-[1.75rem] border border-white/50 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5">
              <div className="quiz-shimmer h-24 rounded-[1.2rem]" />
              <div className="quiz-shimmer mt-4 h-5 w-2/3 rounded-full" />
              <div className="quiz-shimmer mt-3 h-4 w-1/2 rounded-full" />
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="quiz-shimmer h-16 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (type === "history") {
    return (
      <div className="space-y-5">
        <div className={`${glassPanel} p-5`}>
          <div className="quiz-shimmer h-11 rounded-2xl" />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className={`${subtlePanel} p-5`}>
              <div className="quiz-shimmer h-5 w-1/3 rounded-full" />
              <div className="quiz-shimmer mt-4 h-10 rounded-2xl" />
              <div className="quiz-shimmer mt-3 h-4 w-2/3 rounded-full" />
              <div className="quiz-shimmer mt-6 h-12 rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className={`${glassPanel} p-6`}>
        <div className="quiz-shimmer h-10 w-56 rounded-full" />
        <div className="quiz-shimmer mt-5 h-24 rounded-[1.8rem]" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className={`${subtlePanel} p-5`}>
            <div className="quiz-shimmer h-6 w-10 rounded-xl" />
            <div className="quiz-shimmer mt-4 h-14 rounded-[1.3rem]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Modal({ open, title, description, children, onClose }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <div className={`${glassPanel} animate-scale-in w-full max-w-lg p-6`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black text-slate-950 dark:text-white">{title}</h3>
            {description ? <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/15"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

export function ConfirmationDialog({ open, title, description, confirmLabel, cancelLabel = "Cancel", onConfirm, onClose }) {
  return (
    <Modal open={open} title={title} description={description} onClose={onClose}>
      <div className="flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-2xl bg-[linear-gradient(135deg,#38bdf8,#6366f1,#a855f7)] px-4 py-3 font-semibold text-white shadow-[0_18px_50px_rgba(79,70,229,0.28)] transition hover:scale-[1.01]"
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

export function ToastNotification({ toast, onClose }) {
  if (!toast) {
    return null;
  }

  const tone =
    toast.type === "success"
      ? "from-emerald-500 to-cyan-500"
      : toast.type === "warning"
        ? "from-amber-500 to-orange-500"
        : "from-rose-500 to-pink-500";

  return (
    <div className="fixed right-4 top-4 z-[100001] w-[min(92vw,390px)] animate-slide-up">
      <div className="relative overflow-hidden rounded-[1.35rem] border border-cyan-200/25 bg-[#0b1426]/95 p-4 text-white shadow-[0_24px_80px_rgba(0,0,0,0.45),0_0_36px_rgba(99,102,241,0.2)] backdrop-blur-2xl">
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tone}`} />
        <div className="flex items-start gap-3 pt-1">
          <div className={`mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${tone} text-white`}>
            {toast.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : toast.type === "warning" ? <AlertTriangle className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </div>
          <div className="flex-1">
            <p className="font-bold text-white">{toast.title}</p>
            <p className="mt-1 text-sm leading-6 text-slate-300">{toast.message}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-xl p-1 text-slate-400 transition hover:bg-white/10 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function PodiumCard({ entry, tone, icon = Medal }) {
  const Icon = icon;
  return (
    <div
      tabIndex="0"
      className={`${subtlePanel} group relative z-0 overflow-visible p-5 text-center outline-none transition duration-300 hover:z-30 hover:-translate-y-2 hover:border-cyan-300/45 hover:shadow-[0_24px_70px_rgba(34,211,238,0.22)] focus:z-30 focus-visible:ring-2 focus-visible:ring-cyan-300/70`}
    >
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${tone}`} />
      <div className="pointer-events-none absolute -right-2 -top-2 opacity-0 transition duration-300 group-hover:opacity-100 group-focus:opacity-100">
        <Sparkles className="h-5 w-5 animate-pulse text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
      </div>
      <div className="pointer-events-none absolute -bottom-2 -left-2 opacity-0 transition duration-300 group-hover:opacity-100 group-focus:opacity-100">
        <Sparkles className="h-4 w-4 animate-pulse text-fuchsia-300 drop-shadow-[0_0_10px_rgba(217,70,239,0.9)]" />
      </div>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
        <Icon className="h-6 w-6" />
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Rank #{entry.rank}</p>
      <h3 className="mt-2 text-xl font-black text-slate-950 dark:text-white">{entry.name}</h3>
      <p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">{entry.score}</p>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{entry.subject} • {entry.difficulty}</p>
      <p className="mt-3 text-sm font-semibold text-indigo-600 dark:text-indigo-300">{entry.percentage}% Accuracy</p>
      <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-3 w-[min(86vw,280px)] -translate-x-1/2 translate-y-2 rounded-2xl border border-cyan-300/35 bg-[#081226]/95 p-4 text-left opacity-0 shadow-[0_18px_55px_rgba(34,211,238,0.22)] backdrop-blur-xl transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Congratulations, {entry.name}!</p>
            <p className="mt-1 text-xs leading-5 text-slate-300">You secured rank #{entry.rank} on the CampusLink leaderboard.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatusBadge({ status }) {
  const isPassed = status.toLowerCase().includes("pass");
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${isPassed ? "bg-emerald-500/12 text-emerald-700 dark:text-emerald-200" : "bg-amber-500/12 text-amber-700 dark:text-amber-200"
        }`}
    >
      {status}
    </span>
  );
}
