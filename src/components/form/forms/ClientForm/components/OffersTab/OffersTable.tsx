import { SendIcon } from "lucide-react";

import { OffersTableColumnsType } from "$/api/companies/axonaut/getCompanyOffers";
import { EnhancedTable } from "$/components/tables/enhanced-table";
import { TableColumn } from "$/components/ui/table/Table";

export const offersTableColumns: TableColumn<
  OffersTableColumnsType & { actions: string }
>[] = [
  {
    selector: "createdAt",
    title: "Emis Le",
    cell: (cell) => {
      return (
        <p className="text-center font-normal text-black">
          {new Date(cell.row.original.createdAt).toLocaleString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
      );
    },
  },

  {
    selector: "number",
    title: "Numéro",
    cell: (cell) => {
      return (
        <p className="text-center font-normal text-black">
          {cell.row.original.number}
        </p>
      );
    },
  },
  {
    selector: "status",
    title: "Statut",
    cell: (cell) => {
      return (
        <p className="text-center font-normal text-black">
          {cell.row.original.status}
        </p>
      );
    },
  },
  {
    selector: "total_amount",
    title: "Prix",
    cell: (cell) => {
      return (
        <p className="text-center font-normal text-black">
          {cell.row.original.total_amount}
        </p>
      );
    },
  },

  {
    selector: "type",
    title: "Désignation",
    cell: (cell) => {
      return (
        <div className="flex w-full flex-row items-center justify-center">
          <p className="text-center font-normal text-black">
            {cell.row.original.type}
          </p>
        </div>
      );
    },
  },
  {
    selector: "source",
    title: "Source",
    cell: (cell) => {
      const source = cell.row.original.source;
      return (
        <div className="flex w-full flex-row items-center justify-center">
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              source === "zoho"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {source === "zoho" ? "Zoho" : "Axonaut"}
          </span>
        </div>
      );
    },
  },
  {
    selector: "pdf_url",
    title: "PDF",
    cell: (cell) => {
      const { pdf_url, customer_portal_url, source } = cell.row.original;
      const pdfLink = pdf_url || (source === "zoho" ? customer_portal_url : null);
      return (
        <div className="flex w-full flex-row items-center justify-center">
          {pdfLink ? (
            <a
              href={pdfLink}
              target="_blank"
              className="text-center font-normal text-black underline hover:text-blue-500"
              rel="noreferrer"
            >
              Voir PDF
            </a>
          ) : (
            <p className="font-normal">-</p>
          )}
        </div>
      );
    },
  },
  {
    selector: "view_link",
    title: "Voir",
    cell: (cell) => {
      const { view_link } = cell.row.original;
      if (!view_link) return <p className="text-center font-normal">-</p>;
      return (
        <div className="flex w-full flex-row items-center justify-center">
          <a
            className="text-center font-normal text-black"
            href={view_link}
            target="_blank"
            rel="noreferrer"
          >
            <SendIcon size={19} />
          </a>
        </div>
      );
    },
  },
];

const OffersTable = () => {
  return (
    <>
      <EnhancedTable<OffersTableColumnsType & { actions: string }>
        tableClassName="rounded-lg"
        paginatable
        columns={offersTableColumns}
      />
    </>
  );
};

export default OffersTable;
