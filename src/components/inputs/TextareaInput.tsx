import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = Omit<ComponentPropsWithoutRef<"textarea">, "type">;

const TextareaInput = forwardRef<HTMLTextAreaElement, Props>(
  ({ name, ...inputProps }, forwardedRef) => {
    return (
      <textarea
        id={`formTextarea-${name}`}
        ref={forwardedRef}
        {...{ name, ...inputProps }}
      />
    );
  },
);

TextareaInput.displayName = "TextAreaInput";

export default TextareaInput;
