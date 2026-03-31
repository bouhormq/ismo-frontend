import objectHash from "object-hash";

import { FileSize, SizeUnit } from "../types/components.types";

type HandleFormFileListParams = {
  fileList: FileList | File[];
  oldFileList?: FileList;
  ignoreOldFiles?: boolean;
  onDuplicateFiles?: (files: File[]) => void;
};

export function hashFile(file: File) {
  const fileData = {
    name: file.name,
    size: file.size,
    type: file.type,
  };

  return objectHash(fileData, { algorithm: "md5" });
}

export function isValidFileType(file: File, allowedFiles: string[]) {
  if (allowedFiles.length > 0) {
    const starTypes = new Set<string>();
    const extensionTypes = new Set<string>();

    for (const type of allowedFiles) {
      if (type.includes("*")) {
        starTypes.add(type.split("/")[0]);
      } else if (type.startsWith(".")) {
        extensionTypes.add(type.slice(1));
      }
    }

    const [baseType, extension] = file.type.split("/");

    if (!starTypes.has(baseType) && !extensionTypes.has(extension))
      return false;
  }

  return true;
}

function formatFileSize(fileSize: number, unit: SizeUnit) {
  switch (unit) {
    case "kb":
      return (fileSize /= 1024);
    case "mb":
      return (fileSize /= 1024 * 1024);
    case "gb":
      return (fileSize /= 1024 * 1024 * 1024);
  }
}

export function formatFileSizeV2(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const formattedSize = (bytes / Math.pow(k, i)).toFixed(decimals);

  return formattedSize.endsWith(".00")
    ? `${Math.floor(bytes / Math.pow(k, i))} ${sizes[i]}`
    : `${formattedSize} ${sizes[i]}`;
}

export function handleFormFileList(params: HandleFormFileListParams) {
  const { fileList, oldFileList, ignoreOldFiles, onDuplicateFiles } = params;

  const dataTransfer = new DataTransfer();
  // file hash set to check if the file already exits
  const filesHashes = new Set<string>();

  // old files array saved for better performance
  let oldFilesArray: File[] = [];
  let hasDuplicates = false;
  const duplicateFiles: File[] = [];

  if (!ignoreOldFiles) {
    if (oldFileList) {
      oldFilesArray = Array.from(oldFileList);
    }
    for (const file of oldFilesArray) {
      const fileHash = hashFile(file);
      filesHashes.add(fileHash);
    }
  }

  for (const file of Array.from(fileList)) {
    if (!ignoreOldFiles) {
      const fileHash = hashFile(file);
      const isDuplicate = filesHashes.has(fileHash);

      if (isDuplicate) {
        hasDuplicates = true;
        duplicateFiles.push(file);
        continue;
      }
    }

    dataTransfer.items.add(file);
  }

  if (!ignoreOldFiles) {
    for (const file of oldFilesArray) {
      dataTransfer.items.add(file);
    }
  }

  if (hasDuplicates) {
    onDuplicateFiles?.(duplicateFiles);
  }

  return dataTransfer.files;
}

export function isFileExceedingMaxSize(file: File, maxSize: FileSize) {
  const maxSizeValue = Number(maxSize.slice(0, -2));
  const maxSizeUnit = maxSize.slice(-2) as SizeUnit;
  const fileSize = formatFileSize(file.size, maxSizeUnit);

  return fileSize > maxSizeValue;
}

export function isFileBelowMinSize(file: File, minSize: FileSize) {
  const minSizeValue = Number(minSize.slice(0, -2));
  const minSizeUnit = minSize.slice(-2) as SizeUnit;
  const fileSize = formatFileSize(file.size, minSizeUnit);

  return fileSize < minSizeValue;
}

export async function createFileFromUrl(
  url: string,
  metadata: FilePropertyBag & { name: string },
) {
  const response = await fetch(url, {
    method: "GET",
    // mode: "cors",
    headers: { "Cache-Control": "no-cache" },
  });
  const data = await response.blob();
  return new File([data], metadata.name, metadata);
}
