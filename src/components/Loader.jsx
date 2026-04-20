export default function Loader() {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-(--primary) px-4 py-10 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,131,246,0.18),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(17,114,53,0.2),_transparent_30%)]" />

            <div className="relative w-full max-w-lg overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(17,24,39,0.94)_48%,rgba(59,131,246,0.14))] p-8 shadow-2xl shadow-black/25 backdrop-blur-xl md:p-10">
                <div className="absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)]" />

                <div className="flex flex-col items-center text-center">
                    <div className="relative flex h-24 w-24 items-center justify-center">
                        <div className="absolute h-24 w-24 rounded-full border border-blue-400/25 bg-blue-500/10 animate-ping" />
                        <div className="absolute h-[4.5rem] w-[4.5rem] rounded-full border border-green-400/20 bg-green-400/10 animate-pulse" />
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-[1.75rem] bg-[linear-gradient(135deg,rgba(59,131,246,0.95),rgba(17,114,53,0.8))] text-xl font-black tracking-[0.2em] text-white shadow-lg shadow-blue-950/35">
                            CL
                        </div>
                    </div>

                    <div className="mt-8 space-y-3">
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-300">
                            CampusLink
                        </p>
                        <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">
                            Getting your study space ready
                        </h2>
                        <p className="mx-auto max-w-md leading-7 text-slate-300">
                            Loading the next view with a smoother, cleaner experience so you can get back to your notes without friction.
                        </p>
                    </div>

                    <div className="mt-8 flex items-center gap-3">
                        <span className="h-3 w-3 rounded-full bg-(--secondary) animate-bounce" />
                        <span className="h-3 w-3 rounded-full bg-white/75 animate-bounce [animation-delay:0.18s]" />
                        <span className="h-3 w-3 rounded-full bg-(--btn-primary) animate-bounce [animation-delay:0.36s]" />
                    </div>

                    <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div className="h-full w-1/2 rounded-full bg-[linear-gradient(90deg,rgba(59,131,246,0.95),rgba(17,114,53,0.9))] animate-[pulse_1.8s_ease-in-out_infinite]" />
                    </div>

                    <div className="mt-6 grid w-full gap-3 text-left sm:grid-cols-3">
                        <div className="rounded-[1.25rem] border border-white/10 bg-white/6 p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Status</p>
                            <p className="mt-2 text-base font-semibold text-white">Loading</p>
                        </div>
                        <div className="rounded-[1.25rem] border border-white/10 bg-white/6 p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Experience</p>
                            <p className="mt-2 text-base font-semibold text-white">Focused</p>
                        </div>
                        <div className="rounded-[1.25rem] border border-white/10 bg-white/6 p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Flow</p>
                            <p className="mt-2 text-base font-semibold text-white">In Motion</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
