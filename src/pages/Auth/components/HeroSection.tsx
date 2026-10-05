import {
  GraduationCap,
  Bot,
  BarChart3,
  ClipboardCheck,
  Bell,
  FileText,
  Sparkles,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: GraduationCap,
    title: "Student Management",
    desc: "360° Profile & Records",
    gradient: "from-blue-500/20 to-cyan-500/10",
    border: "border-blue-500/30",
    iconColor: "text-cyan-400",
  },
  {
    icon: ClipboardCheck,
    title: "Smart Attendance",
    desc: "AI & Geo Verification",
    gradient: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/30",
    iconColor: "text-emerald-400",
  },
  {
    icon: Bot,
    title: "AI Assistant",
    desc: "Instant Campus Queries",
    gradient: "from-violet-500/20 to-purple-500/10",
    border: "border-violet-500/30",
    iconColor: "text-violet-400",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    desc: "Real-time Metrics",
    gradient: "from-amber-500/20 to-orange-500/10",
    border: "border-amber-500/30",
    iconColor: "text-amber-400",
  },
  {
    icon: Bell,
    title: "Notice Board",
    desc: "Instant Notifications",
    gradient: "from-pink-500/20 to-rose-500/10",
    border: "border-pink-500/30",
    iconColor: "text-pink-400",
  },
  {
    icon: FileText,
    title: "Assignments",
    desc: "Digital Submissions",
    gradient: "from-indigo-500/20 to-blue-500/10",
    border: "border-indigo-500/30",
    iconColor: "text-indigo-400",
  },
];

export default function HeroSection() {
  return (
    <div className="hidden lg:flex flex-col justify-center h-full text-white pr-4">
      {/* Brand Header */}
      <div className="mb-10 space-y-6">
        {/* Glowing Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>AI-Powered Campus Management</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 blur opacity-75 group-hover:opacity-100 transition duration-500" />
            <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 border border-white/20 text-white shadow-xl">
              <GraduationCap className="w-9 h-9 text-cyan-400" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-200">
              AcadHub
            </h1>
            <p className="text-xs text-indigo-300/80 font-medium tracking-wide">
              Smart Academic Ecosystem
            </p>
          </div>
        </div>

        <p className="text-base text-slate-300/90 leading-relaxed max-w-lg font-normal">
          Empowering educational institutions with next-generation AI workflows, real-time analytics, and automated campus operations.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-2 gap-4">
        {FEATURES.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.gradient} backdrop-blur-xl border ${item.border} p-4 transition-all duration-300 hover:scale-[1.02] hover:border-white/30 hover:shadow-lg`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-xl bg-slate-900/60 border border-white/10 ${item.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live System Status Ticker */}
      <div className="mt-8 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/50 border border-white/10 backdrop-blur-md text-xs text-slate-300">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span className="font-medium text-slate-200">System Status:</span>
        <span className="text-slate-400">All AI Modules & Analytics Services Operational</span>
        <Zap className="w-3.5 h-3.5 ml-auto text-amber-400" />
      </div>
    </div>
  );
}