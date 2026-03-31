import type { FieldValues, Path, RegisterOptions } from "react-hook-form";
import { useFormContext } from "react-hook-form";

import { inputClassname } from "$/pages/test/InputsStyling";

import { cn } from "../../utils/functions/misc.functions";
import { FormInput } from "../../utils/types/components.types";
import PasswordInput from "../inputs/PasswordInput";
import Flexbox from "../ui/Flexbox";

type Props<T extends FieldValues> = FormInput<T> & {
  className?: string;
  placeholder?: string;
  hideLabel?: boolean;
  registerOptions?: RegisterOptions<T, Path<T>>;
  icon?: React.ReactNode;
};

export const FormPasswordInput = <T extends FieldValues>({
  name,
  label,
  placeholder,
  className,
  hideLabel,
  icon,
  ...registerOptions
}: Props<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const hasError = !!errors[name];

  return (
    <Flexbox fullWidth className="gap-1">
      <PasswordInput
        hideLabel={hideLabel}
        label={label}
        placeholder={placeholder}
        className={cn(
          hasError && "border-red-500 text-red-500 focus:border-red-500",
          inputClassname,
          "!px-1.5",
          className,
        )}
        icon={icon}
        {...register(name, registerOptions)}
      />

      {hasError && (
        <p className="text-custom-12 font-semibold text-red-500">{`${errors[name]?.message}`}</p>
      )}
    </Flexbox>
  );
};

export default FormPasswordInput;
