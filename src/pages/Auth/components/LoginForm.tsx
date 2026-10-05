import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  updateField: <K extends keyof SignupFormData>(
    key: K,
    value: SignupFormData[K]
  ) => void;
  onForgotPassword: () => void;
  onExploreDemo?: (role: DemoRole, credentials: DemoCredentials) => void;
}

const DEMO_ACCOUNTS: Record<DemoRole, DemoCredentials> = {
  student: {
    email: "demo.student@acadhub.demo",
    password: "AcadHub@Demo2026",
  },
  faculty: {
    email: "demo.faculty@acadhub.demo",
    password: "AcadHub@Demo2026",
  },
  admin: {
    email: "demo.admin@acadhub.demo",
    password: "AcadHub@Demo2026",
  },
};

const DEMO_ROLES = [
  {
    role: "student" as DemoRole,
    title: "Student Demo",
    description: "Explore student dashboard, courses & attendance.",
    icon: GraduationCap,
  },
  {
    role: "faculty" as DemoRole,
    title: "Faculty Demo",
    description: "Explore class grading, attendance & reports.",
    icon: Users,
  },
  {
    role: "admin" as DemoRole,
    title: "Admin Demo",
    description: "Explore full campus administration & analytics.",
    icon: ShieldCheck,
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
    if (!demoRole || !demoEmail.trim() || !demoPassword.trim()) {
      return;
    }
    onExploreDemo?.(demoRole, {
      email: demoEmail.trim(),
      password: demoPassword,
    });
  };

  return (
    <div className="space-y-4">
      {/* Email */}
      <AuthInput
        label="Email Address"
        placeholder="name@campus.edu"
        value={form.email}
        icon={Mail}
        onChange={(value) => updateField("email", value)}
      />

      {/* Password */}
      <div className="space-y-1">
        <AuthInput
          label="Password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          icon={Lock}
          onChange={(value) => updateField("password", value)}
        />
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </div>

      {/* Login Button */}
      <Button
        type="submit"
        disabled={loading}
        className="
          mt-3
          h-12
          w-full
          rounded-xl
          bg-gradient-to-r
          from-blue-600
          via-indigo-600
          to-cyan-500
          text-sm
          font-semibold
          text-white
          shadow-[0_8px_25px_rgba(79,70,229,0.35)]
          transition-all
          duration-300
          hover:scale-[1.01]
          hover:shadow-[0_12px_30px_rgba(79,70,229,0.5)]
          active:scale-[0.99]
          border border-white/20
        "
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span>Signing In...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <span>Sign In to Dashboard</span>
            <Sparkles className="w-4 h-4 text-cyan-300" />
          </div>
        )}
      </Button>

      {/* Demo Divider */}
      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-slate-900/80 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 rounded-full border border-white/5">
            or try instant demo
          </span>
        </div>
      </div>

      {/* Demo Button */}
      <Button
        type="button"
        variant="outline"
        onClick={openDemo}
        disabled={loading}
        className="
          group
          h-11
          w-full
          rounded-xl
          border
          border-cyan-500/30
          bg-cyan-500/10
          text-sm
          font-medium
          text-cyan-200
          backdrop-blur-md
          transition-all
          duration-300
          hover:border-cyan-400/60
          hover:bg-cyan-500/20
          hover:text-white
          hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]
        "
      >
        <Rocket className="mr-2 h-4 w-4 text-cyan-400 group-hover:scale-110 transition-transform" />
        Explore Interactive Demo Mode
      </Button>

      {/* DEMO MODAL */}
      {demoOpen && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-slate-950/80
            px-4
            backdrop-blur-md
            animate-in fade-in duration-200
          "
          onClick={closeDemo}
        >
          <div
            className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-white/15
              bg-slate-900/95
              p-6
              text-white
              shadow-2xl shadow-indigo-500/20
              backdrop-blur-2xl
            "
            onClick={(event) => event.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                  <Rocket className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Explore AcadHub Demo</h3>
                  <p className="text-xs text-slate-400">Choose a pre-configured demo persona</p>
                </div>
              </div>
            </div>

            {/* ROLE SELECTION */}
            {demoStep === "role" && (
              <div className="space-y-2.5">
                {DEMO_ROLES.map(({ role, title, description, icon: Icon }) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => selectDemoRole(role)}
                    className="
                      group
                      flex
                      w-full
                      items-center
                      gap-3.5
                      rounded-2xl
                      border
                      border-white/10
                      bg-slate-950/50
                      p-3.5
                      text-left
                      transition-all
                      duration-200
                      hover:border-cyan-400/50
                      hover:bg-cyan-500/10
                    "
                  >
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-white group-hover:text-cyan-300">
                        {title}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* CREDENTIALS STEP */}
            {demoStep === "credentials" && demoRole && (
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setDemoStep("role")}
                  className="flex items-center gap-1.5 text-xs text-cyan-400 hover:underline"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Change Persona</span>
                </button>

                <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-cyan-300">
                    Selected Demo Account
                  </p>
                  <p className="text-base font-semibold text-white mt-0.5">
                    {DEMO_ROLES.find((item) => item.role === demoRole)?.title}
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Demo Email
                    </label>
                    <input
                      type="email"
                      value={demoEmail}
                      onChange={(e) => setDemoEmail(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-white/10 bg-slate-950/60 text-sm text-white focus:border-cyan-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Demo Password
                    </label>
                    <div className="relative">
                      <input
                        type={showDemoPassword ? "text" : "password"}
                        value={demoPassword}
                        onChange={(e) => setDemoPassword(e.target.value)}
                        className="w-full h-10 px-3 pr-10 rounded-lg border border-white/10 bg-slate-950/60 text-sm text-white focus:border-cyan-400 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowDemoPassword((prev) => !prev)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        {showDemoPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  disabled={loading || !demoEmail.trim() || !demoPassword.trim()}
                  onClick={handleDemoLogin}
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 font-semibold text-white shadow-lg"
                >
                  <Rocket className="mr-2 h-4 w-4" />
                  Launch Demo Session
                </Button>
              </div>
            )}

            <button
              type="button"
              onClick={closeDemo}
              className="mt-4 w-full text-center text-xs text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}