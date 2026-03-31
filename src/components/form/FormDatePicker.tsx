import { ComponentProps, useState } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

import PlaceHolderLabelAnimatedLayout from "../common/PlaceHolderLabelAnimatedLayout";
import StyledDatePicker from "../ui/MultiDateRange/StyledDatePicker";

type Props<T extends FieldValues> = ComponentProps<typeof StyledDatePicker> & {
  name: Path<T>;
  label: string;
  registerOptions?: RegisterOptions<T, Path<T>>;
  labelWrapperClassName?: string;
  showLabelWithValue?: boolean;
};

export const FormDatePicker = <T extends FieldValues>({
  name,
  label,
  registerOptions,
  labelWrapperClassName,
  showLabelWithValue = true,
  ...props
}: Props<T>) => {
  const { register, watch } = useFormContext<T>();
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const value = watch(name);

  const hasValue = Boolean(value);

  return (
    <PlaceHolderLabelAnimatedLayout
      name={name}
      hasValue={hasValue}
      isFocused={isFocused}
      label={label}
      labelWrapperClassName={labelWrapperClassName}
      showLabelWithValue={showLabelWithValue}
    >
      <StyledDatePicker
        value={value}
        {...props}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
        {...register(name, registerOptions)}
      />
    </PlaceHolderLabelAnimatedLayout>
  );
};
