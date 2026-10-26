import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import AuthHeader from "./components/AuthHeader";
import RoleCards from "./components/RoleCards";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import { useAuthForm } from "./hooks/useAuthForm";
import AuthTabs from "./components/AuthTabs";

export default function AuthPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const {
    isLogin,
    isSignup,
    isForgot,
    selectedRole,
    setSelectedRole,
    form,
    updateField,
    departments,
    loading,
    captcha,
    switchMode,
    handleSubmit,
    handleExploreDemo,
  } = useAuthForm();

  const title = isLogin
    ? "Welcome Back"
    : isSignup
    ? "Create Account"
    : "Reset Password";

  const description = isLogin
    ? "Sign in to continue to your campus portal."
    : isSignup
    ? "Join AcadHub to access your personalized portal."
    : "Password recovery is not configured. Contact an administrator for assistance.";

  return (
    <div
      className="auth-page relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16 sm:px-6"
      data-theme={theme}
    >
      <button
        type="button"
        onClick={() => setTheme((current) => current === "light" ? "dark" : "light")}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        className={`absolute right-4 top-4 z-20 inline-flex h-10 items-center gap-2 rounded-md border px-3 text-xs font-semibold transition-colors sm:right-6 sm:top-6 ${
          theme === "light"
            ? "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            : "border-white/20 bg-white/10 text-white hover:bg-white/20"
        }`}
      >
        {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
      </button>

      <div className="relative z-10 mx-auto w-full max-w-sm">
        <div className="w-full">
          <div className="auth-card relative overflow-hidden rounded-xl border shadow-[0_24px_70px_rgba(0,0,0,0.18)]">
            <div className="h-1 w-full bg-[#171717]" />

            <div className="p-5 sm:p-6">
              <AuthHeader title={title} description={description} />

              {!isForgot && (
                <>
                  <AuthTabs
                    isLogin={isLogin}
                    isSignup={isSignup}
                    selectedRole={selectedRole}
                    switchMode={switchMode}
                  />

                  <div className="mb-4">
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      Select Account Role
                    </p>
                    <RoleCards
                      selectedRole={selectedRole}
                      onChange={setSelectedRole}
                      disableAdminSignup={isSignup}
                    />
                  </div>
                </>
              )}

              {isForgot && (
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="mb-5 flex items-center gap-1.5 text-xs text-slate-600 transition-colors hover:underline"
                >
                  ← Back to Sign In
                </button>
              )}

              <form onSubmit={handleSubmit} className="mt-2">
                {isLogin && (
                  <LoginForm
                    form={form}
                    loading={loading}
                    updateField={updateField}
                    onForgotPassword={() => switchMode("forgot")}
                    onExploreDemo={handleExploreDemo}
                  />
                )}

                {isSignup && (
                  <SignupForm
                    form={form}
                    updateField={updateField}
                    selectedRole={selectedRole}
                    departments={departments}
                    loading={loading}
                    captcha={captcha}
                  />
                )}

                {isForgot && <ForgotPasswordForm />}
              </form>
            </div>

          </div>
          <p className="auth-footer mt-4 text-center text-[11px]">
            By continuing, you agree to AcadHub's{" "}
            <span className="cursor-pointer transition-colors hover:underline">
              Terms of Service
            </span>{" "}
            &{" "}
            <span className="cursor-pointer transition-colors hover:underline">
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}