import { useEffect, useMemo, useState } from "react";
import { LoaderCircle, Medal, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  FilterDropdown,
  LeaderboardRow,
  PodiumCard,
  QuizModuleShell,
  QuizNavbar,
  SearchBar,
  SkeletonLoader,
} from "../../components/quiz/QuizUI";
import API from "../../api/api";

const pageSize = 5;

export default function QuizLeaderboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [leaderboardEntries, setLeaderboardEntries] = useState([]);
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filteredEntries = useMemo(() => {
    return leaderboardEntries.filter((entry) => {
      const matchesSearch = `${entry.name} ${entry.subject}`.toLowerCase().includes(search.toLowerCase());
      const matchesSubject = subjectFilter === "all" || entry.subject === subjectFilter;
      const matchesDifficulty = difficultyFilter === "all" || entry.difficulty.toLowerCase() === difficultyFilter;
      return matchesSearch && matchesSubject && matchesDifficulty;
    });
  }, [
    leaderboardEntries,
    difficultyFilter,
    search,
    subjectFilter,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredEntries.length / pageSize));
  const visibleRows = filteredEntries.slice((page - 1) * pageSize, page * pageSize);
  const topThree = leaderboardEntries.slice(0, 3);

  const subjects = useMemo(() => {
    return [...new Set(leaderboardEntries.map((entry) => entry.subject))];
  }, [leaderboardEntries]);

  const difficulties = useMemo(() => {
    return [
      ...new Set(
        leaderboardEntries.map((entry) => entry.difficulty.toLowerCase())
      ),
    ];
  }, [leaderboardEntries]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await API.get("/quiz/leaderboard");

        const formatted = res.data.map((entry, index) => ({
          id: entry._id,
          rank: index + 1,
          name: entry.user?.name || "Unknown",
          score: entry.score,
          percentage: Math.round(
            (entry.score / entry.totalQuestions) * 100
          ),
          subject: entry.subject,
          difficulty: entry.difficulty,
          date: new Date(entry.createdAt).toLocaleDateString("en-IN"),
          isCurrentUser: false,
        }));

        setLeaderboardEntries(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [difficultyFilter, search, subjectFilter]);
  return (
    <QuizModuleShell className="pb-12 pt-8">
      <QuizNavbar
        title="Leaderboard"
        subtitle="Celebrate top performance, compare progress across subjects, and keep the current student visibly motivated."
        actions={
          <button
            type="button"
            onClick={() => navigate("/quiz")}
            className="rounded-2xl bg-[linear-gradient(135deg,#38bdf8,#6366f1,#a855f7)] px-5 py-3 font-semibold text-white shadow-[0_18px_50px_rgba(79,70,229,0.28)] transition hover:scale-[1.01]"
          >
            Back to Quiz Home
          </button>
        }
      />

      {loading ? (
        <section className="space-y-6">
          <div className="flex items-center justify-between rounded-[1.75rem] border border-white/55 bg-white/70 px-5 py-4 shadow-[0_18px_50px_rgba(79,70,229,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/45">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-600 dark:text-indigo-300">
                Loading Leaderboard
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Pulling the latest quiz rankings and top performers.
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#38bdf8,#6366f1,#a855f7)] text-white shadow-[0_18px_50px_rgba(79,70,229,0.25)]">
              <LoaderCircle className="h-5 w-5 animate-spin" />
            </div>
          </div>

          <div className="animate-pulse">
            <SkeletonLoader type="leaderboard" />
          </div>
        </section>
      ) : (
        <>
          <section className="grid gap-4 lg:grid-cols-3">
            {topThree[1] && (
              <PodiumCard
                entry={topThree[1]}
                tone="from-slate-300 to-slate-500"
                icon={Medal}
              />
            )}

            {topThree[0] && (
              <PodiumCard
                entry={topThree[0]}
                tone="from-amber-300 to-yellow-500"
                icon={Trophy}
              />
            )}

            {topThree[2] && (
              <PodiumCard
                entry={topThree[2]}
                tone="from-orange-300 to-amber-600"
                icon={Medal}
              />
            )}
          </section>

          <section className="mt-8 rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_20px_45px_rgba(0,0,0,0.35)]">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search by student or subject..."
              />

              <div className="flex flex-wrap gap-3">
                <FilterDropdown
                  label="All Subjects"
                  value={subjectFilter}
                  onChange={setSubjectFilter}
                  options={subjects}
                />

                <FilterDropdown
                  label="All Difficulties"
                  value={difficultyFilter}
                  onChange={setDifficultyFilter}
                  options={difficulties}
                />
              </div>
            </div>

            <div className="mt-6 overflow-x-auto rounded-2xl border border-(--border)">
              <table className="min-w-full border-separate border-spacing-y-3">

                <thead>
                  <tr className="bg-(--tertiary) text-left text-xs font-semibold uppercase tracking-[0.2em] text-(--primary-400)">
                    <th className="px-4 py-4">Rank</th>
                    <th className="px-4 py-4">Student Name</th>
                    <th className="px-4 py-4">Score</th>
                    <th className="px-4 py-4">Percentage</th>
                    <th className="px-4 py-4">Subject</th>
                    <th className="px-4 py-4">Difficulty</th>
                    <th className="px-4 py-4">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {visibleRows.map((entry) => (
                    <LeaderboardRow
                      key={entry.id || entry._id}
                      entry={entry}
                    />
                  ))}
                </tbody>

              </table>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">

              <p className="text-sm text-(--text)">
                Showing
                <span className="font-semibold text-(--primary-400)">
                  {" "}
                  {visibleRows.length}
                </span>
                {" "}of{" "}
                <span className="font-semibold text-(--primary-400)">
                  {filteredEntries.length}
                </span>
                {" "}leaderboard entries.
              </p>

              <div className="flex items-center gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setPage((previous) => Math.max(previous - 1, 1))
                  }
                  disabled={page === 1}
                  className="rounded-2xl border border-(--border) bg-(--tertiary) px-5 py-2.5 text-sm font-semibold text-(--text) transition-all duration-300 hover:border-(--primary-400) hover:bg-(--surface-hover) disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="rounded-full border border-(--btn-primary)/30 bg-(--btn-primary)/15 px-5 py-2 text-sm font-semibold text-(--primary-400)">
                  Page {page} of {totalPages}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setPage((previous) => Math.min(previous + 1, totalPages))
                  }
                  disabled={page === totalPages}
                  className="rounded-2xl border border-(--border) bg-(--tertiary) px-5 py-2.5 text-sm font-semibold text-(--text) transition-all duration-300 hover:border-(--primary-400) hover:bg-(--surface-hover) disabled:opacity-40"
                >
                  Next
                </button>

              </div>

            </div>

          </section>
        </>
      )}
    </QuizModuleShell>
  );
}
