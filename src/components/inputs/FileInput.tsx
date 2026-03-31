import { type ComponentProps, forwardRef, useId, useState } from "react";

import { CloudIcon } from "$/icons/Table/CloudIcon";
import {
  isFileBelowMinSize,
  isFileExceedingMaxSize,
  isValidFileType,
} from "$/utils/functions/file.functions";
import { cn } from "$/utils/functions/misc.functions";

import SvgBorder from "../ui/SvgBorder";

export type SizeUnit = "kb" | "mb" | "gb";
export type FileSize = `${number}${SizeUnit}`;

type Props = Omit<ComponentProps<"input">, "type"> & {
  label: string;
  minSize?: FileSize;
  maxSize?: FileSize;
  allowedFiles?: string[];
  allowGlobalPaste?: boolean;
  allowDragAndDrop?: boolean;
  skipFileTypesValidation?: boolean;
  skipMinSizeValidation?: boolean;
  skipMaxSizeValidation?: boolean;
  excludeInvalidFiles?: boolean;
  onInvalidFiles?: () => void;
  onInvalidFileType?: (file: File, index: number) => void;
  onBelowMinSize?: (file: File, index: number) => void;
  onExceedMaxSize?: (file: File, index: number) => void;
  onGlobalPaste?: (e: ClipboardEvent) => void;
  onFiles?: (file: FileList) => void;
};

const FileInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      name,
      multiple,
      minSize,
      maxSize,
      allowedFiles,
      allowGlobalPaste,
      allowDragAndDrop,
      skipFileTypesValidation,
      skipMinSizeValidation,
      skipMaxSizeValidation,
      excludeInvalidFiles,
      onDragEnter: onDragEnterProp,
      onDragOver: onDragOverProp,
      onDragLeave: onDragLeaveProp,
      onDrop: onDropProp,
      onChange: onChangeProp,
      onFocus: onFocusProp,
      onBlur: onBlurProp,
      onInvalidFiles,
      onInvalidFileType,
      onBelowMinSize,
      onExceedMaxSize,
      onGlobalPaste,
      onFiles,
      ...inputProps
    },
    forwardedRef,
  ) => {
    const [isDraggingFile, setIsDraggingFile] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const hookId = useId();
    const id = inputProps.id || hookId;

    const handleFileChangeHelper = (fileList: FileList | undefined | null) => {
      if (!fileList) return;

      const invalidFileIndices: number[] = [];
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList.item(i) as File;
        let isValid = true;

        if (
          !skipFileTypesValidation &&
          !isValidFileType(file, allowedFiles || [])
        ) {
          onInvalidFileType?.(file, i);
          isValid = false;
        }

        if (
          !skipMinSizeValidation &&
          minSize !== undefined &&
          isFileBelowMinSize(file, minSize)
        ) {
          onBelowMinSize?.(file, i);
          isValid = false;
        }

        if (
          !skipMaxSizeValidation &&
          maxSize !== undefined &&
          isFileExceedingMaxSize(file, maxSize)
        ) {
          onExceedMaxSize?.(file, i);
          isValid = false;
        }

        if (!isValid) {
          invalidFileIndices.push(i);
        }
      }

      if (excludeInvalidFiles) {
        const dataTransfer = new DataTransfer();
        Array.from(fileList).forEach((file, index) => {
          if (!invalidFileIndices.includes(index)) {
            dataTransfer.items.add(file);
          }
        });
        if (invalidFileIndices.length > 0) {
          onInvalidFiles?.();
        }
        onFiles?.(dataTransfer.files);
        return;
      }

      onFiles?.(fileList);
    };

    const onDrop: React.DragEventHandler<HTMLInputElement> = (e) => {
      onDropProp?.(e);
      e.preventDefault();
      e.stopPropagation();
      setIsDraggingFile(false);
      if (allowDragAndDrop) {
        handleFileChangeHelper(e.dataTransfer.files);
      }
    };

    const onDragEnter: React.DragEventHandler<HTMLInputElement> = (e) => {
      onDragEnterProp?.(e);
      if (allowDragAndDrop) {
        setIsDraggingFile(true);
      }
      e.preventDefault();
      e.stopPropagation();
    };

    const onDragLeave: React.DragEventHandler<HTMLInputElement> = (e) => {
      onDragLeaveProp?.(e);
      setIsDraggingFile(false);
      e.preventDefault();
      e.stopPropagation();
    };

    const onDragOver: React.DragEventHandler<HTMLInputElement> = (e) => {
      onDragOverProp?.(e);
      e.preventDefault();
      e.stopPropagation();
    };

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      onChangeProp?.(e);
      handleFileChangeHelper(e.target.files);
      e.target.value = "";
    };

    const onFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
      onFocusProp?.(e);
      setIsFocused(true);
    };

    const onBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
      onBlurProp?.(e);
      setIsFocused(false);
    };

    const isActive = isDraggingFile || isFocused;

    return (
      <div className="flex w-full flex-col gap-3">
        <div className="relative min-h-52 w-full rounded-lg">
          <input
            type="file"
            ref={forwardedRef}
            id={id}
            name={name}
            multiple={multiple}
            onDrop={onDrop}
            onChange={onChange}
            accept={allowedFiles?.join(",")}
            onDragOver={onDragOver}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onFocus={onFocus}
            onBlur={onBlur}
            className="peer absolute inset-0 cursor-pointer opacity-0"
            {...inputProps}
          />
          <SvgBorder
            dashesSpacing={10}
            width={5}
            isActive={isActive}
            color="#cbd0dc"
            activeColor="#cbd0dc"
            className="peer-focus:stroke-blue"
            radius={16}
          />

          <div
            className={cn(
              "pointer-events-none absolute left-0 top-1/2 flex w-full -translate-y-1/2 flex-col items-center justify-center gap-3 p-2 duration-150",
              isDraggingFile && "scale-0 opacity-0",
            )}
          >
            <CloudIcon />
            <label
              htmlFor={id}
              className="w-full text-center text-sm text-blue-skyDark"
            >
              {label}
              <FileInputConditionsLabel
                allowedFiles={allowedFiles}
                maxSize={maxSize}
              />
            </label>
            <span className="mt-3 rounded-full border-2 border-blue-skyDark px-5 py-2 text-xs font-medium text-blue-skyDark">
              Parcourir les fichiers
            </span>
          </div>

          <div
            className={cn(
              "pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 duration-150",
              !isDraggingFile && "scale-0 opacity-0",
            )}
          >
            <label
              htmlFor={id}
              className="w-full text-center text-sm text-blue-skyDark"
            >
              Déposer pour télécharger
              <FileInputConditionsLabel
                allowedFiles={allowedFiles}
                maxSize={maxSize}
              />
            </label>
          </div>
        </div>
      </div>
    );
  },
);

FileInput.displayName = "FileInput";

export default FileInput;

function FileInputConditionsLabel({
  allowedFiles,
  maxSize,
}: Pick<Props, "allowedFiles" | "maxSize">) {
  if (!allowedFiles && !maxSize)
    return (
      <span className="text-xs font-normal">
        <br />
        Tous les types et toutes les tailles de fichiers sont autorisés
      </span>
    );

  return (
    <span className="text-xs font-normal text-gray-border">
      <br />
      {!!allowedFiles && <>Formats {allowedFiles.join(", ")}</>}
      {!!maxSize && (
        <>
          {allowedFiles ? ", j" : "J"}usqu'à {maxSize}
        </>
      )}
    </span>
  );
}
