import { useCallback, useMemo } from "react";
import {
  type FieldValues,
  type Path,
  type PathValue,
  useFormContext,
} from "react-hook-form";
import { toast } from "react-toastify";

import { handleFormFileList } from "$/utils/functions/file.functions";
import { cn, getDeepFormError } from "$/utils/functions/misc.functions";
import { FileSize, FormInput } from "$/utils/types/components.types";

import FileInput from "../inputs/FileInput";
import InputError from "../inputs/InputError";

type Props<T extends FieldValues, TPath extends Path<T>> = FormInput<
  T,
  TPath
> & {
  hideLabel?: boolean;
  multiple?: boolean;
  allowedFiles?: string[];
  minSize?: FileSize;
  maxSize?: FileSize;
  excludeInvalidFiles?: boolean;
  preserveOldFiles?: boolean;
  className?: string;
  onFiles?: (files: FileList) => void;
  onDuplicateFiles?: (files: File[]) => void;
  parentSetError?: (error: string | null) => void;
  hideErrorMessage?: boolean;
};

export default function FormFileInput<
  T extends FieldValues,
  TPath extends Path<T> = Path<T>,
>({
  name,
  label,
  multiple,
  hideLabel,
  allowedFiles,
  minSize,
  maxSize,
  excludeInvalidFiles,
  preserveOldFiles,
  className,
  hideErrorMessage,
  onFiles,
  onDuplicateFiles,
  parentSetError,
  ...registerOptions
}: Props<T, TPath>) {
  // const [isDraggingFile, setIsDraggingFile] = useState(false);
  // const [isFocused, setIsFocused] = useState(false);
  const {
    register,
    getValues,
    setValue,
    setError,
    formState: { errors },
  } = useFormContext<T>();

  const error = getDeepFormError(errors, name.split("."));
  const { ref: _ref, ...registerRest } = register(name, registerOptions);

  const handleFiles = useCallback(
    (fileList: FileList) => {
      const newFileList = handleFormFileList({
        fileList,
        oldFileList: getValues(name) as FileList,
        ignoreOldFiles: !multiple && !preserveOldFiles,
        onDuplicateFiles,
      });

      setValue(name, newFileList as PathValue<T, Path<T>>, {
        shouldValidate: true,
      });
      parentSetError?.(null);
      onFiles?.(fileList);
    },
    [
      name,
      multiple,
      preserveOldFiles,
      getValues,
      setValue,
      onFiles,
      onDuplicateFiles,
      parentSetError,
    ],
  );

  const errorHandlers = useMemo(() => {
    const onInvalidFileType = () => {
      setError(name, {
        type: "manual",
        message: "Type de fichier invalide",
      });
    };

    const onBelowMinSize = () => {
      setError(name, {
        type: "manual",
        message: "Fichier trop petit",
      });
    };

    const onExceedMaxSize = () => {
      setError(name, {
        type: "manual",
        message: "Fichier trop grand",
      });
    };

    return {
      onInvalidFileType,
      onBelowMinSize,
      onExceedMaxSize,
    };
  }, [name, setError]);

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-2",
        className,
      )}
    >
      <label className={cn(hideLabel && "sr-only")}>{label}</label>

      <div className="relative min-h-36 w-full">
        <FileInput
          {...registerRest}
          label={label}
          multiple={multiple}
          allowedFiles={allowedFiles}
          minSize={minSize}
          maxSize={maxSize}
          excludeInvalidFiles={true}
          onFiles={handleFiles}
          onInvalidFileType={errorHandlers.onInvalidFileType}
          onBelowMinSize={errorHandlers.onBelowMinSize}
          onExceedMaxSize={errorHandlers.onExceedMaxSize}
          onInvalidFiles={() => {
            toast.error("Fichier invalide");
          }}
          allowDragAndDrop
          allowGlobalPaste
        />
        {!!error?.message && (
          <InputError errorMessage={error.message as string} />
        )}
      </div>
    </div>
  );
}
