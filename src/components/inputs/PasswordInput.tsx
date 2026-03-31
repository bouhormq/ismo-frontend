import { forwardRef, useState } from "react";

import EyeIcon from "../../icons/EyeIcon";
import { cn } from "../../utils/functions/misc.functions";
import { BaseInput } from "../../utils/types/components.types";

type Props = BaseInput;

const PasswordInput = forwardRef<HTMLInputElement, Props>(
  (
    { label, name, icon, className, placeholder, hideLabel, ...inputProps },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
      setShowPassword((show) => !show);
    };

    const type = showPassword ? "text" : "password";

    return (
      <div className="flex w-full flex-col gap-2">
        {!!name && !hideLabel && (
          <label htmlFor={name} className="px-2.5 text-xs text-[#6C757D]">
            {label}
          </label>
        )}
        <div className={cn("relative flex gap-2", className)}>
          {icon}
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            className={cn(
              "shadow-input rounded-pill :focus:outline-none :focus:border-none peer w-full rounded-full border-none bg-gray-inputBg px-1.5 outline-none duration-150 disabled:cursor-not-allowed disabled:opacity-50",
              "placeholder-gray-300",
            )}
            ref={ref}
            {...inputProps}
          />
          <button
            title="Toggle password visibility"
            type="button"
            onClick={togglePassword}
            className="absolute right-5 top-1/2 -translate-y-1/2 transform peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
          >
            <EyeIcon showLine={!showPassword} />
          </button>
        </div>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
