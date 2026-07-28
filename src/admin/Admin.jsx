import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Loader from "../components/Loader";

const adminHighlights = [
    "Upload new notes with a cleaner form that keeps each field easy to scan.",
    "Review preview and download links before publishing study material.",
    "Keep CampusLink fresh by adding organized content for students quickly.",
];

const adminTips = [
    {
        label: "Preview URL",
        value: "Use the Google Drive preview link format so students can inspect the note before downloading.",
    },
    {
        label: "Download URL",
        value: "Use a direct download link so the file opens immediately in a new tab when selected.",
    },
    {
        label: "Subject Naming",
        value: "Keep subject names consistent to make filters and search results feel cleaner across the app.",
    },
];

export default function Admin() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [previewUrl, setPreviewUrl] = useState("https://drive.google.com/file/d/........../preview");
    const [downloadUrl, setDownloadUrl] = useState("https://drive.google.com/uc?export=download&id=");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [checkingAccess, setCheckingAccess] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");

        if (!token) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        if (email !== "dheerajkaushik428@gmail.com") {
            alert("Access denied. Admins only.");
            navigate("/notes");
            return;
        }

        setCheckingAccess(false);
    }, [navigate]);

    const resetForm = () => {
        setTitle("");
        setSubject("");
        setDescription("");
        setPreviewUrl("https://drive.google.com/file/d/........../preview");
        setDownloadUrl("https://drive.google.com/uc?export=download&id=");
    };

    const handleUpload = async (e) => {
        if (e) {
            e.preventDefault();
        }

        try {
            setLoadingUpload(true);
            setErrorMessage("");
            setSuccessMessage("");

            const res = await API.post("/notes/upload", {
                title,
                subject,
                description,
                previewUrl,
                downloadUrl,
            });

            setSuccessMessage(res?.data?.message || "Upload successful. The note is now available on CampusLink.");
            alert(res?.data?.message || "Upload successful");
            resetForm();
        } catch (err) {
            const message = err?.response?.data?.message || "Upload failed. Please check the note details and try again.";
            setErrorMessage(message);
            alert(message);
            console.log(err);
        } finally {
            setLoadingUpload(false);
        }
    };

    if (checkingAccess || loadingUpload) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen w-full bg-(--primary) px-4 py-10 text-(--text)">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
                <section className="relative overflow-hidden rounded-[2.25rem] border border-(--border) bg-[linear-gradient(180deg,#243039_0%,#1B252B_100%)] px-6 py-10 shadow-[0_8px_24px_rgba(0,0,0,0.28)] md:px-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.08),_transparent_32%)]" />

                    <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-3">
                                <span className="rounded-full border border-(--primary-600) bg-(--primary-900) px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-(--primary-300)">
                                    Admin Workspace
                                </span>
                                <span className="rounded-full bg-(--surface) px-4 py-2 text-sm font-semibold text-(--primary-300)">
                                    Restricted Access
                                </span>
                            </div>

                            <div className="space-y-4">
                                <h1 className="max-w-3xl text-4xl font-black leading-tight text-(--heading) md:text-5xl">
                                    Publish new notes with a calmer, clearer admin flow.
                                </h1>
                                <p className="max-w-2xl text-base leading-8 text-(--text) md:text-lg">
                                    This page is redesigned to make note uploads feel more structured, more reliable, and easier to manage while keeping the CampusLink content library fresh.
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="rounded-[1.5rem] border border-(--border) bg-(--surface) p-5">
                                    <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">Role</p>
                                    <h2 className="mt-3 text-2xl font-bold text-(--heading)">Admin</h2>
                                </div>
                                <div className="rounded-[1.5rem] border border-(--border) bg-(--surface) p-5">
                                    <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">Access</p>
                                    <h2 className="mt-3 text-2xl font-bold text-(--heading)">Verified</h2>
                                </div>
                                <div className="rounded-[1.5rem] border border-(--border) bg-(--surface) p-5">
                                    <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">Action</p>
                                    <h2 className="mt-3 text-2xl font-bold text-(--heading)">Upload</h2>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {adminHighlights.map((item) => (
                                <div
                                    key={item}
                                    className="rounded-[1.5rem] border border-(--border) bg-(--surface) p-5"
                                >
                                    <p className="leading-7 text-(--text)">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_8px_24px_rgba(0,0,0,0.28)] md:p-8">
                        <div className="mb-8">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--primary-400)">Upload Note</p>
                            <h2 className="mt-3 text-3xl font-bold text-(--heading) md:text-4xl">Add a new note to CampusLink</h2>
                            <p className="mt-3 text-(--text)">
                                Fill out the note details carefully so students can preview, search, and download the material without friction.
                            </p>
                        </div>

                        <form onSubmit={handleUpload} className="grid gap-5">
                            <div className="space-y-2">
                                <label htmlFor="title" className="text-sm font-semibold uppercase tracking-[0.18em] text-(--text-muted)">
                                    Title
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    placeholder="Enter note title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full rounded-2xl border border-(--border) bg-(--tertiary) px-4 py-4 text-(--heading) outline-none transition-all duration-300 placeholder:text-(--text-disabled) focus:border-(--primary-500) focus:bg-(--surface-secondary)"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-semibold uppercase tracking-[0.18em] text-(--text-muted)">
                                    Subject
                                </label>
                                <input
                                    id="subject"
                                    type="text"
                                    placeholder="Enter subject name"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full rounded-2xl border border-(--border) bg-(--tertiary) px-4 py-4 text-(--heading) outline-none transition-all duration-300 placeholder:text-(--text-disabled) focus:border-(--primary-500) focus:bg-(--surface-secondary)"
                                />
                            </div>                            <div className="space-y-2">
                               <label htmlFor="description" className="text-sm font-semibold uppercase tracking-[0.18em] text-(--text-muted)">
    Description
</label>
<textarea
    id="description"
    rows="4"
    placeholder="Write a short description of the note"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    className="w-full resize-none rounded-2xl border border-(--border) bg-(--tertiary) px-4 py-4 text-(--heading) outline-none transition-all duration-300 placeholder:text-(--text-disabled) focus:border-(--primary-500) focus:bg-(--surface-secondary)"
/>
</div>

<div className="space-y-2">
    <label htmlFor="previewUrl" className="text-sm font-semibold uppercase tracking-[0.18em] text-(--text-muted)">
        Preview URL
    </label>
    <input
        id="previewUrl"
        type="text"
        placeholder="Paste preview URL"
        value={previewUrl}
        onChange={(e) => setPreviewUrl(e.target.value)}
        className="w-full rounded-2xl border border-(--border) bg-(--tertiary) px-4 py-4 text-(--heading) outline-none transition-all duration-300 placeholder:text-(--text-disabled) focus:border-(--primary-500) focus:bg-(--surface-secondary)"
    />
</div>

<div className="space-y-2">
    <label htmlFor="downloadUrl" className="text-sm font-semibold uppercase tracking-[0.18em] text-(--text-muted)">
        Download URL
    </label>
    <input
        id="downloadUrl"
        type="text"
        placeholder="Paste direct download URL"
        value={downloadUrl}
        onChange={(e) => setDownloadUrl(e.target.value)}
        className="w-full rounded-2xl border border-(--border) bg-(--tertiary) px-4 py-4 text-(--heading) outline-none transition-all duration-300 placeholder:text-(--text-disabled) focus:border-(--primary-500) focus:bg-(--surface-secondary)"
    />
</div>

{errorMessage && (
    <div className="rounded-2xl border border-(--danger)/30 bg-(--danger)/10 px-4 py-3 text-sm text-red-200">
        {errorMessage}
    </div>
)}

{successMessage && (
    <div className="rounded-2xl border border-(--success)/30 bg-(--success)/10 px-4 py-3 text-sm text-green-200">
        {successMessage}
    </div>
)}

<div className="flex flex-col gap-4 pt-2 sm:flex-row">
    <button
        type="submit"
        className="rounded-2xl bg-(--btn-primary) px-6 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-(--btn-primary-hover) active:scale-[0.99]"
    >
        Publish Note
    </button>
    <button
        type="button"
        onClick={resetForm}
        className="rounded-2xl border border-(--border) bg-(--tertiary) px-6 py-4 text-lg font-semibold text-(--heading) transition-all duration-300 hover:bg-(--surface-secondary)"
    >
        Reset Form
    </button>
</div>
</form>
</div>

<div className="space-y-6">
    <div className="rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-xl shadow-black/20">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--primary-400)">Upload Guidance</p>
        <h2 className="mt-4 text-3xl font-bold text-(--heading)">Keep every note clean and reliable</h2>
        <div className="mt-6 grid gap-4">
            {adminTips.map((tip) => (
                <div
                    key={tip.label}
                    className="rounded-[1.5rem] border border-(--border) bg-(--tertiary) p-5"
                >
                    <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">{tip.label}</p>
                    <p className="mt-3 leading-7 text-(--text)">{tip.value}</p>
                </div>
            ))}
        </div>
    </div>

    <div className="rounded-[2rem] border border-(--border) bg-[linear-gradient(135deg,#243039,#1B252B_55%,#182228)] p-6 shadow-xl shadow-black/20">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--primary-300)">Admin Shortcuts</p>
        <h2 className="mt-4 text-3xl font-bold text-(--heading)">Move through the dashboard faster</h2>
        <p className="mt-4 leading-7 text-(--text)">
            After publishing a note, head back into the library or profile to confirm the updated experience across the app.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
                type="button"
                onClick={() => navigate("/admin/requests")}
                className="rounded-2xl bg-(--btn-primary) px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-(--btn-primary-hover)"
            >
                Manage Requests
            </button>
            <button
                type="button"
                onClick={() => navigate("/notes")}
                className="rounded-2xl bg-(--secondary) px-5 py-3 font-semibold text-(--heading) transition-all duration-300 hover:bg-(--surface)"
            >
                Open Notes
            </button>
            <button
                type="button"
                onClick={() => navigate("/profile")}
                className="rounded-2xl bg-(--btn-secondary) px-5 py-3 font-semibold text-(--heading) transition-all duration-300 hover:bg-(--surface-secondary)"
            >
                Go to Profile
            </button>
        </div>
    </div>
</div>
</section>
</div>
</div>
);
}