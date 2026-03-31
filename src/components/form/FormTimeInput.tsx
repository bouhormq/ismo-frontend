import { ComponentProps } from "react";
import {
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

import PlaceHolderLabelAnimatedLayout from "../common/PlaceHolderLabelAnimatedLayout";
import TimeInput from "../inputs/TimeInput";

type Props<T extends FieldValues> = ComponentProps<typeof TimeInput> & {
  name: Path<T>;
  label: string;
  labelWrapperClassName?: string;
  registerOptions?: RegisterOptions<T, Path<T>>;
  showLabelWithValue?: boolean;
  handleOnChange?: (value: string) => void;
};

export const FormTimeInput = <T extends FieldValues>({
  name,
  label,
  registerOptions,
  labelWrapperClassName,
  showLabelWithValue = true,
  handleOnChange,
  ...props
}: Props<T>) => {
  const { register, setValue, watch } = useFormContext<T>();

  const value = watch(name);
  const hasValue = Boolean(value);

  const handleChange = (time: string) => {
    setValue(name, (time || "") as PathValue<T, Path<T>>);
    handleOnChange?.(time);
  };

  return (
    <PlaceHolderLabelAnimatedLayout
      name={name}
      hasValue={hasValue}
      isFocused={false}
      label={label}
      labelWrapperClassName={labelWrapperClassName}
      showLabelWithValue={showLabelWithValue}
    >
      <TimeInput
        {...props}
        {...register(name, {
          ...registerOptions,
        })}
        onChange={(value) => handleChange(value)}
        value={value}
      />
    </PlaceHolderLabelAnimatedLayout>
  );
};
