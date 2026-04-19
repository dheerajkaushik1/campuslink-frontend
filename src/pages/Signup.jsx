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
        <div className="min-h-screen w-full bg-(--primary) px-4 py-10 text-white">
            <div className="mx-auto grid min-h-[84vh] w-full max-w-7xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,1),rgba(17,24,39,0.98)_42%,rgba(17,114,53,0.18))] shadow-2xl shadow-black/20 lg:grid-cols-[0.92fr_1.08fr]">
                <section className="relative flex flex-col justify-between overflow-hidden border-b border-white/10 px-6 py-10 lg:border-b-0 lg:border-r lg:px-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(17,114,53,0.22),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(59,131,246,0.18),_transparent_30%)]" />

                    <div className="relative space-y-6">
                        <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-slate-200">
                            Join CampusLink
                        </span>
                        <div className="space-y-4">
                            <h1 className="max-w-xl text-4xl font-black leading-tight md:text-5xl">
                                Create your account and build your study flow from day one.
                            </h1>
                            <p className="max-w-xl text-base leading-8 text-slate-300">
                                Signup should feel simple and polished, so this page now gives your first step into CampusLink a much stronger experience.
                            </p>
                        </div>
                    </div>

                    <div className="relative mt-10 space-y-4">
                        {signupHighlights.map((item) => (
                            <div
                                key={item}
                                className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm"
                            >
                                <p className="text-base leading-7 text-slate-200">{item}</p>
                            </div>
                        ))}
                    </div>

                    <div className="relative mt-10 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
                            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Setup</p>
                            <h3 className="mt-3 text-2xl font-bold text-white">Simple</h3>
                        </div>
                        <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
                            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Access</p>
                            <h3 className="mt-3 text-2xl font-bold text-white">Instant</h3>
                        </div>
                        <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
                            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Journey</p>
                            <h3 className="mt-3 text-2xl font-bold text-white">Ready</h3>
                        </div>
                    </div>
                </section>

                <section className="flex items-center justify-center px-6 py-10 md:px-10">
                    <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-slate-950/35 p-6 shadow-xl shadow-black/20 backdrop-blur-sm md:p-8">
                        <div className="mb-8">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--secondary)">Create Account</p>
                            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Sign up for CampusLink</h2>
                            <p className="mt-3 text-slate-300">
                                Fill in your details to create an account and continue into the login flow.
                            </p>
                        </div>

                        <form onSubmit={handleSignup} className="grid gap-5">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-green-400 focus:bg-white/10"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-green-400 focus:bg-white/10"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                                    Password
                                </label>
                                <div className="flex overflow-hidden rounded-2xl border border-white/10 bg-white/6 transition-all duration-300 focus-within:border-green-400 focus-within:bg-white/10">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        placeholder="Create a password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-transparent px-4 py-4 text-white outline-none placeholder:text-slate-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="border-l border-white/10 px-4 text-sm font-semibold text-slate-300 transition-all duration-300 hover:bg-white/10"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            {errorMessage && (
                                <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
                                    {errorMessage}
                                </div>
                            )}

                            <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4 text-sm leading-7 text-slate-300">
                                Your account will let you access the notes library, view your profile, and continue into the redesigned CampusLink experience.
                            </div>

                            <div className="flex flex-col gap-4 pt-2">
                                <button
                                    type="submit"
                                    className="rounded-2xl bg-(--btn-primary) px-5 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-green-800 active:scale-[0.99]"
                                >
                                    Signup
                                </button>

                                <div className="flex flex-col gap-3 rounded-[1.5rem] border border-white/10 bg-white/6 p-4 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between">
                                    <span>Already have an account? Jump straight into login.</span>
                                    <button
                                        type="button"
                                        onClick={() => navigate("/login")}
                                        className="rounded-xl bg-(--secondary) px-4 py-2 font-semibold text-white transition-all duration-300 hover:brightness-110"
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
