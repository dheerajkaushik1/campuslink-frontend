import { useState } from "react";
import API from "../api/api";

const requestHighlights = [
    "Ask for a missing topic, chapter, or subject without hunting down the admin manually.",
    "Share enough detail so the request is easier to understand and quicker to act on.",
    "Keep CampusLink growing around what students actually need next.",
];

const requestTips = [
    {
        label: "Be specific",
        value: "Mention the subject, unit, chapter, or exam focus so the request is easier to fulfill accurately.",
    },
    {
        label: "Add context",
        value: "Include whether you need revision notes, solved questions, summaries, or a full topic breakdown.",
    },
    {
        label: "Keep it clear",
        value: "A short, focused description helps the admin review and prioritize requests faster.",
    },
];

export default function NoteRequest() {
    const [loading, setLoading] = useState(false);
    const [topic, setTopic] = useState("");
    const [description, setDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleRequestSubmit = async (e) => {
        if (e) {
            e.preventDefault();
        }

        try {
            setLoading(true);
            setErrorMessage("");
            setSuccessMessage("");

            await API.post("note-requests/create", {
                topic,
                description,
            });

            setSuccessMessage("Request submitted successfully. Admin will review it soon.");
            alert("Request submitted. Admin will review and get back to you soon.");
            setTopic("");
            setDescription("");
        } catch (err) {
            const message = err?.response?.data?.message || "Error submitting note request. Please try again later.";
            setErrorMessage(message);
            alert(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-(--primary) px-4 py-10 text-white">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
                <section className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,1),rgba(17,24,39,0.97)_44%,rgba(59,131,246,0.16))] px-6 py-10 shadow-2xl shadow-black/20 md:px-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,131,246,0.2),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(17,114,53,0.16),_transparent_28%)]" />

                    <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-3">
                                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-slate-200">
                                    Request Notes
                                </span>
                                <span className="rounded-full bg-blue-400/15 px-4 py-2 text-sm font-semibold text-blue-200">
                                    Student Support
                                </span>
                            </div>

                            <div className="space-y-4">
                                <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-5xl">
                                    Ask for the notes you need next with a cleaner request flow.
                                </h1>
                                <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                                    If something is missing from the library, send a focused request and help shape what gets added to CampusLink next.
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Requests</p>
                                    <h2 className="mt-3 text-2xl font-bold text-white">Focused</h2>
                                </div>
                                <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Review</p>
                                    <h2 className="mt-3 text-2xl font-bold text-white">Clearer</h2>
                                </div>
                                <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Flow</p>
                                    <h2 className="mt-3 text-2xl font-bold text-white">Smoother</h2>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {requestHighlights.map((item) => (
                                <div
                                    key={item}
                                    className="rounded-[1.5rem] border border-white/10 bg-slate-950/35 p-5 backdrop-blur-sm"
                                >
                                    <p className="leading-7 text-slate-200">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
                    <div className="rounded-[2rem] border border-white/10 bg-slate-950/30 p-6 shadow-xl shadow-black/10 md:p-8">
                        <div className="mb-8">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--secondary)">Submit Request</p>
                            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Tell the admin what should be added</h2>
                            <p className="mt-3 text-slate-300">
                                Share the topic title and any useful details so the request is easier to understand and more likely to be fulfilled quickly.
                            </p>
                        </div>

                        <form onSubmit={handleRequestSubmit} className="grid gap-5">
                            <div className="space-y-2">
                                <label htmlFor="topic" className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                                    Request Title
                                </label>
                                <input
                                    id="topic"
                                    type="text"
                                    value={topic}
                                    placeholder="Example: Data Structures Unit 3 Notes"
                                    onChange={(e) => setTopic(e.target.value)}
                                    className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-blue-400 focus:bg-white/10"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="description" className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                                    Additional Details
                                </label>
                                <textarea
                                    id="description"
                                    rows="6"
                                    value={description}
                                    placeholder="Mention the subject, chapter name, exam focus, and what kind of notes would help most."
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-blue-400 focus:bg-white/10"
                                />
                            </div>

                            {errorMessage && (
                                <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
                                    {errorMessage}
                                </div>
                            )}

                            {successMessage && (
                                <div className="rounded-2xl border border-green-400/20 bg-green-400/10 px-4 py-3 text-sm text-green-100">
                                    {successMessage}
                                </div>
                            )}

                            <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4 text-sm leading-7 text-slate-300">
                                Strong requests usually include the course name, the exact topic needed, and whether you want summaries, revision notes, or solved examples.
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-2xl bg-(--secondary) px-5 py-4 text-lg font-semibold text-white transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {loading ? "Submitting Request..." : "Submit Request"}
                            </button>
                        </form>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/10">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--secondary)">Helpful Tips</p>
                            <h2 className="mt-4 text-3xl font-bold text-white">Make the request easier to act on</h2>
                            <div className="mt-6 grid gap-4">
                                {requestTips.map((tip) => (
                                    <div
                                        key={tip.label}
                                        className="rounded-[1.5rem] border border-white/10 bg-slate-950/30 p-5"
                                    >
                                        <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{tip.label}</p>
                                        <p className="mt-3 leading-7 text-slate-300">{tip.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(17,114,53,0.18),rgba(17,24,39,0.92)_52%,rgba(59,131,246,0.14))] p-6 shadow-xl shadow-black/10">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-green-200">What Happens Next</p>
                            <h2 className="mt-4 text-3xl font-bold text-white">Your request helps guide future uploads</h2>
                            <p className="mt-4 leading-7 text-slate-300">
                                Once submitted, the request can be reviewed by the admin and used to prioritize upcoming notes that students are actively looking for.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
