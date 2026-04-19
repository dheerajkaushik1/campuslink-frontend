import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const loginHighlights = [
    "Access your saved study flow in one place.",
    "Open notes quickly with a cleaner dashboard experience.",
    "Stay synced with the latest uploads across subjects.",
];

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loadingLogin, setLoadingLogin] = useState(false);

    const handleLogin = async (e) => {
        if (e) {
            e.preventDefault();
        }

        try {
            setLoadingLogin(true);
            setErrorMessage("");

            const res = await API.post("auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("email", res.data.user.email);
            alert(res.data.message);
            navigate("/notes");
            window.location.reload();
        } catch (err) {
            setErrorMessage(err?.response?.data?.message || "Unable to login right now.");
            alert(err?.response?.data?.message || "Unable to login right now.");
        } finally {
            setLoadingLogin(false);
        }
    };

    if (loadingLogin) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen w-full bg-(--primary) px-4 py-10 text-white">
            <div className="mx-auto grid min-h-[84vh] w-full max-w-7xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,1),rgba(17,24,39,0.98)_42%,rgba(59,131,246,0.16))] shadow-2xl shadow-black/20 lg:grid-cols-[0.95fr_1.05fr]">
                <section className="relative flex flex-col justify-between overflow-hidden border-b border-white/10 px-6 py-10 lg:border-b-0 lg:border-r lg:px-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,131,246,0.22),_transparent_26%),radial-gradient(circle_at_bottom_left,_rgba(17,114,53,0.18),_transparent_30%)]" />

                    <div className="relative space-y-6">
                        <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-slate-200">
                            Welcome Back
                        </span>
                        <div className="space-y-4">
                            <h1 className="max-w-xl text-4xl font-black leading-tight md:text-5xl">
                                Login and step right back into your study space.
                            </h1>
                            <p className="max-w-xl text-base leading-8 text-slate-300">
                                CampusLink now has a cleaner experience across the app, and your login page should feel just as focused and polished.
                            </p>
                        </div>
                    </div>

                    <div className="relative mt-10 space-y-4">
                        {loginHighlights.map((item) => (
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
                            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Access</p>
                            <h3 className="mt-3 text-2xl font-bold text-white">Secure</h3>
                        </div>
                        <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
                            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Flow</p>
                            <h3 className="mt-3 text-2xl font-bold text-white">Faster</h3>
                        </div>
                        <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
                            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Notes</p>
                            <h3 className="mt-3 text-2xl font-bold text-white">Ready</h3>
                        </div>
                    </div>
                </section>

                <section className="flex items-center justify-center px-6 py-10 md:px-10">
                    <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-slate-950/35 p-6 shadow-xl shadow-black/20 backdrop-blur-sm md:p-8">
                        <div className="mb-8">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--secondary)">Account Login</p>
                            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Sign in to CampusLink</h2>
                            <p className="mt-3 text-slate-300">
                                Enter your account details to continue to your notes and profile dashboard.
                            </p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
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
                                    className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-blue-400 focus:bg-white/10"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                                    Password
                                </label>
                                <div className="flex overflow-hidden rounded-2xl border border-white/10 bg-white/6 transition-all duration-300 focus-within:border-blue-400 focus-within:bg-white/10">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        placeholder="Enter your password"
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

                            <div className="flex flex-col gap-4 pt-2">
                                <button
                                    type="submit"
                                    className="rounded-2xl bg-(--secondary) px-5 py-4 text-lg font-semibold text-white transition-all duration-300 hover:brightness-110 active:scale-[0.99]"
                                >
                                    Login
                                </button>

                                <div className="flex flex-col gap-3 rounded-[1.5rem] border border-white/10 bg-white/6 p-4 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between">
                                    <span>New here? Create your account and start exploring notes.</span>
                                    <button
                                        type="button"
                                        onClick={() => navigate("/signup")}
                                        className="rounded-xl bg-(--btn-primary) px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-green-800"
                                    >
                                        Go to Signup
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
