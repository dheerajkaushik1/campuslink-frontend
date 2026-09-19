export default function Loader() {
    return (
        <div
            role="status"
            aria-live="polite"
            aria-label="Loading CampusLink"
            className="fixed inset-0 z-[100000] flex min-h-dvh items-center justify-center overflow-hidden bg-[#050816] px-5 text-white"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.16),transparent_25%),radial-gradient(circle_at_84%_76%,rgba(217,70,239,0.16),transparent_28%),linear-gradient(135deg,#050816,#0b1426_55%,#100d2a)]" />
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(103,232,249,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.06)_1px,transparent_1px)] [background-size:42px_42px]" />

            <div className="relative w-full max-w-md">
                <div className="absolute -left-12 -top-12 h-28 w-28 rounded-full bg-cyan-400/20 blur-3xl animate-pulse" />
                <div className="absolute -bottom-14 -right-10 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl animate-pulse [animation-delay:0.7s]" />

                <div className="relative overflow-hidden rounded-[2rem] border border-cyan-200/20 bg-[#0b1426]/80 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.45),0_0_70px_rgba(79,70,229,0.16)] backdrop-blur-2xl sm:p-8">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
                    <div className="absolute -left-1/3 top-0 h-full w-1/3 skew-x-[-20deg] bg-cyan-300/10 blur-xl animate-[loader-scan_2.8s_ease-in-out_infinite]" />

                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 text-sm font-black shadow-[0_0_30px_rgba(34,211,238,0.28)]">CL</div>
                            <div>
                                <p className="text-sm font-black tracking-[0.16em] text-white">CampusLink</p>
                                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-slate-500">Learning network</p>
                            </div>
                        </div>
                        <span className="flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee]" /> Syncing</span>
                    </div>

                    <div className="relative mt-10 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                        <div className="space-y-3 text-right"><div className="ml-auto h-2 w-20 rounded-full bg-cyan-300/25" /><div className="ml-auto h-2 w-14 rounded-full bg-white/10" /><div className="ml-auto h-2 w-24 rounded-full bg-violet-300/20" /></div>
                        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-cyan-200/25 bg-gradient-to-br from-cyan-400/20 via-blue-500/15 to-fuchsia-500/20 shadow-[0_0_45px_rgba(34,211,238,0.2)]"><div className="absolute inset-2 rounded-2xl border border-dashed border-fuchsia-300/35 animate-[spin_8s_linear_infinite]" /><div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-300 to-violet-500 shadow-[0_0_25px_rgba(129,140,248,0.75)] animate-pulse" /></div>
                        <div className="space-y-3"><div className="h-2 w-20 rounded-full bg-fuchsia-300/25" /><div className="h-2 w-14 rounded-full bg-white/10" /><div className="h-2 w-24 rounded-full bg-blue-300/20" /></div>
                    </div>

                    <div className="relative mt-10">
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500"><span>Preparing your workspace</span><span className="text-cyan-300">Please wait</span></div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8"><div className="h-full w-2/3 rounded-full bg-gradient-to-r from-cyan-300 via-blue-500 to-fuchsia-500 shadow-[0_0_18px_rgba(34,211,238,0.65)] animate-[loader-progress_2.2s_ease-in-out_infinite]" /></div>
                    </div>
                </div>
            </div>

            <style>{`@keyframes loader-scan { 0%, 100% { transform: translateX(0); opacity: 0; } 20%, 70% { opacity: 1; } 90% { transform: translateX(430%); opacity: 0; } } @keyframes loader-progress { 0% { transform: translateX(-100%); } 55%, 100% { transform: translateX(170%); } }`}</style>
        </div>
    );
}
