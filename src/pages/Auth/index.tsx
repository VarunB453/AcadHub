import { Card, CardContent } from "@/components/ui/card";
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
    ? "Select your role and enter credentials to sign in."
    : isSignup
    ? "Join AcadHub to access your personalized portal."
    : "Enter your registered email to receive password reset instructions.";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0F19] text-white flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Background Animated Ambient Lights & Grid */}
      <BackgroundBlobs />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid min-h-[85vh] items-center gap-12 lg:grid-cols-2">
          {/* Left Hero Showcase */}
          <HeroSection />

          {/* Right Auth Glass Card */}
          <div className="w-full max-w-lg mx-auto">
            <Card className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-white/15
              bg-slate-900/60
              backdrop-blur-2xl
              shadow-[0_0_80px_rgba(79,70,229,0.18)]
              transition-all
              duration-500
            ">
              {/* Top Accent Line */}
              <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500" />

              <CardContent className="p-6 sm:p-8 text-white">
                {/* Auth Header */}
                <AuthHeader title={title} description={description} />

                {/* Login / Register Mode Switcher */}
                <AuthTabs
                  isLogin={isLogin}
                  isSignup={isSignup}
                  selectedRole={selectedRole}
                  switchMode={switchMode}
                />

                {/* Role Selector Cards */}
                <div className="mb-6">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Select Account Role
                  </p>
                  <RoleCards
                    selectedRole={selectedRole}
                    onChange={setSelectedRole}
                    disableAdminSignup={isSignup}
                  />
                </div>

                {/* Active Form */}
                <form onSubmit={handleSubmit} className="mt-6">
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}