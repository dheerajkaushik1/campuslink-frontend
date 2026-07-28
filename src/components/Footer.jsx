import { Link } from "react-router-dom";

const footerLinks = [
    { to: "/", label: "Home" },
    { to: "/notes", label: "Notes" },
    { to: "/note-request", label: "Request Notes" },
    { to: "/login", label: "Login" },
    { to: "/signup", label: "Signup" },
];

export default function Footer() {
    return (
        <footer className="border-t border-(--border) bg-(--primary) text-white">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 md:px-8">
                <div className="grid gap-6 rounded-[2rem] border border-(--border) bg-[linear-gradient(135deg,#243039,#1B252B)] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.28)] lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
                    <div className="space-y-5">
                        <span className="inline-flex rounded-full border border-(--primary-700) bg-(--primary-900)/30 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-(--primary-300)">
                            CampusLink
                        </span>
                        <div className="space-y-3">
                            <h2 className="max-w-2xl text-3xl font-black leading-tight text-(--heading)">
                                A calmer, cleaner place to explore and manage study notes.
                            </h2>
                            <p className="max-w-2xl leading-8 text-(--text)">
                                CampusLink is built to help students move faster from searching to studying with a more focused experience across notes, login, and profile flows.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {footerLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="rounded-full border border-(--border) bg-(--surface) px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-(--primary-300) transition-all duration-300 hover:border-(--primary-500) hover:bg-(--surface-secondary) hover:text-(--heading)"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                        <div className="rounded-[1.5rem] border border-(--border) bg-(--surface) p-5 backdrop-blur-sm">
                            <p className="text-sm uppercase tracking-[0.2em] text-(--text-muted)">Created By</p>
                            <h3 className="mt-3 text-2xl font-bold text-(--heading)">Dheeraj Kaushik</h3>
                            <p className="mt-3 leading-7 text-(--text)">
                                Designed and developed to make academic note discovery feel more polished and easier to use.
                            </p>
                        </div>

                        <div className="rounded-[1.5rem] border border-(--border) bg-(--surface) p-5 backdrop-blur-sm">
                            <p className="text-sm uppercase tracking-[0.2em] text-(--text-muted)">Contact</p>
                            <a
                                href="mailto:dheerajkaushik428@gmail.com"
                                className="mt-3 block break-all text-lg font-semibold text-(--primary-400) transition-all duration-300 hover:text-(--primary-300)"
                            >
                                dheerajkaushik428@gmail.com
                            </a>
                            <p className="mt-3 text-sm leading-7 text-(--text-muted)">
                                Reach out for collaboration, feedback, or CampusLink improvements.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-(--border) pt-5 text-sm text-(--text-muted) md:flex-row md:items-center md:justify-between">
                    <p>Copyright 2026 CampusLink. All rights reserved.</p>
                    <p>Built by Dheeraj Kaushik with a focus on clarity, speed, and better study flow.</p>
                </div>
            </div>
        </footer>
    );
}