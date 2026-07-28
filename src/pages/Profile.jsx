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
            buttonStyle: "bg-(--btn-primary) text-white hover:bg-(--btn-primary-hover) shadow-[0_8px_20px_rgba(37,99,235,0.18)]",
        },
        {
            title: "Request Notes",
            description: "Ask for a missing topic or subject and help shape the next uploads.",
            action: () => navigate("/note-request"),
            buttonLabel: "Open Request Page",
            buttonStyle: "bg-(--secondary) text-white hover:bg-(--primary-600) shadow-[0_8px_20px_rgba(37,99,235,0.18)]",
        },
        {
            title: "Return Home",
            description: "Jump back to the redesigned landing page and featured sections.",
            action: () => navigate("/"),
            buttonLabel: "Go Home",
            buttonStyle: "bg-(--primary-50) text-(--primary-700) border border-(--primary-200) hover:bg-(--primary-100)",
        },
    ];

    if (isAdmin) {
        quickActions.push(
            {
                title: "Admin Workspace",
                description: "Open the admin panel to publish fresh notes and manage the content flow.",
                action: () => navigate("/admin"),
                buttonLabel: "Open Admin",
                buttonStyle: "border border-(--primary-200) bg-white text-(--primary-700) hover:bg-(--primary-50)",
            },
            {
                title: "Manage Requests",
                description: "Review note requests, mark them completed, and delete outdated ones.",
                action: () => navigate("/admin/requests"),
                buttonLabel: "Open Requests",
                buttonStyle: "bg-(--primary-700) text-white hover:bg-(--primary-800)",
            }
        );
    }

    return (
    <div className="min-h-screen w-full bg-(--background) px-4 py-10 text-(--text)">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">

            {/* Hero */}
            <section className="relative overflow-hidden rounded-[2rem] border border-(--border) bg-[linear-gradient(180deg,#243039_0%,#1B252B_100%)] px-6 py-10 shadow-[0_8px_24px_rgba(0,0,0,0.3)] md:px-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(5,150,105,0.08),_transparent_30%)]" />

                <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-full border border-(--border) bg-(--tertiary) px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-(--btn-primary)">
                                Personal Dashboard
                            </span>

                            <span
                                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                                    isAdmin
                                        ? "bg-(--btn-primary) text-white"
                                        : "bg-(--tertiary) text-(--btn-primary)"
                                }`}
                            >
                                {isAdmin ? "Admin Access Enabled" : "Member Account"}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <h1 className="max-w-3xl text-4xl font-black leading-tight text-(--heading) md:text-5xl">
                                Welcome back, {fullName}.
                            </h1>

                            <p className="max-w-2xl text-base leading-8 text-(--text) md:text-lg">
                                Your CampusLink profile gives you quick access to your account,
                                notes, favorites, and admin tools in one place.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {profileStats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-[1.5rem] border border-(--border) bg-(--surface) p-5"
                                >
                                    <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">
                                        {stat.label}
                                    </p>

                                    <h2 className="mt-3 text-2xl font-bold text-(--heading)">
                                        {stat.value}
                                    </h2>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Profile Card */}

                    <div className="rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_8px_24px_rgba(0,0,0,0.25)]">

                        <div className="flex items-center gap-4">

                            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[linear-gradient(135deg,#10B981,#047857)] text-3xl font-black text-white shadow-[0_8px_20px_rgba(16,185,129,0.25)]">
                                {initials}
                            </div>

                            <div>
                                <p className="text-sm uppercase tracking-[0.2em] text-(--text-muted)">
                                    Profile Identity
                                </p>

                                <h2 className="mt-1 text-2xl font-bold text-(--heading)">
                                    {fullName}
                                </h2>

                                <p className="text-(--text)">
                                    @{emailHandle}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4 rounded-[1.5rem] border border-(--border) bg-(--tertiary) p-5">

                            <div>
                                <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">
                                    Email
                                </p>

                                <p className="mt-2 break-all text-lg font-medium text-(--heading)">
                                    {email}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">
                                    Occupation
                                </p>

                                <p className="mt-2 text-lg font-medium text-(--heading)">
                                    {occupation}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">
                                    Member Since
                                </p>

                                <p className="mt-2 text-lg font-medium text-(--heading)">
                                    {memberSince}
                                </p>
                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* Bottom Section */}

            <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">

                {/* Summary */}

                <div className="rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_8px_24px_rgba(0,0,0,0.25)]">

                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--btn-primary)">
                        Account Summary
                    </p>

                    <h2 className="mt-4 text-3xl font-bold text-(--heading)">
                        Your CampusLink Profile
                    </h2>

                    <p className="mt-4 leading-8 text-(--text)">
                        Keep track of your profile information, account type,
                        and study access in one place.
                    </p>

                    <div className="mt-8 space-y-4">

                        <div className="rounded-[1.5rem] border border-(--border) bg-(--tertiary) p-5">
                            <p className="text-sm uppercase tracking-[0.2em] text-(--text-muted)">
                                Display Name
                            </p>

                            <p className="mt-2 text-xl font-semibold text-(--heading)">
                                {fullName}
                            </p>
                        </div>

                        <div className="rounded-[1.5rem] border border-(--border) bg-(--tertiary) p-5">
                            <p className="text-sm uppercase tracking-[0.2em] text-(--text-muted)">
                                Primary Role
                            </p>

                            <p className="mt-2 text-xl font-semibold text-(--heading)">
                                {occupation}
                            </p>
                        </div>

                        <div className="rounded-[1.5rem] border border-(--border) bg-(--tertiary) p-5">
                            <p className="text-sm uppercase tracking-[0.2em] text-(--text-muted)">
                                Account Access
                            </p>

                            <p className="mt-2 text-xl font-semibold text-(--heading)">
                                {isAdmin
                                    ? "Administrator tools available"
                                    : "Standard study access"}
                            </p>
                        </div>

                    </div>

                </div>

                {/* Quick Actions */}

                <div className="rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_8px_24px_rgba(0,0,0,0.25)]">

                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--btn-primary)">
                        Quick Actions
                    </p>

                    <h2 className="mt-4 text-3xl font-bold text-(--heading)">
                        Move Faster
                    </h2>

                    <div className="mt-8 grid gap-4">

                        {quickActions.map((item) => (
                            <div
                                key={item.title}
                                className="rounded-[1.5rem] border border-(--border) bg-(--tertiary) p-5"
                            >
                                <h3 className="text-2xl font-semibold text-(--heading)">
                                    {item.title}
                                </h3>

                                <p className="mt-3 leading-7 text-(--text)">
                                    {item.description}
                                </p>

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