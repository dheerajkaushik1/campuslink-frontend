import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Loader from "../components/Loader";

const requestHighlights = [
    "Review incoming note requests in one place without leaving the admin workspace.",
    "Mark fulfilled requests as completed so the queue stays easier to manage.",
    "Delete outdated or invalid requests to keep the request list clean.",
];

export default function ControlRequests() {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [updatingId, setUpdatingId] = useState("");
    const [deletingId, setDeletingId] = useState("");

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

        fetchRequests();
    }, [navigate]);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            setErrorMessage("");
            const res = await API.get("/note-requests/all");
            setRequests(res.data || []);
        } catch (err) {
            setErrorMessage(err?.response?.data?.message || "Unable to load note requests right now.");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (requestId) => {
        try {
            setUpdatingId(requestId);
            setErrorMessage("");
            setSuccessMessage("");

            const res = await API.put(`/note-requests/update-status/${requestId}`);
            const updatedRequest = res?.data?.request;

            setRequests((prev) =>
                prev.map((item) => (item._id === requestId ? { ...item, ...updatedRequest } : item))
            );
            setSuccessMessage("Request status updated successfully.");
        } catch (err) {
            setErrorMessage(err?.response?.data?.message || "Unable to update request status.");
        } finally {
            setUpdatingId("");
        }
    };

    const handleDelete = async (requestId) => {
        try {
            setDeletingId(requestId);
            setErrorMessage("");
            setSuccessMessage("");

            await API.delete(`/note-requests/delete/${requestId}`);
            setRequests((prev) => prev.filter((item) => item._id !== requestId));
            setSuccessMessage("Request deleted successfully.");
        } catch (err) {
            setErrorMessage(err?.response?.data?.message || "Unable to delete request.");
        } finally {
            setDeletingId("");
        }
    };

    if (loading) {
        return <Loader />;
    }

    const completedRequests = requests.filter((item) => item.status === "completed").length;
    const pendingRequests = Math.max(requests.length - completedRequests, 0);

    return (
        <div className="min-h-screen w-full bg-(--primary) px-4 py-10 text-white">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
                <section className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,1),rgba(17,24,39,0.97)_45%,rgba(59,131,246,0.16))] px-6 py-10 shadow-2xl shadow-black/20 md:px-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,131,246,0.2),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(17,114,53,0.16),_transparent_28%)]" />

                    <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-3">
                                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-slate-200">
                                    Request Control
                                </span>
                                <span className="rounded-full bg-amber-400/15 px-4 py-2 text-sm font-semibold text-amber-200">
                                    Admin Only
                                </span>
                            </div>

                            <div className="space-y-4">
                                <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-5xl">
                                    Manage student note requests with a cleaner admin queue.
                                </h1>
                                <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                                    Review requests, mark them completed once fulfilled, and remove the ones that should no longer stay in the dashboard.
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Total Requests</p>
                                    <h2 className="mt-3 text-2xl font-bold text-white">{requests.length}</h2>
                                </div>
                                <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Pending</p>
                                    <h2 className="mt-3 text-2xl font-bold text-white">{pendingRequests}</h2>
                                </div>
                                <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Completed</p>
                                    <h2 className="mt-3 text-2xl font-bold text-white">{completedRequests}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {requestHighlights.map((item) => (
                                <div
                                    key={item}
                                    className="rounded-[1.5rem] border border-white/10 bg-slate-950/35 p-5 backdrop-blur-sm"
                                >
                                    <p className="leading-7 text-slate-200">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="rounded-[2rem] border border-white/10 bg-slate-950/30 p-6 shadow-xl shadow-black/10 md:p-8">
                        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--secondary)">Incoming Requests</p>
                                <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Review the current request queue</h2>
                                <p className="mt-3 text-slate-300">
                                    Open each request, check the requested topic, and decide whether it should be completed or removed.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={fetchRequests}
                                className="rounded-2xl border border-white/10 bg-white/6 px-5 py-3 font-semibold text-slate-200 transition-all duration-300 hover:bg-white/10"
                            >
                                Refresh Requests
                            </button>
                        </div>

                        {errorMessage && (
                            <div className="mb-5 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
                                {errorMessage}
                            </div>
                        )}

                        {successMessage && (
                            <div className="mb-5 rounded-2xl border border-green-400/20 bg-green-400/10 px-4 py-3 text-sm text-green-100">
                                {successMessage}
                            </div>
                        )}

                        {requests.length === 0 ? (
                            <div className="rounded-[1.75rem] border border-dashed border-white/10 bg-white/6 px-6 py-16 text-center">
                                <h3 className="text-2xl font-semibold text-white">No requests yet</h3>
                                <p className="mt-3 text-slate-400">
                                    New student requests will appear here once they are submitted.
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-5">
                                {requests.map((request) => {
                                    const requesterName = request?.user?.name || "Unknown User";
                                    const requesterEmail = request?.user?.email || "No email available";
                                    const isCompleted = request?.status === "completed";
                                    const createdDate = request?.createdAt
                                        ? new Date(request.createdAt).toDateString()
                                        : "Not available";

                                    return (
                                        <div
                                            key={request._id}
                                            className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5 shadow-lg shadow-black/10"
                                        >
                                            <div className="flex flex-col gap-5">
                                                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                                    <div className="space-y-3">
                                                        <div className="flex flex-wrap gap-3">
                                                            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
                                                                {createdDate}
                                                            </span>
                                                            <span
                                                                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                                                                    isCompleted
                                                                        ? "bg-green-400/15 text-green-200"
                                                                        : "bg-amber-400/15 text-amber-200"
                                                                }`}
                                                            >
                                                                {isCompleted ? "Completed" : "Pending"}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <h3 className="text-2xl font-bold text-white">{request.topic}</h3>
                                                            <p className="mt-3 max-w-3xl leading-7 text-slate-300">
                                                                {request.description || "No additional details provided."}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/35 p-4 text-sm text-slate-300 md:min-w-[250px]">
                                                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Requested By</p>
                                                        <p className="mt-3 text-lg font-semibold text-white">{requesterName}</p>
                                                        <p className="mt-2 break-all text-slate-300">{requesterEmail}</p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-3 sm:flex-row">
                                                    <button
                                                        type="button"
                                                        disabled={isCompleted || updatingId === request._id}
                                                        onClick={() => handleStatusUpdate(request._id)}
                                                        className="rounded-2xl bg-(--btn-primary) px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                                                    >
                                                        {updatingId === request._id ? "Updating..." : isCompleted ? "Already Completed" : "Mark as Completed"}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        disabled={deletingId === request._id}
                                                        onClick={() => handleDelete(request._id)}
                                                        className="rounded-2xl bg-red-500 px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                                                    >
                                                        {deletingId === request._id ? "Deleting..." : "Delete Request"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/10">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--secondary)">Admin Guidance</p>
                            <h2 className="mt-4 text-3xl font-bold text-white">Keep the request queue actionable</h2>
                            <div className="mt-6 grid gap-4">
                                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/30 p-5">
                                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Complete</p>
                                    <p className="mt-3 leading-7 text-slate-300">
                                        Mark a request completed once the requested note has been added or the need has been fulfilled.
                                    </p>
                                </div>
                                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/30 p-5">
                                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Delete</p>
                                    <p className="mt-3 leading-7 text-slate-300">
                                        Remove duplicate, invalid, or outdated requests to keep the panel easier to scan.
                                    </p>
                                </div>
                                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/30 p-5">
                                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Review</p>
                                    <p className="mt-3 leading-7 text-slate-300">
                                        Use the requester details and topic description to decide what should be prioritized next.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(17,114,53,0.18),rgba(17,24,39,0.92)_52%,rgba(59,131,246,0.14))] p-6 shadow-xl shadow-black/10">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-green-200">Admin Shortcuts</p>
                            <h2 className="mt-4 text-3xl font-bold text-white">Move between request review and uploads</h2>
                            <p className="mt-4 leading-7 text-slate-300">
                                After reviewing requests, return to the upload workspace or open the full notes library to confirm what has already been added.
                            </p>

                            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() => navigate("/admin")}
                                    className="rounded-2xl bg-(--secondary) px-5 py-3 font-semibold text-white transition-all duration-300 hover:brightness-110"
                                >
                                    Back to Admin
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigate("/notes")}
                                    className="rounded-2xl bg-(--btn-secondary) px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-slate-600"
                                >
                                    Open Notes
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
