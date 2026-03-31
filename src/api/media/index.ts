import {
  GetFileMediaParams,
  GetFileMediaResponse,
  UploadFileParams,
} from "$/types/models/media.types";
import { restApiClient } from "$/utils/clients/restApiClient";

const getFileMedia = async ({
  fileName,
  isPublic,
  path,
}: GetFileMediaParams) => {
  try {
    const slugifyFileName = fileName
      .normalize("NFD")
      .toLocaleLowerCase()
      .replace(/\s/g, "")
      .replace(/[\u0300-\u036f]/g, "");

    return restApiClient
      .url(`/media/get-upload-path/${slugifyFileName}`)
      .post<GetFileMediaResponse>({ path, isPublic });
  } catch (error) {
    console.error(error);
  }
};

export const uploadFile = async ({
  file,
  isPublic,
  path,
}: UploadFileParams) => {
  const fileName = file.name;

  const res = await getFileMedia({
    fileName,
    isPublic,
    path,
  });

  await fetch(res?.url ?? "", {
    method: "put",
    body: file,
  });
  return res?.path.split("/")[1]; //remove the bucket folder name
};
