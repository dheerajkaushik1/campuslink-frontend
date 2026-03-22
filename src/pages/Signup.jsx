import { useState } from "react";
import API from "../api/api";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";


export default function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOTP] = useState("");
    const [isVerified, setIsVerified] = useState(false);

    const [loadingOTP, setLoadingOTP] = useState(false);
    const [loadingVerify, setLoadingVerify] = useState(false);
    const [loadingSignup, setLoadingSignup] = useState(false);

    const sendOTP = async () => {
        try {
            setLoadingOTP(true);
            const res = await API.post('/auth/signup', { email, password, name });
            alert(res.data.message);
            setIsVerified(false);
            setOTP('');
        } catch (err) {
            alert("Error sending OTP");
            console.log(err);
        } finally {
            setLoadingOTP(false);
        }
    };

    const verifyOTP = async () => {
        try {
            setLoadingVerify(true);
            const res = await API.post('/auth/verify-otp', { email, otp });
            alert(res.data.message);
            setIsVerified(true);
        } catch (err) {
            alert("Error verifying OTP");
        } finally {
            setLoadingVerify(false);
        }
    }

    const handleSignup = async () => {
        if (!isVerified) {
            alert("Please verify OTP first");
            return;
        }

        try {
            setLoadingSignup(true);
            navigate('/login');
        } finally {
            setLoadingSignup(false);
        }
    }

    if(loadingOTP || loadingVerify || loadingSignup){
        return <Loader />;
    }

    return (
        <div className="w-full h-auto bg-(--primary) flex justify-center items-center py-20">
            <div className="md:w-[70%] w-[80%] md:h-[70%] h-auto border-2 border-(--border) rounded-2xl flex flex-col items-center py-7 gap-10 bg-(--tertiary)">
                <h2 className="text-3xl text-(--text) font-bold">
                    Signup 🪧
                </h2>
                <div className="flex md:flex-row flex-col gap-5 w-full  flex-wrap px-5 justify-center items-center">
                    
                    <div className="flex flex-col gap-2 md:w-[40%]">
                        <label htmlFor="name" className="text-(--text)">Name: </label>
                        <input type="text" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border border-white bg-transparent text-white placeholder:text-white p-3 rounded-2xl shadow-xl/50 shadow-white transition-all duration-400 mb-2 " />
                    </div>

                    <div className="flex flex-col gap-2 md:w-[40%] ">
                        <label htmlFor="email" className="text-(--text) ml-2">Email:</label>
                        <input type="text" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-white bg-transparent text-white placeholder:text-white p-3 rounded-2xl shadow-xl/50 shadow-white transition-all duration-400 mb-2" />
                    </div>

                    <div className="flex flex-col gap-2 md:w-[40%]">
                        <label htmlFor="password" className="text-(--text)">Password: </label>
                        <input type="text" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-white bg-transparent text-white placeholder:text-white p-3 rounded-2xl shadow-xl/50 shadow-white transition-all duration-400 mb-2" />
                    </div>

                    <div className="flex flex-col gap-2 md:w-[40%]">
                        <label htmlFor="otp" className="text-(--text)">OTP: </label>
                        <input type="text" id="otp" placeholder="OTP" value={otp} onChange={(e) => setOTP(e.target.value)} className="border border-white bg-transparent text-white placeholder:text-white p-3 rounded-2xl shadow-xl/50 shadow-white transition-all duration-400 mb-2 " />
                    </div>

                    
                </div>

                <div className="flex flex-col md:flex-row md:gap-5 md:w-[40%] w-full px-10 justify-around">
                    <button onClick={sendOTP} className="bg-(--secondary) px-5 py-2 rounded-2xl mt-5 hover:shadow-xl/30 shadow-white transition-all duration-400 text-white">
                        {loadingOTP ? "Sending OTP..." : "Send OTP"}
                    </button>

                    <button onClick={verifyOTP} className="bg-(--secondary) px-5 py-2 rounded-2xl mt-5 hover:shadow-xl/30 shadow-white transition-all duration-400 text-white">
                        {loadingVerify ? "Verifying OTP..." : "Verify OTP"}
                    </button>

                    <button onClick={handleSignup} className="bg-(--secondary) px-5 py-2 rounded-2xl mt-5 hover:shadow-xl/30 shadow-white transition-all duration-400 text-white">
                        {loadingSignup ? "Signing up..." : "Signup"}
                    </button>
                </div>
            </div>
        </div>
    )
}