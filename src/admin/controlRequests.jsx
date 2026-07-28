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
    <div className="min-h-screen w-full bg-(--primary) px-4 py-10 text-(--text)">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
            <section className="relative overflow-hidden rounded-[2.25rem] border border-(--border) bg-[linear-gradient(180deg,#243039_0%,#1B252B_100%)] px-6 py-10 shadow-[0_8px_24px_rgba(0,0,0,0.28)] md:px-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.08),_transparent_28%)]" />

                <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-3">
                            <span className="rounded-full border border-(--primary-600) bg-(--primary-900) px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-(--primary-300)">
                                Request Control
                            </span>
                            <span className="rounded-full bg-(--surface) px-4 py-2 text-sm font-semibold text-(--primary-300)">
                                Admin Only
                            </span>
                        </div>

                        <div className="space-y-4">
                            <h1 className="max-w-3xl text-4xl font-black leading-tight text-(--heading) md:text-5xl">
                                Manage student note requests with a cleaner admin queue.
                            </h1>
                            <p className="max-w-2xl text-base leading-8 text-(--text) md:text-lg">
                                Review requests, mark them completed once fulfilled, and remove the ones that should no longer stay in the dashboard.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="rounded-[1.5rem] border border-(--border) bg-(--surface) p-5">
                                <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">Total Requests</p>
                                <h2 className="mt-3 text-2xl font-bold text-(--heading)">{requests.length}</h2>
                            </div>
                            <div className="rounded-[1.5rem] border border-(--border) bg-(--surface) p-5">
                                <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">Pending</p>
                                <h2 className="mt-3 text-2xl font-bold text-(--heading)">{pendingRequests}</h2>
                            </div>
                            <div className="rounded-[1.5rem] border border-(--border) bg-(--surface) p-5">
                                <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">Completed</p>
                                <h2 className="mt-3 text-2xl font-bold text-(--heading)">{completedRequests}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {requestHighlights.map((item) => (
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

            <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-xl shadow-black/20 md:p-8">
                    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--primary-400)">Incoming Requests</p>
                            <h2 className="mt-3 text-3xl font-bold text-(--heading) md:text-4xl">Review the current request queue</h2>
                            <p className="mt-3 text-(--text)">
                                Open each request, check the requested topic, and decide whether it should be completed or removed.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={fetchRequests}
                            className="rounded-2xl border border-(--border) bg-(--tertiary) px-5 py-3 font-semibold text-(--heading) transition-all duration-300 hover:bg-(--surface-secondary)"
                        >
                            Refresh Requests
                        </button>
                    </div>

                    {errorMessage && (
                        <div className="mb-5 rounded-2xl border border-(--danger)/30 bg-(--danger)/10 px-4 py-3 text-sm text-red-200">
                            {errorMessage}
                        </div>
                    )}

                    {successMessage && (
                        <div className="mb-5 rounded-2xl border border-(--success)/30 bg-(--success)/10 px-4 py-3 text-sm text-green-200">
                            {successMessage}
                        </div>
                    )}

                    {requests.length === 0 ? (
                        <div className="rounded-[1.75rem] border border-dashed border-(--border) bg-(--tertiary) px-6 py-16 text-center">
                            <h3 className="text-2xl font-semibold text-(--heading)">No requests yet</h3>
                            <p className="mt-3 text-(--text-muted)">
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
                                        className="rounded-[1.75rem] border border-(--border) bg-(--tertiary) p-5 shadow-lg shadow-black/20"
                                    >
                                        <div className="flex flex-col gap-5">
                                            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                                <div className="space-y-3">
                                                    <div className="flex flex-wrap gap-3">
                                                        <span className="rounded-full bg-(--surface-secondary) px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-(--text)">
                                                            {createdDate}
                                                        </span>
                                                        <span
                                                            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                                                                isCompleted
                                                                    ? "bg-(--success)/15 text-green-300"
                                                                    : "bg-(--warning)/15 text-amber-300"
                                                            }`}
                                                        >
                                                            {isCompleted ? "Completed" : "Pending"}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-(--heading)">{request.topic}</h3>
                                                        <p className="mt-3 max-w-3xl leading-7 text-(--text)">
                                                            {request.description || "No additional details provided."}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="rounded-[1.25rem] border border-(--border) bg-(--surface) p-4 text-sm text-(--text) md:min-w-[250px]">
                                                    <p className="text-xs uppercase tracking-[0.2em] text-(--text-muted)">Requested By</p>
                                                    <p className="mt-3 text-lg font-semibold text-(--heading)">{requesterName}</p>
                                                    <p className="mt-2 break-all text-(--text)">{requesterEmail}</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-3 sm:flex-row">
                                                <button
                                                    type="button"
                                                    disabled={isCompleted || updatingId === request._id}
                                                    onClick={() => handleStatusUpdate(request._id)}
                                                    className="rounded-2xl bg-(--btn-primary) px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-(--btn-primary-hover) disabled:cursor-not-allowed disabled:opacity-60"
                                                >
                                                    {updatingId === request._id ? "Updating..." : isCompleted ? "Already Completed" : "Mark as Completed"}
                                                </button>
                                                <button
                                                    type="button"
                                                    disabled={deletingId === request._id}
                                                    onClick={() => handleDelete(request._id)}
                                                    className="rounded-2xl bg-(--danger) px-5 py-3 font-semibold text-white transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
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
                    <div className="rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-xl shadow-black/20">
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--primary-400)">Admin Guidance</p>
                        <h2 className="mt-4 text-3xl font-bold text-(--heading)">Keep the request queue actionable</h2>
                        <div className="mt-6 grid gap-4">
                            <div className="rounded-[1.5rem] border border-(--border) bg-(--tertiary) p-5">
                                <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">Complete</p>
                                <p className="mt-3 leading-7 text-(--text)">
                                    Mark a request completed once the requested note has been added or the need has been fulfilled.
                                </p>
                            </div>
                            <div className="rounded-[1.5rem] border border-(--border) bg-(--tertiary) p-5">
                                <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">Delete</p>
                                <p className="mt-3 leading-7 text-(--text)">
                                    Remove duplicate, invalid, or outdated requests to keep the panel easier to scan.
                                </p>
                            </div>
                            <div className="rounded-[1.5rem] border border-(--border) bg-(--tertiary) p-5">
                                <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">Review</p>
                                <p className="mt-3 leading-7 text-(--text)">
                                    Use the requester details and topic description to decide what should be prioritized next.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-(--border) bg-[linear-gradient(135deg,#243039,#1B252B_52%,#182228)] p-6 shadow-xl shadow-black/20">
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--primary-300)">Admin Shortcuts</p>
                        <h2 className="mt-4 text-3xl font-bold text-(--heading)">Move between request review and uploads</h2>
                        <p className="mt-4 leading-7 text-(--text)">
                            After reviewing requests, return to the upload workspace or open the full notes library to confirm what has already been added.
                        </p>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={() => navigate("/admin")}
                                className="rounded-2xl bg-(--secondary) px-5 py-3 font-semibold text-(--heading) transition-all duration-300 hover:bg-(--surface)"
                            >
                                Back to Admin
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/notes")}
                                className="rounded-2xl bg-(--btn-secondary) px-5 py-3 font-semibold text-(--heading) transition-all duration-300 hover:bg-(--surface-secondary)"
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