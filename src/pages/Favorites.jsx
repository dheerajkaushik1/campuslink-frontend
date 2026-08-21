import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardImg from "../assets/card-img.png";
import Loader from "../components/Loader";
import API from "../api/api";

export default function Favorites() {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState({
        notes: [],
    });
    const [loadingFavorites, setLoadingFavorites] = useState(true);

    const fetchFavorites = async () => {
        try {
            setLoadingFavorites(true);

            const res = await API.get("/favorites");

            setFavorites({
                notes: Array.isArray(res.data) ? res.data : res.data?.notes || [],
            });
        } catch (err) {
            console.error("Fetch favorites error:", err);
        } finally {
            setLoadingFavorites(false);
        }
    };

    const handleRemoveFavorite = async (itemId) => {
        try {
            await API.post(`/favorites/${itemId}`);

            setFavorites((prev) => ({
                notes: prev.notes.filter((item) => item._id !== itemId),
            }));
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

    const totalFavorites = favorites.notes.length;

    const renderCard = (item) => (
        <article
            key={item._id}
            className="overflow-hidden rounded-[1.5rem] border border-(--border) bg-(--surface) shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
        >
            <div className="bg-(--tertiary) p-4">
                <img
                    src={CardImg}
                    alt={`${item.title} cover`}
                    className="h-36 w-full rounded-xl object-cover"
                />
            </div>

            <div className="flex flex-col gap-4 p-5">
                <div>
                    <p className="mb-2 inline-flex rounded-full bg-(--tertiary) px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-(--primary-300)">
                        {item.subject}
                    </p>
                    <h3 className="text-xl font-bold text-(--heading)">{item.title}</h3>
                </div>

                <p className="text-sm leading-6 text-(--text)">
                    {item.description || "No description available."}
                </p>

                <div className="rounded-xl bg-(--tertiary) p-4 text-sm text-(--text)">
                    <p>
                        <span className="font-semibold text-(--heading)">Updated:</span>{" "}
                        {item.updatedAt ? new Date(item.updatedAt).toDateString() : "N/A"}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold text-(--heading)">Uploaded By:</span>{" "}
                        {item.uploadedBy || "Unknown"}
                    </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                    <button
                        type="button"
                        onClick={() => handleOpen(item.previewUrl)}
                        disabled={!item.previewUrl}
                        className="rounded-xl bg-(--secondary) px-4 py-3 font-semibold text-(--heading) transition hover:bg-(--surface-secondary) disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Open
                    </button>
                    <button
                        type="button"
                        onClick={() => handleOpen(item.downloadUrl)}
                        disabled={!item.downloadUrl}
                        className="rounded-xl bg-(--btn-primary) px-4 py-3 font-semibold text-white transition hover:bg-(--btn-primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Download
                    </button>
                </div>

                <button
                    type="button"
                    onClick={() => handleRemoveFavorite(item._id)}
                    className="rounded-xl border border-(--border) bg-(--tertiary) px-4 py-3 font-semibold text-(--heading) transition hover:bg-(--surface-secondary)"
                >
                    Remove from Favorites
                </button>
            </div>
        </article>
    );

    return (
        <div className="min-h-screen w-full bg-(--primary) px-4 py-10 text-(--text)">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
                <section className="rounded-[2rem] border border-(--border) bg-[linear-gradient(180deg,#243039_0%,#1B252B_100%)] px-6 py-8 shadow-[0_8px_24px_rgba(0,0,0,0.28)] sm:px-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-3xl">
                            <span className="inline-flex rounded-full border border-(--primary-600) bg-(--primary-900) px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-(--primary-300)">
                                Favorites
                            </span>
                            <h1 className="mt-4 text-3xl font-black text-(--heading) sm:text-4xl">
                                All your saved study material in one place.
                            </h1>
                            <p className="mt-3 text-sm leading-7 text-(--text) sm:text-base">
                                Access all the notes you've bookmarked for quick revision and study.
                            </p>
                        </div>

                        <div className="rounded-[1.5rem] border border-(--border) bg-(--surface) px-5 py-4">
                            <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">
                                Total Saved
                            </p>
                            <p className="mt-2 text-3xl font-bold text-(--heading)">
                                {totalFavorites}
                            </p>
                        </div>
                    </div>
                </section>

                {totalFavorites === 0 ? (
                    <section className="rounded-[2rem] border border-dashed border-(--border) bg-(--surface) px-6 py-12 text-center shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
                        <h2 className="text-2xl font-bold text-(--heading)">
                            No favorites saved yet.
                        </h2>
                        <p className="mt-3 text-sm leading-7 text-(--text) sm:text-base">
                            Start saving notes while browsing and they'll appear here.
                        </p>
                        <button
                            type="button"
                            onClick={() => navigate("/notes")}
                            className="mt-6 rounded-xl bg-(--btn-primary) px-6 py-3 font-semibold text-white transition hover:bg-(--btn-primary-hover)"
                        >
                            Browse Notes
                        </button>
                    </section>
                ) : (
                    <section className="rounded-[2rem] border border-(--border) bg-(--surface) p-6">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-(--heading)">
                                Favorite Notes
                            </h2>
                            <p className="mt-1 text-sm text-(--text)">
                                {favorites.notes.length} item{favorites.notes.length !== 1 && "s"}
                            </p>
                        </div>

                        {favorites.notes.length === 0 ? (
                            <div className="rounded-[1.5rem] border border-dashed border-(--border) bg-(--tertiary) px-5 py-8 text-center">
                                No favorite notes saved yet.
                            </div>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {favorites.notes.map((item) => renderCard(item))}
                            </div>
                        )}
                    </section>
                )}
            </div>
        </div>
    );
}
