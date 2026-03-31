import { Button } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { debounce } from "lodash";
import { SearchIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

import {
  GenerateCompaniesExcelParams,
  generateCompaniesExcel,
} from "$/api/companies/generate-excel";
import { generateCompaniesPDF } from "$/api/companies/generate-pdf";
import {
  CompaniesTableFilters,
  CompanyRecord,
  CompanyRecordResponse,
} from "$/api/companies/get-all-companies";
import FilterBar from "$/components/ui/FilterBar/FilterBar";
import useGeneral from "$/hooks/contexts/useGeneral";
import ExcelIcon from "$/icons/Filters/ExcelIcon";
import FiltersIcon from "$/icons/Filters/FiltersIcon";
import PdfIcon from "$/icons/Filters/PdfIcon";
import PlusIcon from "$/icons/Filters/PlusIcon";
import EmailingIcon from "$/icons/Filters/EmailingIcon";
import SendEmailIcon from "$/icons/Filters/SendEmailIcon";
import ViewPdfIcon from "$/icons/Filters/ViewPDFIcon";
import { GenerateCompaniesExcelResponse } from "$/types/api/company.types";
import { QueryError } from "$/types/api/restApiClient.types";
import { generateExcelFileV2 } from "$/utils/functions/csv.functions";
import { cn } from "$/utils/functions/misc.functions";
import { generatePDF } from "$/utils/functions/pdf.functions";

import TextInput from "../../../../components/inputs/TextInput";
import { useEnhancedTable } from "../../../../components/tables/enhanced-table/EnhancedTableProvider";
import Flexbox from "../../../../components/ui/Flexbox";
import PdfLoadingOverlay from "$/components/ui/PdfLoadingOverlay";

import CompaniesFilters from "./CompaniesFilters";
import { EmailingModal } from "./EmailingModal/EmailingModal";
import { SendEmailModal } from "./SendEmailModal/SendEmailModal";

const btnsClassName =
  "px-5 py-2 rounded-[100px] gap-1.5 flex grow justify-center items-center text-black smallTabletScreen:w-fit smallTabletScreen:px-[unset] smallTabletScreen:py-[unset] smallTabletScreen:p-2 smallTabletScreen:grow-0";

type Props = {
  handleAdd?: () => void;
};

const CompanyTableHeaderWithFilterTrigger = ({ handleAdd }: Props) => {
  const {
    filters: tableFilters,
    getSelectedRows,
    handleSetFilters,
    handleResetFilters: resetFilters,
    handleSetFiltersObject,
  } = useEnhancedTable<
    CompanyRecordResponse,
    CompanyRecord,
    CompaniesTableFilters
  >();
  const { setIsFilterBarOpen } = useGeneral();

  const [isSendEmailModalOpen, setIsSendEmailModalOpen] = useState(false);
  const [isEmailingModalOpen, setIsEmailingModalOpen] = useState(false);

  const [filters, setFilters] = useState<CompaniesTableFilters>({});

  const { mutateAsync, isPending } = useMutation<
    GenerateCompaniesExcelResponse,
    QueryError,
    GenerateCompaniesExcelParams
  >({
    mutationFn: generateCompaniesExcel,
  });

  const { mutateAsync: generatePDFMutation, isPending: isPendingPDF } =
    useMutation({
      mutationFn: generateCompaniesPDF,
    });

  const handleExcel = async () => {
    const { dataSheets } = await mutateAsync({
      ...tableFilters,
      selectedIds: getSelectedRows().map((row) => row.id),
    });
    // return;
    generateExcelFileV2(dataSheets, "Société.xlsx", false);
  };

  const handlePDF = async (view?: boolean) => {
    const selectedIds = getSelectedRows().map((row) => row.id);

    if (!selectedIds.length) {
      toast.warning("Veuillez sélectionner des sociétés pour exporter le PDF");
      return;
    }

    try {
      const res = await generatePDFMutation({
        companiesIds: selectedIds,
      });
      const blob = await res.data;

      generatePDF(blob, "Société.pdf", view);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handleEmail = () => {
    if (getSelectedRows().length === 0) {
      toast.warning(
        "Veuillez sélectionner au moins une société pour envoyer un email",
      );
      return;
    }
    if (getSelectedRows().length > 1) {
      toast.warning(
        "Veuillez sélectionner une seule société pour envoyer un email",
      );
      return;
    }
    setIsSendEmailModalOpen(true);
  };

  const handleClose = () => {
    setIsSendEmailModalOpen(false);
  };

  const handleEmailing = () => {
    if (getSelectedRows().length === 0) {
      toast.warning(
        "Veuillez sélectionner au moins une société pour l'emailing",
      );
      return;
    }
    setIsEmailingModalOpen(true);
  };

  const handleCloseEmailing = () => {
    setIsEmailingModalOpen(false);
  };

  const handleSetFilter = (
    key: keyof CompaniesTableFilters,
    value?: string,
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleFilter = debounce((value: string) => {
    handleSetFilters("search", value);
  }, 400);

  const handleResetFilters = () => {
    setFilters({});
    resetFilters();
    setIsFilterBarOpen(false);
  };

  const handleSubmit = (_e: FieldValues) => {
    const newFilters: CompaniesTableFilters = {};

    Object.keys(filters).map((key) => {
      if (!key) return;
      const filterKey = key as keyof CompaniesTableFilters;
      const value = filters[filterKey];

      if (value !== "" && value !== undefined) newFilters[filterKey] = value;
    });

    handleSetFiltersObject(newFilters);

    setIsFilterBarOpen(false);
  };

  const onCloseFilterBar = useCallback(() => {
    const activeTableFilters = Object.entries(tableFilters).reduce(
      (acc, [key, value]) => {
        if (value) acc[key as keyof CompaniesTableFilters] = value;
        return acc;
      },
      {} as CompaniesTableFilters,
    );
    setFilters(activeTableFilters);
  }, [tableFilters]);

  const areFiltersActive = !!Object.values(tableFilters).filter(Boolean).length;

  return (
    <>
      <PdfLoadingOverlay isVisible={isPendingPDF} />
      <Flexbox
        fullWidth
        row
        align="center"
        className="flex-wrap gap-4 smallTabletScreen:hidden"
      >
        <TextInput
          onChange={(e) => handleFilter(e.target.value)}
          icon={<SearchIcon className="w-5" />}
          placeholder="Chercher"
          inputClassName=":focus:bg-transparent bg-transparent h-full text-xs placeholder-[#B4B4B4]"
          className="relative flex !h-full max-h-9 w-fit min-w-52 items-center gap-2 bg-gray-inputBg px-[14px] py-1.5 placeholder:text-black smallTabletScreen:ml-0 smallTabletScreen:min-h-10"
          disabled={isPending || isPendingPDF}
        />
        <Button
          disabled={isPending || isPendingPDF}
          type="button"
          className={cn(btnsClassName, "grow-[unset] bg-light-blue-normal", {
            "opacity-50": isPending || isPendingPDF,
          })}
          onClick={() => handlePDF()}
        >
          <PdfIcon className="h-4 w-4 smallTabletScreen:h-5 smallTabletScreen:w-5" />
          <span className="whitespace-nowrap smallTabletScreen:hidden">
            Export PDF
          </span>
        </Button>
        <Button
          disabled={isPending || isPendingPDF}
          type="button"
          className={cn(btnsClassName, "grow-[unset] bg-light-blue-normal", {
            "opacity-50": isPending || isPendingPDF,
          })}
          onClick={() => handlePDF(true)}
        >
          <PdfIcon className="h-4 w-4 smallTabletScreen:h-5 smallTabletScreen:w-5" />
          <span className="whitespace-nowrap smallTabletScreen:hidden">
            Voir le PDF
          </span>
        </Button>
        <Button
          disabled={isPending || isPendingPDF}
          type="button"
          className={cn(btnsClassName, "grow-[unset] bg-light-yellow-normal", {
            "opacity-50": isPending || isPendingPDF,
          })}
          onClick={handleExcel}
        >
          <ExcelIcon className="h-4 w-4 smallTabletScreen:h-5 smallTabletScreen:w-5" />
          <span className="whitespace-nowrap smallTabletScreen:hidden">
            Export Excel
          </span>
        </Button>
        <Button
          disabled={isPending || isPendingPDF}
          type="button"
          className={cn(btnsClassName, "grow-[unset] bg-light-green-normal", {
            "opacity-50": isPending || isPendingPDF,
          })}
          onClick={handleEmail}
        >
          <SendEmailIcon className="h-4 w-4 smallTabletScreen:h-5 smallTabletScreen:w-5" />
          <span className="whitespace-nowrap smallTabletScreen:hidden">
            Envoyer un email
          </span>
        </Button>
        <Button
          disabled={isPending || isPendingPDF}
          type="button"
          className={cn(btnsClassName, "grow-[unset] bg-light-yellow-normal", {
            "opacity-50": isPending || isPendingPDF,
          })}
          onClick={handleEmailing}
        >
          <EmailingIcon className="h-4 w-4 smallTabletScreen:h-5 smallTabletScreen:w-5" />
          <span className="whitespace-nowrap smallTabletScreen:hidden">
            Emailing
          </span>
        </Button>
        <Button
          disabled={isPending || isPendingPDF}
          type="button"
          className={cn(
            btnsClassName,
            "grow-[unset] bg-gray-inputBg smallTabletScreen:hidden",
            {
              "opacity-50": isPending || isPendingPDF,
            },
          )}
          onClick={handleAdd}
        >
          <PlusIcon className="h-4 w-4 smallTabletScreen:h-5 smallTabletScreen:w-5" />
          <span className="whitespace-nowrap">Ajouter une fiche société</span>
        </Button>

        <Button
          disabled={isPending || isPendingPDF}
          type="button"
          className={cn(
            btnsClassName,
            "relative grow-0 bg-gray-inputBg p-2.5 smallTabletScreen:hidden",
            {
              "opacity-50": isPending || isPendingPDF,
            },
          )}
          onClick={() => setIsFilterBarOpen(true)}
        >
          <FiltersIcon className="h-5 w-5" />
          {areFiltersActive && (
            <span className="absolute right-px top-px size-2.5 rounded-full bg-red-normal"></span>
          )}
        </Button>
      </Flexbox>

      <Flexbox fullWidth className="hidden gap-2 smallTabletScreen:flex">
        <Flexbox
          align="center"
          justify="center"
          fullWidth
          row
          className="gap-2"
        >
          <Button
            disabled={isPending || isPendingPDF}
            type="button"
            className={cn(
              btnsClassName,
              "!w-full bg-gray-inputBg mobileScreen:whitespace-break-spaces mobileScreen:text-xs",
              {
                "opacity-50": isPending || isPendingPDF,
              },
            )}
            onClick={handleAdd}
          >
            <PlusIcon className="h-4 w-4 mobileScreen:h-4 mobileScreen:w-4" />
            <span className="">Ajouter une fiche société</span>
          </Button>

          <Button
            disabled={isPending || isPendingPDF}
            type="button"
            className={cn(btnsClassName, "bg-light-blue-normal", {
              "opacity-50": isPending || isPendingPDF,
            })}
            onClick={() => handlePDF()}
          >
            <PdfIcon className="h-4 w-4 smallTabletScreen:h-5 smallTabletScreen:w-5" />
          </Button>
          <Button
            disabled={isPending || isPendingPDF}
            type="button"
            className={cn(btnsClassName, "bg-light-blue-normal", {
              "opacity-50": isPending || isPendingPDF,
            })}
            onClick={() => handlePDF(true)}
          >
            <ViewPdfIcon className="h-4 w-4 smallTabletScreen:h-5 smallTabletScreen:w-5" />
          </Button>
          <Button
            disabled={isPending || isPendingPDF}
            type="button"
            className={cn(btnsClassName, "bg-light-yellow-normal", {
              "opacity-50": isPending || isPendingPDF,
            })}
            onClick={handleExcel}
          >
            <ExcelIcon className="h-4 w-4 smallTabletScreen:h-5 smallTabletScreen:w-5" />
          </Button>
          <Button
            disabled={isPending || isPendingPDF}
            type="button"
            className={cn(btnsClassName, "bg-light-green-normal", {
              "opacity-50": isPending || isPendingPDF,
            })}
            onClick={handleEmail}
          >
            <SendEmailIcon className="h-4 w-4 smallTabletScreen:h-5 smallTabletScreen:w-5" />
          </Button>
          <Button
            disabled={isPending || isPendingPDF}
            type="button"
            className={cn(btnsClassName, "bg-light-yellow-normal", {
              "opacity-50": isPending || isPendingPDF,
            })}
            onClick={handleEmailing}
          >
            <EmailingIcon className="h-4 w-4 smallTabletScreen:h-5 smallTabletScreen:w-5" />
          </Button>
        </Flexbox>

        <Flexbox row fullWidth className="gap-2">
          <TextInput
            onChange={(e) => handleFilter(e.target.value)}
            icon={<SearchIcon className="w-5" />}
            placeholder="Chercher"
            inputClassName=":focus:bg-transparent bg-transparent h-full text-xs placeholder-[#B4B4B4]"
            className="relative flex !h-full max-h-9 w-full min-w-52 items-center gap-2 bg-gray-inputBg px-[14px] py-1.5 placeholder:text-black smallTabletScreen:ml-0 smallTabletScreen:min-h-10"
          />

          <Button
            disabled={isPending || isPendingPDF}
            type="button"
            className={cn(
              btnsClassName,
              "relative ml-auto grow-0 bg-gray-inputBg p-2.5",
              {
                "opacity-50": isPending || isPendingPDF,
              },
            )}
            onClick={() => setIsFilterBarOpen(true)}
          >
            <FiltersIcon className="h-5 w-5" />
            {areFiltersActive && (
              <span className="absolute right-px top-px size-2.5 rounded-full bg-red-normal"></span>
            )}
          </Button>
        </Flexbox>
      </Flexbox>

      <FilterBar
        handleSubmit={handleSubmit}
        handleResetFilters={handleResetFilters}
        onCloseFilterBar={onCloseFilterBar}
        defaultValues={tableFilters}
      >
        <CompaniesFilters handleSetFilter={handleSetFilter} />
      </FilterBar>

      <SendEmailModal isOpen={isSendEmailModalOpen} onCancel={handleClose} />
      <EmailingModal isOpen={isEmailingModalOpen} onCancel={handleCloseEmailing} />
    </>
  );
};

export default CompanyTableHeaderWithFilterTrigger;
