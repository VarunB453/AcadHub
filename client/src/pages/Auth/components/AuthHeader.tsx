import { GraduationCap } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export default function AuthHeader({ title, description }: Props) {
  return (
    <div className="text-center mb-4">
      {/* Glowing compact badge icon */}
      <div className="relative inline-block mb-2">
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 blur-[6px] opacity-70" />
        <div className="relative mx-auto w-10 h-10 rounded-xl bg-[#0B0F19] border border-white/20 flex items-center justify-center shadow-lg">
          <GraduationCap className="w-5 h-5 text-cyan-400" />
        </div>
      </div>

      {/* Brand name & Subtitle */}
      <h1 className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-300">
        AcadHub
      </h1>
      <p className="text-[10px] text-indigo-300/80 font-semibold tracking-wider uppercase mt-0.5">
        AI Powered Campus Management
      </p>

      {/* Active Form Mode Title */}
      <div className="mt-2.5 pt-2.5 border-t border-white/[0.08]">
        <h2 className="text-sm sm:text-base font-bold text-white flex items-center justify-center gap-1.5 leading-tight">
          <span>{title}</span>
          {title === "Welcome Back" && <span>👋</span>}
        </h2>
        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
          {description}
        </p>
      </div>
    </div>
  );
}