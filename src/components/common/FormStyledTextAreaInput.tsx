import { ComponentProps, Key, useState } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

import { inputClassname } from "$/pages/test/InputsStyling";

import { cn } from "../../utils/functions/misc.functions";
import TextareaInput from "../inputs/TextareaInput";
import PlaceHolderLabelAnimatedLayout from "./PlaceHolderLabelAnimatedLayout";

type Props<T extends FieldValues> = ComponentProps<typeof TextareaInput> & {
  name: Path<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  label?: string;
  wrapperClassName?: string;
  hideLabel?: boolean;
  inputClassName?: string;
  icon?: React.ReactNode;
  inputKey?: Key | null;
  labelClassName?: string;
  labelWrapperClassName?: string;
};

const FormStyledTextAreaInput = <T extends FieldValues>({
  name,
  registerOptions,
  className,
  wrapperClassName,
  hideLabel = true,
  label,
  labelClassName,
  labelWrapperClassName,
  inputKey: key,
  ...inputProps
}: Props<T>) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<T>();
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const hasError = !!errors[name];

  const hasValue = !!watch(name);

  const handleSelectStyledLabelClick = () => {
    const findElementById = document.getElementById(`formTextarea-${name}`);
    setIsFocused(true);
    if (findElementById) {
      findElementById.focus();
    }
  };

  return (
    <PlaceHolderLabelAnimatedLayout
      name={name}
      hasValue={hasValue}
      isFocused={isFocused}
      label={label}
      labelClassName={labelClassName}
      labelWrapperClassName={labelWrapperClassName}
      handleClick={handleSelectStyledLabelClick}
    >
      <TextareaInput
        {...inputProps}
        className={cn(
          "h-full",
          { "!bg-[#DEE2E6] opacity-70": inputProps.disabled },
          inputClassname,
          className,
          "text-lg",
        )}
        {...register(name, {
          onChange: (e) => {
            registerOptions?.onChange?.(e);
            if (inputProps.onChange) inputProps.onChange(e);
          },
        })}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "auto";
          target.style.height = `${target.scrollHeight}px`;
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {hasError && (
        <span className="ml-2 mt-2 text-custom-10 font-semibold text-red-500">
          {errors[name]?.message?.toString()}
        </span>
      )}
    </PlaceHolderLabelAnimatedLayout>
  );
};

export default FormStyledTextAreaInput;
