export default function Loader() {
    return (
        <div className="fixed inset-0 z-[9999] flex min-h-screen w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,#182228_0%,#121A1F_38%,#0B1114_100%)] px-4 py-10 text-white">
            <div className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.12),transparent_62%)] blur-3xl" />
            <div className="absolute left-[18%] top-[22%] h-24 w-24 rounded-full border border-[#34D399] bg-[#10B981]/15 blur-sm animate-pulse" />
            <div className="absolute right-[16%] top-[62%] h-32 w-32 rounded-full border border-[#6EE7B7] bg-[#065F46]/20 blur-sm animate-pulse [animation-delay:0.6s]" />

            <div className="relative flex flex-col items-center">
                <div className="relative flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
                    <div className="absolute h-full w-full rounded-full border border-[#34D399] animate-[spin_12s_linear_infinite]" />
                    <div className="absolute h-[78%] w-[78%] rounded-full border border-[#6EE7B7]/50 animate-[spin_8s_linear_infinite_reverse]" />
                    <div className="absolute h-[56%] w-[56%] rounded-full bg-[conic-gradient(from_180deg,rgba(5,150,105,0.95),rgba(52,211,153,0.88),rgba(5,150,105,0.95))] blur-[2px] animate-[spin_4s_linear_infinite]" />
                    <div className="absolute h-[52%] w-[52%] rounded-full bg-[#1F2A30]" />
                    <div className="absolute h-3 w-3 -translate-y-[5.1rem] rounded-full bg-[#10B981] shadow-[0_0_24px_rgba(16,185,129,0.5)] sm:-translate-y-[6rem]" />
                    <div className="absolute h-2.5 w-2.5 translate-x-[4.9rem] rounded-full bg-[#34D399] shadow-[0_0_20px_rgba(52,211,153,0.55)] sm:translate-x-[5.8rem]" />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#34D399] bg-[radial-gradient(circle,#243039_0%,#1F2A30_72%,#182228_100%)] shadow-[0_18px_40px_rgba(16,185,129,0.12)] sm:h-28 sm:w-28">
                        <div className="absolute inset-2 rounded-full border border-[#6EE7B7]" />
                        <div className="h-4 w-4 rounded-full bg-[#10B981] shadow-[0_0_24px_rgba(16,185,129,0.45)] animate-pulse" />
                    </div>
                </div>

                <p className="mt-10 text-xl font-black uppercase tracking-[0.45em] text-(--primary-300) sm:text-2xl">
                    CampusLink
                </p>
            </div>
        </div>
    );
}