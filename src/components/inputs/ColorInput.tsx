import { forwardRef, useId } from "react";

import { cn } from "../../utils/functions/misc.functions";
import { BaseInput } from "../../utils/types/misc.types";
import InputError from "./InputError";

const ColorInput = forwardRef<HTMLInputElement, BaseInput>(
  ({ id, label, hideLabel, error, name, className, ...inputProps }, ref) => {
    const innerId = useId();
    const inputId = id || innerId;
    const labelHtmlFor = name || inputId;

    return (
      <div className="w-full">
        <label
          htmlFor={labelHtmlFor}
          className={cn(
            "mb-1 ml-2 block text-xs text-black",
            hideLabel && "hidden",
          )}
        >
          {label}
        </label>
        <input
          id={inputId}
          type="color"
          name={name}
          ref={ref}
          className={cn(
            "placeholder:text-grey-200 focus:border-primary/30 aria-invalid:border-error aria-invalid:focus:border-error min-h-10 w-full cursor-pointer rounded-lg border-2 p-1.5 text-sm outline-none duration-150 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...inputProps}
        />

        {!!error && <InputError errorMessage={error} />}
      </div>
    );
  },
);

ColorInput.displayName = "ColorInput";

export default ColorInput;
