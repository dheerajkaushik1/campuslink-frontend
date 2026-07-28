import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardImg from "../assets/card-img.png";
import Loader from "../components/Loader";
import API from "../api/api";

export default function Favorites() {
    const navigate = useNavigate();
    const [favoriteNotes, setFavoriteNotes] = useState([]);
    const [loadingFavorites, setLoadingFavorites] = useState(true);

    const fetchFavorites = async () => {
    try {
        setLoadingFavorites(true);

        const res = await API.get("/favorites");

        setFavoriteNotes(res.data);
    } catch (err) {
        console.error(err);
    } finally {
        setLoadingFavorites(false);
    }
};

    const handleRemoveFavorite = async (noteId) => {
        try {
            await API.post(`/favorites/${noteId}`);

            setFavoriteNotes((prev) =>
                prev.filter((note) => note._id !== noteId)
            );
        } catch (err) {
            console.error(err);
        }
    };

    const handleOpen = (url) => {
        if (url) {
            window.open(url, "_blank");
        }
    };


    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        fetchFavorites();
    }, [navigate]);

    if (loadingFavorites) {
        return <Loader />;
    }

    const favoriteCount = favoriteNotes.length;

    return (
    <div className="min-h-screen w-full bg-(--primary) px-4 py-10 text-(--text)">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
            <section className="relative overflow-hidden rounded-[2rem] border border-(--border) bg-[linear-gradient(180deg,#243039_0%,#1B252B_100%)] px-6 py-8 shadow-[0_8px_24px_rgba(0,0,0,0.28)] sm:px-8 md:px-10 md:py-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.08),_transparent_34%)]" />

                <div className="relative flex flex-col gap-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-3xl">
                            <span className="inline-flex w-fit rounded-full border border-(--primary-600) bg-(--primary-900) px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-(--primary-300)">
                                Favorites
                            </span>
                            <h1 className="mt-4 text-3xl font-black leading-tight text-(--heading) sm:text-4xl md:text-5xl">
                                Your saved notes, all in one place.
                            </h1>
                            <p className="mt-4 max-w-2xl text-sm leading-7 text-(--text) sm:text-base">
                                Keep track of the notes you want to revisit quickly, without searching again every time.
                            </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[380px]">
                            <div className="rounded-[1.5rem] border border-(--border) bg-(--surface) p-4">
                                <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">Saved</p>
                                <p className="mt-2 text-3xl font-bold text-(--heading)">{favoriteCount}</p>
                            </div>
                            <div className="rounded-[1.5rem] border border-(--border) bg-(--surface) p-4">
                                <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">Access</p>
                                <p className="mt-2 text-3xl font-bold text-(--heading)">Quick</p>
                            </div>
                            <div className="rounded-[1.5rem] border border-(--border) bg-(--surface) p-4">
                                <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">Sync</p>
                                <p className="mt-2 text-3xl font-bold text-(--heading)">Local</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 rounded-[1.5rem] border border-(--border) bg-(--surface) p-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm leading-6 text-(--text)">
                            Your favorite notes are securely stored in your account and synced across devices.
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={() => navigate("/notes")}
                                className="rounded-2xl bg-(--btn-primary) px-5 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(16,185,129,0.22)] transition-all duration-300 hover:bg-(--btn-primary-hover)"
                            >
                                Browse Notes
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {favoriteCount === 0 ? (
                <section className="rounded-[2rem] border border-dashed border-(--border) bg-(--surface) px-6 py-12 text-center shadow-[0_8px_24px_rgba(0,0,0,0.28)]">
                    <div className="mx-auto max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--primary-400)">Nothing Saved Yet</p>
                        <h2 className="mt-4 text-3xl font-bold text-(--heading)">Your favorites list is empty.</h2>
                        <p className="mt-4 text-sm leading-7 text-(--text) sm:text-base">
                            Once favorite notes are stored for this user, they will appear here with quick actions to open, download, or remove them.
                        </p>
                        <button
                            type="button"
                            onClick={() => navigate("/notes")}
                            className="mt-8 rounded-2xl bg-(--btn-primary) px-6 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(16,185,129,0.22)] transition-all duration-300 hover:bg-(--btn-primary-hover)"
                        >
                            Explore Notes
                        </button>
                    </div>
                </section>
            ) : (
                <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {favoriteNotes.map((note) => (
                        <article
                            key={note._id}
                            className="group overflow-hidden rounded-[1.75rem] border border-(--border) bg-(--surface) text-(--heading) shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                        >
                            <div className="relative overflow-hidden bg-(--secondary) px-5 pt-5">
                                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,185,129,0.18),transparent_64%)]" />
                                <img src={CardImg} alt="Favorite note cover" className="relative mx-auto h-40 w-full rounded-2xl object-cover" />
                            </div>

                            <div className="flex flex-col gap-4 p-5">
                                <div>
                                    <p className="mb-2 w-fit rounded-full bg-(--tertiary) px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-(--primary-300)">
                                        {note.subject}
                                    </p>
                                    <h2 className="text-2xl font-bold leading-snug text-(--heading)">{note.title}</h2>
                                </div>

                                <p className="text-sm leading-6 text-(--text)">
                                    {note.description}
                                </p>

                                <div className="space-y-2 rounded-2xl bg-(--tertiary) p-4 text-sm text-(--text)">
                                    <p>
                                        <span className="font-semibold text-(--heading)">Updated:</span>{" "}
                                        {new Date(note.updatedAt).toDateString()}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-(--heading)">Provided By:</span>{" "}
                                        {note.uploadedBy}
                                    </p>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <button
                                        type="button"
                                        onClick={() => handleOpen(note.previewUrl)}
                                        disabled={!note.previewUrl}
                                        className="rounded-2xl bg-(--secondary) px-4 py-3 font-semibold text-(--heading) transition-all duration-300 hover:bg-(--surface-secondary) disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Open
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleOpen(note.downloadUrl)}
                                        disabled={!note.downloadUrl}
                                        className="rounded-2xl bg-(--btn-primary) px-4 py-3 font-semibold text-white transition-all duration-300 hover:bg-(--btn-primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Download
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleRemoveFavorite(note._id)}
                                    className="rounded-2xl border border-(--border) bg-(--tertiary) px-4 py-3 font-semibold text-(--heading) transition-all duration-300 hover:bg-(--surface-secondary)"
                                >
                                    Remove from Favorites
                                </button>
                            </div>
                        </article>
                    ))}
                </section>
            )}
        </div>
    </div>
);
}