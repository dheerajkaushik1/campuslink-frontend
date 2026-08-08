import { useEffect } from "react";
import {
    ArrowRight,
    BrainCircuit,
    Briefcase,
    Code2,
    Database,
    Flame,
    Globe,
    GraduationCap,
    Handshake,
    Laptop,
    Mail,
    MessageCircle,
    Phone,
    Camera,
    Rocket,
    Server,
    Sparkles,
    Star,
    Target,
    Trophy,
    UserRound,
    Zap,
} from "lucide-react";
import SEO from '../components/SEO'



const socialLinks = [
    {
        label: "Instagram",
        value: "@dheeraj._kaushik",
        href: "https://www.instagram.com/dheeraj._kaushik",
        icon: Camera,
        accent: "from-pink-500 via-fuchsia-500 to-orange-400",
    },
    {
        label: "Email",
        value: "dheerajkaushik428@gmail.com",
        href: "mailto:dheerajkaushik428@gmail.com",
        icon: Mail,
        accent: "from-sky-500 via-cyan-400 to-emerald-400",
    },
    {
        label: "Phone",
        value: "+91 93064 79470",
        href: "tel:+919306479470",
        icon: Phone,
        accent: "from-emerald-500 via-teal-400 to-cyan-400",
    },
    {
        label: "WhatsApp",
        value: "Chat on WhatsApp",
        href: "https://wa.me/919306479470",
        icon: MessageCircle,
        accent: "from-emerald-400 via-green-500 to-teal-500",
    },
];

const aboutPoints = [
    "Passionate web developer focused on real-world products.",
    "Always learning, iterating, and improving every build.",
    "Enjoys solving problems with clear, useful technology.",
    "Believes consistency beats short bursts of motivation.",
    "Loves challenges that stretch technical and creative thinking.",
    "Works well with people and values meaningful collaboration.",
];

const techStack = [
    {
        title: "React.js",
        group: "Frontend",
        description: "Crafting responsive interfaces with polished component-driven experiences.",
        icon: Laptop,
        accent: "from-sky-400 to-cyan-300",
    },
    {
        title: "Tailwind CSS",
        group: "Frontend",
        description: "Building fast, premium UI systems with precise layout and motion control.",
        icon: Sparkles,
        accent: "from-cyan-400 to-blue-400",
    },
    {
        title: "Node.js",
        group: "Backend",
        description: "Powering scalable server-side logic for modern web applications.",
        icon: Server,
        accent: "from-emerald-400 to-lime-400",
    },
    {
        title: "Express.js",
        group: "Backend",
        description: "Designing clean APIs and reliable request flows for real-world products.",
        icon: Globe,
        accent: "from-teal-400 to-emerald-400",
    },
    {
        title: "MongoDB",
        group: "Database",
        description: "Managing flexible document data for fast-moving application needs.",
        icon: Database,
        accent: "from-emerald-500 to-green-400",
    },
    {
        title: "MySQL",
        group: "Database",
        description: "Structuring dependable relational data with clarity and performance.",
        icon: Briefcase,
        accent: "from-blue-500 to-cyan-400",
    },
    {
        title: "SQL",
        group: "Database",
        description: "Querying, organizing, and optimizing data for practical workflows.",
        icon: Target,
        accent: "from-indigo-400 to-sky-400",
    },
    {
        title: "Python",
        group: "Core Language",
        description: "My core programming language for logic, automation, problem solving, and deep thinking.",
        icon: Code2,
        accent: "from-amber-400 via-lime-300 to-emerald-400",
        featured: true,
    },
];

const challengeTopics = [
    "Problem Solving",
    "DSA",
    "JavaScript",
    "React",
    "Backend",
    "APIs",
    "Databases",
    "UI Challenges",
    "Full Stack Development",
];

const principleCards = [
    {
        title: "Keep Learning",
        description: "Growth compounds when curiosity stays active every single week.",
        icon: BrainCircuit,
    },
    {
        title: "Build Real Projects",
        description: "Practical work sharpens intuition far faster than passive theory.",
        icon: Rocket,
    },
    {
        title: "Stay Consistent",
        description: "Small, repeatable progress turns skills into something dependable.",
        icon: Flame,
    },
    {
        title: "Help Others Grow",
        description: "Strong communities are built when knowledge is shared generously.",
        icon: Handshake,
    },
    {
        title: "Solve Problems",
        description: "The best code exists to reduce friction in someone’s life.",
        icon: Target,
    },
    {
        title: "Accept Every Challenge",
        description: "Pressure reveals strengths and teaches what comfort never can.",
        icon: Zap,
    },
];

const contactCards = [
    {
        title: "Phone",
        value: "9306479470",
        href: "tel:+919306479470",
        icon: Phone,
    },
    {
        title: "Email",
        value: "dheerajkaushik428@gmail.com",
        href: "mailto:dheerajkaushik428@gmail.com",
        icon: Mail,
    },
    {
        title: "Instagram",
        value: "instagram.com/dheeraj._kaushik",
        href: "https://www.instagram.com/dheeraj._kaushik",
        icon: Camera,
    },
    {
        title: "WhatsApp",
        value: "wa.me/919306479470",
        href: "https://wa.me/919306479470",
        icon: MessageCircle,
    },
];

const glassCardClassName =
    "group relative overflow-hidden rounded-[2rem] border border-emerald-400/15 bg-slate-950/45 p-6 shadow-[0_18px_60px_rgba(2,12,27,0.45)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300/30 hover:shadow-[0_24px_80px_rgba(16,185,129,0.18)]";

export default function MeetTheAdmin() {
    useEffect(() => {
        const elements = document.querySelectorAll("[data-reveal]");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("opacity-100", "translate-y-0");
                        entry.target.classList.remove("opacity-0", "translate-y-8");
                    }
                });
            },
            { threshold: 0.12 }
        );

        elements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, []);

    const openLink = (href) => {
        window.open(href, "_blank", "noopener,noreferrer");
    };

    return (
        <>
            <SEO
                title="Meet the Admin - CampusLink"
                description="Learn more about the person behind CampusLink."
                path="/meet-the-admin"
            />
            <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16),transparent_20%),linear-gradient(180deg,#06111a_0%,#08141f_32%,#07131d_100%)] text-slate-100">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
                    <div className="absolute left-[8%] top-20 h-40 w-40 animate-pulse rounded-full bg-emerald-400/18 blur-3xl" />
                    <div className="absolute right-[10%] top-36 h-56 w-56 animate-pulse rounded-full bg-cyan-400/16 blur-3xl [animation-delay:500ms]" />
                    <div className="absolute bottom-28 left-[12%] h-52 w-52 animate-pulse rounded-full bg-blue-500/12 blur-3xl [animation-delay:900ms]" />
                    <div className="absolute bottom-20 right-[18%] h-44 w-44 animate-pulse rounded-full bg-emerald-300/10 blur-3xl [animation-delay:1300ms]" />
                    <div className="absolute left-0 top-0 h-full w-full opacity-70">
                        {[...Array(18)].map((_, index) => (
                            <span
                                key={index}
                                className="absolute h-1.5 w-1.5 rounded-full bg-emerald-300/70 shadow-[0_0_18px_rgba(52,211,153,0.85)] animate-pulse"
                                style={{
                                    left: `${(index * 17) % 100}%`,
                                    top: `${(index * 23) % 100}%`,
                                    animationDelay: `${index * 180}ms`,
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
                    <section
                        data-reveal
                        className="translate-y-8 opacity-0 transition-all duration-700"
                    >
                        <div className="relative overflow-hidden rounded-[2.4rem] border border-emerald-300/16 bg-slate-950/50 px-6 py-8 shadow-[0_20px_80px_rgba(0,0,0,0.38)] backdrop-blur-2xl md:px-8 lg:px-10 lg:py-10">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(52,211,153,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.12),_transparent_30%)]" />
                            <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                                <div>
                                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-200">
                                        <Sparkles className="h-4 w-4" />
                                        Meet The Admin
                                    </div>

                                    <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                                        Hi, I&apos;m <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">Dheeraj Kaushik</span>
                                    </h1>

                                    <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Full Stack Web Developer</span>
                                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Python Programmer</span>
                                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Founder of CampusLink</span>
                                    </div>

                                    <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                                        I love building real-world web applications that solve problems, help students, and create meaningful digital experiences.
                                    </p>

                                    <div className="mt-8 flex flex-wrap gap-3">
                                        {socialLinks.map((item) => {
                                            const Icon = item.icon;
                                            return (
                                                <button
                                                    key={item.label}
                                                    type="button"
                                                    onClick={() => openLink(item.href)}
                                                    className="group/social inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/30 hover:bg-white/10"
                                                >
                                                    <span className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-[0_12px_30px_rgba(16,185,129,0.22)]`}>
                                                        <Icon className="h-5 w-5" />
                                                    </span>
                                                    <span>
                                                        <span className="block text-xs uppercase tracking-[0.22em] text-slate-400">{item.label}</span>
                                                        <span className="block text-sm font-semibold text-white">{item.value}</span>
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="relative mx-auto w-full max-w-md">
                                    <div className="absolute inset-0 rounded-[2.2rem] bg-gradient-to-br from-emerald-400/20 via-cyan-400/10 to-sky-500/20 blur-2xl" />
                                    <div className="relative overflow-hidden rounded-[2.2rem] border border-emerald-300/20 bg-[linear-gradient(180deg,rgba(8,20,31,0.92),rgba(4,12,20,0.88))] p-6 shadow-[0_24px_80px_rgba(2,12,27,0.5)]">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.12),transparent_26%)]" />
                                        <div className="relative">
                                            <div className="flex items-center justify-between">
                                                <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                                                    Developer Profile
                                                </span>
                                                <Star className="h-5 w-5 text-amber-300" />
                                            </div>

                                            <div className="mt-8 flex justify-center">
                                                <div className="relative flex h-52 w-52 items-center justify-center rounded-full border border-emerald-300/25 bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.18),rgba(15,23,42,0.86))] shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                                                    <div className="absolute inset-4 rounded-full border border-dashed border-cyan-300/25" />
                                                    <div className="absolute -left-4 top-6 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
                                                        <Code2 className="h-5 w-5 text-cyan-300" />
                                                    </div>
                                                    <div className="absolute -right-3 bottom-8 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
                                                        <BrainCircuit className="h-5 w-5 text-emerald-300" />
                                                    </div>
                                                    <div className="absolute bottom-3 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-emerald-400/15 blur-2xl" />
                                                    <img
                                                        src="/Admn.png"
                                                        alt="Dheeraj Kaushik"
                                                        className="relative z-10 h-44 w-44 rounded-full object-cover shadow-[0_16px_45px_rgba(8,145,178,0.28)]"
                                                    />
                                                </div>
                                            </div>

                                            <div className="mt-8 grid gap-3 sm:grid-cols-3">
                                                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Focus</p>
                                                    <p className="mt-2 text-lg font-bold text-white">Products</p>
                                                </div>
                                                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Mindset</p>
                                                    <p className="mt-2 text-lg font-bold text-white">Consistency</p>
                                                </div>
                                                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Mission</p>
                                                    <p className="mt-2 text-lg font-bold text-white">Students</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section data-reveal className="translate-y-8 opacity-0 transition-all duration-700">
                        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                            <div className={glassCardClassName}>
                                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400" />
                                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">Who Am I?</p>
                                <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">A builder who cares about useful impact.</h2>
                                <p className="mt-4 text-base leading-8 text-slate-300">
                                    I&apos;m a developer who enjoys turning ideas into products people can genuinely use. I keep learning, keep shipping, and keep improving because the best work comes from staying curious, disciplined, and open to challenges.
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {aboutPoints.map((point) => (
                                    <div key={point} className={glassCardClassName}>
                                        <div className="absolute -right-8 top-0 h-24 w-24 rounded-full bg-emerald-400/10 blur-2xl transition duration-500 group-hover:bg-emerald-300/20" />
                                        <div className="relative flex items-start gap-4">
                                            <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/12 text-emerald-200 ring-1 ring-emerald-300/15">
                                                <Zap className="h-5 w-5" />
                                            </div>
                                            <p className="text-sm leading-7 text-slate-200">{point}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section data-reveal className="translate-y-8 opacity-0 transition-all duration-700">
                        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">Tech Stack</p>
                                <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Tools I use to build premium digital experiences.</h2>
                            </div>
                            <p className="max-w-2xl text-sm leading-7 text-slate-300">
                                Frontend polish, backend structure, database thinking, and Python-powered logic all come together in how I approach products.
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            {techStack.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={item.title}
                                        className={`${glassCardClassName} ${item.featured ? "ring-1 ring-amber-300/30 shadow-[0_24px_90px_rgba(251,191,36,0.14)]" : ""}`}
                                    >
                                        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.accent}`} />
                                        <div className="flex items-start justify-between gap-4">
                                            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-slate-950 shadow-[0_18px_40px_rgba(6,182,212,0.16)]`}>
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
                                                {item.group}
                                            </span>
                                        </div>
                                        <h3 className="mt-5 text-2xl font-black text-white">{item.title}</h3>
                                        <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                                        {item.featured ? (
                                            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
                                                <Flame className="h-3.5 w-3.5" />
                                                Core Language
                                            </div>
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section data-reveal className="translate-y-8 opacity-0 transition-all duration-700">
                        <div className="relative overflow-hidden rounded-[2.3rem] border border-cyan-300/14 bg-[linear-gradient(180deg,rgba(8,20,31,0.9),rgba(4,10,19,0.92))] px-6 py-10 text-center shadow-[0_18px_80px_rgba(0,0,0,0.42)]">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.14),_transparent_26%)]" />
                            <div className="relative mx-auto max-w-4xl">
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">My Mission</p>
                                <h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">Why I Built CampusLink</h2>
                                <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
                                    I built CampusLink to make learning more connected, practical, and student-friendly. Notes should be easier to share, ideas should move faster, and communities should help each other grow. Through technology, I want to make education feel less scattered and more empowering for students who are trying to learn, collaborate, and build a better future together.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section data-reveal className="translate-y-8 opacity-0 transition-all duration-700">
                        <div className="relative overflow-hidden rounded-[2.5rem] border border-emerald-300/28 bg-[linear-gradient(135deg,rgba(12,26,35,0.94),rgba(5,18,25,0.96),rgba(11,31,33,0.96))] px-6 py-8 shadow-[0_0_0_1px_rgba(16,185,129,0.12),0_0_60px_rgba(16,185,129,0.14),0_0_110px_rgba(34,211,238,0.08)] sm:px-8 lg:px-10 lg:py-10">
                            <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(16,185,129,0.06)_0deg,rgba(56,189,248,0.14)_120deg,rgba(251,191,36,0.09)_240deg,rgba(16,185,129,0.06)_360deg)]" />
                            <div className="absolute inset-[1px] rounded-[2.45rem] border border-white/6" />
                            <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                                <div>
                                    <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">
                                        <Trophy className="h-4 w-4" />
                                        Challenge The Admin
                                    </div>
                                    <h2 className="mt-5 text-4xl font-black leading-tight text-white sm:text-5xl">
                                        Think You&apos;re Better? <span className="bg-gradient-to-r from-amber-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">Challenge Me.</span>
                                    </h2>
                                    <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                                        The Admin is always ready for new challenges. Great developers are built through challenges, not comfort. If you think you can outperform me or simply want to compete, let&apos;s connect and put skills to the test.
                                    </p>

                                    <div className="mt-6 flex flex-wrap gap-3">
                                        {challengeTopics.map((topic) => (
                                            <span
                                                key={topic}
                                                className="rounded-full border border-emerald-300/18 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 shadow-[0_0_20px_rgba(16,185,129,0.05)]"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => openLink("https://wa.me/919306479470")}
                                        className="mt-8 inline-flex items-center gap-3 rounded-full bg-[linear-gradient(135deg,#f59e0b,#10b981,#06b6d4)] px-7 py-4 text-lg font-black text-slate-950 shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_20px_50px_rgba(16,185,129,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(16,185,129,0.32)]"
                                    >
                                        <Flame className="h-5 w-5" />
                                        Challenge Me
                                        <ArrowRight className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="grid gap-4">
                                    <div className="rounded-[2rem] border border-emerald-300/20 bg-white/5 p-6 backdrop-blur">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/12 text-emerald-200 ring-1 ring-emerald-300/20">
                                                <Code2 className="h-7 w-7" />
                                            </div>
                                            <div>
                                                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Arena</p>
                                                <p className="mt-1 text-2xl font-black text-white">Build. Compete. Improve.</p>
                                            </div>
                                        </div>
                                        <p className="mt-4 text-sm leading-7 text-slate-300">
                                            From frontend polish to backend architecture, I enjoy high-pressure challenges that reveal how people think, structure, and execute.
                                        </p>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="rounded-[2rem] border border-cyan-300/16 bg-white/5 p-5 backdrop-blur">
                                            <Trophy className="h-7 w-7 text-amber-300" />
                                            <p className="mt-4 text-xl font-black text-white">Competitive Mindset</p>
                                            <p className="mt-2 text-sm leading-7 text-slate-300">Healthy competition pushes skills beyond ordinary limits.</p>
                                        </div>
                                        <div className="rounded-[2rem] border border-cyan-300/16 bg-white/5 p-5 backdrop-blur">
                                            <Zap className="h-7 w-7 text-cyan-300" />
                                            <p className="mt-4 text-xl font-black text-white">Fast Iteration</p>
                                            <p className="mt-2 text-sm leading-7 text-slate-300">The goal is not ego. It is sharper thinking and stronger execution.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section data-reveal className="translate-y-8 opacity-0 transition-all duration-700">
                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className={glassCardClassName}>
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">Project Help</p>
                                        <h2 className="mt-4 text-3xl font-black text-white">Need Help Building Your Project?</h2>
                                    </div>
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 text-slate-950">
                                        <GraduationCap className="h-7 w-7" />
                                    </div>
                                </div>
                                <p className="mt-5 text-base leading-8 text-slate-300">
                                    If you&apos;re stuck on your college project, personal project, React app, MERN application, backend APIs, database integration, UI design, deployment, or debugging, feel free to reach out. I&apos;m always happy to collaborate and help bring ideas to life.
                                </p>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <button type="button" onClick={() => openLink("https://wa.me/919306479470")} className="rounded-full bg-emerald-400 px-5 py-3 font-semibold text-slate-950 transition hover:-translate-y-1 hover:bg-emerald-300">
                                        Request Project Help
                                    </button>
                                    <button type="button" onClick={() => openLink("mailto:dheerajkaushik428@gmail.com")} className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:-translate-y-1 hover:bg-white/10">
                                        Email Me
                                    </button>
                                    <button type="button" onClick={() => openLink("https://wa.me/919306479470")} className="rounded-full border border-cyan-300/16 bg-cyan-400/10 px-5 py-3 font-semibold text-cyan-100 transition hover:-translate-y-1 hover:bg-cyan-400/15">
                                        WhatsApp
                                    </button>
                                </div>
                            </div>

                            <div className={glassCardClassName}>
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Join CampusLink</p>
                                        <h2 className="mt-4 text-3xl font-black text-white">Have an Amazing Idea?</h2>
                                    </div>
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-sky-400 text-slate-950">
                                        <Rocket className="h-7 w-7" />
                                    </div>
                                </div>
                                <p className="mt-5 text-base leading-8 text-slate-300">
                                    CampusLink is continuously growing. If you have ideas that can improve CampusLink, new features, better UI, AI tools, student resources, or anything valuable, I would love to hear from you. Let&apos;s build something impactful together.
                                </p>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <button type="button" onClick={() => openLink("mailto:dheerajkaushik428@gmail.com?subject=CampusLink%20Idea")} className="rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-300">
                                        Share an Idea
                                    </button>
                                    <button type="button" onClick={() => openLink("https://wa.me/919306479470")} className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:-translate-y-1 hover:bg-white/10">
                                        Join CampusLink
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section data-reveal className="translate-y-8 opacity-0 transition-all duration-700">
                        <div className="mb-6">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">Developer Principles</p>
                            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">The mindset behind the work.</h2>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {principleCards.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div key={item.title} className={glassCardClassName}>
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/12 text-emerald-200 ring-1 ring-emerald-300/16">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="mt-5 text-2xl font-black text-white">{item.title}</h3>
                                        <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section data-reveal className="translate-y-8 opacity-0 transition-all duration-700">
                        <div className="rounded-[2.3rem] border border-white/10 bg-white/5 px-6 py-10 text-center shadow-[0_18px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl">
                            <p className="mx-auto max-w-4xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                                Code isn&apos;t just about writing programs.
                                <span className="mt-3 block bg-gradient-to-r from-emerald-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
                                    It&apos;s about creating solutions that make someone&apos;s life easier.
                                </span>
                            </p>
                            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.26em] text-slate-400">
                                Dheeraj Kaushik
                            </p>
                        </div>
                    </section>

                    <section data-reveal className="translate-y-8 opacity-0 transition-all duration-700">
                        <div className="mb-6">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Contact</p>
                            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Let&apos;s connect and build something meaningful.</h2>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            {contactCards.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.title}
                                        type="button"
                                        onClick={() => openLink(item.href)}
                                        className={`${glassCardClassName} text-left`}
                                    >
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 text-slate-950">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">{item.title}</p>
                                        <p className="mt-2 break-all text-lg font-bold text-white">{item.value}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    <footer data-reveal className="translate-y-8 opacity-0 pb-4 text-center transition-all duration-700">
                        <div className="rounded-[2rem] border border-white/10 bg-white/5 px-6 py-8 backdrop-blur-xl">
                            <p className="text-lg font-semibold text-white">Built with love by Dheeraj Kaushik</p>
                            <p className="mt-2 text-sm text-slate-400">CampusLink © 2026</p>
                            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">
                                Let&apos;s Learn. Let&apos;s Build. Let&apos;s Grow.
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}
