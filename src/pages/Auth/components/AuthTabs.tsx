import { Button } from "@/components/ui/button";
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
    <div className="relative flex rounded-2xl border border-white/10 bg-slate-950/40 p-1.5 backdrop-blur-xl mb-6 shadow-inner">
      <Button
        type="button"
        onClick={() => switchMode("login")}
        className={`
          flex-1
          h-11
          rounded-xl
          font-medium
          text-sm
          flex items-center justify-center gap-2
          transition-all
          duration-300
          ${
            isLogin
              ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/25 border border-white/10"
              : "bg-transparent text-slate-300 hover:text-white hover:bg-white/5"
          }
        `}
      >
        <LogIn className="w-4 h-4" />
        <span>Sign In</span>
      </Button>

      <Button
        type="button"
        disabled={isAdminSignupDisabled}
        onClick={() => switchMode("signup")}
        className={`
          flex-1
          h-11
          rounded-xl
          font-medium
          text-sm
          flex items-center justify-center gap-2
          transition-all
          duration-300
          ${
            isSignup
              ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/25 border border-white/10"
              : "bg-transparent text-slate-300 hover:text-white hover:bg-white/5"
          }
          ${isAdminSignupDisabled ? "opacity-40 cursor-not-allowed" : ""}
        `}
      >
        <UserPlus className="w-4 h-4" />
        <span>Register</span>
      </Button>
    </div>
  );
}