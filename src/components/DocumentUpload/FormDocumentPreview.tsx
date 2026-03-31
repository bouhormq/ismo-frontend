import { useEffect, useState } from "react";
import {
  type FieldValues,
  type Path,
  type PathValue,
  useFormContext,
} from "react-hook-form";
import { Link } from "react-router-dom";

import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import { useDocument } from "$/hooks/zustand/useDocument";
import PdfIcon from "$/icons/Filters/PdfIcon";
import DeleteTrashCanIcon from "$/icons/Table/DeleteTrashCanIcon";
import { formatFileSizeV2, hashFile } from "$/utils/functions/file.functions";
import { cn } from "$/utils/functions/misc.functions";

const REMOVE_ELEMENT_TIMEOUT = 360;

export type FileData = {
  preview: string;
  hash: string;
  name: string;
  type: string;
  size: number;
};

type Props<T extends FieldValues, TPath extends Path<T>> = {
  fieldName: TPath;
  existingFiles?: string[];
  localFiles?: File[];
  className?: string;
  onDeleteExistingFile?: (fileUrl: string) => void;
  onDeleteLocalFile?: (file: File) => void;
  setError?: (error: string | null) => void;
};

export default function FormDocumentPreview<
  T extends FieldValues,
  TPath extends Path<T>,
>({
  fieldName,
  existingFiles,
  localFiles,
  className,
  onDeleteExistingFile,
  onDeleteLocalFile,
  setError,
}: Props<T, TPath>) {
  const [filesData, setFilesData] = useState<FileData[]>([]);
  const { watch, setValue, getValues } = useFormContext<T>();
  const { setData } = useDocument();

  const fileUrls = watch(fieldName) as FileList | undefined;

  useEffect(() => {
    if (fileUrls) {
      const data = Array.from(fileUrls).map((file) => ({
        preview: URL.createObjectURL(file),
        hash: hashFile(file),
        name: file.name,
        type: file.type,
        size: file.size,
      }));

      setFilesData(data);
      setData({ selectedPhotos: data });

      return () => {
        for (const { preview } of data) {
          URL.revokeObjectURL(preview);
        }
      };
    }

    setFilesData([]);
  }, [fileUrls, setData]);

  const handleRemoveFiles = (hash: string) => {
    // if (!fileUrls) return;
    if (existingFiles?.includes(hash)) {
      onDeleteExistingFile?.(hash);
      return;
    }
    //delete file according to file name
    if (localFiles) {
      const file = localFiles.find((file) => file.name === hash);
      if (file) {
        onDeleteLocalFile?.(file);
      }
      return;
    }
    // here we use getValues instead of watch because we want to get the latest value after the timeout
    const newFiles = Array.from(getValues(fieldName) as FileList).filter(
      (file) => hashFile(file) !== hash,
    );

    const dataTransfer = new DataTransfer();
    newFiles.forEach((file) => {
      dataTransfer.items.add(file);
    });

    setValue(fieldName, dataTransfer.files as PathValue<T, TPath>);
    if (newFiles.length === 0) {
      setError?.("At least one file is required.");
    } else {
      setError?.(null);
    }
  };

  const hasFiles =
    !!filesData.length || !!existingFiles?.length || !!localFiles?.length;

  if (!hasFiles) {
    return <></>;
  }
  return (
    <Flexbox
      className={cn("max-h-52 w-full overflow-y-auto pr-2 md:pr-3", className)}
    >
      {filesData.map((fileData) => {
        const isPdf = fileData.type === "application/pdf";

        const fileName = fileData.name.split("/").pop()?.split("_") ?? [];
        const nameToDisplay = fileName.length > 1 ? fileName[1] : fileName[0];

        return (
          <Flexbox
            // using the hash as the key keeps the same fileUrls even when the order or the
            // preview changes which prevents flickering when the component re-renders
            key={fileData.hash}
            row
            fullWidth
            justify="between"
            align="center"
          >
            <Link
              to={fileData.preview}
              target="_blank"
              className="no-underline"
              rel="noopener noreferrer"
            >
              <Flexbox
                row
                align="center"
                className="shadow-blur-sm m-1 w-fit gap-4 rounded-xl"
              >
                <div className="w-28">
                  {isPdf ? (
                    <PdfIcon width={42} height={42} />
                  ) : (
                    <img
                      className="max-h-12 max-w-full"
                      src={fileData.preview}
                      alt={fileData.name}
                    />
                  )}
                </div>
                <Flexbox>
                  <p className="text-nowrap text-sm font-light">
                    {nameToDisplay}
                  </p>
                  <p className="text-xs font-semibold text-gray-border">
                    {formatFileSizeV2(fileData.size)}
                  </p>
                </Flexbox>
              </Flexbox>
            </Link>
            <Button
              type="button"
              onClick={() => handleRemoveFiles(fileData.hash)}
              style={{
                transitionDuration: `${REMOVE_ELEMENT_TIMEOUT}ms`,
              }}
              className="size-7 w-fit rounded-full bg-gray-inputBg p-2"
            >
              <DeleteTrashCanIcon />
            </Button>
          </Flexbox>
        );
      })}
      {existingFiles?.map((fileUrl) => {
        const isPdf = fileUrl.endsWith(".pdf");
        const isImage = fileUrl.endsWith(".jpg") || fileUrl.endsWith(".png");
        const file = new File([fileUrl], fileUrl, {
          type: isPdf
            ? "application/pdf"
            : isImage
              ? "image/png"
              : "image/jpeg",
        });
        const fileKey = fileUrl.split("/").pop() ?? "";

        return (
          <Flexbox
            // using the hash as the key keeps the same fileUrls even when the order or the
            // preview changes which prevents flickering when the component re-renders
            key={fileUrl}
            fullWidth
            row
            justify="between"
            align="center"
          >
            <Link
              to={fileUrl}
              target="_blank"
              className="no-underline"
              rel="noopener noreferrer"
            >
              <Flexbox
                row
                align="center"
                className="shadow-blur-sm m-1 w-fit gap-4 rounded-xl"
              >
                <div className="w-28">
                  {isPdf ? (
                    <PdfIcon width={42} height={42} />
                  ) : (
                    <img
                      className="max-h-12 max-w-full"
                      src={fileUrl}
                      alt={fileUrl}
                    />
                  )}
                </div>
                <Flexbox>
                  <p className="text-nowrap text-sm font-light">
                    {fileKey.length > 10
                      ? fileKey.slice(0, 10) + "..." + fileKey.slice(-3)
                      : fileKey}
                  </p>
                  <p className="text-xs font-semibold text-gray-border">
                    {formatFileSizeV2(file.size)}
                  </p>
                </Flexbox>
              </Flexbox>
            </Link>
            {onDeleteExistingFile !== undefined && (
              <Button
                type="button"
                onClick={() => handleRemoveFiles(fileUrl)}
                style={{
                  transitionDuration: `${REMOVE_ELEMENT_TIMEOUT}ms`,
                }}
                className="size-7 w-fit rounded-full bg-gray-inputBg p-2"
              >
                <DeleteTrashCanIcon />
              </Button>
            )}
          </Flexbox>
        );
      })}
      {localFiles?.map((localFile) => {
        const isPdf = localFile.type === "application/pdf";
        const localFileUrl = URL.createObjectURL(localFile);
        const fileKey = localFile.name;

        return (
          <Flexbox
            // using the hash as the key keeps the same localFileUrls even when the order or the
            // preview changes which prevents flickering when the component re-renders
            key={localFileUrl}
            fullWidth
            row
            justify="between"
            align="center"
          >
            <Link
              to={localFileUrl}
              target="_blank"
              className="no-underline"
              rel="noopener noreferrer"
            >
              <Flexbox
                row
                align="center"
                className="shadow-blur-sm m-1 w-fit gap-4 rounded-xl"
              >
                <div className="w-28">
                  {isPdf ? (
                    <PdfIcon width={42} height={42} />
                  ) : (
                    <img
                      className="max-h-12 max-w-full"
                      src={localFileUrl}
                      alt={localFileUrl}
                    />
                  )}
                </div>
                <Flexbox>
                  <p className="text-nowrap text-sm font-light">
                    {fileKey.length > 10
                      ? fileKey.slice(0, 10) + "..." + fileKey.slice(-3)
                      : fileKey}
                  </p>
                  <p className="text-xs font-semibold text-gray-border">
                    {formatFileSizeV2(localFile.size)}
                  </p>
                </Flexbox>
              </Flexbox>
            </Link>
            <Button
              type="button"
              onClick={() => handleRemoveFiles(localFile.name)}
              style={{
                transitionDuration: `${REMOVE_ELEMENT_TIMEOUT}ms`,
              }}
              className="size-7 w-fit rounded-full bg-gray-inputBg p-2"
            >
              <DeleteTrashCanIcon />
            </Button>
          </Flexbox>
        );
      })}
    </Flexbox>
  );
}
