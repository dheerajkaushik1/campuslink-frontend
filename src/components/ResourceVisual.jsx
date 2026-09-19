import { BookOpen, FileQuestion, FileText, Layers3 } from "lucide-react";

const visualMap = {
    notes: { icon: BookOpen, label: "Study notes", accent: "from-cyan-400 via-blue-500 to-violet-500" },
    syllabus: { icon: Layers3, label: "Academic roadmap", accent: "from-blue-500 via-violet-500 to-fuchsia-500" },
    papers: { icon: FileQuestion, label: "Exam archive", accent: "from-violet-500 via-fuchsia-500 to-rose-400" },
    favorites: { icon: FileText, label: "Saved knowledge", accent: "from-cyan-300 via-blue-500 to-fuchsia-500" },
};

export default function ResourceVisual({ kind = "notes", compact = false }) {
    const visual = visualMap[kind] || visualMap.notes;
    const Icon = visual.icon;

    return (
        <div className={`relative overflow-hidden bg-[#0b1426] ${compact ? "h-24" : "h-36"}`}>
            <div className={`absolute -left-10 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${visual.accent} opacity-25 blur-2xl`} />
            <div className="absolute -bottom-14 -right-8 h-40 w-40 rounded-full bg-fuchsia-500/15 blur-2xl" />
            <div className="absolute inset-x-7 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent" />
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
                <div className={`flex ${compact ? "h-12 w-12" : "h-14 w-14"} items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br ${visual.accent} text-white shadow-[0_0_36px_rgba(99,102,241,0.35)]`}>
                    <Icon className={compact ? "h-5 w-5" : "h-6 w-6"} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-100/65">{visual.label}</span>
            </div>
            <div className="absolute right-5 top-5 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_15px_#22d3ee]" />
            <div className="absolute bottom-5 left-6 h-1.5 w-16 rounded-full bg-white/10" />
        </div>
    );
}
