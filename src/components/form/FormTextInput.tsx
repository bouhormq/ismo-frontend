import { ComponentProps, Key } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

import { inputClassname } from "$/pages/test/InputsStyling";

import { cn, getDeepFormError } from "../../utils/functions/misc.functions";
import InputWithLabel from "../inputs/InputParent";
import TextInput from "../inputs/TextInput";

type Props<T extends FieldValues> = ComponentProps<typeof TextInput> & {
  name: Path<T>;
  label?: string;
  wrapperClassName?: string;
  hideLabel?: boolean;
  inputClassName?: string;
  registerOptions?: RegisterOptions<T, Path<T>>;
  icon?: React.ReactNode;
  inputKey?: Key | null;
};

export default function FormTextInput<T extends FieldValues>({
  name,
  label,
  wrapperClassName,
  hideLabel,
  registerOptions,
  className,
  inputClassName,
  icon,
  inputKey: key,
  ...inputProps
}: Props<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = getDeepFormError(errors, name.split("."));

  return (
    <InputWithLabel
      key={key}
      name={name}
      label={label ?? ""}
      hideLabel={hideLabel}
      className={cn("w-full min-w-80 flex-grow", wrapperClassName)}
    >
      <TextInput
        icon={icon}
        key={key}
        {...inputProps}
        inputClassName={inputClassName}
        className={cn(
          !!error &&
            "border-[1px] border-red-500 text-red-500 focus:border-red-500",
          inputClassname,
          "!px-1.5",
          className,
        )}
        {...register(name, registerOptions)}
      />
      {!!error && (
        <span className="mt-2 text-custom-12 font-semibold text-red-500">
          {error.message?.toString()}
        </span>
      )}
    </InputWithLabel>
  );
}
