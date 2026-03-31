import { NewDocumentDataType } from "$/pages/ClientPage/_features/constants/validations.constants";
import { DocumentRecord } from "$/types/models/document.types";
import { restApiClient } from "$/utils/clients/restApiClient";

export const createDocument = (data: NewDocumentDataType) => {
  return restApiClient.url("/documents").post<DocumentRecord>(data);
};
