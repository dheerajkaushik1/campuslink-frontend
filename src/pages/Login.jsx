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
    <div className="min-h-screen w-full bg-(--background) px-4 py-10 text-(--text)">
        <div className="mx-auto grid min-h-[84vh] w-full max-w-7xl overflow-hidden rounded-[2rem] border border-(--border) bg-(--surface) shadow-[0_8px_24px_rgba(0,0,0,0.25)] lg:grid-cols-[0.95fr_1.05fr]">

            {/* Left Section */}

            <section className="relative flex flex-col justify-between overflow-hidden border-b border-(--border) bg-[linear-gradient(180deg,#243039_0%,#1B252B_100%)] px-6 py-10 lg:border-b-0 lg:border-r lg:px-10">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(5,150,105,0.08),_transparent_30%)]" />

                <div className="relative space-y-6">

                    <span className="inline-flex rounded-full border border-(--border) bg-(--tertiary) px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-(--btn-primary)">
                        Welcome Back
                    </span>

                    <div className="space-y-4">

                        <h1 className="max-w-xl text-4xl font-black leading-tight text-(--heading) md:text-5xl">
                            Login and continue your learning journey.
                        </h1>

                        <p className="max-w-xl text-base leading-8 text-(--text)">
                            Access your notes, favorites, profile, and everything
                            you've saved inside CampusLink.
                        </p>

                    </div>

                </div>

                <div className="relative mt-10 space-y-4">

                    {loginHighlights.map((item) => (
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
                            Access
                        </p>

                        <h3 className="mt-3 text-2xl font-bold text-(--heading)">
                            Secure
                        </h3>
                    </div>

                    <div className="rounded-[1.5rem] border border-(--border) bg-(--tertiary) p-5">
                        <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">
                            Flow
                        </p>

                        <h3 className="mt-3 text-2xl font-bold text-(--heading)">
                            Faster
                        </h3>
                    </div>

                    <div className="rounded-[1.5rem] border border-(--border) bg-(--tertiary) p-5">
                        <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">
                            Notes
                        </p>

                        <h3 className="mt-3 text-2xl font-bold text-(--heading)">
                            Ready
                        </h3>
                    </div>

                </div>

            </section>

            {/* Login Form */}

            <section className="flex items-center justify-center px-6 py-10 md:px-10">

                <div className="w-full max-w-xl rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_8px_24px_rgba(0,0,0,0.25)] md:p-8">

                    <div className="mb-8">

                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--btn-primary)">
                            Account Login
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-(--heading) md:text-4xl">
                            Sign in to CampusLink
                        </h2>

                        <p className="mt-3 text-(--text)">
                            Enter your account details to continue.
                        </p>

                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">

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
                                    placeholder="Enter your password"
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

                        <div className="flex flex-col gap-4 pt-2">

                            <button
                                type="submit"
                                className="rounded-2xl bg-(--btn-primary) px-5 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-(--btn-primary-hover)"
                            >
                                Login
                            </button>

                            <div className="flex flex-col gap-3 rounded-[1.5rem] border border-(--border) bg-(--tertiary) p-4 text-sm text-(--text) sm:flex-row sm:items-center sm:justify-between">

                                <span>
                                    New here? Create an account.
                                </span>

                                <button
                                    type="button"
                                    onClick={() => navigate("/signup")}
                                    className="rounded-xl bg-(--btn-secondary) px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-slate-600"
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