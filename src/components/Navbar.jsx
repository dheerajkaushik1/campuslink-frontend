import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import Signature from "../assets/signature.png"

export default function Navbar() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loadingLogout, setLoadingLogout] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        try {
            setLoadingLogout(true);
            localStorage.removeItem('token');
            alert("Logged out successfully");
            setIsLoggedIn(false);
            navigate('/login');
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            setLoadingLogout(false);
        }
    }

    return (
        <nav className="bg-(--primary) h-auto md:h-[14vh] w-full md:flex-row flex flex-col items-center md:justify-between px-5 py-5 md:px-10 border-b-2 border-(--border) sticky top-0 overflow-hidden z-999 gap-5">
            <section className="flex items-center justify-center">
                <h1 className="text-(--secondary) text-2xl  md:text-3xl cursor-pointer" onClick={() => navigate('/')}>
                    🎓 CampusLink
                </h1>
            </section>
            <a className="md:flex hidden" href="https://www.instagram.com/dheeraj._kaushik" target="_blank" rel="noopener noreferrer">
                <img src={Signature} alt="" className="w-50 object-cover opacity-15 hover:opacity-50 transition-all duration-300" />
            </a>
            <section className="flex items-center justify-around">
                <ul className="flex text-(--text) items-center justify-around gap-7 text-[20px] pr-7">
                    <li className="border-2 rounded-2xl p-2 hover:shadow-xl/30 shadow-white transition-all duration-400 cursor-pointer border-(--border)">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="border-2 rounded-2xl p-2 hover:shadow-xl/30 shadow-white transition-all duration-400 cursor-pointer border-(--border)">
                        <Link to="/notes">Notes</Link>
                    </li>
                </ul>
                {isLoggedIn ? (
                    <ul className="flex text-(--text) items-center justify-around gap-7 text-[20px]">
                        <li className="border-2 rounded-2xl p-2 hover:shadow-xl/30 shadow-white transition-all duration-400 cursor-pointer border-(--border)">
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li className="border-2 rounded-2xl p-2 hover:shadow-xl/30 shadow-white transition-all duration-400 cursor-pointer border-(--border)" onClick={handleLogout}>
                            {loadingLogout ? "Logging out..." : "Logout"}
                        </li>
                    </ul>
                ) : (
                    <ul className="flex text-(--text) items-center justify-around gap-7 text-[20px]">
                        <li className="border-2 rounded-2xl p-2 hover:shadow-xl/30 shadow-white transition-all duration-400 cursor-pointer border-(--border)">
                            <Link to="/login">Login</Link>
                        </li>
                        <li className="border-2 rounded-2xl p-2 hover:shadow-xl/30 shadow-white transition-all duration-400 cursor-pointer border-(--border)">
                            <Link to="/signup">Signup</Link>
                        </li>
                    </ul>
                )}
            </section>
        </nav>
    )
}