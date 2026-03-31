import { UpdateDocumentDataType } from "$/pages/ClientPage/_features/constants/validations.constants";
import { DocumentRecord } from "$/types/models/document.types";
import { restApiClient } from "$/utils/clients/restApiClient";

export const updateDocument = (data: UpdateDocumentDataType) => {
  const { id, ...rest } = data;
  return restApiClient.url(`/documents/${id}`).patch<DocumentRecord>(rest);
};
