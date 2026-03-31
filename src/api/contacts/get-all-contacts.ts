import { EnhancedTableSorting } from "$/components/tables/enhanced-table";
import {
  ContactRecordResponse,
  ContactsTableFilters,
} from "$/types/models/contact.types";
import { restApiClient } from "$/utils/clients/restApiClient";
import { Pagination } from "$/utils/types/misc.types";

export const getAllCompanyContacts = async (
  id: number,
  sorting?: EnhancedTableSorting<ContactRecordResponse>,
  pagination?: Pagination,
  filters?: ContactsTableFilters,
): Promise<ContactRecordResponse> => {
  if (!id) {
    return new Promise((resolve) => resolve({ data: [], count: 0 }));
  }
  const contacts = await restApiClient
    .url(`/contacts/all-contacts/${id}`)
    .query({
      ...pagination,
      ...sorting,
      ...filters,
    })
    .get<ContactRecordResponse>();
  return contacts;
};
