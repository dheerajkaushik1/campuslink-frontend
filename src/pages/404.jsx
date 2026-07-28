import { useNavigate } from "react-router-dom";

const recoveryOptions = [
    {
        label: "Home",
        description: "Head back to the main dashboard and continue exploring the platform.",
    },
    {
        label: "Notes",
        description: "Jump straight into the notes library and pick up your study flow again.",
    },
    {
        label: "Request Notes",
        description: "Ask for a missing topic if the content you wanted was not available.",
    },
];

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-(--primary) px-4 py-10 text-(--text)">
            <div className="mx-auto grid min-h-[84vh] w-full max-w-7xl overflow-hidden rounded-[2.25rem] border border-(--border) bg-(--surface) shadow-[0_8px_24px_rgba(0,0,0,0.28)] lg:grid-cols-[0.95fr_1.05fr]">
                <section className="relative flex flex-col justify-between overflow-hidden border-b border-(--border) bg-[linear-gradient(180deg,#243039_0%,#1B252B_100%)] px-6 py-10 lg:border-b-0 lg:border-r lg:px-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),_transparent_26%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.08),_transparent_30%)]" />

                    <div className="relative space-y-6">
                        <span className="inline-flex rounded-full border border-(--primary-600) bg-(--primary-900) px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-(--primary-300)">
                            Lost Route
                        </span>
                        <div className="space-y-4">
                            <p className="text-7xl font-black leading-none text-(--primary-700) md:text-9xl">404</p>
                            <h1 className="max-w-xl text-4xl font-black leading-tight text-(--heading) md:text-5xl">
                                This page is not part of your CampusLink path.
                            </h1>
                            <p className="max-w-xl text-base leading-8 text-(--text)">
                                The link may be broken, the page may have moved, or the route may never have existed. Let&apos;s get you back to something useful quickly.
                            </p>
                        </div>
                    </div>

                    <div className="relative mt-10 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-[1.5rem] border border-(--border) bg-(--surface) p-5">
                            <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">Status</p>
                            <h3 className="mt-3 text-2xl font-bold text-(--heading)">Missing</h3>
                        </div>
                        <div className="rounded-[1.5rem] border border-(--border) bg-(--surface) p-5">
                            <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">Recovery</p>
                            <h3 className="mt-3 text-2xl font-bold text-(--heading)">Easy</h3>
                        </div>
                        <div className="rounded-[1.5rem] border border-(--border) bg-(--surface) p-5">
                            <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">Flow</p>
                            <h3 className="mt-3 text-2xl font-bold text-(--heading)">Restarted</h3>
                        </div>
                    </div>
                </section>

                <section className="flex items-center justify-center px-6 py-10 md:px-10">
                    <div className="w-full max-w-2xl rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_8px_24px_rgba(0,0,0,0.28)] md:p-8">
                        <div className="mb-8">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--primary-400)">Find Your Way Back</p>
                            <h2 className="mt-3 text-3xl font-bold text-(--heading) md:text-4xl">Choose the next useful destination</h2>
                            <p className="mt-3 text-(--text)">
                                You can return to the homepage, browse the notes library, or request missing notes if that is what you were trying to find.
                            </p>
                        </div>

                        <div className="grid gap-4">
                            {recoveryOptions.map((option) => (
                                <div
                                    key={option.label}
                                    className="rounded-[1.5rem] border border-(--border) bg-(--tertiary) p-5"
                                >
                                    <h3 className="text-2xl font-semibold text-(--heading)">{option.label}</h3>
                                    <p className="mt-3 leading-7 text-(--text)">{option.description}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                            <button
                                type="button"
                                onClick={() => navigate("/")}
                                className="rounded-2xl bg-(--secondary) px-6 py-4 text-lg font-semibold text-(--heading) shadow-[0_8px_20px_rgba(16,185,129,0.22)] transition-all duration-300 hover:bg-(--surface)"
                            >
                                Go Home
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/notes")}
                                className="rounded-2xl bg-(--btn-primary) px-6 py-4 text-lg font-semibold text-white shadow-[0_8px_20px_rgba(16,185,129,0.22)] transition-all duration-300 hover:bg-(--btn-primary-hover)"
                            >
                                Open Notes
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/note-request")}
                                className="rounded-2xl border border-(--primary-600) bg-(--surface) px-6 py-4 text-lg font-semibold text-(--primary-300) transition-all duration-300 hover:bg-(--surface-secondary)"
                            >
                                Request Notes
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}