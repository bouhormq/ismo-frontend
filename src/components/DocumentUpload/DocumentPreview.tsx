import { Button } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import PdfIcon from "$/icons/Filters/PdfIcon";
import DeleteTrashCanIcon from "$/icons/Table/DeleteTrashCanIcon";
import { formatFileSizeV2, hashFile } from "$/utils/functions/file.functions";

import Flexbox from "../ui/Flexbox";

const REMOVE_ELEMENT_TIMEOUT = 360;

type FileData = {
  preview: string;
  hash: string;
  name: string;
  type: string;
  size: number;
};

type Props = {
  filesData: File[];
  onFilesChange?: (newFiles: File[]) => void; // callback to notify parent of file changes
};

export default function DocumentPreview({
  filesData: initialFilesData,
  onFilesChange,
}: Props) {
  const [filesData, setFilesData] = useState<FileData[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialFilesData) {
      const data = Array.from(initialFilesData).map((file) => ({
        preview: URL.createObjectURL(file),
        hash: hashFile(file),
        name: file.name,
        type: file.type,
        size: file.size,
      }));

      setFilesData(data);

      return () => {
        // Cleanup: Revoke object URLs to avoid memory leaks
        data.forEach(({ preview }) => {
          URL.revokeObjectURL(preview);
        });
      };
    }
    setFilesData([]);
  }, [initialFilesData]);

  const handleRemoveFiles = (hash: string) => {
    setTimeout(() => {
      const newFilesData = filesData.filter(
        (fileData) => fileData.hash !== hash,
      );
      const newFiles = initialFilesData.filter(
        (file) => hashFile(file) !== hash,
      );

      setFilesData(newFilesData);

      if (onFilesChange) {
        onFilesChange(newFiles); // notify parent of the updated files
      }
    }, REMOVE_ELEMENT_TIMEOUT);
  };

  const hasFiles = filesData.length > 0;

  if (!hasFiles) {
    return null;
  }
  return (
    <div ref={containerRef} className="w-full">
      <Flexbox fullWidth className="gap-2">
        {filesData.map((fileData) => {
          const isPdf = fileData.type === "application/pdf";
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
                  <div>
                    {isPdf ? (
                      <PdfIcon width={42} height={42} />
                    ) : (
                      <img
                        className="h-12 w-12 rounded-lg"
                        src={fileData.preview}
                        alt={fileData.name}
                      />
                    )}
                  </div>
                  <Flexbox>
                    <p className="text-nowrap text-sm font-light">
                      {fileData.name.length > 10
                        ? fileData.name.slice(0, 10) +
                          "..." +
                          fileData.name.slice(-3)
                        : fileData.name}
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
      </Flexbox>
    </div>
  );
}
