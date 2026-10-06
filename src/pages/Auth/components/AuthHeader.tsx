import { GraduationCap } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export default function AuthHeader({ title, description }: Props) {
  return (
    <div className="text-center mb-7">
      {/* Glowing badge icon */}
      <div className="relative inline-block mb-4">
        <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 blur opacity-70" />
        <div className="relative mx-auto w-14 h-14 rounded-2xl bg-[#0B0F19] border border-white/20 flex items-center justify-center shadow-xl">
          <GraduationCap className="w-7 h-7 text-cyan-400" />
        </div>
      </div>

      {/* Brand name */}
      <h1 className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-300">
        AcadHub
      </h1>
      <p className="text-[11px] text-indigo-300/80 font-semibold tracking-widest uppercase mt-0.5">
        AI Powered Campus Management
      </p>

      {/* Mode title */}
      <div className="mt-5 pt-4 border-t border-white/[0.07]">
        <h2 className="text-lg font-bold text-white flex items-center justify-center gap-2">
          <span>{title}</span>
          {title === "Welcome Back" && <span>👋</span>}
        </h2>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}