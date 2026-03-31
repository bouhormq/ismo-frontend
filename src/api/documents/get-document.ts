import { DocumentRecord } from "$/types/models/document.types";
import { restApiClient } from "$/utils/clients/restApiClient";

export const getDocument = async (id: number) => {
  return restApiClient.url(`/documents/${id}`).get<DocumentRecord>();
};
