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
    activeClasses:
      "border-cyan-500/60 bg-gradient-to-b from-cyan-500/15 to-blue-600/5 shadow-[0_0_24px_rgba(6,182,212,0.20)]",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    id: "faculty",
    title: "Faculty",
    subtitle: "Staff & Grading",
    icon: Briefcase,
    activeClasses:
      "border-emerald-500/60 bg-gradient-to-b from-emerald-500/15 to-teal-600/5 shadow-[0_0_24px_rgba(16,185,129,0.20)]",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    id: "admin",
    title: "Admin",
    subtitle: "Full Control",
    icon: ShieldCheck,
    activeClasses:
      "border-violet-500/60 bg-gradient-to-b from-violet-500/15 to-purple-600/5 shadow-[0_0_24px_rgba(139,92,246,0.20)]",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10 border-violet-500/20",
  },
] as const;

export default function RoleCards({
  selectedRole,
  onChange,
  disableAdminSignup,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-2.5">
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
              relative flex flex-col items-center justify-center gap-2
              rounded-xl border p-3 transition-all duration-300
              ${
                active
                  ? `${role.activeClasses} scale-[1.02]`
                  : "border-white/[0.08] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06] text-slate-300"
              }
              ${disabled ? "opacity-35 cursor-not-allowed grayscale" : "cursor-pointer"}
            `}
          >
            {/* Active checkmark */}
            {active && (
              <div className="absolute top-1.5 right-1.5 text-cyan-400">
                <CheckCircle2 className="h-3.5 w-3.5 fill-cyan-400/20" />
              </div>
            )}

            <div
              className={`p-2 rounded-lg border ${active ? role.iconBg : "bg-white/[0.04] border-white/[0.08]"} ${role.iconColor} transition-all duration-300`}
            >
              <Icon className="h-5 w-5" />
            </div>

            <div className="text-center">
              <p className="text-xs font-bold text-white tracking-wide leading-none">
                {role.title}
              </p>
              <span className="text-[10px] text-slate-500 mt-0.5 block font-normal">
                {role.subtitle}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}