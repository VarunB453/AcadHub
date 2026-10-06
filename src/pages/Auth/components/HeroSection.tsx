import {
  GraduationCap,
  Bot,
  BarChart3,
  ClipboardCheck,
  Bell,
  FileText,
  Sparkles,
  Zap,
  Shield,
} from "lucide-react";

const FEATURES = [
  {
    icon: GraduationCap,
    title: "Student Management",
    desc: "360° Profile & Records",
    color: "text-cyan-400",
    border: "border-cyan-500/20",
    glow: "from-cyan-500/15 to-transparent",
  },
  {
    icon: ClipboardCheck,
    title: "Smart Attendance",
    desc: "AI & Geo Verification",
    color: "text-emerald-400",
    border: "border-emerald-500/20",
    glow: "from-emerald-500/15 to-transparent",
  },
  {
    icon: Bot,
    title: "AI Assistant",
    desc: "Instant Campus Queries",
    color: "text-violet-400",
    border: "border-violet-500/20",
    glow: "from-violet-500/15 to-transparent",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    desc: "Real-time Metrics",
    color: "text-amber-400",
    border: "border-amber-500/20",
    glow: "from-amber-500/15 to-transparent",
  },
  {
    icon: Bell,
    title: "Notice Board",
    desc: "Instant Notifications",
    color: "text-pink-400",
    border: "border-pink-500/20",
    glow: "from-pink-500/15 to-transparent",
  },
  {
    icon: FileText,
    title: "Assignments",
    desc: "Digital Submissions",
    color: "text-indigo-400",
    border: "border-indigo-500/20",
    glow: "from-indigo-500/15 to-transparent",
  },
];

export default function HeroSection() {
  return (
    <div className="hidden lg:flex flex-col justify-center h-full text-white pr-8">
      {/* Brand Header */}
      <div className="mb-10 space-y-5">
        {/* AI Badge pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/25 bg-indigo-500/10 text-indigo-300 text-[11px] font-bold uppercase tracking-widest backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>AI-Powered Campus Management</span>
        </div>

        {/* Logo + Name */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 blur-md opacity-60" />
            <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0B0F19] border border-white/20 shadow-xl">
              <GraduationCap className="w-9 h-9 text-cyan-400" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-200">
              AcadHub
            </h1>
            <p className="text-[11px] text-indigo-300/70 font-semibold tracking-widest uppercase mt-0.5">
              Smart Academic Ecosystem
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-400 leading-relaxed max-w-md">
          Empowering educational institutions with next-generation AI workflows,
          real-time analytics, and automated campus operations.
        </p>
      </div>

      {/* Feature Grid — 2 × 3 */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {FEATURES.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`
                group relative overflow-hidden rounded-xl
                border ${item.border} bg-gradient-to-br ${item.glow}
                backdrop-blur-md p-3.5
                hover:border-white/20 hover:scale-[1.02]
                transition-all duration-300
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                    p-2 rounded-lg border ${item.border} bg-black/20
                    ${item.color} group-hover:scale-110 transition-transform duration-300
                  `}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-none">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* System Status Bar */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-md text-xs text-slate-400">
        <span className="relative flex h-2 w-2 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="font-semibold text-slate-300">System Status:</span>
        <span className="text-slate-500">All AI Modules & Services Operational</span>
        <Zap className="w-3.5 h-3.5 ml-auto text-amber-400 flex-shrink-0" />
      </div>

      {/* Security badge */}
      <div className="flex items-center gap-2 mt-4 text-[11px] text-slate-500">
        <Shield className="w-3.5 h-3.5 text-emerald-500" />
        <span>256-bit SSL encrypted · FERPA compliant · SOC 2 Type II</span>
      </div>
    </div>
  );
}