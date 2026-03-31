import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";

import { deleteCompany } from "$/api/companies/delete-company";
import { CompanyRecord } from "$/api/companies/get-all-companies";
import {
  EnhancedTable,
  EnhancedTableSortableColumnHeader,
} from "$/components/tables/enhanced-table";
import PotentialComponent from "$/components/ui/table-components/PotentialComponent";
import { TableColumn } from "$/components/ui/table/Table";
import { PATHS } from "$/routes/constants";

import DateComponent from "$/components/ui/table-components/DateComponent";

import CompanyActions from "./CompanyActions";
import DeleteCompanyModal from "./DeleteCompanyModal";

const CompaniesTable = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [deleteCompanyPopup, setDeleteCompanyPopup] = useState<{
    isOpen: boolean;
    id?: number;
  }>({ isOpen: false });

  const handleOpenDeletePopup = (id: number) => {
    setDeleteCompanyPopup({ isOpen: true, id });
  };

  const dashboardTableHeaders: TableColumn<
    CompanyRecord & { actions: string }
  >[] = [
    {
      selector: "name",
      title: "Nom société",

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
          title="Nom société"
          className="w-full justify-center"
        />
      ),
    },
    {
      selector: "code",
      title: "Code",
      cell: (cell) => {
        return (
          <p className="text-center font-normal text-black tabletScreen:text-sm mobileScreen:text-xs">
            {cell.getValue()}
          </p>
        );
      },
      header: () => (
        <EnhancedTableSortableColumnHeader
          selector="code"
          title="Code"
          className="w-full justify-center"
        />
      ),
    },
    {
      selector: "companyPotential",
      title: "Potentiel de la Société",
      cell: (cell) => {
        const obj = cell.getValue();
        return <PotentialComponent value={obj} />;
      },
      header: () => (
        <EnhancedTableSortableColumnHeader
          selector="companyPotential"
          title="Potentiel de la Société"
          className="w-full justify-center"
        />
      ),
    },
    {
      selector: "country",
      title: "Pays",
      cell: (cell) => {
        return (
          <p className="text-center font-normal text-black tabletScreen:text-sm mobileScreen:text-xs">
            {cell.getValue()}
          </p>
        );
      },
      header: () => (
        <EnhancedTableSortableColumnHeader
          selector="country"
          title="Pays"
          className="w-full justify-center"
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
    },
    {
      selector: "latestAction",
      title: "Dernière action",
      cell: (cell) => {
        return (
          <p className="text-center font-normal text-black tabletScreen:text-sm mobileScreen:text-xs">
            {cell.getValue()}
          </p>
        );
      },
      header: () => (
        <EnhancedTableSortableColumnHeader
          selector="latestAction"
          title="Dernière action"
          className="w-full justify-center"
        />
      ),
    },
    {
      selector: "lastProspectionCall",
      title: "Dernier appel prospection",
      cell: (cell) => {
        const value = cell.getValue();
        if (!value) return <p className="text-center text-sm text-gray-400">-</p>;
        return <div className="flex w-full justify-center"><DateComponent date={new Date(value)} /></div>;
      },
      header: () => (
        <EnhancedTableSortableColumnHeader
          selector="lastProspectionCall"
          title="Dernier appel prospection"
          className="w-full justify-center"
        />
      ),
    },
    {
      selector: "actions",
      title: "",
      cell: (cell) => {
        return (
          <CompanyActions
            cell={cell}
            handleOpenDeletePopup={handleOpenDeletePopup}
          />
        );
      },
    },
  ];

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-companies"] });
    },
  });

  const handleDeleteCompany = () => {
    if (!deleteCompanyPopup.id) return;
    mutateAsync(deleteCompanyPopup.id).then(() => {
      queryClient.invalidateQueries({ queryKey: ["all-companies"] });
      setDeleteCompanyPopup({ isOpen: false });
    });
  };

  return (
    <>
      <EnhancedTable<CompanyRecord & { actions: string }>
        tableClassName="rounded-lg"
        paginatable
        selectable
        columns={dashboardTableHeaders}
        onRowClick={(row) => {
          navigate(
            generatePath(PATHS.CLIENT_SHOW_PAGE, {
              id: String(row.original.id),
            }),
          );
        }}
      />

      <DeleteCompanyModal
        isOpen={deleteCompanyPopup.isOpen}
        handleSetOpen={(open) =>
          setDeleteCompanyPopup((prev) => ({ ...prev, isOpen: open }))
        }
        handleOnDelete={handleDeleteCompany}
        isLoading={isPending}
      />
    </>
  );
};

export default CompaniesTable;
