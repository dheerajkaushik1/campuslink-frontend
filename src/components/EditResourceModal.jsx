import { useEffect, useState } from "react";
import { LoaderCircle, X } from "lucide-react";

const inputClassName = "w-full rounded-xl border border-(--border) bg-(--tertiary) px-3.5 py-3 text-sm text-(--heading) outline-none transition focus:border-(--primary-500)";

function getErrorMessage(error) {
    return error?.response?.data?.message || error?.response?.data?.error || error?.message || "Unable to save changes. Please try again.";
}

export default function EditResourceModal({ resource, resourceLabel, fields, onClose, onSave }) {
    const [formState, setFormState] = useState(() => fields.reduce((values, field) => ({ ...values, [field.key]: resource[field.key] ?? "" }), {}));
    const [errorMessage, setErrorMessage] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape" && !saving) onClose();
        };

        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose, saving]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const missingField = fields.find((field) => field.required !== false && !String(formState[field.key] ?? "").trim());

        if (missingField) {
            setErrorMessage(`${missingField.label} is required.`);
            return;
        }

        const invalidUrlField = fields.find((field) => field.type === "url" && !/^https?:\/\//i.test(String(formState[field.key]).trim()));
        if (invalidUrlField) {
            setErrorMessage(`${invalidUrlField.label} must be a valid URL beginning with http:// or https://.`);
            return;
        }

        try {
            setSaving(true);
            setErrorMessage("");
            await onSave(formState);
            onClose();
        } catch (error) {
            setErrorMessage(getErrorMessage(error));
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center overflow-y-auto bg-[#02040c]/80 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="edit-resource-title">
            <button type="button" aria-label="Close edit dialog" onClick={() => !saving && onClose()} className="absolute inset-0 cursor-default" />
            <div className="neon-panel relative my-auto w-full max-w-2xl rounded-[1.5rem] p-5 shadow-2xl sm:p-7">
                <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--primary-400)">Admin editor</p>
                        <h2 id="edit-resource-title" className="mt-2 text-2xl font-bold text-(--heading)">Edit {resourceLabel}</h2>
                    </div>
                    <button type="button" onClick={() => !saving && onClose()} aria-label="Close" className="rounded-full border border-(--border) bg-(--tertiary) p-2 text-(--text) transition hover:text-white">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex max-h-[75vh] flex-col gap-4 overflow-y-auto pr-1">
                    {fields.map((field) => (
                        <label key={field.key} className="flex flex-col gap-2 text-sm font-semibold text-(--heading)">
                            {field.label}
                            {field.type === "textarea" ? (
                                <textarea
                                    value={formState[field.key]}
                                    onChange={(event) => setFormState((previous) => ({ ...previous, [field.key]: event.target.value }))}
                                    rows={field.rows || 4}
                                    className={inputClassName}
                                />
                            ) : (
                                <input
                                    type={field.type || "text"}
                                    value={formState[field.key]}
                                    onChange={(event) => setFormState((previous) => ({ ...previous, [field.key]: event.target.value }))}
                                    className={inputClassName}
                                />
                            )}
                        </label>
                    ))}

                    {errorMessage && <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200" role="alert">{errorMessage}</p>}

                    <div className="mt-2 flex flex-col-reverse justify-end gap-3 sm:flex-row">
                        <button type="button" onClick={onClose} disabled={saving} className="rounded-xl border border-(--border) bg-(--tertiary) px-5 py-2.5 font-semibold text-(--heading) transition hover:bg-(--surface) disabled:cursor-not-allowed disabled:opacity-50">Cancel</button>
                        <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-(--btn-primary) px-5 py-2.5 font-semibold text-white transition hover:bg-(--btn-primary-hover) disabled:cursor-not-allowed disabled:opacity-60">
                            {saving && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}