import { useMemo, useState } from "react";

import { getAllDocuments } from "$/api/documents/get-all-documents";
import { EnhancedTableProvider } from "$/components/tables/enhanced-table";
import { useDocument } from "$/hooks/zustand/useDocument";
import {
  DocumentRecord,
  DocumentRecordResponse,
} from "$/types/models/document.types";

import DocumentsTable from "./DocumentsTable";

type Props = {
  companyId: number;
};

export const DocumentsTab = ({ companyId }: Props) => {
  const { data, setData } = useDocument();

  const [filterValue, setFilterValue] = useState<string>("");

  const handleFilterChange = (search: string) => {
    setFilterValue(search);
  };

  const displayedDocuments = useMemo(() => {
    const allCompanyDocuments =
      data?.companyDocuments?.filter((doc) => doc.status !== "deleted") || [];

    if (!filterValue) {
      return allCompanyDocuments;
    }

    return allCompanyDocuments.filter((doc) =>
      doc.name.toLowerCase().includes(filterValue.toLowerCase()),
    );
  }, [data, filterValue]);

  return (
    <EnhancedTableProvider<DocumentRecordResponse, DocumentRecord>
      dataSelector={() => displayedDocuments}
      totalCountSelector={() => displayedDocuments.length}
      queryOptions={{
        queryKey: ["table-company-documents", companyId],
        queryFn: ({ pagination, sorting }) =>
          getAllDocuments(companyId, sorting, pagination, "company").then(
            (response) => {
              setData({ companyDocuments: response.data || [] });
              return response;
            },
          ),
        gcTime: 0,
        staleTime: 0,
      }}
    >
      <DocumentsTable
        onFilter={handleFilterChange}
        isAddingEnable={!!companyId}
      />
    </EnhancedTableProvider>
  );
};
