import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";

interface Props {
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  icon: LucideIcon;
  onChange: (value: string) => void;
}

export default function AuthInput({
  label,
  placeholder,
  type = "text",
  value,
  icon: Icon,
  onChange,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="space-y-1">
      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </label>

      <div className="relative group">
        <Icon className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors duration-200 pointer-events-none" />

        <input
          type={inputType}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`
            w-full h-9 rounded-xl border border-white/[0.09] bg-white/[0.04]
            pl-9 ${isPassword ? "pr-9" : "pr-3"} text-xs sm:text-sm text-white
            placeholder:text-slate-600
            outline-none transition-all duration-200
            focus:border-cyan-400/60 focus:bg-white/[0.07] focus:ring-2 focus:ring-cyan-400/15
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-md text-slate-500 hover:text-cyan-300 hover:bg-white/10 transition-all duration-200"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-3.5 w-3.5" />
            ) : (
              <Eye className="h-3.5 w-3.5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}