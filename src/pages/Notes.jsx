import { useEffect, useState } from "react";
import API from "../api/api";
import CardImg from '../assets/card-img.png';
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

export default function Notes() {
    const CARDS_PER_PAGE = 6;
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [query, setQuery] = useState("");
    const [loadingNotes, setLoadingNotes] = useState(false);
    const [loadingFav, setLoadingFav] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [favoriteIds, setFavoriteIds] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
        }
        fetchFavorites();
        fetchNotes();
    }, []);

    const handleToggleFavorite = async (noteId) => {
        try {
            setLoadingFav(true);
            const res = await API.post(`/favorites/${noteId}`);

            console.log(res.data);

            setFavoriteIds((prev) =>
                prev.includes(noteId)
                    ? prev.filter((id) => id !== noteId)
                    : [...prev, noteId]
            );
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingFav(false);
        }
    };

    const fetchFavorites = async () => {
        try {
            const res = await API.get("/favorites");

            setFavoriteIds(res.data.map(note => note._id));
        } catch (err) {
            console.error(err);
        }
    };


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
        } finally {
            setLoadingSearch(false);
        }
    }

    if (loadingNotes || loadingSearch || loadingFav) {
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
    <div className="min-h-screen w-full bg-(--background) px-4 py-10 text-(--text)">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">

            {/* Hero */}

            <section className="relative overflow-hidden rounded-[2rem] border border-(--border) bg-[linear-gradient(180deg,#243039_0%,#1B252B_100%)] px-6 py-10 shadow-[0_8px_24px_rgba(0,0,0,0.3)] md:px-10">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(5,150,105,0.08),_transparent_35%)]" />

                <div className="relative flex flex-col gap-6">

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

                        <div className="flex max-w-3xl flex-col gap-3">

                            <span className="w-fit rounded-full border border-(--border) bg-(--tertiary) px-4 py-1 text-sm font-medium uppercase tracking-[0.2em] text-(--primary-400)">
                                Study Hub
                            </span>

                            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-(--heading) md:text-5xl">
                                Find the right notes faster and keep your study flow moving.
                            </h1>

                            <p className="max-w-2xl text-sm text-(--text) md:text-base">
                                Browse, save favorites, and jump into the right material without the clutter.
                            </p>

                        </div>

                        <div className="flex flex-wrap gap-3 text-sm">

                            <span className="rounded-full border border-(--border) bg-(--surface) px-4 py-2 text-(--text)">
                                Total Notes: {notes.length}
                            </span>

                            <span className="rounded-full border border-(--border) bg-(--surface) px-4 py-2 text-(--text)">
                                Favorites: {favoriteIds.length}
                            </span>

                            <span className="rounded-full border border-(--border) bg-(--surface) px-4 py-2 text-(--text)">
                                Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
                            </span>

                        </div>

                    </div>

                    {/* Search */}

                    <div className="flex flex-col gap-4 rounded-[1.75rem] border border-(--border) bg-(--surface) p-4">

                        <div className="flex flex-col gap-3 md:flex-row">

                            <input
                                type="text"
                                value={query}
                                placeholder="Search by title, subject, or keyword..."
                                className="min-w-0 flex-1 rounded-2xl border border-(--border) bg-(--tertiary) px-4 py-3 text-(--heading) outline-none transition-all placeholder:text-(--text-disabled) focus:border-(--primary-500) focus:ring-4 focus:ring-(--primary-500)/20"
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearch(query);
                                    }
                                }}
                            />

                            <div className="flex flex-wrap gap-3">

                                <button
                                    onClick={() => handleSearch(query)}
                                    className="rounded-2xl bg-(--btn-primary) px-6 py-3 font-semibold text-white transition-all hover:bg-(--btn-primary-hover)"
                                >
                                    Search
                                </button>

                                <button
                                    onClick={() => {
                                        setQuery("");
                                        fetchNotes();
                                    }}
                                    className="rounded-2xl border border-(--border) bg-(--tertiary) px-6 py-3 font-semibold text-(--heading) transition-all hover:bg-(--surface)"
                                >
                                    Reset
                                </button>

                            </div>

                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-sm">

                            <span className="rounded-full border border-(--border) bg-(--tertiary) px-4 py-2">
                                Total Notes: {notes.length}
                            </span>

                            <span className="rounded-full border border-(--border) bg-(--tertiary) px-4 py-2">
                                Showing {notes.length === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + CARDS_PER_PAGE, notes.length)}
                            </span>

                            <button
                                onClick={() => navigate("/favorites")}
                                className="rounded-full bg-(--btn-secondary) px-4 py-2 font-semibold text-white transition hover:bg-slate-600"
                            >
                                Open Favorites
                            </button>

                            <button
                                onClick={() => navigate("/note-request")}
                                className="rounded-full bg-(--btn-primary) px-4 py-2 font-semibold text-white transition hover:bg-(--btn-primary-hover)"
                            >
                                Request Missing Notes
                            </button>

                        </div>

                    </div>

                </div>

            </section>

            {notes.length <= 0 ? (

                <div className="flex min-h-[280px] items-center justify-center rounded-[2rem] border border-dashed border-(--border) bg-(--surface) px-6 text-center shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
                    <p className="text-lg text-(--text)">
                        No notes available right now.
                    </p>
                </div>

            ) : (

                <>
                    <div className="flex flex-wrap gap-5">

                        {paginatedNotes.map((note) => (

                            <div
                                key={note._id}
                                className="group flex min-w-[280px] flex-1 basis-[300px] flex-col overflow-hidden rounded-[1.5rem] border border-(--border) bg-(--surface) shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-all hover:-translate-y-1"
                            >

                                <div className="relative overflow-hidden bg-(--tertiary) px-4 pt-4">
                                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,185,129,0.15),transparent_60%)]" />

                                    <img
                                        src={CardImg}
                                        alt="Note cover"
                                        className="relative mx-auto h-28 w-full rounded-[1.25rem] object-cover"
                                    />
                                </div>

                                <div className="flex flex-1 flex-col gap-3 p-4">

                                    <div className="flex items-start justify-between gap-3">

                                        <div className="min-w-0">

                                            <p className="mb-2 w-fit rounded-full bg-(--primary-500)/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-(--primary-300)">
                                                {note.subject}
                                            </p>

                                            <h2 className="line-clamp-2 text-xl font-bold text-(--heading)">
                                                {note.title}
                                            </h2>

                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleToggleFavorite(note._id)}
                                            className={`shrink-0 rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                                                favoriteIds.includes(note._id)
                                                    ? "bg-(--primary-500)/20 text-(--primary-300)"
                                                    : "border border-(--border) bg-(--tertiary) text-(--text-muted)"
                                            }`}
                                        >
                                            {favoriteIds.includes(note._id) ? "Saved" : "Favorite"}
                                        </button>

                                    </div>

                                    <p className="line-clamp-3 text-sm leading-6 text-(--text)">
                                        {note.description}
                                    </p>

                                    <div className="mt-auto space-y-2 rounded-[1.25rem] bg-(--tertiary) p-3 text-sm">

                                        <p>
                                            <span className="font-semibold text-(--heading)">
                                                Updated:
                                            </span>{" "}
                                            {new Date(note.updatedAt).toDateString()}
                                        </p>

                                        <p>
                                            <span className="font-semibold text-(--heading)">
                                                Provided By:
                                            </span>{" "}
                                            {note.uploadedBy}
                                        </p>

                                    </div>

                                    <div className="flex gap-3">

                                        <button
                                            onClick={() => handleOpen(note.previewUrl)}
                                            className="flex-1 rounded-2xl bg-(--secondary) px-4 py-2.5 text-sm font-semibold text-white hover:bg-(--primary-600)"
                                        >
                                            Open
                                        </button>

                                        <button
                                            onClick={() => handleDownload(note.downloadUrl)}
                                            className="flex-1 rounded-2xl bg-(--btn-primary) px-4 py-2.5 text-sm font-semibold text-white hover:bg-(--btn-primary-hover)"
                                        >
                                            Download
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                    {/* Pagination */}

                    {totalPages > 1 && (
                        <div className="flex flex-wrap items-center justify-center gap-3">

                            {/* Keep your existing pagination logic.
                                Just replace bg-white with bg-(--surface)
                                and border-(--border-light) with border-(--border). */}

                        </div>
                    )}

                    {/* Bottom CTA */}

                    <div className="rounded-[2rem] border border-(--border) bg-[linear-gradient(180deg,#243039_0%,#1B252B_100%)] p-6 text-center shadow-[0_8px_24px_rgba(0,0,0,0.25)]">

                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--primary-300)">
                            Need Something Else?
                        </p>

                        <h3 className="mt-4 text-3xl font-bold text-(--heading)">
                            Could not find the notes you were looking for?
                        </h3>

                        <p className="mx-auto mt-4 max-w-2xl leading-7 text-(--text)">
                            Send a note request to the admin and help prioritize the next uploads for the topics you actually need.
                        </p>

                        <button
                            onClick={() => navigate("/note-request")}
                            className="mt-6 rounded-2xl bg-(--btn-primary) px-6 py-3 font-semibold text-white transition hover:bg-(--btn-primary-hover)"
                        >
                            Open Request Page
                        </button>

                    </div>
                </>
            )}
        </div>
    </div>
);
}