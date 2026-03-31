import { useState } from "react";
import {
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

import { cn } from "../../utils/functions/misc.functions";
import { FormInput } from "../../utils/types/components.types";
import OtpInputComponent from "../inputs/OtpInput";

type Props<T extends FieldValues> = FormInput<T> & {
  className?: string;
  registerOptions?: RegisterOptions<T, Path<T>>;
  inputsCount: number;
  inputsSize: number;
  onChange?: (value: string) => void;
};

const FormOtpInput = <T extends FieldValues>({
  inputsCount,
  onChange,
  inputsSize,
  name,
}: Props<T>) => {
  const [code, setCode] = useState("");
  const {
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext<T>();

  const hasError = !!errors[name];

  const handleChange = (e: string) => {
    if (!/^\d*$/.test(e)) return;
    register(name);
    setCode(e);
    onChange?.(e);
    setValue(name, e as PathValue<T, Path<T>>);
    clearErrors(name);
  };

  return (
    <>
      <OtpInputComponent
        value={code}
        onChange={handleChange}
        numInputs={inputsCount}
        containerStyle={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
        renderInput={(props) => (
          <input
            name={name}
            {...props}
            style={{
              width: `${inputsSize}px`,
              height: `${inputsSize}px`,
            }}
            className={cn(
              "border-lightGray-input text-custom-14 flex items-center justify-center rounded-lg border-[1px] text-center font-semibold",
              hasError && "border-red-500 text-red-500 focus:border-red-500",
            )}
          />
        )}
        shouldAutoFocus
      />
      {hasError && (
        <p className="text-custom-12 font-semibold text-red-500">{`${errors[name]?.message}`}</p>
      )}
    </>
  );
};

export default FormOtpInput;
