import {
  EnhancedTable,
  EnhancedTableSortableColumnHeader,
} from "$/components/tables/enhanced-table";
import PotentialComponent from "$/components/ui/table-components/PotentialComponent";
import { TableColumn } from "$/components/ui/table/Table";
import { CompanyReportRecord } from "$/types/api/companies-reports.types";

const TableHeaders: TableColumn<CompanyReportRecord>[] = [
  {
    selector: "name",
    title: "Société",

    cell: (cell) => {
      return (
        <p className="text-center text-lg font-semibold text-black tabletScreen:text-sm mobileScreen:text-xs">
          {cell.getValue()}
        </p>
      );
    },
    header: () => (
      <EnhancedTableSortableColumnHeader
        selector="companyName"
        title="Société"
        className="w-[200px] justify-center"
      />
    ),
  },
  {
    selector: "industry",
    title: "Industrie",
    cell: (cell) => {
      return (
        <p className="text-center font-normal text-black tabletScreen:text-sm mobileScreen:text-xs">
          {cell.getValue()}
        </p>
      );
    },
    header: () => (
      <EnhancedTableSortableColumnHeader
        selector="industry"
        title="Industrie"
        className="w-[100px] justify-center"
      />
    ),
  },
  {
    selector: "category",
    title: "Catégorie",
    cell: (cell) => {
      return (
        <p className="text-center font-normal text-black tabletScreen:text-sm mobileScreen:text-xs">
          {cell.getValue()}
        </p>
      );
    },
    header: () => (
      <EnhancedTableSortableColumnHeader
        selector="category"
        title="Catégorie"
        className="w-[100px] justify-center"
      />
    ),
  },
  {
    selector: "section",
    title: "Rubrique",
    cell: (cell) => {
      return (
        <p className="text-center font-normal text-black tabletScreen:text-sm mobileScreen:text-xs">
          {cell.getValue()}
        </p>
      );
    },
    header: () => (
      <EnhancedTableSortableColumnHeader
        selector="section"
        title="Rubrique"
        className="w-[100px] justify-center"
      />
    ),
  },
  {
    selector: "companyPotential",
    title: "Potentiel Actuel",
    cell: (cell) => {
      const obj = cell.getValue();
      return <PotentialComponent value={obj} />;
    },
    header: () => (
      <EnhancedTableSortableColumnHeader
        selector="companyPotential"
        title="Potentiel Actuel"
        className="w-[200px] justify-center"
      />
    ),
  },
  {
    selector: "daysSpentInAvailableEquipment",
    title: "Dispose matériel (jours)",
    cell: (cell) => {
      return (
        <p className="text-center font-normal text-black tabletScreen:text-sm mobileScreen:text-xs">
          {cell.getValue()}
        </p>
      );
    },
    header: () => (
      <EnhancedTableSortableColumnHeader
        selector="daysSpentInAvailableEquipment"
        title="Dispose matériel (jours)"
        className="w-[200px] justify-center"
      />
    ),
  },
  {
    selector: "daysSpentInProjectStudy",
    title: "Étude du projet (jours)",
    cell: (cell) => {
      return (
        <p className="text-center font-normal text-black tabletScreen:text-sm mobileScreen:text-xs">
          {cell.getValue()}
        </p>
      );
    },
    header: () => (
      <EnhancedTableSortableColumnHeader
        selector="daysSpentInProjectStudy"
        title="Étude du projet (jours)"
        className="w-[200px] justify-center"
      />
    ),
  },
  {
    selector: "daysSpentInNegotiation",
    title: "Négociation (jours)",
    cell: (cell) => {
      return (
        <p className="text-center font-normal text-black tabletScreen:text-sm mobileScreen:text-xs">
          {cell.getValue()}
        </p>
      );
    },
    header: () => (
      <EnhancedTableSortableColumnHeader
        selector="daysSpentInNegotiation"
        title="Négociation (jours)"
        className="w-[200px] justify-center"
      />
    ),
  },
  {
    selector: "daysSpentInConclusion",
    title: "Conclusion (jours)",
    cell: (cell) => {
      return (
        <p className="text-center font-normal text-black tabletScreen:text-sm mobileScreen:text-xs">
          {cell.getValue()}
        </p>
      );
    },
    header: () => (
      <EnhancedTableSortableColumnHeader
        selector="daysSpentInConclusion"
        title="Conclusion (jours)"
        className="w-[200px] justify-center"
      />
    ),
  },
  {
    selector: "daysSpentInNeutral",
    title: "Neutre/Aucun (jours)",
    cell: (cell) => {
      return (
        <p className="text-center font-normal text-black tabletScreen:text-sm mobileScreen:text-xs">
          {cell.getValue()}
        </p>
      );
    },
    header: () => (
      <EnhancedTableSortableColumnHeader
        selector="daysSpentInNeutral"
        title="Neutre/Aucun (jours)"
        className="w-[200px] justify-center"
      />
    ),
  },
  {
    selector: "daysSpentInMaterialRequest",
    title: "Demande de matériel (jours)",
    cell: (cell) => {
      return (
        <p className="text-center font-normal text-black tabletScreen:text-sm mobileScreen:text-xs">
          {cell.getValue()}
        </p>
      );
    },
    header: () => (
      <EnhancedTableSortableColumnHeader
        selector="daysSpentInMaterialRequest"
        title="Demande de matériel (jours)"
        className="w-[200px] justify-center"
      />
    ),
  },
];

export const CompaniesTable = () => {
  return (
    <EnhancedTable<CompanyReportRecord>
      tableClassName="rounded-lg"
      paginatable
      columns={TableHeaders}
    />
  );
};
