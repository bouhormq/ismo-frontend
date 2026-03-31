import { PropsWithChildren } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";

import { cn, getDeepFormError } from "$/utils/functions/misc.functions";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  isFocused: boolean;
  hasValue?: boolean;
  labelClassName?: string;
  labelWrapperClassName?: string;
  isDisabled?: boolean;
  showLabelWithValue?: boolean;
  handleClick?: () => void;
};
export default function PlaceHolderLabelAnimatedLayout<T extends FieldValues>({
  name,
  hasValue,
  isFocused,
  label,
  labelClassName,
  labelWrapperClassName,
  isDisabled = false,
  showLabelWithValue = true,
  children,
  handleClick,
}: PropsWithChildren<Props<T>>) {
  const {
    formState: { errors },
  } = useFormContext<T>();
  const error = getDeepFormError(errors, name.split("."));

  return (
    <div
      className={cn(
        "relative flex !min-w-[200px] flex-shrink flex-grow basis-0 flex-col",
        labelWrapperClassName,
      )}
    >
      <div
        onClick={handleClick}
        className={cn(
          "absolute left-3 z-[51] rounded-[100px] border-none px-1 text-base font-medium !text-[#43454E] transition-all duration-300 ease-in-out",
          "-translate-y-1/2 transform",
          {
            "!top-0 bg-white text-[14px] text-gray-500": isFocused || hasValue,
            "top-[21px] text-gray-400": !isFocused && !hasValue,
            "!text-red-500": !!error,
            "!text-[#898989]": isDisabled,
            hidden: !showLabelWithValue && (isFocused || hasValue),
          },
          labelClassName,
        )}
      >
        {label}
      </div>
      {children}
    </div>
  );
}
