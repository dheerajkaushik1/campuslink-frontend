import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import { ALERT_EVENT } from "./alertBus";

export default function AlertHost() {
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const handleAlert = (event) => {
            setAlert(event.detail);
        };

        window.addEventListener(ALERT_EVENT, handleAlert);
        return () => window.removeEventListener(ALERT_EVENT, handleAlert);
    }, []);

    useEffect(() => {
        if (!alert) return undefined;
        const timeout = window.setTimeout(() => setAlert(null), 4800);
        return () => window.clearTimeout(timeout);
    }, [alert]);

    if (!alert) return null;

    const isSuccess = alert.type === "success";
    const isError = alert.type === "error";
    const Icon = isSuccess ? CheckCircle2 : isError ? AlertTriangle : Info;
    const tone = isSuccess
        ? "from-cyan-300 to-blue-500"
        : isError
            ? "from-fuchsia-400 to-rose-500"
            : "from-violet-400 to-cyan-400";

    return (
        <div className="fixed right-4 top-4 z-[100001] w-[min(92vw,390px)] animate-slide-up" role="alert">
            <div className="relative overflow-hidden rounded-[1.35rem] border border-cyan-200/25 bg-[#0b1426]/95 p-4 text-white shadow-[0_24px_80px_rgba(0,0,0,0.45),0_0_36px_rgba(99,102,241,0.2)] backdrop-blur-2xl">
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tone}`} />
                <div className="flex items-start gap-3 pt-1">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${tone} text-white shadow-lg`}>
                        <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="font-bold text-white">{alert.title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-300">{alert.message}</p>
                    </div>
                    <button type="button" onClick={() => setAlert(null)} aria-label="Dismiss alert" className="rounded-lg p-1 text-slate-400 transition hover:bg-white/10 hover:text-white">
                        <X className="h-4 w-4" />
                    </button>
                </div>
                <div className="mt-4 h-0.5 overflow-hidden rounded-full bg-white/10"><div className={`h-full w-full origin-left bg-gradient-to-r ${tone} animate-[alert-progress_4.8s_linear_forwards]`} /></div>
            </div>
        </div>
    );
}
