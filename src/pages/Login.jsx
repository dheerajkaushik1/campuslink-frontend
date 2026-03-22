import { useState } from "react"
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadingLogin, setLoadingLogin] = useState(false)

    const handleLogin = async () => {
        try{
            setLoadingLogin(true);
            const res = await API.post('auth/login', {email, password});
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('email', res.data.user.email);
            alert(res.data.message);
            navigate('/notes');
            window.location.reload();
        } catch (err) {
            alert(err.response.data.message);   
        } finally {
            setLoadingLogin(false);
        }
    }

    if (loadingLogin){
        return <Loader />;
    }

    return (
        <div className="w-full  md:h-auto bg-(--primary) flex justify-center items-center py-20">
                <div className="h-auto md:w-1/2 w-[80%] border-2 border-(--border) flex flex-col items-center py-10 gap-10 rounded-2xl bg-(--tertiary)">
                    <h2 className="text-3xl text-(--text)">
                        Login Page
                    </h2>
                    <div className="flex flex-col md:flex-row w-full h-auto gap-7">
                        <div className="flex flex-col gap-3 md:w-1/2 px-5">
                            <label htmlFor="email" className="text-(--text)">Email:</label>
                            <input type="text" id="email" placeholder="Email" className="border border-white bg-transparent text-white placeholder:text-white p-3 rounded-2xl shadow-xl/50 shadow-white transition-all duration-400 mb-2" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="flex flex-col gap-3 md:w-1/2 px-5">
                            <label htmlFor="password" className="text-(--text)">Password:</label>
                            <input type="password" id="password" placeholder="Password" className="border border-white bg-transparent text-white placeholder:text-white p-3 rounded-2xl shadow-xl/50 shadow-white transition-all duration-400 mb-2" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center w-full md:px-15 px-10 gap-5">
                        <button onClick={handleLogin} className="bg-(--secondary) md:w-1/3 w-full px-5 py-2 rounded-2xl hover:shadow-xl/30 shadow-white transition-all duration-400 text-white">
                        Login
                        </button>
                        <p className="text-(--text) text-lg">
                            Don't have an account? <span className="text-(--secondary) cursor-pointer" onClick={() => navigate('/signup')}>Signup</span>
                        </p>
                    </div>
                </div>
        </div>
    )
}