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
    <div className="auth-tabs relative mb-3 flex gap-1 rounded-md border border-slate-200 bg-slate-100 p-0.5">
      <button
        type="button"
        onClick={() => switchMode("login")}
        className={`
          flex-1 flex items-center justify-center gap-1.5 h-8 rounded-sm text-xs font-semibold transition-all duration-300
          ${
            isLogin
              ? "bg-[#171717] text-white"
              : "text-slate-500 hover:text-slate-900 hover:bg-white"
          }
        `}
      >
        <LogIn className="w-3.5 h-3.5" />
        <span>Sign In</span>
      </button>

      <button
        type="button"
        disabled={isAdminSignupDisabled}
        onClick={() => switchMode("signup")}
        className={`
          flex-1 flex items-center justify-center gap-1.5 h-8 rounded-sm text-xs font-semibold transition-all duration-300
          ${
            isSignup
              ? "bg-[#171717] text-white"
              : "text-slate-500 hover:text-slate-900 hover:bg-white"
          }
          ${isAdminSignupDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <UserPlus className="w-3.5 h-3.5" />
        <span>Register</span>
      </button>
    </div>
  );
}