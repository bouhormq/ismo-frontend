import { ComponentProps, Key } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

import { cn } from "../../utils/functions/misc.functions";
import InputWithLabel from "../inputs/InputParent";
import TextareaInput from "../inputs/TextareaInput";

type Props<T extends FieldValues> = ComponentProps<typeof TextareaInput> & {
  name: Path<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  label?: string;
  wrapperClassName?: string;
  hideLabel?: boolean;
  inputClassName?: string;
  icon?: React.ReactNode;
  inputKey?: Key | null;
};

const FormTextareaInput = <T extends FieldValues>({
  name,
  registerOptions,
  className,
  wrapperClassName,
  hideLabel = true,
  label,
  inputKey: key,
  ...inputProps
}: Props<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const hasError = !!errors[name];

  return (
    <InputWithLabel
      key={key}
      name={name}
      label={label ?? ""}
      hideLabel={hideLabel}
      className={cn("w-full min-w-80 flex-grow", wrapperClassName)}
    >
      <TextareaInput
        {...inputProps}
        className={cn(
          hasError && "!focus:border-red-500 !border-red-500 !text-red-500",
          "h-full w-full bg-gray-inputBg px-1.5 py-2 [&>input]:leading-3",
          className,
        )}
        {...register(name, registerOptions)}
      />
      {hasError && (
        <span className="mt-2 text-custom-12 font-semibold text-red-500">
          {errors[name]?.message?.toString()}
        </span>
      )}
    </InputWithLabel>
  );
};

export default FormTextareaInput;
