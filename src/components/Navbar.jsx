import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Signature from "../assets/signature.png";

const primaryLinks = [
    { to: "/", label: "Home" },
    { to: "/notes", label: "Notes" },
    { to: "/favorites", label: "Favorites" },
    { to: "/note-request", label: "Request Notes" },
];

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loadingLogout, setLoadingLogout] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        setIsLoggedIn(Boolean(token));
        setIsAdmin(email === "dheerajkaushik428@gmail.com");
    }, [location.pathname]);

    const handleLogout = () => {
        try {
            setLoadingLogout(true);
            localStorage.removeItem("token");
            alert("Logged out successfully");
            setIsLoggedIn(false);
            navigate("/login");
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            setLoadingLogout(false);
        }
    };

    const navLinkClassName = ({ isActive }) =>
        `rounded-full px-4 py-2.5 text-sm font-semibold tracking-[0.14em] uppercase transition-all duration-300 ${
            isActive
                ? "border border-(--primary-600) bg-(--surface) text-(--primary-300) shadow-[0_8px_20px_rgba(16,185,129,0.18)]"
                : "border border-(--border) bg-(--secondary) text-(--text-muted) hover:border-(--primary-500) hover:bg-(--surface) hover:text-(--primary-300)"
        }`;

    return (
        <nav className="sticky top-0 z-50 border-b border-(--border) bg-(--secondary)/85 shadow-[0_4px_20px_rgba(0,0,0,0.25)] backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-3 md:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                <div className="flex items-center justify-between gap-4 lg:gap-6">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="group flex min-w-0 items-center gap-3 text-left"
                    >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-(--primary-600) bg-[linear-gradient(135deg,#10B981,#047857)] shadow-[0_8px_20px_rgba(16,185,129,0.28)] transition-all duration-300 group-hover:scale-[1.02]">
                            <span className="text-lg font-bold tracking-[0.16em] text-white">CL</span>
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-base font-black tracking-[0.18em] text-(--heading) uppercase sm:text-lg">CampusLink</p>
                            <p className="truncate text-xs text-(--text-muted) sm:text-sm">Notes, requests, and favorites in one flow.</p>
                        </div>
                    </button>

                    <a
                        className="hidden lg:flex"
                        href="https://www.instagram.com/dheeraj._kaushik"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={Signature}
                            alt="Dheeraj signature"
                            className="w-36 object-contain opacity-20 transition-all duration-300 hover:opacity-45"
                        />
                    </a>
                </div>

                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
                    <div className="flex flex-wrap gap-2 rounded-[1.5rem] border border-(--border) bg-(--tertiary) p-2">
                        {primaryLinks.map((link) => (
                            <NavLink key={link.to} to={link.to} className={navLinkClassName}>
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    <div className="hidden h-10 w-px bg-(--border) lg:block" />

                    {isLoggedIn ? (
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            {isAdmin && (
                                <NavLink to="/admin" className={navLinkClassName}>
                                    Admin
                                </NavLink>
                            )}
                            <NavLink to="/profile" className={navLinkClassName}>
                                Profile
                            </NavLink>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="rounded-full bg-(--btn-primary) px-5 py-2.5 text-sm font-semibold tracking-[0.14em] text-white uppercase shadow-[0_8px_20px_rgba(16,185,129,0.28)] transition-all duration-300 hover:bg-(--btn-primary-hover) active:scale-[0.98]"
                            >
                                {loadingLogout ? "Logging out..." : "Logout"}
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <NavLink
                                to="/login"
                                className="rounded-full border border-(--border) bg-(--surface) px-5 py-2.5 text-center text-sm font-semibold tracking-[0.14em] text-(--primary-300) uppercase transition-all duration-300 hover:border-(--primary-500) hover:bg-(--surface-secondary) active:scale-[0.98]"
                            >
                                Login
                            </NavLink>
                            <Link
                                to="/signup"
                                className="rounded-full bg-(--btn-primary) px-5 py-2.5 text-center text-sm font-semibold tracking-[0.14em] text-white uppercase shadow-[0_8px_20px_rgba(16,185,129,0.28)] transition-all duration-300 hover:bg-(--btn-primary-hover) active:scale-[0.98]"
                            >
                                Signup
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}