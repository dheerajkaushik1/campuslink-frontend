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
        <div className="min-h-screen w-full bg-(--primary) px-4 py-10 text-white">
            <div className="mx-auto grid min-h-[84vh] w-full max-w-7xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,1),rgba(17,24,39,0.97)_42%,rgba(59,131,246,0.14))] shadow-2xl shadow-black/20 lg:grid-cols-[0.95fr_1.05fr]">
                <section className="relative flex flex-col justify-between overflow-hidden border-b border-white/10 px-6 py-10 lg:border-b-0 lg:border-r lg:px-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,131,246,0.22),_transparent_26%),radial-gradient(circle_at_bottom_left,_rgba(17,114,53,0.16),_transparent_30%)]" />

                    <div className="relative space-y-6">
                        <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-slate-200">
                            Lost Route
                        </span>
                        <div className="space-y-4">
                            <p className="text-7xl font-black leading-none text-white/15 md:text-9xl">404</p>
                            <h1 className="max-w-xl text-4xl font-black leading-tight md:text-5xl">
                                This page is not part of your CampusLink path.
                            </h1>
                            <p className="max-w-xl text-base leading-8 text-slate-300">
                                The link may be broken, the page may have moved, or the route may never have existed. Let&apos;s get you back to something useful quickly.
                            </p>
                        </div>
                    </div>

                    <div className="relative mt-10 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
                            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Status</p>
                            <h3 className="mt-3 text-2xl font-bold text-white">Missing</h3>
                        </div>
                        <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
                            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Recovery</p>
                            <h3 className="mt-3 text-2xl font-bold text-white">Easy</h3>
                        </div>
                        <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
                            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Flow</p>
                            <h3 className="mt-3 text-2xl font-bold text-white">Restarted</h3>
                        </div>
                    </div>
                </section>

                <section className="flex items-center justify-center px-6 py-10 md:px-10">
                    <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-slate-950/35 p-6 shadow-xl shadow-black/20 backdrop-blur-sm md:p-8">
                        <div className="mb-8">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--secondary)">Find Your Way Back</p>
                            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Choose the next useful destination</h2>
                            <p className="mt-3 text-slate-300">
                                You can return to the homepage, browse the notes library, or request missing notes if that is what you were trying to find.
                            </p>
                        </div>

                        <div className="grid gap-4">
                            {recoveryOptions.map((option) => (
                                <div
                                    key={option.label}
                                    className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5"
                                >
                                    <h3 className="text-2xl font-semibold text-white">{option.label}</h3>
                                    <p className="mt-3 leading-7 text-slate-300">{option.description}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                            <button
                                type="button"
                                onClick={() => navigate("/")}
                                className="rounded-2xl bg-(--secondary) px-6 py-4 text-lg font-semibold text-white transition-all duration-300 hover:brightness-110"
                            >
                                Go Home
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/notes")}
                                className="rounded-2xl bg-(--btn-primary) px-6 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-green-800"
                            >
                                Open Notes
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/note-request")}
                                className="rounded-2xl border border-white/10 bg-white/6 px-6 py-4 text-lg font-semibold text-slate-200 transition-all duration-300 hover:bg-white/10"
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
