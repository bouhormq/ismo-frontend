import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { generateCompaniesActionsReportExcel } from "$/api/companies/reports/generate-companies-actions-report-excel";
import { generateCompaniesReportExcel } from "$/api/companies/reports/generate-companies-reports-excel";
import { generateCompaniesReportPDF } from "$/api/companies/reports/generate-companies-report-pdf";
import { generateActionsReportPDF } from "$/api/companies/reports/generate-actions-report-pdf";
import { useEnhancedTable } from "$/components/tables/enhanced-table/EnhancedTableProvider";
import Button from "$/components/ui/Button";
import FilterBar from "$/components/ui/FilterBar/FilterBar";
import Flexbox from "$/components/ui/Flexbox";
import useGeneral from "$/hooks/contexts/useGeneral";
import ExcelIcon from "$/icons/Filters/ExcelIcon";
import FiltersIcon from "$/icons/Filters/FiltersIcon";
import PdfIcon from "$/icons/Filters/PdfIcon";
import ViewPdfIcon from "$/icons/Filters/ViewPDFIcon";
import {
  CompaniesReportTableFilters,
  CompanyActionReportRecord,
  CompanyActionReportRecordResponse,
  CompanyReportRecord,
  CompanyReportRecordResponse,
} from "$/types/api/companies-reports.types";
import { GenerateCompaniesExcelResponse } from "$/types/api/company.types";
import { QueryError } from "$/types/api/restApiClient.types";
import { generateExcelFileV2 } from "$/utils/functions/csv.functions";
import { generatePDF } from "$/utils/functions/pdf.functions";
import { cn } from "$/utils/functions/misc.functions";

import PdfLoadingOverlay from "$/components/ui/PdfLoadingOverlay";

import { ReportsFilters } from "./ReportsFilters";

type Props = {
  tab: "companies" | "actions";
  handleSetTab: (tab: "companies" | "actions") => void;
};

export const TablesHeaderWithFilterTrigger = <
  T extends CompanyReportRecordResponse | CompanyActionReportRecordResponse,
  K extends CompanyReportRecord | CompanyActionReportRecord,
>({
  tab,
  handleSetTab,
}: Props) => {
  const {
    filters: tableFilters,
    handleResetFilters: resetFilters,
    handleSetFiltersObject,
  } = useEnhancedTable<T, K, CompaniesReportTableFilters>();

  const { setIsFilterBarOpen } = useGeneral();

  const [filters, setFilters] = useState<CompaniesReportTableFilters>({});

  const handleResetFilters = () => {
    setFilters({});
    resetFilters();
    setIsFilterBarOpen(false);
  };

  const handleSetFilter = (
    key: keyof CompaniesReportTableFilters,
    value: string | undefined | Date | null,
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const { mutateAsync, isPending } = useMutation<
    GenerateCompaniesExcelResponse,
    QueryError,
    CompaniesReportTableFilters
  >({
    mutationFn: generateCompaniesReportExcel,
  });

  const {
    mutateAsync: mutateAsyncActionsExcel,
    isPending: isActionsExcelPending,
  } = useMutation<
    GenerateCompaniesExcelResponse,
    QueryError,
    CompaniesReportTableFilters
  >({
    mutationFn: generateCompaniesActionsReportExcel,
  });

  const {
    mutateAsync: mutateAsyncCompanyPDF,
    isPending: isCompanyPDFPending,
  } = useMutation({
    mutationFn: generateCompaniesReportPDF,
  });

  const {
    mutateAsync: mutateAsyncActionsPDF,
    isPending: isActionsPDFPending,
  } = useMutation({
    mutationFn: generateActionsReportPDF,
  });

  const isAnyPending =
    isPending || isActionsExcelPending || isCompanyPDFPending || isActionsPDFPending;

  const handleExcel = async () => {
    if (tab === "companies") {
      const { dataSheets } = await mutateAsync({
        ...tableFilters,
      });
      generateExcelFileV2(dataSheets, "Société Rapports.xlsx");
    }

    if (tab === "actions") {
      const { dataSheets } = await mutateAsyncActionsExcel({
        ...tableFilters,
      });
      generateExcelFileV2(dataSheets, "Actions Rapports.xlsx");
    }
  };

  const handlePDF = async (view?: boolean) => {
    try {
      if (tab === "companies") {
        const res = await mutateAsyncCompanyPDF({ ...tableFilters });
        const blob = await res.data;
        generatePDF(blob, "Récapitulatif Sociétés.pdf", view);
      }

      if (tab === "actions") {
        const res = await mutateAsyncActionsPDF({ ...tableFilters });
        const blob = await res.data;
        generatePDF(blob, "Récapitulatif Actions.pdf", view);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handleSubmit = (_e: FieldValues) => {
    const newFilters: CompaniesReportTableFilters = {};

    Object.keys(filters).map((key) => {
      if (!key) return;
      const filterKey = key as keyof CompaniesReportTableFilters;
      const value = filters[filterKey];
      if (filterKey === "startDateRange" || filterKey === "endDateRange") {
        // @ts-ignore
        newFilters[filterKey] = value;
      } else {
        newFilters[filterKey] = value as string;
      }
    });

    handleSetFiltersObject(newFilters);

    setIsFilterBarOpen(false);
  };

  return (
    <>
      <PdfLoadingOverlay isVisible={isCompanyPDFPending || isActionsPDFPending} />
      <Flexbox
        fullWidth
        row
        align="center"
        justify="between"
        className="smallTabletScreen:flex-col smallTabletScreen:gap-4"
      >
        <Flexbox
          row
          className="gap-2 rounded-lg px-4 py-2.5 smallTabletScreen:w-full smallTabletScreen:justify-center smallTabletScreen:px-2"
          align="center"
          style={{ boxShadow: "0px 0px 4px 0px #00000040" }}
        >
          <Button
            className={cn("rounded-lg px-6 smallTabletScreen:px-3", {
              "bg-[#69CFFD] text-white": tab === "companies",
            })}
            onClick={() => handleSetTab("companies")}
          >
            <span className="text-sm smallTabletScreen:whitespace-break-spaces smallTabletScreen:text-xs">
              Récapitulatif des sociétés
            </span>
          </Button>
          <span className="h-8 w-[1px] bg-[#3C3C432E]" />
          <Button
            className={cn("rounded-lg px-6 smallTabletScreen:px-3", {
              "bg-[#69CFFD] text-white": tab === "actions",
            })}
            onClick={() => handleSetTab("actions")}
          >
            <span className="text-sm smallTabletScreen:whitespace-break-spaces smallTabletScreen:text-xs">
              Récapitulatif des actions
            </span>
          </Button>
        </Flexbox>

        <Flexbox
          row
          align="center"
          className="gap-2 smallTabletScreen:w-full smallTabletScreen:justify-end"
        >
          <Button
            type="button"
            className={cn("!w-fit grow-[unset] bg-light-blue-normal", {
              "opacity-50": isAnyPending,
            })}
            onClick={() => handlePDF()}
            disabled={isAnyPending}
          >
            <PdfIcon className="h-4 w-4 smallTabletScreen:h-5 smallTabletScreen:w-5" />
            <span className="whitespace-nowrap smallTabletScreen:hidden">
              Export PDF
            </span>
          </Button>

          <Button
            type="button"
            className={cn("!w-fit grow-[unset] bg-light-blue-normal", {
              "opacity-50": isAnyPending,
            })}
            onClick={() => handlePDF(true)}
            disabled={isAnyPending}
          >
            <ViewPdfIcon className="h-4 w-4 smallTabletScreen:h-5 smallTabletScreen:w-5" />
            <span className="whitespace-nowrap smallTabletScreen:hidden">
              Voir PDF
            </span>
          </Button>

          <Button
            type="button"
            className={cn("!w-fit grow-[unset] bg-light-yellow-normal", {
              "opacity-50": isAnyPending,
            })}
            onClick={handleExcel}
            disabled={isAnyPending}
          >
            <ExcelIcon className="h-4 w-4 smallTabletScreen:h-5 smallTabletScreen:w-5" />
            <span className="whitespace-nowrap smallTabletScreen:hidden">
              Export Excel
            </span>
          </Button>

          <Button
            disabled={isAnyPending}
            type="button"
            className={cn("relative !w-fit grow-0 bg-gray-inputBg p-2.5", {
              "opacity-50": isAnyPending,
            })}
            onClick={() => setIsFilterBarOpen(true)}
          >
            <FiltersIcon className="h-5 w-5" />
            {tableFilters &&
              Object.keys(tableFilters).filter(
                (filter) => tableFilters[filter as keyof typeof tableFilters],
              ).length > 0 && (
                <span className="absolute right-0 top-0 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 text-white" />
              )}
          </Button>
        </Flexbox>
      </Flexbox>

      <FilterBar
        handleSubmit={handleSubmit}
        handleResetFilters={handleResetFilters}
        defaultValues={tableFilters}
      >
        <ReportsFilters
          handleSetFilter={handleSetFilter}
          tab={tab}
          tableFilters={tableFilters}
        />
      </FilterBar>
    </>
  );
};
