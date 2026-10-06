import { Mail, Lock, KeyRound } from "lucide-react";
import AuthInput from "./AuthInput";
import CaptchaField from "./CaptchaField";
import type { SignupFormData } from "../types";

interface ForgotPasswordFormProps {
  form: SignupFormData;
  loading: boolean;
  updateField: <K extends keyof SignupFormData>(key: K, value: SignupFormData[K]) => void;
  captcha: {
    captcha: { question: string; answer: string };
    answer: string;
    setAnswer: (value: string) => void;
    refresh: () => void;
  };
}

export default function ForgotPasswordForm({
  form,
  loading,
  updateField,
  captcha,
}: ForgotPasswordFormProps) {
  return (
    <div className="space-y-4">
      {/* Email */}
      <AuthInput
        label="Email Address"
        icon={Mail}
        value={form.email}
        placeholder="Enter your registered email"
        onChange={(value) => updateField("email", value)}
      />

      {/* New Password */}
      <AuthInput
        label="New Password"
        type="password"
        icon={Lock}
        value={form.password}
        placeholder="Enter your new password"
        onChange={(value) => updateField("password", value)}
      />

      {/* Verification */}
      <CaptchaField
        captcha={captcha.captcha}
        answer={captcha.answer}
        setAnswer={captcha.setAnswer}
        refresh={captcha.refresh}
      />

      {/* Reset Button */}
      <button
        type="submit"
        disabled={loading}
        className="
          mt-2 w-full h-12 rounded-xl font-semibold text-sm text-white
          bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500
          shadow-[0_8px_30px_rgba(79,70,229,0.35)]
          hover:shadow-[0_12px_35px_rgba(79,70,229,0.50)]
          hover:scale-[1.01] active:scale-[0.99]
          transition-all duration-300
          flex items-center justify-center gap-2
          disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100
        "
      >
        {loading ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span>Resetting...</span>
          </>
        ) : (
          <>
            <KeyRound className="w-4 h-4" />
            <span>Reset Password</span>
          </>
        )}
      </button>
    </div>
  );
}