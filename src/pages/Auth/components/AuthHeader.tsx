import { GraduationCap } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export default function AuthHeader({ title, description }: Props) {
  return (
    <div className="text-center mb-6">
      <div className="relative inline-block mb-3">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 blur-sm opacity-60" />
        <div className="relative mx-auto w-14 h-14 rounded-2xl bg-slate-900 border border-white/20 flex items-center justify-center shadow-lg">
          <GraduationCap className="w-7 h-7 text-cyan-400" />
        </div>
      </div>

      <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-300 tracking-tight">
        AcadHub
      </h1>

      <p className="text-xs text-indigo-300/80 font-medium">
        AI Powered Campus Management
      </p>

      <div className="mt-5 pt-4 border-t border-white/10">
        <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
          <span>{title}</span>
          <span className="text-lg">👋</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          {description}
        </p>
      </div>
    </div>
  );
}