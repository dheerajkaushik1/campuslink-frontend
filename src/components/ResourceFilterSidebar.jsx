import { useState } from "react";

export default function ResourceFilterSidebar({
    title,
    allLabel,
    options,
    selectedValue,
    onSelect,
}) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (value) => {
        onSelect(value);
        setIsOpen(false);
    };

    const optionsContent = (
        <>
            <button
                type="button"
                onClick={() => handleSelect("")}
                className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${selectedValue === ""
                    ? "bg-(--btn-primary) text-white shadow-lg"
                    : "text-(--text) hover:bg-(--tertiary) hover:text-(--heading)"
                    }`}
            >
                {allLabel}
            </button>

            {options.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${selectedValue === option.value
                        ? "bg-(--btn-primary) text-white shadow-lg"
                        : "text-(--text) hover:bg-(--tertiary) hover:text-(--heading)"
                        }`}
                >
                    {option.label}
                </button>
            ))}
        </>
    );

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="w-full rounded-2xl border border-(--border) bg-(--surface) px-4 py-3 text-left font-semibold text-(--heading) shadow-lg transition hover:border-(--primary-500) lg:hidden"
            >
                Filter {title}
            </button>

            <aside className="hidden h-fit max-h-128 overflow-y-auto rounded-2xl border border-(--border) bg-(--surface) p-3 shadow-lg lg:block lg:sticky lg:top-24">
                <h2 className="px-3 pb-3 text-lg font-bold text-(--heading)">{title}</h2>
                <div className="space-y-1">{optionsContent}</div>
            </aside>

            {isOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <button
                        type="button"
                        aria-label={`Close ${title} filter`}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/60"
                    />

                    <aside className="relative flex h-full w-[min(20rem,85vw)] flex-col border-r border-(--border) bg-(--surface) p-4 shadow-2xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-(--heading)">{title}</h2>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg border border-(--border) px-3 py-1.5 text-sm font-semibold text-(--text) transition hover:bg-(--tertiary)"
                            >
                                Close
                            </button>
                        </div>
                        <div className="space-y-1 overflow-y-auto">{optionsContent}</div>
                    </aside>
                </div>
            )}
        </>
    );
}