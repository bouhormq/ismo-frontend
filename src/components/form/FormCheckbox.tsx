import { ComponentProps } from "react";
import {
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

import { getDeepFormError } from "../../utils/functions/misc.functions";
import { CustomCheckbox } from "../inputs/CustomCheckbox";
import Flexbox from "../ui/Flexbox";

type Props<T extends FieldValues> = ComponentProps<typeof CustomCheckbox> & {
  name: Path<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
};

export default function FormCheckbox<T extends FieldValues>({
  name,
  label,
  registerOptions,
  ...inputProps
}: Props<T>) {
  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<T>();

  const error = getDeepFormError(errors, name.split("."));

  const checked = watch(name);

  const { onChange: _onChange, ...registrationProps } = register(
    name,
    registerOptions,
  );

  return (
    <Flexbox className="gap-1">
      <CustomCheckbox
        {...registrationProps}
        {...inputProps}
        onChange={(value) => {
          setValue(name, value as PathValue<T, Path<T>>);
        }}
        label={label}
        checked={checked}
        isExternallyControlled
      />
      {!!error && (
        <span className="mt-2 text-custom-12 font-semibold text-red-500">
          {error.message?.toString()}
        </span>
      )}
    </Flexbox>
  );
}
