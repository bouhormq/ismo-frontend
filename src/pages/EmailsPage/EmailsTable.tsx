import { EmailWithoutEvent } from "$/api/mail/getEmailLogs.api";
import { EnhancedTable } from "$/components/tables/enhanced-table";
import { TableColumn } from "$/components/ui/table/Table";

function EmailsTable() {
  const emailTableHeaders: TableColumn<EmailWithoutEvent>[] = [
    {
      selector: "subject",
      title: "Objet",
      cell: (cell) => {
        return (
          <p className="text-center text-lg font-semibold text-black tabletScreen:text-sm mobileScreen:text-xs">
            {cell.getValue()}
          </p>
        );
      },
    },
    {
      selector: "from",
      title: "Destinateur",
      cell: (cell) => {
        return (
          <p className="text-center font-normal text-black tabletScreen:text-sm mobileScreen:text-xs">
            {cell.getValue()}
          </p>
        );
      },
    },
    {
      selector: "email",
      title: "Destinataires",
      cell: (cell) => {
        return (
          <p className="text-center font-normal text-black tabletScreen:text-sm mobileScreen:text-xs">
            {cell.getValue()}
          </p>
        );
      },
    },
    {
      selector: "date",
      title: "Date de création",
      cell: (cell) => {
        const date = new Date(cell.getValue());
        return (
          <p className="text-center font-normal text-black tabletScreen:text-sm mobileScreen:text-xs">
            {date.toLocaleString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        );
      },
    },
    {
      selector: "source",
      title: "Source",
      cell: (cell) => {
        const source = cell.getValue();
        return (
          <div className="flex w-full flex-row items-center justify-center">
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                source === "zoho"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {source === "zoho" ? "Zoho" : "Brevo"}
            </span>
          </div>
        );
      },
    },
  ];
  return (
    <EnhancedTable<EmailWithoutEvent>
      tableClassName="rounded-lg"
      paginatable
      columns={emailTableHeaders}
    />
  );
}

export default EmailsTable;
