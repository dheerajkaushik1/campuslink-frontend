import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Signature from "../assets/signature.png";

const primaryLinks = [
    { to: "/", label: "Home" },
    { to: "/notes", label: "Notes" },
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
        `rounded-full px-4 py-2 text-sm font-semibold tracking-[0.16em] uppercase transition-all duration-300 ${
            isActive
                ? "bg-(--secondary) text-white shadow-lg shadow-blue-500/20"
                : "border border-white/10 bg-white/6 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
        }`;

    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(17,24,39,0.9))] backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-4 md:px-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:gap-6">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="group flex items-center gap-3 text-left"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8 shadow-lg shadow-black/10 transition-all duration-300 group-hover:border-blue-400/30 group-hover:bg-white/12">
                            <span className="text-xl text-white">CL</span>
                        </div>
                        <div>
                            <p className="text-lg font-black tracking-[0.18em] text-white uppercase">CampusLink</p>
                            <p className="text-sm text-slate-400">Find notes. Stay ready.</p>
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
                            className="w-36 object-contain opacity-20 transition-all duration-300 hover:opacity-55"
                        />
                    </a>
                </div>

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-5">
                    <div className="flex flex-wrap gap-3">
                        {primaryLinks.map((link) => (
                            <NavLink key={link.to} to={link.to} className={navLinkClassName}>
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    <div className="h-px w-full bg-white/10 lg:h-10 lg:w-px" />

                    {isLoggedIn ? (
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
                                className="rounded-full bg-(--btn-primary) px-5 py-2.5 text-sm font-semibold tracking-[0.16em] text-white uppercase transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
                            >
                                {loadingLogout ? "Logging out..." : "Logout"}
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <NavLink to="/login" className={navLinkClassName}>
                                Login
                            </NavLink>
                            <Link
                                to="/signup"
                                className="rounded-full bg-(--secondary) px-5 py-2.5 text-center text-sm font-semibold tracking-[0.16em] text-white uppercase transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
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
