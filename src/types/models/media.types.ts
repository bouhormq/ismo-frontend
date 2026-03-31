export type UploadParams = {
  path: string;
  isPublic: boolean;
};

export type UploadFileParams = UploadParams & {
  file: File;
};

export type GetFileMediaParams = UploadParams & {
  fileName: string;
};

export type GetFileMediaResponse = {
  url: string;
  path: string;
};
