import { Controller, FieldValues, useFormContext } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";

import { FormInput } from "$/utils/types/misc.types";

import styles from "./quill.module.scss";

const QUILL_MODULES = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ script: "sub" }, { script: "super" }],
    ["link", "image"],
  ],
};

const QUILL_FORMATS = [
  "font",
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "script",
  "link",
  "image",
];

type Props<T extends FieldValues> = FormInput<T> & {
  theme: "bubble" | "snow";
  newValue?: string;
  className?: string;
  placeholder?: string;
  backgroundColor?: string;
  defaultValue?: string;
};

const FQuillInput = <T extends FieldValues>({
  name,
  theme,
  newValue,
  className,
  placeholder,
  backgroundColor = "bg-input-background",
  defaultValue,
  ...registerOptions
}: Props<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <div className={`relative w-full ${className}`}>
      <Controller
        {...register(name, registerOptions)}
        render={({ field: { ref, value, onChange: handleOnChange } }) => (
          <ReactQuill
            ref={ref}
            theme={theme}
            value={newValue ?? value}
            modules={QUILL_MODULES}
            formats={QUILL_FORMATS}
            placeholder={placeholder}
            onChange={handleOnChange}
            className={`![&div]:border-primary h-full w-full rounded-[43px] p-3 placeholder:pt-5 placeholder:text-black ${
              theme === "snow" ? styles.snow : styles.quill
            } ${backgroundColor}`}
          />
        )}
      />

      {typeof errors[name]?.message == "string" && (
        <p className="text-error mt-2 max-w-sm pl-4 text-left text-xs font-bold">
          Ce champ est requis
        </p>
      )}
    </div>
  );
};

FQuillInput.displayName = "FQuillInput";

export default FQuillInput;
