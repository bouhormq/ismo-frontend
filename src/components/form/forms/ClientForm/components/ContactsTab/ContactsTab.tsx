import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";

import { getAllCompanyContacts } from "$/api/contacts/get-all-contacts";
import { EnhancedTableProvider } from "$/components/tables/enhanced-table";
import { useClient } from "$/hooks/zustand/useClient";
import {
  ContactRecord,
  ContactRecordResponse,
} from "$/types/models/contact.types";

import ContactsTable from "./ContactsTable";

type Props = {
  companyId: number;
};

export const ContactsTab = ({ companyId }: Props) => {
  const { data, setData } = useClient();
  const [filterValue, setFilterValue] = useState<string>("");
  const { data: contacts } = useQuery({
    queryKey: ["company-contacts", companyId],
    queryFn: () =>
      getAllCompanyContacts(
        companyId,
        undefined,
        { limit: 10, offset: 0 },
        undefined,
      ),
  });

  const allCompanyContacts = useMemo(
    () =>
      data?.contacts?.filter((contact) => contact.status !== "deleted") || [],
    [data],
  );

  const [displayedContacts, setDisplayedContacts] =
    useState(allCompanyContacts);

  useEffect(() => {
    if (contacts) {
      setData({ contacts: contacts.data || [] });
    }
  }, [contacts, setData]);

  useEffect(() => {
    if (!filterValue) {
      const contactsDiffer =
        displayedContacts.length !== allCompanyContacts.length ||
        displayedContacts.some(
          (doc, index) => doc.id !== allCompanyContacts[index].id,
        );

      if (contactsDiffer) {
        setDisplayedContacts(allCompanyContacts);
      }
    }
  }, [allCompanyContacts, filterValue, displayedContacts]);

  const handleFilter = debounce((value: string) => {
    setFilterValue(value.trim().toLowerCase());

    if (!value.trim()) {
      setDisplayedContacts(allCompanyContacts);
    } else {
      const filtered = allCompanyContacts.filter(
        (contact) =>
          contact.firstName
            .toLowerCase()
            .includes(value.trim().toLowerCase()) ||
          contact.lastName.toLowerCase().includes(value.trim().toLowerCase()) ||
          contact.email.toLowerCase().includes(value.trim().toLowerCase()) ||
          contact.phoneNumber
            .toLowerCase()
            .includes(value.trim().toLowerCase()) ||
          contact.functionality
            ?.toLowerCase()
            .includes(value.trim().toLowerCase()) ||
          contact.note?.toLowerCase().includes(value.trim().toLowerCase()),
      );
      setDisplayedContacts(filtered);
    }
  }, 400);

  useEffect(() => {
    if (data?.contacts) setDisplayedContacts(data.contacts);
  }, [data]);

  return (
    <EnhancedTableProvider<ContactRecordResponse, ContactRecord>
      dataSelector={() => displayedContacts}
      totalCountSelector={() => displayedContacts.length}
      queryOptions={{
        queryKey: ["table-company-contacts", companyId],
        queryFn: ({ pagination, sorting }) =>
          getAllCompanyContacts(companyId, sorting, pagination).then(
            (response) => {
              setData({ contacts: response.data || [] });
              return response;
            },
          ),

        gcTime: 0,
      }}
    >
      <ContactsTable onFilter={handleFilter} companyId={companyId} />
    </EnhancedTableProvider>
  );
};
