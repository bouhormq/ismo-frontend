import { KeyboardEvent, useCallback, useMemo } from "react";
import type { FieldValues } from "react-hook-form";
import { useFormContext } from "react-hook-form";

import { inputClassname } from "$/pages/test/InputsStyling";

import { cn } from "../../utils/functions/misc.functions";
import { FormInput } from "../../utils/types/components.types";
import InputWithLabel from "../inputs/InputParent";
import TextInput from "../inputs/TextInput";
import Flexbox from "../ui/Flexbox";

type Props<T extends FieldValues> = FormInput<T> & {
  placeholder?: string;
  autoComplete?: boolean;
  className?: string;
  priceCombination?: number | string;
  hideLabel?: boolean;
  wrapperClassName?: string;
  isPrice?: boolean;
  allowNegative?: boolean;
  isPaymentPrice?: boolean;
};

const allowedKeyBoardKeys: string[] = [
  "Enter",
  "Backspace",
  "Delete",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Tab",
  "Home",
  "End",
  "Control",
  "Shift",
  "CapsLock",
  "Escape",
  "Alt",
];

const FormPhoneNumberInput = <T extends FieldValues>({
  name,
  label,
  hideLabel,
  wrapperClassName,
  placeholder,
  min,
  max,
  isPrice,
  isPaymentPrice,
  className,
  maxLength,
  allowNegative = true,
  priceCombination = 0,
  ...registerOptions
}: Props<T>) => {
  const {
    register,
    getValues,
    clearErrors,
    formState: { errors },
  } = useFormContext<T>();
  const handleMinMax = (e: KeyboardEvent<HTMLInputElement>) => {
    const currentValue = Number((e.currentTarget as HTMLInputElement).value);
    if (!min && !max) return;
    const minV = Number(min);
    const maxV = Number(max);
    const maxLengthV = Number(maxLength) ?? 15;
    const concatenatedNewValue = Number(currentValue.toString() + e.key);
    if (concatenatedNewValue < minV) {
      e.currentTarget.value = minV.toString().slice(0, maxLengthV);
      e.preventDefault();
    }
    if (concatenatedNewValue > maxV) {
      e.currentTarget.value = maxV.toString().slice(0, maxLengthV);
      e.preventDefault();
    }
    if (e.currentTarget.value.length < 1) {
      e.currentTarget.value = "0" + e.key;
      e.preventDefault();
    }
    if (
      e.currentTarget.value.length === 1 ||
      concatenatedNewValue < minV ||
      concatenatedNewValue > maxV
    )
      e.preventDefault();
  };
  const allowedCharacters = useMemo(() => {
    let chars: string[] = [];
    if (!isPrice) chars.push(...["(", ")", ".", "+"]);
    if (isPaymentPrice) chars.push(...["."]);
    if (allowNegative) chars.push(...["-"]);
    if (!allowNegative) chars = [];
    return chars;
  }, [isPrice, isPaymentPrice, allowNegative]);

  const onKeyPress: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const newCharacter = e.key;
      const currentValue = (e.currentTarget as HTMLInputElement).value;
      const maxLengthV = Number(maxLength) ?? 15;

      if (e.ctrlKey || e.metaKey || allowedKeyBoardKeys.includes(e.key)) {
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a") {
        return;
      }
      if (
        (!/^\d+$/.test(newCharacter) &&
          !allowedCharacters.includes(newCharacter)) ||
        (currentValue.replace(/\D/g, "").length >= maxLengthV &&
          /^\d+$/.test(newCharacter))
      ) {
        e.preventDefault();
      }
      handleMinMax(e);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allowedCharacters],
  );

  const onInput: React.FormEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      clearErrors(name);
      const currentValue = (e.currentTarget as HTMLInputElement).value;

      if (currentValue.replace(/\D/g, "").length > 15) {
        e.currentTarget.value = currentValue.substring(0, 15);
      }
    },
    [clearErrors, name],
  );

  const onPaste: React.ClipboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      clearErrors(name);
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text");

      const sanitizedValue = pastedData
        .split("")
        .filter((char) => /^\d$/.test(char) || allowedCharacters.includes(char))
        .join("");

      if (sanitizedValue.replace(/\D/g, "").length <= 15) {
        e.currentTarget.value = sanitizedValue;
      } else {
        e.currentTarget.value = sanitizedValue.substring(0, 15);
      }
    },
    [allowedCharacters, clearErrors, name],
  );

  const hasError = !!errors[name];

  return (
    <InputWithLabel
      name={name}
      label={label}
      className={wrapperClassName}
      hideLabel={hideLabel}
    >
      <Flexbox className="w-full gap-1">
        <TextInput
          {...register(name, {
            ...registerOptions,
            maxLength: {
              value: 15,
              message: "Phone number cannot exceed 15 digits",
            },
          })}
          placeholder={placeholder}
          defaultValue={
            priceCombination ? `${priceCombination}` : getValues(name)
          }
          onKeyDown={onKeyPress}
          onInput={onInput}
          onPaste={onPaste}
          className={cn(
            hasError &&
              "!focus:border-red-500 !border-[1px] !border-red-500 !text-red-500",
            inputClassname,
            className,
          )}
        />

        {hasError && (
          <span className="text-custom-12 font-semibold text-red-500">{`${errors[name]?.message}`}</span>
        )}
      </Flexbox>
    </InputWithLabel>
  );
};

export default FormPhoneNumberInput;
