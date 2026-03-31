import {
  EnhancedTable,
  EnhancedTableSortableColumnHeader,
} from "$/components/tables/enhanced-table";
import Flexbox from "$/components/ui/Flexbox";
import { TableColumn } from "$/components/ui/table/Table";
import DoneIcon from "$/icons/DoneIcon";
import NotDoneIcon from "$/icons/NotDoneIcon";
import { CompanyActionReportRecord } from "$/types/api/companies-reports.types";
import { format } from "$/utils/functions/date.functions";

const TableHeaders: TableColumn<CompanyActionReportRecord>[] = [
  {
    selector: "companyName",
    title: "Société",
    cell: (cell) => {
      return (
        <p className="text-center font-normal text-black">{cell.getValue()}</p>
      );
    },
    header: () => (
      <EnhancedTableSortableColumnHeader
        selector="companyName"
        title="Société"
        className="w-full justify-center"
      />
    ),
  },
  {
    selector: "actionType",
    title: "Type d'action",
    cell: (cell) => {
      return (
        <p className="text-center font-normal text-black">{cell.getValue()}</p>
      );
    },
    header: () => (
      <EnhancedTableSortableColumnHeader
        selector="actionType"
        title="Type d'action"
        className="w-full justify-center"
      />
    ),
  },
  {
    selector: "addedBy",
    title: "Fait Par",
    cell: (cell) => {
      return (
        <p className="text-center font-normal text-black">{cell.getValue()}</p>
      );
    },
    header: () => (
      <EnhancedTableSortableColumnHeader
        selector="addedBy"
        title="Fait Par"
        className="w-full justify-center"
      />
    ),
  },
  {
    selector: "startDate",
    title: "Date de début",
    cell: (cell) => {
      return (
        <p className="text-center font-normal text-black">
          {format(new Date(cell.getValue()), "dd/MM/yyyy")}
        </p>
      );
    },
    header: () => (
      <EnhancedTableSortableColumnHeader
        selector="startDate"
        title="Date de début"
        className="w-full justify-center"
      />
    ),
  },
  {
    selector: "endDate",
    title: "Date de fin",
    cell: (cell) => {
      return (
        <p className="text-center font-normal text-black">
          {format(new Date(cell.getValue()), "dd/MM/yyyy")}
        </p>
      );
    },
    header: () => (
      <EnhancedTableSortableColumnHeader
        selector="endDate"
        title="Date de fin"
        className="w-full justify-center"
      />
    ),
  },
  {
    selector: "object",
    title: "Objet",
    cell: (cell) => {
      return (
        <p className="text-center font-normal text-black">{cell.getValue()}</p>
      );
    },
    header: () => (
      <EnhancedTableSortableColumnHeader
        selector="object"
        title="Objet"
        className="w-full justify-center"
      />
    ),
  },
  {
    selector: "isDone",
    title: "Fait",

    cell: (cell) => {
      const { isDone } = cell.row.original;
      return (
        <Flexbox align="center" className="px-4">
          {isDone ? <DoneIcon /> : <NotDoneIcon />}
        </Flexbox>
      );
    },
  },
];

export const ActionsTable = () => {
  return (
    <EnhancedTable<CompanyActionReportRecord>
      tableClassName="rounded-lg"
      paginatable
      columns={TableHeaders}
    />
  );
};
