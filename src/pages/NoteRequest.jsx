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
    <div className="min-h-screen w-full bg-(--background) px-4 py-10 text-(--text)">

            {/* Form */}
            <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">

                <div className="rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_8px_24px_rgba(0,0,0,0.25)] md:p-8">

                    <div className="mb-8">
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--primary-400)">
                            Submit Request
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-(--heading) md:text-4xl">
                            Tell the admin what should be added
                        </h2>

                        <p className="mt-3 text-(--text)">
                            Share the topic title and any useful details so the request is easier to understand and more likely to be fulfilled quickly.
                        </p>
                    </div>

                    <form onSubmit={handleRequestSubmit} className="grid gap-5">

                        <div className="space-y-2">
                            <label
                                htmlFor="topic"
                                className="text-sm font-semibold uppercase tracking-[0.18em] text-(--subheading)"
                            >
                                Request Title
                            </label>

                            <input
                                id="topic"
                                type="text"
                                value={topic}
                                placeholder="Example: Data Structures Unit 3 Notes"
                                onChange={(e) => setTopic(e.target.value)}
                                className="w-full rounded-2xl border border-(--border) bg-(--tertiary) px-4 py-4 text-(--heading) outline-none transition-all duration-300 placeholder:text-(--text-disabled) focus:border-(--primary-500) focus:ring-4 focus:ring-(--primary-500)/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="description"
                                className="text-sm font-semibold uppercase tracking-[0.18em] text-(--subheading)"
                            >
                                Additional Details
                            </label>

                            <textarea
                                id="description"
                                rows="6"
                                value={description}
                                placeholder="Mention the subject, chapter name, exam focus, and what kind of notes would help most."
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full resize-none rounded-2xl border border-(--border) bg-(--tertiary) px-4 py-4 text-(--heading) outline-none transition-all duration-300 placeholder:text-(--text-disabled) focus:border-(--primary-500) focus:ring-4 focus:ring-(--primary-500)/20"
                            />
                        </div>

                        {errorMessage && (
                            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                                {errorMessage}
                            </div>
                        )}

                        {successMessage && (
                            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                                {successMessage}
                            </div>
                        )}

                        <div className="rounded-[1.5rem] border border-(--border) bg-(--tertiary) p-4 text-sm leading-7 text-(--text)">
                            Strong requests usually include the course name, the exact topic needed, and whether you want summaries, revision notes, or solved examples.
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-2xl bg-(--btn-primary) px-5 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-(--btn-primary-hover) disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loading ? "Submitting Request..." : "Submit Request"}
                        </button>

                    </form>
                </div>

                {/* Right Panel */}

                <div className="space-y-6">

                    <div className="rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_8px_24px_rgba(0,0,0,0.25)]">

                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--primary-400)">
                            Helpful Tips
                        </p>

                        <h2 className="mt-4 text-3xl font-bold text-(--heading)">
                            Make the request easier to act on
                        </h2>

                        <div className="mt-6 grid gap-4">

                            {requestTips.map((tip) => (
                                <div
                                    key={tip.label}
                                    className="rounded-[1.5rem] border border-(--border) bg-(--tertiary) p-5"
                                >
                                    <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">
                                        {tip.label}
                                    </p>

                                    <p className="mt-3 leading-7 text-(--text)">
                                        {tip.value}
                                    </p>
                                </div>
                            ))}

                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-(--border) bg-[linear-gradient(180deg,#243039_0%,#1B252B_100%)] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.25)]">

                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--primary-300)">
                            What Happens Next
                        </p>

                        <h2 className="mt-4 text-3xl font-bold text-(--heading)">
                            Your request helps guide future uploads
                        </h2>

                        <p className="mt-4 leading-7 text-(--text)">
                            Once submitted, the request can be reviewed by the admin and used to prioritize upcoming notes that students are actively looking for.
                        </p>

                    </div>

                </div>

            </section>
        </div>
);
}