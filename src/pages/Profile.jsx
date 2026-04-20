import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Loader from "../components/Loader";

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        fetchProfile();
    }, [navigate]);

    const fetchProfile = async () => {
        try {
            const res = await API.get("/auth/profile");
            setUser(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    const fullName = user?.name || "CampusLink User";
    const email = user?.email || "No email available";
    const occupation = user?.occupation || "Student";
    const memberSince = user?.createdAt ? new Date(user.createdAt).toDateString() : "Not available";
    const joinedYear = user?.createdAt ? new Date(user.createdAt).getFullYear() : "2026";
    const emailHandle = email.includes("@") ? email.split("@")[0] : email;
    const initials = fullName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("") || "CU";
    const isAdmin = email === "dheerajkaushik428@gmail.com";

    const profileStats = [
        { label: "Account Type", value: isAdmin ? "Admin" : "Member" },
        { label: "Occupation", value: occupation },
        { label: "Joined", value: joinedYear },
        { label: "Status", value: "Active" },
    ];

    const quickActions = [
        {
            title: "Explore Notes",
            description: "Browse the latest shared material and continue studying.",
            action: () => navigate("/notes"),
            buttonLabel: "Open Notes",
            buttonStyle: "bg-(--btn-primary) text-white hover:bg-green-800",
        },
        {
            title: "Request Notes",
            description: "Ask for a missing topic or subject and help shape the next uploads.",
            action: () => navigate("/note-request"),
            buttonLabel: "Open Request Page",
            buttonStyle: "bg-(--secondary) text-white hover:brightness-110",
        },
        {
            title: "Return Home",
            description: "Jump back to the redesigned landing page and featured sections.",
            action: () => navigate("/"),
            buttonLabel: "Go Home",
            buttonStyle: "bg-(--btn-secondary) text-white hover:bg-slate-600",
        },
    ];

    if (isAdmin) {
        quickActions.push(
            {
                title: "Admin Workspace",
                description: "Open the admin panel to publish fresh notes and manage the content flow.",
                action: () => navigate("/admin"),
                buttonLabel: "Open Admin",
                buttonStyle: "border border-white/10 bg-white/8 text-white hover:bg-white/12",
            },
            {
                title: "Manage Requests",
                description: "Review note requests, mark them completed, and delete outdated ones.",
                action: () => navigate("/admin/requests"),
                buttonLabel: "Open Requests",
                buttonStyle: "bg-amber-500 text-white hover:bg-amber-600",
            }
        );
    }

    return (
        <div className="min-h-screen w-full bg-(--primary) px-4 py-10 text-white">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
                <section className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,1),rgba(17,24,39,0.97)_45%,rgba(59,131,246,0.18))] px-6 py-10 shadow-2xl shadow-black/20 md:px-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,131,246,0.22),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(17,114,53,0.20),_transparent_28%)]" />

                    <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">
                                    Personal Dashboard
                                </span>
                                <span className={`rounded-full px-4 py-2 text-sm font-semibold ${isAdmin ? "bg-amber-400/20 text-amber-200" : "bg-green-400/15 text-green-200"}`}>
                                    {isAdmin ? "Admin Access Enabled" : "Member Account"}
                                </span>
                            </div>

                            <div className="space-y-4">
                                <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-5xl">
                                    Welcome back, {fullName}.
                                </h1>
                                <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                                    Your CampusLink profile now gives you a cleaner account overview, quicker navigation, and a better sense of where to go next.
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                {profileStats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur-sm"
                                    >
                                        <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{stat.label}</p>
                                        <h2 className="mt-3 text-2xl font-bold text-white">{stat.value}</h2>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-white/10 bg-slate-950/35 p-6 shadow-xl shadow-black/20 backdrop-blur-sm">
                            <div className="flex items-center gap-4">
                                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[linear-gradient(135deg,rgba(59,131,246,0.9),rgba(17,114,53,0.75))] text-3xl font-black text-white shadow-lg shadow-blue-950/40">
                                    {initials}
                                </div>
                                <div>
                                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Profile Identity</p>
                                    <h2 className="mt-1 text-2xl font-bold text-white">{fullName}</h2>
                                    <p className="text-slate-300">@{emailHandle}</p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4 rounded-[1.5rem] border border-white/8 bg-white/6 p-5">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Email</p>
                                    <p className="mt-2 text-lg font-medium text-white break-all">{email}</p>
                                </div>
                                <div>
                                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Occupation</p>
                                    <p className="mt-2 text-lg font-medium text-white">{occupation}</p>
                                </div>
                                <div>
                                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Member Since</p>
                                    <p className="mt-2 text-lg font-medium text-white">{memberSince}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/10">
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--secondary)">Account Summary</p>
                        <h2 className="mt-4 text-3xl font-bold text-white">A clearer look at your presence on CampusLink</h2>
                        <p className="mt-4 leading-8 text-slate-300">
                            This page is redesigned to make your profile feel more complete, easier to scan, and more connected to the rest of the app.
                        </p>

                        <div className="mt-8 space-y-4">
                            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/30 p-5">
                                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Display Name</p>
                                <p className="mt-2 text-xl font-semibold text-white">{fullName}</p>
                            </div>
                            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/30 p-5">
                                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Primary Role</p>
                                <p className="mt-2 text-xl font-semibold text-white">{occupation}</p>
                            </div>
                            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/30 p-5">
                                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Account Access</p>
                                <p className="mt-2 text-xl font-semibold text-white">
                                    {isAdmin ? "Administrator tools available" : "Standard study access"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/10">
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--secondary)">Quick Actions</p>
                        <h2 className="mt-4 text-3xl font-bold text-white">Move faster from your profile</h2>
                        <div className="mt-8 grid gap-4">
                            {quickActions.map((item) => (
                                <div
                                    key={item.title}
                                    className="rounded-[1.5rem] border border-white/10 bg-slate-950/30 p-5"
                                >
                                    <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                                    <p className="mt-3 leading-7 text-slate-300">{item.description}</p>
                                    <button
                                        onClick={item.action}
                                        className={`mt-5 rounded-2xl px-5 py-3 font-semibold transition-all duration-300 ${item.buttonStyle}`}
                                    >
                                        {item.buttonLabel}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
