import { useEffect, useState } from "react";
import API from "../api/api";

export default function Admin() {
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");
    const [downloadUrl, setDownloadUrl] = useState("");

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            alert("Please login first");
            window.location.href = "/login";
        }
        if (localStorage.getItem("email") !== "dheerajkaushik428@gmail.com") {
            alert("Access denied. Admins only.");
            window.location.href = "/notes";
        }
    }, []);

    const handleUpload = async () => {
        try {
            const res = await API.post("/notes/upload", {
                title,
                subject,
                description,
                previewUrl,
                downloadUrl,
            });
            alert("Upload successful");
            console.log(res.data);
        } catch (err) {
            alert("Upload failed");
            console.log(err);
        }
    };

    return (
        <div className="p-6 min-h-screen w-full flex justify-center items-center gap-10 flex-col">
            <h2 className="text-3xl font-bold text-(--secondary)">Upload Notes</h2>

            <div className="flex gap-2 flex-col w-full h-auto">
                <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} className="border-2 rounded-lg p-3"/>
                <input placeholder="Subject" onChange={(e) => setSubject(e.target.value)} className="border-2 rounded-lg p-3"/>
                <input placeholder="Description" onChange={(e) => setDescription(e.target.value)} className="border-2 rounded-lg p-3"/>

                <input type="text" placeholder="File Preview URL" onChange={(e) => setPreviewUrl(e.target.value)} className="border-2 rounded-lg p-3"/>
                <input type="text" placeholder="File Download URL" onChange={(e) => setDownloadUrl(e.target.value)} className="border-2 rounded-lg p-3"/>

            </div>

            <button onClick={handleUpload} className="bg-green-500 text-white py-4 px-10 mt-2 rounded-lg hover:shadow-xl/50 shadow-green transition-all duration-300 active:scale-95">
                    Upload
                </button>
        </div>
    );
}