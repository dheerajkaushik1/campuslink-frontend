import { useMemo, useState } from "react";
import { ArrowRight, BrainCircuit, Clock3, LoaderCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DifficultyCard,
  QuizModuleShell,
  QuizNavbar,
  SubjectCard,
} from "../../components/quiz/QuizUI";
import { quizDifficulties, quizSubjects } from "../../data/quizData";
import { startQuiz } from "../../services/quizService";

const TOTAL_QUESTIONS = 10;

export default function QuizHome() {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const estimatedDuration = useMemo(
    () => selectedSubject?.duration || "10-15 min",
    [selectedSubject]
  );

  const previewItems = useMemo(
    () => [
      { label: "Difficulty", value: selectedDifficulty || "Choose level" },
      { label: "Subject", value: selectedSubject?.name || "Pick a subject" },
      { label: "Questions", value: `${TOTAL_QUESTIONS}` },
      { label: "Duration", value: estimatedDuration },
    ],
    [estimatedDuration, selectedDifficulty, selectedSubject]
  );

  const canStart = Boolean(selectedSubject && selectedDifficulty) && !isGenerating;

  const clearError = () => {
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleDifficultySelect = (difficultyId) => {
    setSelectedDifficulty(difficultyId);
    clearError();
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    clearError();
  };

  const handleStartQuiz = async () => {
    if (!selectedDifficulty || !selectedSubject) {
      setErrorMessage("Select difficulty and subject to start.");
      return;
    }

    try {
      setIsGenerating(true);
      setErrorMessage("");

      const data = await startQuiz(selectedSubject.name, selectedDifficulty);

      navigate("/quiz/play", {
        state: {
          quizId: data.quizId,
          questions: data.questions,
          subject: selectedSubject.name,
          difficulty: selectedDifficulty,
        },
      });
    } catch (error) {
      const apiMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to generate quiz. Please try again.";

      setErrorMessage(apiMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <QuizModuleShell className="pb-12 pt-8">
      <QuizNavbar
        title="AI Quiz"
        subtitle="Choose difficulty, select a subject, and start."
        actions={
          <button
            type="button"
            onClick={() => navigate("/quiz/leaderboard")}
            className="rounded-2xl border border-indigo-300/20 bg-white/10 px-5 py-3 font-semibold text-white shadow-[0_16px_45px_rgba(59,130,246,0.16)] transition hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/16"
          >
            View Leaderboard
          </button>
        }
      />

      <section className="flex flex-col gap-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-(--border) bg-[linear-gradient(180deg,#243039_0%,#1B252B_100%)] p-6 shadow-[0_20px_45px_rgba(0,0,0,0.35)] sm:p-8">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(5,150,105,0.08),transparent_35%)]" />

          <div className="relative">

            <div className="flex flex-wrap items-center gap-3">

              <span className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--tertiary) px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-(--primary-400)">
                <Sparkles className="h-4 w-4" />
                AI Powered
              </span>

              <span className="rounded-full border border-(--border) bg-(--surface) px-4 py-2 text-sm font-medium text-(--text)">
                📚 {TOTAL_QUESTIONS} Questions
              </span>

              <span className="rounded-full border border-(--border) bg-(--surface) px-4 py-2 text-sm font-medium text-(--text)">
                ⏱ {estimatedDuration}
              </span>

            </div>

            <div className="mt-8 flex flex-col gap-6">

              <div>
                <h2 className="text-4xl font-black tracking-tight text-(--heading) sm:text-5xl">
                  Generate Your Next AI Quiz
                </h2>

                <p className="mt-4 max-w-2xl text-base leading-7 text-(--text)">
                  Select your preferred difficulty and subject to generate a fresh,
                  AI-powered quiz tailored to your learning goals.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_18px_45px_rgba(0,0,0,0.25)]">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.10),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(5,150,105,0.08),transparent_35%)]" />

                <div className="relative flex flex-col gap-5">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--primary-400)">
                        Live Preview
                      </p>

                      <h3 className="mt-2 text-2xl font-bold text-(--heading)">
                        Quiz Setup
                      </h3>

                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--btn-primary)/20">
                      <BrainCircuit className="h-7 w-7 text-(--primary-400)" />
                    </div>

                  </div>

                  <div className="flex flex-wrap gap-3 rounded-[1.5rem] border border-(--border) bg-(--tertiary) p-5">

                    {previewItems.map((item) => (
                      <PreviewBlock
                        key={item.label}
                        label={item.label}
                        value={item.value}
                      />
                    ))}

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        <section className="rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_20px_45px_rgba(0,0,0,0.35)] sm:p-7">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-(--primary-400)">
              Step 1
            </p>

            <h2 className="text-3xl font-black text-(--heading)">
              Choose Difficulty
            </h2>

            <p className="text-(--text)">
              Select how challenging you want this quiz to be.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {quizDifficulties.map((difficulty) => (
              <DifficultyCard
                key={difficulty.id}
                difficulty={difficulty}
                selected={selectedDifficulty === difficulty.id}
                onSelect={handleDifficultySelect}
              />
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_20px_45px_rgba(0,0,0,0.35)] sm:p-7">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-(--primary-400)">
              Step 2
            </p>

            <h2 className="text-3xl font-black text-(--heading)">
              Choose Subject
            </h2>

            <p className="text-(--text)">
              Pick a subject and let AI prepare personalized questions.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            {quizSubjects.map((subject) => (
              <div
                key={subject.id}
                className="flex w-full md:w-[calc(50%-0.5rem)] xl:w-[calc(25%-0.75rem)]"
              >
                <SubjectCard
                  subject={subject}
                  selected={selectedSubject?.id === subject.id}
                  onSelect={handleSubjectSelect}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_20px_45px_rgba(0,0,0,0.35)] sm:p-7">
          <div className="flex flex-col gap-5">

            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-(--primary-400)">
                Step 3
              </p>

              <h2 className="text-3xl font-black text-(--heading)">
                Start Quiz
              </h2>

              <p className="text-(--text)">
                Review your selections and generate your AI quiz.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex flex-wrap gap-3">
                <InfoPill
                  icon={Clock3}
                  label="Estimated Duration"
                  value={estimatedDuration}
                />

                <InfoPill
                  icon={Sparkles}
                  label="AI Generated"
                  value="Unique Every Attempt"
                />
              </div>

              <button
                type="button"
                disabled={!canStart}
                onClick={handleStartQuiz}
                className={`inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3.5 font-semibold transition-all duration-300 ${canStart
                    ? "bg-(--btn-primary) text-white shadow-[0_12px_30px_rgba(0,0,0,0.25)] hover:scale-[1.02] hover:bg-(--btn-primary-hover)"
                    : "cursor-not-allowed bg-(--tertiary) text-(--text-disabled)"
                  }`}
              >
                {isGenerating ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Generating Quiz...
                  </>
                ) : (
                  <>
                    Start Quiz
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>

            {errorMessage && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {errorMessage}
              </div>
            )}

          </div>
        </section>

      </section>
    </QuizModuleShell>
  )
}

function InfoPill({ icon: Icon, label, value }) {
  return (
    <div className="rounded-full border border-white/60 bg-white/75 px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-700">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
          <p className="text-sm font-bold text-slate-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

function PreviewBlock({ label, value }) {
  return (
    <div className="min-w-[180px] flex-1 rounded-[1.2rem] bg-white/8 p-3">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-2 font-semibold text-white">{value}</p>
    </div>
  );
}
