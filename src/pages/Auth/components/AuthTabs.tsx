import { LogIn, UserPlus } from "lucide-react";

interface AuthTabsProps {
  isLogin: boolean;
  isSignup: boolean;
  selectedRole: "student" | "faculty" | "admin";
  switchMode: (mode: "login" | "signup") => void;
}

export default function AuthTabs({
  isLogin,
  isSignup,
  selectedRole,
  switchMode,
}: AuthTabsProps) {
  const isAdminSignupDisabled = selectedRole === "admin";

  return (
    <div className="relative flex rounded-xl border border-white/[0.08] bg-white/[0.03] p-1 mb-6 gap-1">
      <button
        type="button"
        onClick={() => switchMode("login")}
        className={`
          flex-1 flex items-center justify-center gap-2 h-10 rounded-lg text-sm font-semibold transition-all duration-300
          ${
            isLogin
              ? "bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/30"
              : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
          }
        `}
      >
        <LogIn className="w-4 h-4" />
        <span>Sign In</span>
      </button>

      <button
        type="button"
        disabled={isAdminSignupDisabled}
        onClick={() => switchMode("signup")}
        className={`
          flex-1 flex items-center justify-center gap-2 h-10 rounded-lg text-sm font-semibold transition-all duration-300
          ${
            isSignup
              ? "bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/30"
              : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
          }
          ${isAdminSignupDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <UserPlus className="w-4 h-4" />
        <span>Register</span>
      </button>
    </div>
  );
}