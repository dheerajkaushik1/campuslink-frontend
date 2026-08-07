import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Loader from "../components/Loader";

const uploadTypeOptions = [
    { id: "notes", label: "Notes" },
    { id: "syllabus", label: "Syllabus" },
    { id: "papers", label: "Previous Year Papers" },
];

const adminHighlights = [
    "Upload study material with one flexible form that adapts to notes, syllabus PDFs, and exam papers.",
    "Review preview and download links before publishing so students get a smoother browsing experience.",
    "Keep CampusLink organized by filling structured fields that match each content type.",
];

const adminTips = [
    {
        label: "Preview URL",
        value: "Use a preview-friendly Google Drive link so students can inspect the file before downloading it.",
    },
    {
        label: "Download URL",
        value: "Use a direct download link so the file opens or downloads without extra steps.",
    },
    {
        label: "Consistent Naming",
        value: "Keep branch, semester, subject, and title values clean so search and filtering stay predictable across the app.",
    },
];

const initialFormState = {
    title: "",
    subject: "",
    description: "",
    branch: "",
    semester: "",
    year: "",
    examType: "Mid Semester",
    previewUrl: "https://drive.google.com/file/d/........../preview",
    downloadUrl: "https://drive.google.com/uc?export=download&id=",
};

const uploadConfig = {
    notes: {
        badge: "Upload Note",
        title: "Add a new note to CampusLink",
        description: "Fill out the note details carefully so students can preview, search, and download the material without friction.",
        submitLabel: "Publish Note",
        endpoint: "/notes/upload",
        successFallback: "Upload successful. The note is now available on CampusLink.",
        errorFallback: "Upload failed. Please check the note details and try again.",
        fields: [
            {
                key: "title",
                label: "Title",
                type: "text",
                placeholder: "Enter note title",
            },
            {
                key: "subject",
                label: "Subject",
                type: "text",
                placeholder: "Enter subject name",
            },
            {
                key: "description",
                label: "Description",
                type: "textarea",
                placeholder: "Write a short description of the note",
                rows: 4,
            },
            {
                key: "previewUrl",
                label: "Preview URL",
                type: "text",
                placeholder: "Paste preview URL",
            },
            {
                key: "downloadUrl",
                label: "Download URL",
                type: "text",
                placeholder: "Paste direct download URL",
            },
        ],
        getPayload: (formState) => ({
            title: formState.title,
            subject: formState.subject,
            description: formState.description,
            previewUrl: formState.previewUrl,
            downloadUrl: formState.downloadUrl,
        }),
    },
    syllabus: {
        badge: "Upload Syllabus",
        title: "Add a new syllabus PDF to CampusLink",
        description: "Capture the academic structure clearly so students can find the right syllabus by subject, branch, and semester.",
        submitLabel: "Publish Syllabus",
        endpoint: "/syllabus/upload-syllabus",
        successFallback: "Upload successful. The syllabus is now available on CampusLink.",
        errorFallback: "Upload failed. Please check the syllabus details and try again.",
        fields: [
            {
                key: "subject",
                label: "Subject",
                type: "text",
                placeholder: "Enter subject name",
            },
            {
                key: "branch",
                label: "Branch",
                type: "text",
                placeholder: "Enter branch name",
            },
            {
                key: "semester",
                label: "Semester",
                type: "text",
                placeholder: "Enter semester",
            },
            {
                key: "previewUrl",
                label: "Preview URL",
                type: "text",
                placeholder: "Paste preview URL",
            },
            {
                key: "downloadUrl",
                label: "Download URL",
                type: "text",
                placeholder: "Paste direct download URL",
            },
        ],
        getPayload: (formState) => ({
            subject: formState.subject,
            branch: formState.branch,
            semester: formState.semester,
            previewUrl: formState.previewUrl,
            downloadUrl: formState.downloadUrl,
        }),
    },
    papers: {
        badge: "Upload Paper",
        title: "Add a previous year paper to CampusLink",
        description: "Capture the exam metadata cleanly so students can discover papers by branch, subject, semester, year, and exam type.",
        submitLabel: "Publish Paper",
        endpoint: "/pyp/upload-paper",
        successFallback: "Upload successful. The previous year paper is now available on CampusLink.",
        errorFallback: "Upload failed. Please check the paper details and try again.",
        fields: [
            {
                key: "title",
                label: "Title",
                type: "text",
                placeholder: "Enter paper title",
            },
            {
                key: "branch",
                label: "Branch",
                type: "text",
                placeholder: "Enter branch name",
            },
            {
                key: "subject",
                label: "Subject",
                type: "text",
                placeholder: "Enter subject name",
            },
            {
                key: "semester",
                label: "Semester",
                type: "number",
                placeholder: "Enter semester",
            },
            {
                key: "year",
                label: "Year",
                type: "number",
                placeholder: "Enter exam year",
            },
            {
                key: "examType",
                label: "Exam Type",
                type: "select",
                options: ["Mid Semester", "End Semester"],
            },
            {
                key: "previewUrl",
                label: "Preview URL",
                type: "text",
                placeholder: "Paste preview URL",
            },
            {
                key: "downloadUrl",
                label: "Download URL",
                type: "text",
                placeholder: "Paste direct download URL",
            },
        ],
        getPayload: (formState) => ({
            title: formState.title,
            branch: formState.branch,
            subject: formState.subject,
            semester: formState.semester,
            year: formState.year,
            examType: formState.examType,
            previewUrl: formState.previewUrl,
            downloadUrl: formState.downloadUrl,
        }),
    },
};

export default function Admin() {
    const navigate = useNavigate();
    const [uploadType, setUploadType] = useState("notes");
    const [formState, setFormState] = useState(initialFormState);
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

    const currentConfig = uploadConfig[uploadType];

    const resetForm = () => {
        setFormState(initialFormState);
        setErrorMessage("");
        setSuccessMessage("");
    };

    const handleFieldChange = (key, value) => {
        setFormState((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleUploadTypeChange = (type) => {
        setUploadType(type);
        setFormState(initialFormState);
        setErrorMessage("");
        setSuccessMessage("");
    };

    const handleUpload = async (e) => {
        if (e) {
            e.preventDefault();
        }

        try {
            setLoadingUpload(true);
            setErrorMessage("");
            setSuccessMessage("");

            const res = await API.post(
                currentConfig.endpoint,
                currentConfig.getPayload(formState)
            );

            const successMessage =
                res?.data?.message || currentConfig.successFallback;

            setSuccessMessage(successMessage);
            alert(successMessage);
            resetForm();
        } catch (err) {
            const message =
                err?.response?.data?.message || currentConfig.errorFallback;

            setErrorMessage(message);
            alert(message);
            console.log(err);
        } finally {
            setLoadingUpload(false);
        }
    };

    const renderField = (field) => {
        if (field.type === "textarea") {
            return (
                <textarea
                    id={field.key}
                    rows={field.rows || 4}
                    placeholder={field.placeholder}
                    value={formState[field.key]}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    className="w-full resize-none rounded-2xl border border-(--border) bg-(--tertiary) px-4 py-4 text-(--heading) outline-none transition-all duration-300 placeholder:text-(--text-disabled) focus:border-(--primary-500) focus:bg-(--surface-secondary)"
                />
            );
        }

        if (field.type === "select") {
            return (
                <select
                    id={field.key}
                    value={formState[field.key]}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    className="w-full rounded-2xl border border-(--border) bg-(--tertiary) px-4 py-4 text-(--heading) outline-none transition-all duration-300 focus:border-(--primary-500) focus:bg-(--surface-secondary)"
                >
                    {field.options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            );
        }

        return (
            <input
                id={field.key}
                type={field.type}
                placeholder={field.placeholder}
                value={formState[field.key]}
                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                className="w-full rounded-2xl border border-(--border) bg-(--tertiary) px-4 py-4 text-(--heading) outline-none transition-all duration-300 placeholder:text-(--text-disabled) focus:border-(--primary-500) focus:bg-(--surface-secondary)"
            />
        );
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
                                    Publish notes, syllabi, and previous year papers from one calmer admin flow.
                                </h1>
                                <p className="max-w-2xl text-base leading-8 text-(--text) md:text-lg">
                                    This workspace keeps the note upload experience intact while adapting the form to the exact fields needed for syllabus PDFs and exam papers.
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
                                    <p className="text-sm uppercase tracking-[0.18em] text-(--text-muted)">Mode</p>
                                    <h2 className="mt-3 text-2xl font-bold text-(--heading)">{currentConfig.badge.replace("Upload ", "")}</h2>
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
                        <div className="mb-8 space-y-5">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--primary-400)">
                                    {currentConfig.badge}
                                </p>
                                <h2 className="mt-3 text-3xl font-bold text-(--heading) md:text-4xl">
                                    {currentConfig.title}
                                </h2>
                                <p className="mt-3 text-(--text)">
                                    {currentConfig.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {uploadTypeOptions.map((option) => (
                                    <button
                                        key={option.id}
                                        type="button"
                                        onClick={() => handleUploadTypeChange(option.id)}
                                        className={`rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] transition-all duration-300 ${uploadType === option.id
                                            ? "border border-(--primary-600) bg-(--btn-primary) text-white shadow-[0_8px_20px_rgba(16,185,129,0.22)]"
                                            : "border border-(--border) bg-(--tertiary) text-(--heading) hover:bg-(--surface-secondary)"
                                            }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleUpload} className="grid gap-5">
                            {currentConfig.fields.map((field) => (
                                <div key={field.key} className="space-y-2">
                                    <label
                                        htmlFor={field.key}
                                        className="text-sm font-semibold uppercase tracking-[0.18em] text-(--text-muted)"
                                    >
                                        {field.label}
                                    </label>
                                    {renderField(field)}
                                </div>
                            ))}

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
                                    {currentConfig.submitLabel}
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
                            <h2 className="mt-4 text-3xl font-bold text-(--heading)">Keep every upload clean and reliable</h2>
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
                                After publishing content, jump into requests, the notes library, or your profile to confirm the student-facing experience.
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
