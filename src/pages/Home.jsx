import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroImg from '../assets/hero-img.png';
import CardImg from '../assets/card-img.png';
import API from '../api/api';
import Loader from '../components/Loader';
import SEO from '../components/SEO'

const featureHighlights = [
  {
    title: 'Smart discovery',
    description: 'Search quickly, filter by subject, and jump to the notes that matter most.',
  },
  {
    title: 'Reliable previews',
    description: 'Open notes in a new tab before downloading so you know exactly what you are getting.',
  },
  {
    title: 'Study-ready organization',
    description: 'Notes stay grouped by subject and updated information is easy to spot at a glance.',
  },
  {
    title: 'Built for momentum',
    description: 'Fast actions, clearer cards, and focused sections keep the study flow smooth.',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const notesSectionRef = useRef(null);
  const [notes, setNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSubject, setActiveSubject] = useState('All');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchNotes();
  }, [navigate]);

  const fetchNotes = async () => {
    try {
      setLoadingNotes(true);
      const res = await API.get('/notes/all');
      setNotes(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingNotes(false);
    }
  };

  const handleOpen = (url) => {
    window.open(url, '_blank');
  };

  const handleDownload = (url) => {
    window.open(url, '_blank');
  };

  const subjectOptions = ['All', ...new Set(notes.map((note) => note.subject).filter(Boolean))];

  const filteredNotes = notes.filter((note) => {
    const matchesSubject = activeSubject === 'All' || note.subject === activeSubject;
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return matchesSubject;
    }

    const combinedText = `${note.title} ${note.subject} ${note.description} ${note.uploadedBy}`.toLowerCase();
    return matchesSubject && combinedText.includes(normalizedSearch);
  });

  const featuredNotes = filteredNotes.slice(0, 3);
  const recentUpdate =
    notes.length > 0
      ? new Date(
        [...notes].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0].updatedAt
      ).toDateString()
      : 'No updates yet';

  return (
    <>
      <SEO
        title="CampusLink - Notes, Syllabus & Study Resources"
        description="CampusLink helps students access college notes, syllabus, quizzes and useful study resources in one place."
        path="/"
      />

      <div className="w-full overflow-hidden bg-(--primary)">
        <section className="relative overflow-hidden border-b border-(--border) bg-[linear-gradient(180deg,#243039_0%,#1B252B_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.08),_transparent_28%)]" />

          <div className="relative mx-auto grid min-h-[86vh] max-w-7xl gap-12 px-5 py-12 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:py-16">
            <div className="flex flex-col justify-center gap-8">
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-(--primary-600) bg-(--primary-900) px-4 py-2 text-sm font-medium tracking-[0.22em] text-(--primary-300) uppercase">
                  Campus knowledge hub
                </span>
                <span className="rounded-full border border-(--border) bg-(--surface) px-4 py-2 text-sm font-medium text-(--heading)">
                  {notes.length} notes available
                </span>
              </div>

              <div className="space-y-5">
                <h1 className="max-w-3xl text-4xl font-black leading-tight text-(--heading) md:text-6xl">
                  Study faster with notes that feel easy to find and easy to trust.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-(--text) md:text-lg">
                  CampusLink brings together your latest study material, keeps it organized, and helps you move from searching to learning without friction.
                </p>
              </div>

              <div className="grid gap-4 rounded-[1.75rem] border border-(--border) bg-(--surface) p-4 shadow-[0_8px_24px_rgba(0,0,0,0.28)] md:grid-cols-[1fr_auto]">
                <input
                  type="text"
                  value={searchTerm}
                  placeholder="Search latest notes by title, subject, or uploader..."
                  className="w-full rounded-2xl border border-(--border) bg-(--tertiary) px-4 py-3 text-(--heading) outline-none transition duration-300 placeholder:text-(--text-disabled) focus:border-(--primary-400) focus:ring-4 focus:ring-(--primary-900)"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  onClick={() => notesSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="rounded-2xl bg-(--secondary) px-6 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(16,185,129,0.22)] transition-all duration-300 hover:scale-[1.02] hover:bg-(--btn-primary-hover)"
                >
                  Explore Latest
                </button>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/notes')}
                  className="rounded-2xl bg-(--btn-primary) px-6 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(16,185,129,0.22)] transition-all duration-300 hover:scale-[1.02] hover:bg-(--btn-primary-hover)"
                >
                  Browse All Notes
                </button>

                <button
                  onClick={() => navigate('/note-request')}
                  className="rounded-2xl bg-(--secondary) px-6 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(16,185,129,0.22)] transition-all duration-300 hover:scale-[1.02] hover:bg-(--btn-primary-hover)"
                >
                  Request Notes
                </button>

                <button
                  onClick={() => navigate('/profile')}
                  className="rounded-2xl border border-(--border) bg-(--surface) px-6 py-3 font-semibold text-(--heading) transition-all duration-300 hover:bg-(--surface-secondary)"
                >
                  Go to Profile
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-(--border) bg-(--surface) p-5">
                  <p className="text-sm uppercase tracking-[0.2em] text-(--text-muted)">Subjects</p>
                  <h3 className="mt-3 text-3xl font-bold text-(--heading)">
                    {Math.max(subjectOptions.length - 1, 0)}
                  </h3>
                </div>

                <div className="rounded-[1.5rem] border border-(--border) bg-(--surface) p-5">
                  <p className="text-sm uppercase tracking-[0.2em] text-(--text-muted)">Filtered Results</p>
                  <h3 className="mt-3 text-3xl font-bold text-(--heading)">
                    {filteredNotes.length}
                  </h3>
                </div>

                <div className="rounded-[1.5rem] border border-(--border) bg-(--surface) p-5">
                  <p className="text-sm uppercase tracking-[0.2em] text-(--text-muted)">Recent Update</p>
                  <h3 className="mt-3 text-lg font-bold text-(--heading)">
                    {recentUpdate}
                  </h3>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute h-72 w-72 rounded-full bg-(--primary-900) blur-3xl" />
              <div className="absolute -bottom-4 right-0 h-40 w-40 rounded-full bg-(--primary-800) blur-3xl" />

              <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-(--border) bg-(--surface) p-4 shadow-[0_8px_24px_rgba(0,0,0,0.28)]">
                <img
                  src={HeroImg}
                  alt="Students exploring notes"
                  className="mx-auto w-full object-contain"
                />

                <div className="mt-4 rounded-[1.5rem] border border-(--border) bg-(--tertiary) p-4 text-left">
                  <p className="text-sm uppercase tracking-[0.2em] text-(--text-muted)">
                    Quick snapshot
                  </p>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-(--surface) p-4">
                      <p className="text-sm text-(--text-muted)">Top filter</p>
                      <p className="mt-1 text-xl font-semibold text-(--heading)">
                        {activeSubject}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-(--surface) p-4">
                      <p className="text-sm text-(--text-muted)">Search status</p>
                      <p className="mt-1 text-xl font-semibold text-(--heading)">
                        {searchTerm.trim() ? "Active" : "All notes"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={notesSectionRef} className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-14 md:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-(--primary-400)">
                Latest Notes
              </p>
              <h2 className="mt-3 text-3xl font-bold text-(--heading) md:text-4xl">
                A cleaner way to preview what is new
              </h2>
              <p className="mt-3 max-w-2xl text-(--text)">
                Filter by subject or search instantly from the home page before moving into the full notes library.
              </p>
            </div>

            <button
              onClick={() => {
                setSearchTerm("");
                setActiveSubject("All");
              }}
              className="rounded-2xl border border-(--border) bg-(--surface) px-5 py-3 font-semibold text-(--heading) transition-all duration-300 hover:bg-(--surface-secondary)"
            >
              Reset Filters
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {subjectOptions.map((subject) => (
              <button
                key={subject}
                onClick={() => setActiveSubject(subject)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${activeSubject === subject
                  ? "bg-(--secondary) text-white shadow-[0_8px_20px_rgba(16,185,129,0.22)]"
                  : "border border-(--border) bg-(--surface) text-(--text) hover:bg-(--surface-secondary)"
                  }`}
              >
                {subject}
              </button>
            ))}
          </div>

          {loadingNotes ? (
            <Loader />
          ) : featuredNotes.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-3">
              {featuredNotes.map((note) => (
                <div
                  key={note._id}
                  className="group overflow-hidden rounded-[1.75rem] border border-(--border) bg-(--surface) text-(--heading) shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(16,185,129,0.18)]"
                >
                  <div className="relative overflow-hidden bg-(--tertiary) px-5 pt-5">
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,185,129,0.16),transparent_60%)]" />
                    <img
                      src={CardImg}
                      alt="Note cover"
                      className="relative mx-auto h-44 w-full rounded-2xl object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-4 p-5">
                    <div>
                      <p className="mb-3 w-fit rounded-full bg-(--primary-900) px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-(--primary-300)">
                        {note.subject}
                      </p>

                      <h3 className="text-2xl font-bold leading-snug text-(--heading)">
                        {note.title}
                      </h3>
                    </div>

                    <p className="text-sm leading-6 text-(--text)">
                      {note.description}
                    </p>

                    <div className="rounded-2xl bg-(--tertiary) p-4 text-sm text-(--text)">
                      <p>
                        <span className="font-semibold text-(--heading)">Updated:</span>{" "}
                        {new Date(note.updatedAt).toDateString()}
                      </p>

                      <p className="mt-2">
                        <span className="font-semibold text-(--heading)">
                          Provided By:
                        </span>{" "}
                        {note.uploadedBy}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleOpen(note.previewUrl)}
                        className="rounded-2xl bg-(--secondary) px-4 py-3 font-semibold text-white transition-all duration-300 hover:bg-(--btn-primary-hover) active:scale-95"
                      >
                        Open
                      </button>

                      <button
                        onClick={() => handleDownload(note.downloadUrl)}
                        className="rounded-2xl bg-(--btn-primary) px-4 py-3 font-semibold text-white transition-all duration-300 hover:bg-(--btn-primary-hover) active:scale-95"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-(--border) bg-(--surface) px-6 py-16 text-center shadow-[0_8px_24px_rgba(0,0,0,0.28)]">
              <h3 className="text-2xl font-semibold text-(--heading)">
                No matching notes found
              </h3>

              <p className="mt-3 text-(--text-muted)">
                Try another subject or clear the search to see more results.
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/notes")}
              className="rounded-2xl bg-(--surface-secondary) px-6 py-3 font-semibold text-(--heading) transition-all duration-300 hover:bg-(--tertiary)"
            >
              View Full Library
            </button>

            <button
              onClick={() => navigate("/note-request")}
              className="rounded-2xl bg-(--secondary) px-6 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(16,185,129,0.22)] transition-all duration-300 hover:bg-(--btn-primary-hover)"
            >
              Ask for a Note
            </button>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="rounded-2xl border border-(--border) bg-(--surface) px-6 py-3 font-semibold text-(--heading) transition-all duration-300 hover:bg-(--surface-secondary)"
            >
              Back to Top
            </button>
          </div>
        </section>

        <section className="border-y border-(--border) bg-(--surface)">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-14 md:grid-cols-2 md:px-10 xl:grid-cols-4">
            {featureHighlights.map((feature) => (
              <div
                key={feature.title}
                className="rounded-[1.75rem] border border-(--border) bg-(--tertiary) p-6 shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-(--primary-500)"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--primary-400)">
                  Why it helps
                </p>
                <h3 className="mt-4 text-2xl font-bold text-(--heading)">
                  {feature.title}
                </h3>
                <p className="mt-4 leading-7 text-(--text)">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-14 md:px-10">
          <div className="overflow-hidden rounded-[2.25rem] border border-(--border) bg-[linear-gradient(180deg,#243039_0%,#1B252B_100%)] px-6 py-10 shadow-[0_8px_24px_rgba(0,0,0,0.30)] md:px-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-(--primary-300)">
                  Ready for your next study session?
                </p>

                <h2 className="mt-4 text-3xl font-bold text-(--heading) md:text-4xl">
                  Open the full notes collection and keep your prep moving.
                </h2>

                <p className="mt-4 text-base leading-7 text-(--text)">
                  Jump into the complete library, explore more subjects, and use the redesigned notes page for deeper browsing.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/note-request")}
                  className="rounded-2xl bg-(--secondary) px-6 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(16,185,129,0.22)] transition-all duration-300 hover:bg-(--btn-primary-hover)"
                >
                  Request Missing Notes
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="rounded-2xl bg-(--secondary) px-6 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(16,185,129,0.22)] transition-all duration-300 hover:bg-(--btn-primary-hover)"
                >
                  Signup Now
                </button>

                <button
                  onClick={() => navigate("/notes")}
                  className="rounded-2xl bg-(--btn-primary) px-6 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(16,185,129,0.22)] transition-all duration-300 hover:bg-(--btn-primary-hover)"
                >
                  Explore Notes
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

    </>
  );
}
