import { useEffect, useState } from "react";
import API from "../api/api";
import CardImg from '../assets/card-img.png';
import Loader from "../components/Loader";

export default function Notes() {
    const CARDS_PER_PAGE = 6;
    const [notes, setNotes] = useState([]);
    const [query, setQuery] = useState("");
    const [loadingNotes, setLoadingNotes] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
        }
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            setLoadingNotes(true);
            const res = await API.get('/notes/all');
            setNotes(res.data);
            setCurrentPage(1);
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingNotes(false);
        }
    }

    const handleOpen = (url) => {
        window.open(url, '_blank');
    }

    const handleDownload = (url) => {
        window.open(url, "_blank");
    };

    const handleSearch = async (query) => {
        try {
            setLoadingSearch(true);
            if (!query.trim()) {
                await fetchNotes();
                return;
            }

            const res = await API.get(`/notes/search?query=${encodeURIComponent(query)}`);
            setNotes(res.data);
            setCurrentPage(1);
        } catch (err) {
            console.log(err);
        }finally {
            setLoadingSearch(false);
        }
    }

    if (loadingNotes || loadingSearch) {
        return <Loader />;
    }

    const totalPages = Math.ceil(notes.length / CARDS_PER_PAGE);
    const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
    const paginatedNotes = notes.slice(startIndex, startIndex + CARDS_PER_PAGE);

    const visiblePageNumbers = [];
    for (let page = 1; page <= totalPages; page++) {
        visiblePageNumbers.push(page);
    }

    return (
        <div className="min-h-screen w-full bg-(--primary) px-4 py-10 text-(--text)">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
                <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 px-6 py-10 shadow-2xl shadow-black/20 backdrop-blur-sm md:px-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.16),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(34,197,94,0.2),_transparent_35%)]" />

                    <div className="relative flex flex-col gap-8">
                        <div className="flex flex-col gap-3">
                            <span className="w-fit rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm font-medium tracking-[0.2em] uppercase">
                                Study Hub
                            </span>
                            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
                                Find the right notes faster and keep your study flow moving.
                            </h1>
                            <p className="max-w-2xl text-sm text-white/70 md:text-base">
                                Browse shared material, preview what you need, and download in one place.
                            </p>
                        </div>

                        <div className="relative grid gap-4 rounded-[1.75rem] border border-white/10 bg-black/10 p-4 md:grid-cols-[1fr_auto_auto] md:items-center">
                            <input
                                type="text"
                                value={query}
                                placeholder="Search by title, subject, or keyword..."
                                className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition duration-300 placeholder:text-white/50 focus:border-green-400 focus:bg-white/15"
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearch(query);
                                    }
                                }}
                            />
                            <button
                                onClick={() => handleSearch(query)}
                                className="rounded-2xl bg-(--btn-primary) px-6 py-3 font-semibold text-(--text) transition-all duration-300 hover:scale-[1.02] hover:bg-green-900"
                            >
                                Search
                            </button>
                            <button
                                onClick={() => {
                                    setQuery("");
                                    fetchNotes();
                                }}
                                className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 font-semibold text-(--text) transition-all duration-300 hover:bg-white/15"
                            >
                                Reset
                            </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
                            <span className="rounded-full bg-white/10 px-4 py-2">
                                Total Notes: {notes.length}
                            </span>
                            <span className="rounded-full bg-white/10 px-4 py-2">
                                Showing {notes.length === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + CARDS_PER_PAGE, notes.length)}
                            </span>
                            <span className="rounded-full bg-white/10 px-4 py-2">
                                Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
                            </span>
                        </div>
                    </div>
                </section>

                {notes.length <= 0 ? (
                    <div className="flex min-h-[280px] items-center justify-center rounded-[2rem] border border-dashed border-white/15 bg-white/5 px-6 text-center">
                        <p className="text-lg text-white/70">No notes available right now.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {paginatedNotes.map((note) => (
                                <div
                                    key={note._id}
                                    className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/95 text-slate-900 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                                >
                                    <div className="relative overflow-hidden bg-slate-900/95 px-5 pt-5">
                                        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(34,197,94,0.28),transparent_60%)]" />
                                        <img src={CardImg} alt="Note cover" className="relative mx-auto h-40 w-full rounded-2xl object-cover" />
                                    </div>

                                    <div className="flex flex-col gap-4 p-5">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p className="mb-2 w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                                                    {note.subject}
                                                </p>
                                                <h2 className="text-2xl font-bold leading-snug">{note.title}</h2>
                                            </div>
                                        </div>

                                        <p className="text-sm leading-6 text-slate-600">
                                            {note.description}
                                        </p>

                                        <div className="mt-auto space-y-2 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                                            <p>
                                                <span className="font-semibold text-slate-900">Updated:</span>{" "}
                                                {new Date(note.updatedAt).toDateString()}
                                            </p>
                                            <p>
                                                <span className="font-semibold text-slate-900">Provided By:</span>{" "}
                                                {note.uploadedBy}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                onClick={() => handleOpen(note.previewUrl)}
                                                className="rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700 active:scale-95"
                                            >
                                                Open
                                            </button>
                                            <button
                                                onClick={() => handleDownload(note.downloadUrl)}
                                                className="rounded-2xl bg-(--btn-primary) px-4 py-3 font-semibold text-(--text) transition-all duration-300 hover:bg-green-900 active:scale-95"
                                            >
                                                Download
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="flex flex-wrap items-center justify-center gap-3">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 font-medium transition-all duration-300 hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Previous
                                </button>

                                {visiblePageNumbers.map((pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        onClick={() => setCurrentPage(pageNumber)}
                                        className={`h-11 w-11 rounded-xl font-semibold transition-all duration-300 ${
                                            currentPage === pageNumber
                                                ? "bg-(--btn-primary) text-(--text)"
                                                : "border border-white/15 bg-white/10 text-white hover:bg-white/15"
                                        }`}
                                    >
                                        {pageNumber}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 font-medium transition-all duration-300 hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )

}
