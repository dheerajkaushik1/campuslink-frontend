import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const signupHighlights = [
    "Create your CampusLink account in a cleaner, more focused flow.",
    "Start exploring organized notes across subjects right after signup.",
    "Move into login quickly once your account is ready.",
];

export default function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loadingSignup, setLoadingSignup] = useState(false);

    const handleSignup = async (e) => {
        if (e) {
            e.preventDefault();
        }

        try {
            setLoadingSignup(true);
            setErrorMessage("");
            await API.post("/auth/signup", { email, password, name });
            alert("Account created successfully. Please login.");
            navigate("/login");
        } catch (err) {
            setErrorMessage(err?.response?.data?.message || "Error signing up");
            alert(err?.response?.data?.message || "Error signing up");
        } finally {
            setLoadingSignup(false);
        }
    };

    if (loadingSignup) {
        return <Loader />;
    }

    return (
    <div className="min-h-screen w-full bg-(--background) px-4 py-10 text-(--text)">
        <div className="mx-auto grid min-h-[84vh] w-full max-w-7xl overflow-hidden rounded-[2rem] border border-(--border) bg-(--surface) shadow-[0_8px_24px_rgba(0,0,0,0.25)] lg:grid-cols-[0.92fr_1.08fr]">

            {/* Left Side */}

            <section className="relative flex flex-col justify-between overflow-hidden border-b border-(--border) bg-[linear-gradient(180deg,#243039_0%,#1B252B_100%)] px-6 py-10 lg:border-b-0 lg:border-r lg:px-10">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(5,150,105,0.08),_transparent_30%)]" />

                <div className="relative space-y-6">

                    <span className="inline-flex rounded-full border border-(--border) bg-(--tertiary) px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-(--btn-primary)">
                        Join CampusLink
                    </span>

                    <div className="space-y-4">
                        <h1 className="max-w-xl text-4xl font-black leading-tight text-(--heading) md:text-5xl">
                            Create your account and start learning smarter.
                        </h1>

                        <p className="max-w-xl text-base leading-8 text-(--text)">
                            Join CampusLink to explore notes, save favorites,
                            request new material, and organize your study journey.
                        </p>
                    </div>

                </div>

                <div className="relative mt-10 space-y-4">

                    {signupHighlights.map((item) => (
                        <div
                            key={item}
                            className="rounded-[1.5rem] border border-(--border) bg-(--surface) p-5"
                        >
                            <p className="leading-7 text-(--text)">
                                {item}
                            </p>
                        </div>
                    ))}

                </div>

                <div className="relative mt-10 grid gap-4 sm:grid-cols-3">

                    <div className="rounded-[1.5rem] border border-(--border) bg-(--tertiary) p-5">
                        <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">
                            Setup
                        </p>

                        <h3 className="mt-3 text-2xl font-bold text-(--heading)">
                            Simple
                        </h3>
                    </div>

                    <div className="rounded-[1.5rem] border border-(--border) bg-(--tertiary) p-5">
                        <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">
                            Access
                        </p>

                        <h3 className="mt-3 text-2xl font-bold text-(--heading)">
                            Instant
                        </h3>
                    </div>

                    <div className="rounded-[1.5rem] border border-(--border) bg-(--tertiary) p-5">
                        <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">
                            Journey
                        </p>

                        <h3 className="mt-3 text-2xl font-bold text-(--heading)">
                            Ready
                        </h3>
                    </div>

                </div>

            </section>

            {/* Right Side */}

            <section className="flex items-center justify-center px-6 py-10 md:px-10">

                <div className="w-full max-w-2xl rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_8px_24px_rgba(0,0,0,0.25)] md:p-8">

                    <div className="mb-8">

                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--btn-primary)">
                            Create Account
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-(--heading) md:text-4xl">
                            Sign up for CampusLink
                        </h2>

                        <p className="mt-3 text-(--text)">
                            Fill in your details below to create your account.
                        </p>

                    </div>

                    <form onSubmit={handleSignup} className="grid gap-5">

                        <div className="space-y-2">

                            <label
                                htmlFor="name"
                                className="text-sm font-semibold uppercase tracking-[0.18em] text-(--subheading)"
                            >
                                Full Name
                            </label>

                            <input
                                type="text"
                                id="name"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full rounded-2xl border border-(--border) bg-(--tertiary) px-4 py-4 text-(--heading) outline-none transition-all duration-300 placeholder:text-(--text-disabled) focus:border-(--btn-primary)"
                            />

                        </div>

                        <div className="space-y-2">

                            <label
                                htmlFor="email"
                                className="text-sm font-semibold uppercase tracking-[0.18em] text-(--subheading)"
                            >
                                Email
                            </label>

                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-2xl border border-(--border) bg-(--tertiary) px-4 py-4 text-(--heading) outline-none transition-all duration-300 placeholder:text-(--text-disabled) focus:border-(--btn-primary)"
                            />

                        </div>

                        <div className="space-y-2">

                            <label
                                htmlFor="password"
                                className="text-sm font-semibold uppercase tracking-[0.18em] text-(--subheading)"
                            >
                                Password
                            </label>

                            <div className="flex overflow-hidden rounded-2xl border border-(--border) bg-(--tertiary)">

                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-transparent px-4 py-4 text-(--heading) outline-none placeholder:text-(--text-disabled)"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="border-l border-(--border) px-4 text-sm font-semibold text-(--btn-primary) hover:bg-(--surface)"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>

                            </div>

                        </div>

                        {errorMessage && (
                            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                                {errorMessage}
                            </div>
                        )}

                        <div className="rounded-[1.5rem] border border-(--border) bg-(--tertiary) p-4 text-sm leading-7 text-(--text)">
                            Your account lets you browse notes, save favorites,
                            request missing notes, and access all CampusLink
                            features.
                        </div>

                        <div className="flex flex-col gap-4 pt-2">

                            <button
                                type="submit"
                                className="rounded-2xl bg-(--btn-primary) px-5 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-(--btn-primary-hover)"
                            >
                                Signup
                            </button>

                            <div className="flex flex-col gap-3 rounded-[1.5rem] border border-(--border) bg-(--tertiary) p-4 text-sm text-(--text) sm:flex-row sm:items-center sm:justify-between">

                                <span>
                                    Already have an account?
                                </span>

                                <button
                                    type="button"
                                    onClick={() => navigate("/login")}
                                    className="rounded-xl bg-(--btn-secondary) px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-slate-600"
                                >
                                    Go to Login
                                </button>

                            </div>

                        </div>

                    </form>

                </div>

            </section>

        </div>
    </div>
);

}