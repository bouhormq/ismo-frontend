import { ComponentProps, Key, useRef, useState } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

import { inputClassname } from "$/pages/test/InputsStyling";

import { cn, getDeepFormError } from "../../utils/functions/misc.functions";
import TextInput from "../inputs/TextInput";
import PlaceHolderLabelAnimatedLayout from "./PlaceHolderLabelAnimatedLayout";

type Props<T extends FieldValues> = ComponentProps<typeof TextInput> & {
  name: Path<T>;
  label?: string;
  inputClassName?: string;
  registerOptions?: RegisterOptions<T, Path<T>>;
  icon?: React.ReactNode;
  inputKey?: Key | null;
  labelClassName?: string;
  labelWrapperClassName?: string;
};

export default function FormStyledTextinput<T extends FieldValues>({
  name,
  label,
  registerOptions,
  className,
  inputClassName,
  labelClassName,
  labelWrapperClassName,
  icon,
  inputKey: key,
  ...inputProps
}: Props<T>) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<T>();
  const error = getDeepFormError(errors, name.split("."));
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (inputProps.disabled) return;
    setIsFocused(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const handleBlur = () => setIsFocused(false);

  const isDateInput = inputProps.type === "date";
  const hasValue = isDateInput || (inputProps.value ? !!inputProps.value : !!watch(name));

  const { ref, ...restRegister } = register(name, {
    ...registerOptions,
    onChange: (e) => {
      registerOptions?.onChange?.(e);
      if (inputProps.onChange) inputProps.onChange(e);
    },
  });

  return (
    <PlaceHolderLabelAnimatedLayout
      handleClick={handleFocus}
      name={name}
      hasValue={hasValue}
      isFocused={isFocused}
      label={label}
      labelClassName={labelClassName}
      isDisabled={inputProps.disabled}
      labelWrapperClassName={labelWrapperClassName}
    >
      <TextInput
        icon={icon}
        key={key}
        {...inputProps}
        inputClassName={inputClassName}
        className={cn(inputClassname, className, "text-lg")}
        {...restRegister}
        ref={(e) => {
          ref(e);
          (
            inputRef as React.MutableRefObject<HTMLInputElement | null>
          ).current = e;
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={!!error}
      />
      {!!error && (
        <span className="ml-2 mt-2 text-custom-10 font-semibold text-red-500">
          {error.message?.toString()}
        </span>
      )}
    </PlaceHolderLabelAnimatedLayout>
  );
}
