import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
        {label}
      </Label>

      <div className="relative group">
        {/* Input Icon */}
        <Icon
          className="
            absolute
            left-3.5
            top-1/2
            h-4
            w-4
            -translate-y-1/2
            text-slate-400
            group-focus-within:text-cyan-400
            transition-colors
            duration-200
            pointer-events-none
          "
        />

        <Input
          type={inputType}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`
            h-11
            rounded-xl
            border-white/10
            bg-slate-950/40
            pl-11
            text-sm
            text-white
            placeholder:text-slate-500
            transition-all
            duration-200
            focus:border-cyan-400/80
            focus:bg-slate-950/60
            focus:ring-2
            focus:ring-cyan-400/20
            ${isPassword ? "pr-11" : ""}
          `}
        />

        {/* Show / Hide Password */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((previous) => !previous)}
            className="
              absolute
              right-2.5
              top-1/2
              flex
              h-8
              w-8
              -translate-y-1/2
              items-center
              justify-center
              rounded-lg
              text-slate-400
              transition-all
              duration-200
              hover:bg-white/10
              hover:text-cyan-300
              focus:outline-none
            "
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}