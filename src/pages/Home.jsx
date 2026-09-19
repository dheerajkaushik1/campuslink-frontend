import { createElement, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, BookOpen, BrainCircuit, Check, ChevronRight, Code2, Database, Download, FileText, Heart, Layers3, Play, Search, Sparkles, Star, Users, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import Loader from '../components/Loader';
import SEO from '../components/SEO';

const featureHighlights = [
  { title: 'Notes', description: 'Find focused study material without losing your momentum.', icon: BookOpen, accent: 'from-cyan-400 to-blue-500', to: '/notes' },
  { title: 'Syllabus', description: 'Turn your academic roadmap into a clear next step.', icon: Layers3, accent: 'from-blue-500 to-violet-500', to: '/syllabus' },
  { title: 'Papers', description: 'Prepare with the questions that shaped previous exams.', icon: FileText, accent: 'from-violet-500 to-fuchsia-500', to: '/papers' },
  { title: 'AI Quiz', description: 'Generate a sharp practice session for any subject.', icon: BrainCircuit, accent: 'from-fuchsia-500 to-rose-400', to: '/quiz' },
  { title: 'Requests', description: 'Ask for the resources your semester needs next.', icon: Download, accent: 'from-amber-300 to-orange-500', to: '/note-request' },
];

const subjects = [
  { label: 'DBMS', icon: Database }, { label: 'DSA', icon: Code2 }, { label: 'Operating Systems', icon: Layers3 },
  { label: 'Networks', icon: Zap }, { label: 'Software Engineering', icon: FileText }, { label: 'Web Development', icon: Code2 },
  { label: 'Financial Literacy', icon: Star },
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
    if (!token) { navigate('/login'); return; }
    fetchNotes();
  }, [navigate]);

  const fetchNotes = async () => {
    try { setLoadingNotes(true); const res = await API.get('/notes/all'); setNotes(res.data); }
    catch (err) { console.log(err); }
    finally { setLoadingNotes(false); }
  };

  const filteredNotes = notes.filter((note) => {
    const matchesSubject = activeSubject === 'All' || note.subject === activeSubject;
    const normalizedSearch = searchTerm.trim().toLowerCase();
    if (!normalizedSearch) return matchesSubject;
    return matchesSubject && `${note.title} ${note.subject} ${note.description} ${note.uploadedBy}`.toLowerCase().includes(normalizedSearch);
  });

  return (
    <>
      <SEO title="CampusLink - Notes, Syllabus & Study Resources" description="CampusLink helps students access college notes, syllabus, quizzes and useful study resources in one place." path="/" />
      <main className="neon-shell overflow-hidden px-4 pb-16 pt-16 sm:px-6 lg:px-10">
        <section className="hero-photo relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 overflow-hidden rounded-[2rem] border border-white/10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-4 lg:px-10">
          <div className="relative z-10 max-w-2xl py-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200"><Sparkles className="h-4 w-4" /> For Students, By Students</div>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.96] tracking-[-0.06em] text-white sm:text-7xl">Your Campus<br /><span className="gradient-text">Learning Companion</span></h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-slate-300/75 sm:text-lg">One intelligent space for notes, syllabus, papers, AI quizzes, and the small study decisions that add up to big results.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <button type="button" onClick={() => navigate('/notes')} className="neon-button inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-bold text-white">Explore Now <ArrowUpRight className="h-4 w-4" /></button>
              <button type="button" onClick={() => notesSectionRef.current?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-6 py-3.5 font-bold text-slate-200 transition hover:border-cyan-300/40 hover:bg-white/10"><Play className="h-4 w-4 fill-current text-cyan-300" /> Watch Demo</button>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-5 text-sm text-slate-400"><span className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-300" /> Curated resources</span><span className="flex items-center gap-2"><Check className="h-4 w-4 text-fuchsia-300" /> AI-powered practice</span></div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl grid-cols-2 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] md:grid-cols-4">
          {[['10K+', 'Study Materials', BookOpen], ['2K+', 'Active Students', Users], ['500+', 'Papers & Syllabi', FileText], ['95%', 'Positive Feedback', Heart]].map(([value, label, Icon]) => <div key={label} className="border-white/10 p-5 first:border-r md:border-r md:last:border-r-0">{createElement(Icon, { className: 'h-5 w-5 text-cyan-300' })}<p className="mt-4 text-3xl font-black text-white">{value}</p><p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">{label}</p></div>)}
        </section>

        <section className="mx-auto max-w-7xl pt-24" ref={notesSectionRef}>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">Everything in one orbit</p><h2 className="mt-3 text-4xl font-black text-white sm:text-5xl">Build your study flow.</h2></div><p className="max-w-md text-sm leading-7 text-slate-400">Explore the tools that keep your semester organized, active, and a little less overwhelming.</p></div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{featureHighlights.map(({ title, description, icon, accent, to }) => <button type="button" key={title} onClick={() => navigate(to)} className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 text-left transition duration-300 hover:-translate-y-2 hover:border-cyan-300/30 hover:bg-white/[0.07]"><div className={`mb-10 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-lg`}>{createElement(icon, { className: 'h-5 w-5' })}</div><h3 className="text-xl font-bold text-white">{title}</h3><p className="mt-3 min-h-14 text-sm leading-6 text-slate-400">{description}</p><span className="mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.15em] text-cyan-300">Explore <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span><div className={`absolute -bottom-12 -right-8 h-28 w-28 rounded-full bg-gradient-to-br ${accent} opacity-10 blur-2xl`} /></button>)}</div>
        </section>

        <section className="mx-auto max-w-7xl pt-24"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.24em] text-fuchsia-300">Navigate your semester</p><h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Popular subjects</h2></div><button type="button" onClick={() => navigate('/notes')} className="hidden items-center gap-1 text-sm font-semibold text-cyan-300 sm:flex">View library <ArrowUpRight className="h-4 w-4" /></button></div><div className="mt-7 flex snap-x gap-3 overflow-x-auto pb-4">{subjects.map(({ label, icon }, index) => <button key={label} type="button" onClick={() => { setActiveSubject(label); navigate('/notes'); }} className={`flex min-w-max snap-start items-center gap-3 rounded-full border px-4 py-3 text-sm font-semibold transition hover:-translate-y-1 ${activeSubject === label ? 'border-cyan-300/50 bg-cyan-300/10 text-cyan-100 shadow-[0_0_26px_rgba(34,211,238,0.15)]' : 'border-white/10 bg-white/[0.035] text-slate-300 hover:border-violet-300/35'}`}>{createElement(icon, { className: `h-4 w-4 ${index % 2 ? 'text-fuchsia-300' : 'text-cyan-300'}` })}{label}</button>)}</div></section>

        <section className="mx-auto grid max-w-7xl gap-8 pt-24 lg:grid-cols-[1.2fr_0.8fr]"><div className="relative overflow-hidden rounded-[2rem] border border-violet-300/20 bg-[radial-gradient(circle_at_80%_20%,rgba(217,70,239,0.18),transparent_35%),linear-gradient(120deg,rgba(14,24,56,0.95),rgba(9,13,35,0.84))] p-8 sm:p-12"><div className="absolute right-10 top-10 h-36 w-36 rounded-full border border-fuchsia-300/20 shadow-[0_0_90px_rgba(217,70,239,0.2)]" /><p className="relative text-xs font-bold uppercase tracking-[0.24em] text-fuchsia-200">Small steps / big results</p><h2 className="relative mt-5 max-w-lg text-4xl font-black leading-tight text-white sm:text-5xl">Your next breakthrough starts with one focused session.</h2><p className="relative mt-5 max-w-lg leading-7 text-slate-300/70">Open a note. Try a quiz. Save what matters. CampusLink keeps the path visible when the semester gets noisy.</p><div className="relative mt-8 flex flex-wrap gap-2 text-[10px] font-bold tracking-[0.2em] text-cyan-200"><span className="rounded-full border border-cyan-300/25 px-3 py-2">PAPERS</span><span className="rounded-full border border-violet-300/25 px-3 py-2">QUIZ</span><span className="rounded-full border border-fuchsia-300/25 px-3 py-2">SUCCESS</span></div></div><div className="neon-panel rounded-[2rem] p-8 sm:p-10"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 text-white"><Users className="h-6 w-6" /></div><h2 className="mt-6 text-3xl font-black text-white">Join the CampusLink community.</h2><p className="mt-4 leading-7 text-slate-400">Share what helped you, find what you need, and grow alongside students on the same road.</p><div className="mt-8 flex items-center"><div className="flex -space-x-3">{['#22d3ee', '#a78bfa', '#f0abfc', '#fbbf24'].map((color, index) => <span key={color} className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#101a2e] text-xs font-bold text-[#07111f]" style={{ background: color }}>{['AK', 'RM', 'JS', 'NK'][index]}</span>)}</div><span className="ml-4 text-sm text-slate-400"><strong className="text-white">2,000+</strong> students learning together</span></div><button type="button" onClick={() => navigate('/signup')} className="neon-button mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white">Start your journey <ArrowUpRight className="h-4 w-4" /></button></div></section>

        <section className="mx-auto max-w-7xl pt-24"><div className="neon-panel flex flex-col gap-6 rounded-[2rem] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10"><div><p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">Latest signal</p><h2 className="mt-3 text-3xl font-black text-white">Find what you need, then get moving.</h2><p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">Search the latest notes from your campus collection and jump directly into a focused study session.</p></div><div className="w-full max-w-md"><div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-2"><Search className="ml-2 h-5 w-5 text-cyan-300" /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search notes, subjects, topics..." className="min-w-0 flex-1 bg-transparent px-1 py-3 text-sm text-white outline-none placeholder:text-slate-600" /><button type="button" onClick={() => navigate('/notes')} className="rounded-xl bg-white/10 px-4 py-3 text-xs font-bold text-white transition hover:bg-cyan-300/15">Search</button></div><p className="mt-3 text-xs text-slate-500">{loadingNotes ? 'Syncing your library...' : `${filteredNotes.length} resources ready to explore`}</p></div></div></section>
      </main>
    </>
  );
}
