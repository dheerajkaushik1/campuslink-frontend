import API from "../api/api";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

export default function Profile() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            alert("Please login first");
            window.location.href = "/login";
        }
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try{
            const res = await API.get('/auth/profile');
            setUser(res.data);
            console.log("Fetched user profile:", res.data);
        } catch (err) {
            console.log(err);
        } finally{
            setLoading(false);
        }
    }   

    if (loading){
        return <Loader />;
    }

    return (
        <div className="h-auto w-full flex justify-center items-center bg-(--primary) py-20">
                <div className="border-2 border-(--border) p-10 rounded-2xl">
                    <h2 className="text-3xl font-bold text-(--text)">Your Profile</h2>
                    <div className="flex flex-col gap-5 mt-5">
                        <div className="flex gap-5">
                            <h3 className="text-(--secondary) font-semibold">Name:</h3>
                            <p className="text-(--text)">{user?.name}</p>
                        </div>
                        <div className="flex gap-5">
                            <h3 className="text-(--secondary) font-semibold">Email:</h3>
                            <p className="text-(--text)">{user?.email}</p>
                        </div>
                        <div className="flex gap-5">
                            <h3 className="text-(--secondary) font-semibold">Occupation:</h3>
                            <p className="text-(--text)">{user?.occupation}</p>
                        </div>
                        <div className="flex gap-5">
                            <h3 className="text-(--secondary) font-semibold">Member Since:</h3>
                            <p className="text-(--text)">{new Date(user?.createdAt).toDateString()}</p>
                        </div>
                    </div>
                </div>
        </div>
    )
}