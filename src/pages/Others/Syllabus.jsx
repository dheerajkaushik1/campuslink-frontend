import { useEffect, useState } from "react";
import API from "../../api/api";
import CardImg from "../../assets/card-img.png";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

export default function Syllabus() {
    const CARDS_PER_PAGE = 6;
    const navigate = useNavigate();
    const [syllabi, setSyllabi] = useState([]);
    const [query, setQuery] = useState("");
    const [loadingSyllabi, setLoadingSyllabi] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/login";
            return;
        }

        fetchSyllabi();
    }, []);

    const fetchSyllabi = async () => {
        try {
            setLoadingSyllabi(true);
            const res = await API.get("/syllabus/all-syllabus");
            setSyllabi(res.data);
            setCurrentPage(1);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingSyllabi(false);
        }
    };

    const handleOpen = async (syllabus) => {
        try {
            window.open(syllabus.previewUrl, "_blank");
        } catch (error) {
            console.error(error);
        }
    };

    const handleDownload = async (syllabus) => {
        try {
            window.open(syllabus.downloadUrl, "_blank");
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = async (searchQuery) => {
        try {
            setLoadingSearch(true);

            if (!searchQuery.trim()) {
                await fetchSyllabi();
                return;
            }

            const res = await API.get(`/syllabus/search-syllabus?query=${encodeURIComponent(searchQuery)}`);
            setSyllabi(res.data);
            setCurrentPage(1);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingSearch(false);
        }
    };

    if (loadingSyllabi || loadingSearch) {
        return <Loader />;
    }

    const totalPages = Math.ceil(syllabi.length / CARDS_PER_PAGE);
    const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
    const paginatedSyllabi = syllabi.slice(startIndex, startIndex + CARDS_PER_PAGE);
    const visiblePageNumbers = [];

    for (let page = 1; page <= totalPages; page++) {
        visiblePageNumbers.push(page);
    }

    return (
        <div className="min-h-screen w-full bg-(--primary) px-4 py-10 text-(--text)">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
                <section className="relative overflow-hidden rounded-[2rem] border border-(--border) bg-[linear-gradient(180deg,#243039_0%,#1B252B_100%)] px-6 py-10 shadow-[0_8px_24px_rgba(0,0,0,0.3)] md:px-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(5,150,105,0.08),_transparent_35%)]" />

                    <div className="relative flex flex-col gap-6">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div className="flex max-w-3xl flex-col gap-3">
                                <span className="w-fit rounded-full border border-(--border) bg-(--tertiary) px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-(--primary-400)">
                                    Syllabus Hub
                                </span>

                                <h1 className="max-w-3xl text-4xl font-bold leading-tight text-(--heading) md:text-5xl">
                                    Find the right syllabus PDFs faster and stay aligned with your course plan.
                                </h1>

                                <p className="max-w-2xl text-base leading-7 text-(--text)">
                                    Browse subject-wise syllabi, search instantly, and open or download what you need without extra steps.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3 text-sm">
                                <span className="rounded-full border border-(--border) bg-(--surface) px-4 py-2 text-(--text)">
                                    {syllabi.length} Syllabi
                                </span>

                                <span className="rounded-full border border-(--border) bg-(--surface) px-4 py-2 text-(--text)">
                                    {totalPages === 0 ? 0 : currentPage} / {totalPages}
                                </span>
                            </div>
                        </div>

                        <div className="rounded-[1.75rem] border border-(--border) bg-(--surface) p-4">
                            <div className="flex flex-col gap-3 md:flex-row">
                                <input
                                    type="text"
                                    value={query}
                                    placeholder="Search by title, subject or keyword..."
                                    className="flex-1 rounded-2xl border border-(--border) bg-(--tertiary) px-4 py-3 text-(--heading) outline-none transition-all placeholder:text-(--text-disabled) focus:border-(--primary-500) focus:ring-4 focus:ring-(--primary-500)/20"
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSearch(query);
                                        }
                                    }}
                                />

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleSearch(query)}
                                        className="rounded-2xl bg-(--btn-primary) px-6 py-3 font-semibold text-white transition hover:bg-(--btn-primary-hover)"
                                    >
                                        Search
                                    </button>

                                    <button
                                        onClick={() => {
                                            setQuery("");
                                            fetchSyllabi();
                                        }}
                                        className="rounded-2xl border border-(--border) bg-(--tertiary) px-6 py-3 font-semibold text-(--heading) transition hover:bg-(--surface)"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap items-center gap-3">
                                <span className="rounded-full border border-(--border) bg-(--tertiary) px-4 py-2 text-sm text-(--text)">
                                    Showing {syllabi.length === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + CARDS_PER_PAGE, syllabi.length)}
                                </span>

                                <button
                                    onClick={() => navigate("/notes")}
                                    className="rounded-full bg-(--btn-primary) px-4 py-2 text-sm font-semibold text-white transition hover:bg-(--btn-primary-hover)"
                                >
                                    Browse Notes
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {syllabi.length <= 0 ? (
                    <div className="flex min-h-[280px] items-center justify-center rounded-[2rem] border border-dashed border-(--border) bg-(--surface) px-6 text-center shadow-lg">
                        <div>
                            <h2 className="mb-2 text-2xl font-bold text-(--heading)">
                                No Syllabus PDFs Found
                            </h2>
                            <p className="text-(--text)">
                                There are no syllabi available at the moment. Try another search and check back soon.
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-wrap gap-4">
                            {paginatedSyllabi.map((syllabus) => (
                                <div
                                    key={syllabus._id}
                                    className="group flex w-full flex-col overflow-hidden rounded-[1.4rem] border border-(--border) bg-(--surface) transition-all duration-300 hover:-translate-y-2 hover:border-(--primary-500) hover:shadow-[0_20px_45px_rgba(0,0,0,0.35)] md:w-[calc(50%-0.5rem)] xl:w-[calc(33.333%-0.75rem)]"
                                >
                                    <div className="relative bg-(--tertiary) p-3">
                                        <img
                                            src={CardImg}
                                            alt="Syllabus cover"
                                            className="h-32 w-full rounded-lg object-cover transition duration-300 group-hover:scale-[1.03]"
                                        />
                                    </div>

                                    <div className="flex flex-1 flex-col gap-3 p-4">
                                        <div>
                                            <div className="min-w-0">
                                                <span className="mb-2 inline-block rounded-full bg-(--btn-primary) px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                                                    {syllabus.subject}
                                                </span>

                                                <h2 className="line-clamp-2 text-lg font-bold text-(--heading)">
                                                    {syllabus.branch} • Semester {syllabus.semester}
                                                </h2>
                                            </div>
                                        </div>

                                        <p className="line-clamp-3 text-sm leading-5 text-(--text)">
                                            {syllabus.description}
                                        </p>

                                        <div className="rounded-lg border border-(--border) bg-(--tertiary) p-3 text-sm text-(--text)">
                                            <p className="mb-1.5">
                                                <span className="font-semibold text-(--heading)">
                                                    Updated:
                                                </span>{" "}
                                                {new Date(syllabus.updatedAt).toDateString()}
                                            </p>

                                            <p>
                                                <span className="font-semibold text-(--heading)">
                                                    Uploaded By:
                                                </span>{" "}
                                                {syllabus.uploadedBy}
                                            </p>
                                        </div>

                                        <div className="mt-auto flex gap-2.5">
                                            <button
                                                onClick={() => handleOpen(syllabus)}
                                                disabled={!syllabus.previewUrl}
                                                className="flex-1 rounded-lg bg-(--btn-secondary) py-2.5 font-semibold text-white transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                Open
                                            </button>

                                            <button
                                                onClick={() => handleDownload(syllabus)}
                                                disabled={!syllabus.downloadUrl}
                                                className="flex-1 rounded-lg bg-(--btn-primary) py-2.5 font-semibold text-white transition hover:bg-(--btn-primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                Download
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {totalPages > 1 && (
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="rounded-xl border border-(--border) bg-(--surface) px-5 py-2.5 font-medium text-(--heading) transition-all duration-300 hover:border-(--primary-500) hover:bg-(--tertiary) disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Previous
                        </button>

                        {visiblePageNumbers.map((pageNumber) => (
                            <button
                                key={pageNumber}
                                onClick={() => setCurrentPage(pageNumber)}
                                className={`h-11 w-11 rounded-xl font-semibold transition-all duration-300 ${currentPage === pageNumber
                                    ? "bg-(--btn-primary) text-white shadow-lg"
                                    : "border border-(--border) bg-(--surface) text-(--heading) hover:border-(--primary-500) hover:bg-(--tertiary)"
                                    }`}
                            >
                                {pageNumber}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="rounded-xl border border-(--border) bg-(--surface) px-5 py-2.5 font-medium text-(--heading) transition-all duration-300 hover:border-(--primary-500) hover:bg-(--tertiary) disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                )}

                <div className="rounded-[2rem] border border-(--border) bg-[linear-gradient(180deg,#243039_0%,#1B252B_100%)] p-8 text-center shadow-[0_20px_45px_rgba(0,0,0,0.35)]">
                    <span className="inline-block rounded-full bg-(--tertiary) px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-(--primary-400)">
                        Need More Material?
                    </span>

                    <h3 className="mt-5 text-3xl font-bold text-(--heading)">
                        Looking for notes after the syllabus?
                    </h3>

                    <p className="mx-auto mt-4 max-w-2xl leading-7 text-(--text)">
                        Explore the notes section to continue with subject-wise study material and downloads.
                    </p>

                    <button
                        onClick={() => navigate("/notes")}
                        className="mt-8 rounded-2xl bg-(--btn-primary) px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:bg-(--btn-primary-hover)"
                    >
                        Browse Notes
                    </button>
                </div>
            </div>
        </div>
    );
}
