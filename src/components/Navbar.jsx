import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, BrainCircuit, FileText, Flag, Heart, House, ListChecks, Menu, ShieldCheck, UserRound, Sparkles, X } from "lucide-react";

const primaryLinks = [
    { to: "/", label: "Home", icon: House },
    { to: "/notes", label: "Notes", icon: BookOpen },
    { to: "/syllabus", label: "Syllabus", icon: FileText },
    { to: "/papers", label: "Papers", icon: ListChecks },
    { to: "/quiz", label: "Quiz", icon: BrainCircuit },
    { to: "/note-request", label: "Requests", icon: Flag },
];

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loadingLogout, setLoadingLogout] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        setIsLoggedIn(Boolean(token));
        setIsAdmin(email === "dheerajkaushik428@gmail.com");
    }, [location.pathname]);

    useEffect(() => {
        setIsSidebarOpen(false);
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
        `group inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold tracking-[0.08em] uppercase transition-all duration-300 ${isActive
            ? "bg-white/10 text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.18)]"
            : "text-slate-400 hover:bg-white/6 hover:text-white"
        }`;

    const authLinks = isLoggedIn ? (
        <div className="flex items-center gap-2">
            {isAdmin && <NavLink to="/admin" className={navLinkClassName}><ShieldCheck className="h-4 w-4" />Admin</NavLink>}
            <NavLink to="/profile" className={navLinkClassName}><Sparkles className="h-4 w-4" />Profile</NavLink>
            <button type="button" onClick={handleLogout} className="neon-button rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white">
                {loadingLogout ? "Logging out..." : "Logout"}
            </button>
        </div>
    ) : (
        <div className="flex items-center gap-2">
            <NavLink to="/login" className="rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-300 transition hover:bg-white/8 hover:text-white">Login</NavLink>
            <Link to="/signup" className="neon-button rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white">Signup</Link>
        </div>
    );

    return (
       <nav className="fixed top-2 left-0 right-0 z-[9999] w-full px-3 pt-0 sm:px-5">
            <div className="neon-panel mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full px-3 py-2 sm:px-4">
                <button type="button" onClick={() => navigate("/")} className="group flex shrink-0 items-center gap-2 text-left">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#22d3ee,#4f46e5_58%,#d946ef)] text-sm font-black text-white shadow-[0_0_24px_rgba(99,102,241,0.38)] transition group-hover:rotate-6">CL</span>
                    <span className="hidden text-sm font-black tracking-[0.16em] text-white sm:block">CampusLink</span>
                </button>

                <div className="hidden items-center gap-0.5 lg:flex">
                    {primaryLinks.map((link) => (
                        <NavLink key={link.to} to={link.to} className={navLinkClassName}>
                            <link.icon className="h-3.5 w-3.5 transition group-hover:text-cyan-300" />
                            <span>{link.label}</span>
                        </NavLink>
                    ))}
                </div>

                <div className="hidden items-center gap-2 sm:flex">
                    <NavLink to="/favorites" aria-label="Favorites" className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-white/8 hover:text-fuchsia-200"><Heart className="h-4 w-4" /></NavLink>
                    {isLoggedIn && <NavLink to="/profile" aria-label="Open profile" className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-white/8 hover:text-cyan-200"><UserRound className="h-4 w-4" /></NavLink>}
                    {isLoggedIn && isAdmin && <NavLink to="/admin" aria-label="Open admin" className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-white/8 hover:text-fuchsia-200"><ShieldCheck className="h-4 w-4" /></NavLink>}
                    <div className="hidden xl:block">{authLinks}</div>
                </div>

                <button type="button" onClick={() => setIsSidebarOpen(true)} aria-label="Open menu" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-white lg:hidden"><Menu className="h-4 w-4" /></button>
            </div>

            <div className={`fixed inset-0 z-[10000] lg:hidden ${isSidebarOpen ? "visible" : "pointer-events-none invisible"}`}>
                <button type="button" aria-label="Close menu" onClick={() => setIsSidebarOpen(false)} className={`absolute inset-0 bg-[#02040c]/75 backdrop-blur-sm transition-opacity ${isSidebarOpen ? "opacity-100" : "opacity-0"}`} />
                <aside className={`neon-panel absolute right-0 top-0 flex h-full w-[min(88vw,22rem)] flex-col gap-6 rounded-l-[2rem] p-5 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#22d3ee,#7c3aed)] text-sm font-black text-white">CL</span><span className="font-bold text-white">CampusLink</span></div>
                        <button type="button" onClick={() => setIsSidebarOpen(false)} aria-label="Close menu" className="rounded-full bg-white/8 p-2 text-white"><X className="h-4 w-4" /></button>
                    </div>
                    <div className="flex flex-col gap-1">{primaryLinks.map((link) => <NavLink key={link.to} to={link.to} className={navLinkClassName}><link.icon className="h-4 w-4" /><span>{link.label}</span></NavLink>)}</div>
                    <div className="h-px bg-white/10" />
                    <div className="flex flex-col gap-2">{authLinks}</div>
                </aside>
            </div>
        </nav>
    );
}
