import { EnhancedTableSorting } from "$/components/tables/enhanced-table";
import { DocumentRecordResponse } from "$/types/models/document.types";
import { restApiClient } from "$/utils/clients/restApiClient";
import { Pagination } from "$/utils/types/misc.types";

export const getAllDocuments = async (
  id: number,
  sorting?: EnhancedTableSorting<DocumentRecordResponse>,
  pagination?: Pagination,
  relationType?: "company" | "article",
): Promise<DocumentRecordResponse> => {
  if (!id) {
    return new Promise((resolve) => resolve({ data: [], count: 0 }));
  }
  const documents = await restApiClient
    .url(`/documents/all-documents/${id}`)
    .query({
      ...pagination,
      ...sorting,
      relationType,
    })
    .get<DocumentRecordResponse>();
  return documents;
};
