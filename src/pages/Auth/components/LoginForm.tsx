import { useState } from "react";
import AuthInput from "./AuthInput";
import {
  Mail,
  Lock,
  Rocket,
  GraduationCap,
  Users,
  ShieldCheck,
  ArrowLeft,
  Eye,
  EyeOff,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import type { SignupFormData } from "../types";

type DemoRole = "student" | "faculty" | "admin";
interface DemoCredentials {
  email: string;
  password: string;
}

interface LoginFormProps {
  form: SignupFormData;
  loading: boolean;
  updateField: <K extends keyof SignupFormData>(key: K, value: SignupFormData[K]) => void;
  onForgotPassword: () => void;
  onExploreDemo?: (role: DemoRole, credentials: DemoCredentials) => void;
}

const DEMO_ACCOUNTS: Record<DemoRole, DemoCredentials> = {
  student: { email: "demo.student@acadhub.demo", password: "AcadHub@Demo2026" },
  faculty: { email: "demo.faculty@acadhub.demo", password: "AcadHub@Demo2026" },
  admin: { email: "demo.admin@acadhub.demo", password: "AcadHub@Demo2026" },
};

const DEMO_ROLES = [
  {
    role: "student" as DemoRole,
    title: "Student Demo",
    description: "Explore student dashboard, courses & attendance.",
    icon: GraduationCap,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    role: "faculty" as DemoRole,
    title: "Faculty Demo",
    description: "Explore class grading, attendance & reports.",
    icon: Users,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    role: "admin" as DemoRole,
    title: "Admin Demo",
    description: "Explore full campus administration & analytics.",
    icon: ShieldCheck,
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
];

export default function LoginForm({
  form,
  loading,
  updateField,
  onForgotPassword,
  onExploreDemo,
}: LoginFormProps) {
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoStep, setDemoStep] = useState<"role" | "credentials">("role");
  const [demoRole, setDemoRole] = useState<DemoRole | null>(null);
  const [demoEmail, setDemoEmail] = useState("");
  const [demoPassword, setDemoPassword] = useState("");
  const [showDemoPassword, setShowDemoPassword] = useState(false);

  const openDemo = () => {
    setDemoOpen(true);
    setDemoStep("role");
    setDemoRole(null);
    setDemoEmail("");
    setDemoPassword("");
    setShowDemoPassword(false);
  };

  const closeDemo = () => {
    setDemoOpen(false);
    setDemoStep("role");
    setDemoRole(null);
    setDemoEmail("");
    setDemoPassword("");
    setShowDemoPassword(false);
  };

  const selectDemoRole = (role: DemoRole) => {
    const credentials = DEMO_ACCOUNTS[role];
    setDemoRole(role);
    setDemoEmail(credentials.email);
    setDemoPassword(credentials.password);
    setDemoStep("credentials");
  };

  const handleDemoLogin = () => {
    if (!demoRole || !demoEmail.trim() || !demoPassword.trim()) return;
    onExploreDemo?.(demoRole, { email: demoEmail.trim(), password: demoPassword });
  };

  return (
    <div className="space-y-3">
      {/* Email */}
      <AuthInput
        label="Email Address"
        placeholder="name@campus.edu"
        value={form.email}
        icon={Mail}
        onChange={(value) => updateField("email", value)}
      />

      {/* Password */}
      <div>
        <AuthInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          icon={Lock}
          onChange={(value) => updateField("password", value)}
        />
        <div className="flex justify-end mt-1">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-[10px] font-semibold text-cyan-400/90 hover:text-cyan-300 transition-colors hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </div>

      {/* Sign In Button */}
      <button
        type="submit"
        disabled={loading}
        className="
          mt-1 w-full h-10 rounded-xl font-semibold text-xs sm:text-sm text-white
          bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500
          shadow-[0_6px_20px_rgba(79,70,229,0.30)]
          hover:shadow-[0_8px_25px_rgba(79,70,229,0.45)]
          hover:scale-[1.01] active:scale-[0.99]
          transition-all duration-200
          flex items-center justify-center gap-2
          disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100
        "
      >
        {loading ? (
          <>
            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span>Signing In...</span>
          </>
        ) : (
          <>
            <span>Sign In to Dashboard</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          </>
        )}
      </button>

      {/* Divider */}
      <div className="relative py-0.5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/[0.08]" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-2 text-[9px] font-bold uppercase tracking-widest text-slate-500 bg-[#0e1422]">
            or explore demo
          </span>
        </div>
      </div>

      {/* Demo Button */}
      <button
        type="button"
        onClick={openDemo}
        disabled={loading}
        className="
          group w-full h-9 rounded-xl font-medium text-xs
          border border-cyan-500/25 bg-cyan-500/[0.07] text-cyan-300
          hover:border-cyan-400/50 hover:bg-cyan-500/15 hover:text-white
          hover:shadow-[0_0_16px_rgba(6,182,212,0.12)]
          transition-all duration-200 flex items-center justify-center gap-1.5
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        <Rocket className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
        <span>Explore Interactive Demo Mode</span>
      </button>

      {/* ── DEMO MODAL ── */}
      {demoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={closeDemo}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0e1422]/95 p-5 text-white shadow-2xl shadow-black/60 backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Rocket className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Explore AcadHub Demo</h3>
                <p className="text-[11px] text-slate-400">Choose a pre-configured demo persona</p>
              </div>
            </div>

            {/* Role Selection */}
            {demoStep === "role" && (
              <div className="space-y-1.5">
                {DEMO_ROLES.map(({ role, title, description, icon: Icon, color, bg }) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => selectDemoRole(role)}
                    className="group flex w-full items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] p-2.5 text-left transition-all duration-150 hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    <div className={`p-2 rounded-lg border ${bg} ${color} group-hover:scale-110 transition-transform`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold text-xs text-white group-hover:${color} transition-colors`}>{title}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{description}</p>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" />
                  </button>
                ))}
              </div>
            )}

            {/* Credentials Step */}
            {demoStep === "credentials" && demoRole && (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setDemoStep("role")}
                  className="flex items-center gap-1 text-[11px] text-cyan-400 hover:underline"
                >
                  <ArrowLeft className="h-3 w-3" />
                  <span>Change Persona</span>
                </button>

                <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/[0.07] px-3 py-2">
                  <p className="text-[9px] uppercase font-bold tracking-wider text-cyan-300/70">
                    Selected Demo Account
                  </p>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {DEMO_ROLES.find((r) => r.role === demoRole)?.title}
                  </p>
                </div>

                <div className="space-y-2.5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Demo Email
                    </label>
                    <input
                      type="email"
                      value={demoEmail}
                      onChange={(e) => setDemoEmail(e.target.value)}
                      className="w-full h-9 px-2.5 rounded-lg border border-white/[0.09] bg-white/[0.04] text-xs text-white outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Demo Password
                    </label>
                    <div className="relative">
                      <input
                        type={showDemoPassword ? "text" : "password"}
                        value={demoPassword}
                        onChange={(e) => setDemoPassword(e.target.value)}
                        className="w-full h-9 px-2.5 pr-8 rounded-lg border border-white/[0.09] bg-white/[0.04] text-xs text-white outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/20 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowDemoPassword((prev) => !prev)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                      >
                        {showDemoPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={loading || !demoEmail.trim() || !demoPassword.trim()}
                  onClick={handleDemoLogin}
                  className="w-full h-9 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 font-semibold text-xs text-white shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_6px_20px_rgba(79,70,229,0.35)] transition-all"
                >
                  <Rocket className="h-3.5 w-3.5" />
                  Launch Demo Session
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={closeDemo}
              className="mt-3 w-full text-center text-[11px] text-slate-500 hover:text-slate-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}