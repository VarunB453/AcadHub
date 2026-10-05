import {
  GraduationCap,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import type { AppRole } from "@/integrations/mongodb/types";

interface Props {
  selectedRole: AppRole;
  onChange: (role: AppRole) => void;
  disableAdminSignup?: boolean;
}

const roles = [
  {
    id: "student",
    title: "Student",
    subtitle: "Portal Access",
    icon: GraduationCap,
    activeGlow: "border-cyan-500/80 bg-gradient-to-b from-cyan-500/20 to-blue-600/10 shadow-[0_0_20px_rgba(6,182,212,0.25)]",
    iconColor: "text-cyan-400",
  },
  {
    id: "faculty",
    title: "Faculty",
    subtitle: "Staff & Grading",
    icon: Briefcase,
    activeGlow: "border-emerald-500/80 bg-gradient-to-b from-emerald-500/20 to-teal-600/10 shadow-[0_0_20px_rgba(16,185,129,0.25)]",
    iconColor: "text-emerald-400",
  },
  {
    id: "admin",
    title: "Admin",
    subtitle: "Full Control",
    icon: ShieldCheck,
    activeGlow: "border-violet-500/80 bg-gradient-to-b from-violet-500/20 to-purple-600/10 shadow-[0_0_20px_rgba(139,92,246,0.25)]",
    iconColor: "text-violet-400",
  },
] as const;

export default function RoleCards({
  selectedRole,
  onChange,
  disableAdminSignup,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {roles.map((role) => {
        const Icon = role.icon;
        const disabled = disableAdminSignup && role.id === "admin";
        const active = selectedRole === role.id;

        return (
          <button
            key={role.id}
            type="button"
            disabled={disabled}
            onClick={() => onChange(role.id as AppRole)}
            className={`
              relative
              flex flex-col items-center justify-center
              rounded-2xl
              border
              p-3.5
              transition-all
              duration-300
              ${
                active
                  ? `${role.activeGlow} scale-[1.03] font-semibold`
                  : "border-white/10 bg-slate-900/40 hover:border-white/25 hover:bg-white/5 text-slate-300"
              }
              ${disabled ? "opacity-35 cursor-not-allowed filter grayscale" : "cursor-pointer"}
            `}
          >
            {/* Active Checkmark Pill */}
            {active && (
              <div className="absolute top-2 right-2 text-cyan-400 animate-in fade-in zoom-in duration-200">
                <CheckCircle2 className="h-4 w-4 fill-cyan-400/20" />
              </div>
            )}

            <div className={`p-2 rounded-xl bg-slate-950/50 border border-white/10 mb-2 ${role.iconColor}`}>
              <Icon className="h-6 w-6" />
            </div>

            <p className="text-sm font-semibold text-white tracking-wide">
              {role.title}
            </p>
            <span className="text-[10px] text-slate-400 mt-0.5 font-normal">
              {role.subtitle}
            </span>
          </button>
        );
      })}
    </div>
  );
}