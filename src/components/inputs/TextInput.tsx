import { ComponentPropsWithoutRef, forwardRef } from "react";

import { cn } from "../../utils/functions/misc.functions";

type Props = ComponentPropsWithoutRef<"input"> & {
  icon?: React.ReactNode;
  inputClassName?: string;
  error?: boolean;
};

const TextInput = forwardRef<HTMLInputElement, Props>(
  (
    { icon, inputClassName, error, className, type, name, ...inputProps },
    forwardedRef,
  ) => {
    return (
      <div
        className={cn(
          "relative flex gap-2 rounded-3xl",
          {
            "border border-red-500": error,
            "!bg-[#DEE2E6] opacity-85": inputProps.disabled,
            // "!bg-[#000000] !text-[#ffffff] opacity-80": inputProps.disabled,
          },
          className,
        )}
      >
        <input
          id={`formInput-${name}`}
          ref={forwardedRef}
          type={type ?? "text"}
          {...{ name, ...inputProps }}
          className={cn(
            ":focus:outline-none :focus:border-none w-full rounded-[100px] border-none bg-transparent px-2 placeholder-gray-300 outline-none",
            { "text-red-500": error },
            inputClassName,
          )}
        />
        {icon}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
