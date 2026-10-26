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
    subtitle: "Portal",
    icon: GraduationCap,
    activeClasses: "border-slate-900 bg-slate-100 shadow-sm",
    iconColor: "text-slate-700",
    iconBg: "bg-white border-slate-200",
  },
  {
    id: "faculty",
    title: "Faculty",
    subtitle: "Staff",
    icon: Briefcase,
    activeClasses: "border-slate-900 bg-slate-100 shadow-sm",
    iconColor: "text-slate-700",
    iconBg: "bg-white border-slate-200",
  },
  {
    id: "admin",
    title: "Admin",
    subtitle: "Control",
    icon: ShieldCheck,
    activeClasses: "border-slate-900 bg-slate-100 shadow-sm",
    iconColor: "text-slate-700",
    iconBg: "bg-white border-slate-200",
  },
] as const;

export default function RoleCards({
  selectedRole,
  onChange,
  disableAdminSignup,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
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
              relative flex flex-col items-center justify-center gap-1.5
              rounded-xl border p-2 transition-all duration-200
              ${
                active
                  ? `${role.activeClasses} scale-[1.02]`
                  : "border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50 text-slate-600"
              }
              ${disabled ? "opacity-35 cursor-not-allowed grayscale" : "cursor-pointer"}
            `}
          >
            {/* Active checkmark */}
            {active && (
              <div className="absolute top-1 right-1 text-slate-900">
                  <CheckCircle2 className="h-3 w-3 fill-slate-900/10" />
              </div>
            )}

            <div
              className={`p-1.5 rounded-lg border ${active ? role.iconBg : "bg-slate-50 border-slate-200"} ${role.iconColor} transition-all duration-200`}
            >
              <Icon className="h-4 w-4" />
            </div>

            <div className="text-center">
              <p className="text-xs font-bold text-slate-900 tracking-wide leading-none">
                {role.title}
              </p>
              <span className="text-[9px] text-slate-500 mt-0.5 block font-normal">
                {role.subtitle}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}