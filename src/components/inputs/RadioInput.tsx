import { ComponentPropsWithoutRef, forwardRef } from "react";

// Import the custom CSS file

type Props = Omit<ComponentPropsWithoutRef<"input">, "type"> & {
  icon?: React.ReactNode;
  inputClassName?: string;
};

const RadioInput = forwardRef<HTMLInputElement, Props>(
  ({ icon, inputClassName, className, ...inputProps }, forwardedRef) => {
    return (
      <div
        className={`custom-radio relative flex items-center gap-2 ${className}`}
      >
        <input
          ref={forwardedRef}
          type="radio"
          {...inputProps}
          className={inputClassName}
        />
        {icon && <span className="absolute left-0">{icon}</span>}
      </div>
    );
  },
);

RadioInput.displayName = "RadioInput";

export default RadioInput;
