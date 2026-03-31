import { ComponentProps, useEffect } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

import { cn } from "../../utils/functions/misc.functions";
import RadioInput from "../inputs/RadioInput";

type Props<T extends FieldValues> = ComponentProps<typeof RadioInput> & {
  name: Path<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: { value: string; label: string }[];
  inputClassName?: string;
  icon?: React.ReactNode;
};

export default function FormRadioInput<T extends FieldValues>({
  name,
  registerOptions,
  options,
  className,
  inputClassName,
  icon,
  ...radioProps
}: Props<T>) {
  const {
    register,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<T>();
  const defaultValue = getValues(name);

  useEffect(() => {
    if (defaultValue && !getValues(name)) {
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue, getValues]);

  const hasError = !!errors[name];

  const value = watch(name);

  return (
    <>
      <div className={cn("flex", className)}>
        {options &&
          options.map((option) => (
            <label
              key={option.value}
              className={cn(
                "small-semibold flex cursor-pointer items-center space-x-1",
                hasError && "text-red-500",
              )}
            >
              <RadioInput
                value={option.value}
                {...radioProps}
                className={cn(inputClassName, hasError && "border-red-500")}
                {...register(name, registerOptions)}
                checked={value === option.value}
              />
              <span className="extra-small">{option.label}</span>
            </label>
          ))}
      </div>
      {hasError && (
        <span className="text-custom-12 font-semibold text-red-500">
          {errors[name]?.message?.toString()}
        </span>
      )}
    </>
  );
}
