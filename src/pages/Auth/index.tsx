import AuthHeader from "./components/AuthHeader";
import RoleCards from "./components/RoleCards";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import HeroSection from "./components/HeroSection";
import BackgroundBlobs from "./components/BackgroundBlobs";
import { useAuthForm } from "./hooks/useAuthForm";
import AuthTabs from "./components/AuthTabs";

export default function AuthPage() {
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
    : "Enter your email to reset your password.";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070a12] text-white flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Ambient background */}
      <BackgroundBlobs />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid min-h-[90vh] items-center gap-12 lg:grid-cols-[1fr_460px]">
          {/* ── Left: Hero Showcase ── */}
          <HeroSection />

          {/* ── Right: Auth Card ── */}
          <div className="w-full">
            <div
              className="
                relative overflow-hidden rounded-2xl
                border border-white/[0.09]
                bg-[#0e1422]/80
                backdrop-blur-2xl
                shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_32px_80px_rgba(0,0,0,0.60),0_0_60px_rgba(79,70,229,0.12)]
              "
            >
              {/* Top gradient accent bar */}
              <div className="h-[2px] w-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500" />

              <div className="p-7 sm:p-8">
                {/* Brand + Mode title */}
                <AuthHeader title={title} description={description} />

                {/* Only show tabs & role cards when not in forgot-password mode */}
                {!isForgot && (
                  <>
                    {/* Login / Register switcher */}
                    <AuthTabs
                      isLogin={isLogin}
                      isSignup={isSignup}
                      selectedRole={selectedRole}
                      switchMode={switchMode}
                    />

                    {/* Role selector */}
                    <div className="mb-5">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
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

                {/* Forgot password back link */}
                {isForgot && (
                  <button
                    type="button"
                    onClick={() => switchMode("login")}
                    className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 hover:underline mb-5 transition-colors"
                  >
                    ← Back to Sign In
                  </button>
                )}

                {/* Active form */}
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

                  {isForgot && (
                    <ForgotPasswordForm
                      form={form}
                      loading={loading}
                      updateField={updateField}
                      captcha={captcha}
                    />
                  )}
                </form>
              </div>
            </div>

            {/* Footer note */}
            <p className="text-center text-[11px] text-slate-600 mt-4">
              By continuing, you agree to AcadHub's{" "}
              <span className="text-slate-500 cursor-pointer hover:text-slate-300 transition-colors">
                Terms of Service
              </span>{" "}
              &{" "}
              <span className="text-slate-500 cursor-pointer hover:text-slate-300 transition-colors">
                Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}