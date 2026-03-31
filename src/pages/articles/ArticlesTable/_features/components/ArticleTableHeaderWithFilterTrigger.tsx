import { Button } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { debounce } from "lodash";
import { SearchIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

import {
  GenerateArticlesExcelParams,
  generateArticlesExcel,
} from "$/api/articles/generate-excel";
import {
  generateArticlesPDF,
  generateCataloguePDF,
} from "$/api/articles/generate-pdf";
import {
  UpdateShowcaseArticlesParams,
  updateShowcaseArticles,
} from "$/api/articles/update-showcase-articles";
import TextInput from "$/components/inputs/TextInput";
import { useEnhancedTable } from "$/components/tables/enhanced-table/EnhancedTableProvider";
import FilterBar from "$/components/ui/FilterBar/FilterBar";
import Flexbox from "$/components/ui/Flexbox";
import useGeneral from "$/hooks/contexts/useGeneral";
import ExcelIcon from "$/icons/Filters/ExcelIcon";
import FiltersIcon from "$/icons/Filters/FiltersIcon";
import PdfIcon from "$/icons/Filters/PdfIcon";
import PlusIcon from "$/icons/Filters/PlusIcon";
import ShowcaseIcon from "$/icons/Filters/ShowcaseIcon";
import SendEmailIcon from "$/icons/Filters/SendEmailIcon";
import WhatsAppIcon from "$/icons/Table/WhatsAppIcon";
import ViewPdfIcon from "$/icons/Filters/ViewPDFIcon";
import {
  ArticleRecord,
  ArticleRecordResponse,
  ArticlesTableFilters,
  GenerateArticlesExcelResponse,
} from "$/types/api/article.types";
import { QueryError } from "$/types/api/restApiClient.types";
import { generateExcelFileV2 } from "$/utils/functions/csv.functions";
import { cn } from "$/utils/functions/misc.functions";
import { generatePDF } from "$/utils/functions/pdf.functions";

import PdfLoadingOverlay from "$/components/ui/PdfLoadingOverlay";

import ArticlesFilters from "./ArticlesFilters";
import { ArticleSendEmailModal } from "./SendEmailModal/ArticleSendEmailModal";
import { ArticleSendWhatsAppModal } from "./SendWhatsAppModal/ArticleSendWhatsAppModal";

const btnsClassName =
  "px-5 py-2 rounded-[100px] gap-1.5 flex grow justify-center items-center text-black smallTabletScreen:w-fit smallTabletScreen:px-[unset] smallTabletScreen:py-[unset] smallTabletScreen:p-2 smallTabletScreen:grow-0";

type Props = {
  handleAdd?: () => void;
};

const ArticleTableHeaderWithFilterTrigger = ({ handleAdd }: Props) => {
  const {
    filters: tableFilters,
    getSelectedRows,
    handleSetFilters,
    handleResetFilters: resetFilters,
    handleSetFiltersObject,
  } = useEnhancedTable<
    ArticleRecordResponse,
    ArticleRecord,
    ArticlesTableFilters
  >();

  const [localFilters, setLocalFilters] = useState<ArticlesTableFilters>({});
  const [isSendEmailModalOpen, setIsSendEmailModalOpen] = useState(false);
  const [isSendWhatsAppModalOpen, setIsSendWhatsAppModalOpen] = useState(false);


  const handleEmail = () => {
    setIsSendEmailModalOpen(true);
  };

  const handleWhatsApp = () => {
    setIsSendWhatsAppModalOpen(true);
  };

  const handleCloseEmail = () => {
    setIsSendEmailModalOpen(false);
  };

  const handleCloseWhatsApp = () => {
    setIsSendWhatsAppModalOpen(false);
  };

  const { mutateAsync, isPending } = useMutation<
    GenerateArticlesExcelResponse,
    QueryError,
    GenerateArticlesExcelParams
  >({
    mutationFn: generateArticlesExcel,
  });

  const [isPendingPDF, setIsPendingPDF] = useState(false);

  const {
    mutateAsync: updateShowcaseArticlesMutation,
    isPending: isPendingShowcaseArticlesUpdate,
  } = useMutation<boolean, QueryError, UpdateShowcaseArticlesParams>({
    mutationFn: updateShowcaseArticles,
  });

  const handleExcel = async () => {
    const { dataSheets } = await mutateAsync({
      ...tableFilters,
      selectedIds: getSelectedRows().map((row) => row.id),
    });
    generateExcelFileV2(dataSheets, "Articles.xlsx", true);
  };

  const handlePDF = async (view?: boolean) => {
    const selectedIds = getSelectedRows().map((row) => row.id);

    if (!selectedIds.length) {
      toast.warning("Veuillez sélectionner des articles");
      return;
    }

    setIsPendingPDF(true);
    try {
      const isSingle = selectedIds.length === 1;
      const blob = isSingle
        ? await generateArticlesPDF({ articleIds: selectedIds })
        : await generateCataloguePDF({ articleIds: selectedIds });
      const filename = isSingle ? "Article.pdf" : "Catalogue.pdf";
      generatePDF(blob, filename, view);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsPendingPDF(false);
    }
  };

  const handleUpdateShowcaseArticles = async () => {
    const selectedIds = getSelectedRows().map((row) => row.id);
    if (!selectedIds.length) {
      toast.warning("Veuillez sélectionner des articles");
      return;
    }

    await updateShowcaseArticlesMutation({
      selectedIds,
    });
  };

  const handleSetFilter = (
    key: keyof ArticlesTableFilters,
    value: string | undefined | null,
  ) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const { setIsFilterBarOpen } = useGeneral();

  const handleResetFilters = () => {
    setLocalFilters({});
    resetFilters();
    setIsFilterBarOpen(false);
  };

  const onCloseFilterBar = useCallback(() => {
    const activeTableFilters = Object.entries(tableFilters).reduce(
      (acc, [key, value]) => {
        if (value) acc[key as keyof ArticlesTableFilters] = value;
        return acc;
      },
      {} as ArticlesTableFilters,
    );
    setLocalFilters(activeTableFilters);
  }, [tableFilters]);

  const handleFilter = debounce((value: string) => {
    handleSetFilters("search", value);
  }, 400);

  const handleSubmit = (_e: FieldValues) => {
    const newFilters: ArticlesTableFilters = {};

    Object.keys(localFilters).map((key) => {
      const filterKey = key as keyof ArticlesTableFilters;
      const value = localFilters[filterKey];

      if (value) newFilters[filterKey] = value;
    });

    handleSetFiltersObject(newFilters);

    setIsFilterBarOpen(false);
  };

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
          disabled={
            isPending || isPendingPDF || isPendingShowcaseArticlesUpdate
          }
        />
        <Button
          type="button"
          className={cn(btnsClassName, "grow-[unset] bg-[#DFFFD7]", {
            "opacity-50":
              isPending || isPendingPDF || isPendingShowcaseArticlesUpdate,
          })}
          onClick={handleUpdateShowcaseArticles}
          disabled={
            isPending || isPendingPDF || isPendingShowcaseArticlesUpdate
          }
        >
          <ShowcaseIcon className="h-4 w-4" />
          Afficher sur le site vitrine
        </Button>
        <Button
          type="button"
          className={cn(
            btnsClassName,
            "!w-fit grow-[unset] bg-light-yellow-normal",
            {
              "opacity-50":
                isPending || isPendingPDF || isPendingShowcaseArticlesUpdate,
            },
          )}
          onClick={handleExcel}
          disabled={
            isPending || isPendingPDF || isPendingShowcaseArticlesUpdate
          }
        >
          <ExcelIcon className="h-4 w-4 smallTabletScreen:h-5 smallTabletScreen:w-5" />
          <span className="whitespace-nowrap smallTabletScreen:hidden">
            Export Excel
          </span>
        </Button>
        <Button
          type="button"
          className={cn(btnsClassName, "grow-[unset] bg-light-blue-normal", {
            "opacity-50":
              isPending || isPendingPDF || isPendingShowcaseArticlesUpdate,
          })}
          onClick={() => handlePDF()}
          disabled={
            isPending || isPendingPDF || isPendingShowcaseArticlesUpdate
          }
        >
          <PdfIcon className="h-4 w-4 smallTabletScreen:h-5 smallTabletScreen:w-5" />
          <span className="whitespace-nowrap smallTabletScreen:hidden">
            Export pdf
          </span>
        </Button>
        <Button
          type="button"
          className={cn(btnsClassName, "grow-[unset] bg-light-blue-normal", {
            "opacity-50":
              isPending || isPendingPDF || isPendingShowcaseArticlesUpdate,
          })}
          onClick={() => handlePDF(true)}
          disabled={
            isPending || isPendingPDF || isPendingShowcaseArticlesUpdate
          }
        >
          <PdfIcon className="h-4 w-4 smallTabletScreen:h-5 smallTabletScreen:w-5" />
          <span className="whitespace-nowrap smallTabletScreen:hidden">
            Voir le PDF
          </span>
        </Button>
        <Button
          type="button"
          className={cn(btnsClassName, "grow-[unset] bg-light-green-normal", {
            "opacity-50":
              isPending || isPendingPDF || isPendingShowcaseArticlesUpdate,
          })}
          onClick={handleEmail}
          disabled={
            isPending || isPendingPDF || isPendingShowcaseArticlesUpdate
          }
        >
          <SendEmailIcon className="h-4 w-4 smallTabletScreen:h-5 smallTabletScreen:w-5" />
          <span className="whitespace-nowrap smallTabletScreen:hidden">
            Envoyer via email
          </span>
        </Button>
        <Button
          type="button"
          className={cn(btnsClassName, "grow-[unset] bg-[#25D366] text-white", {
            "opacity-50":
              isPending || isPendingPDF || isPendingShowcaseArticlesUpdate,
          })}
          onClick={handleWhatsApp}
          disabled={
            isPending || isPendingPDF || isPendingShowcaseArticlesUpdate
          }
        >
          <WhatsAppIcon className="h-4 w-4 smallTabletScreen:h-5 smallTabletScreen:w-5" />
          <span className="whitespace-nowrap smallTabletScreen:hidden">
            Envoyer via WhatsApp
          </span>
        </Button>
        <Button
          type="button"
          className={cn(btnsClassName, "grow-[unset] bg-gray-inputBg", {
            "opacity-50":
              isPending || isPendingPDF || isPendingShowcaseArticlesUpdate,
          })}
          onClick={handleAdd}
          disabled={
            isPending || isPendingPDF || isPendingShowcaseArticlesUpdate
          }
        >
          <PlusIcon className="h-4 w-4 smallTabletScreen:h-5 smallTabletScreen:w-5" />
          <span className="whitespace-nowrap smallTabletScreen:hidden">
            Ajouter un article
          </span>
        </Button>
        <Button
          type="button"
          className={cn(
            btnsClassName,
            "relative grow-0 bg-gray-inputBg p-2.5 smallTabletScreen:hidden",
            {
              "opacity-50":
                isPending || isPendingPDF || isPendingShowcaseArticlesUpdate,
            },
          )}
          onClick={() => setIsFilterBarOpen(true)}
          disabled={
            isPending || isPendingPDF || isPendingShowcaseArticlesUpdate
          }
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
            type="button"
            className={cn(
              btnsClassName,
              "!w-full bg-gray-inputBg mobileScreen:whitespace-break-spaces mobileScreen:text-xs",
              {
                "opacity-50":
                  isPending || isPendingPDF || isPendingShowcaseArticlesUpdate,
              },
            )}
            disabled={
              isPending || isPendingPDF || isPendingShowcaseArticlesUpdate
            }
            onClick={handleAdd}
          >
            <PlusIcon className="h-4 w-4 mobileScreen:h-4 mobileScreen:w-4" />
            <span className="">Ajouter un article</span>
          </Button>

          <Button
            type="button"
            className={cn(btnsClassName, "bg-light-blue-normal", {
              "opacity-50":
                isPending || isPendingPDF || isPendingShowcaseArticlesUpdate,
            })}
            onClick={() => handlePDF()}
            disabled={
              isPending || isPendingPDF || isPendingShowcaseArticlesUpdate
            }
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
            type="button"
            className={cn(btnsClassName, "bg-light-yellow-normal", {
              "opacity-50":
                isPending || isPendingPDF || isPendingShowcaseArticlesUpdate,
            })}
            onClick={handleExcel}
            disabled={
              isPending || isPendingPDF || isPendingShowcaseArticlesUpdate
            }
          >
            <ExcelIcon className="h-4 w-4 smallTabletScreen:h-5 smallTabletScreen:w-5" />
          </Button>
          <Button
            type="button"
            className={cn(btnsClassName, "bg-[#DFFFD7]", {
              "opacity-50":
                isPending || isPendingPDF || isPendingShowcaseArticlesUpdate,
            })}
            onClick={() => {}}
            disabled={
              isPending || isPendingPDF || isPendingShowcaseArticlesUpdate
            }
          >
            <ShowcaseIcon className="h-4 w-4 smallTabletScreen:h-5 smallTabletScreen:w-5" />
          </Button>
          <Button
            type="button"
            className={cn(btnsClassName, "bg-light-green-normal", {
              "opacity-50":
                isPending || isPendingPDF || isPendingShowcaseArticlesUpdate,
            })}
            onClick={handleEmail}
            disabled={
              isPending || isPendingPDF || isPendingShowcaseArticlesUpdate
            }
          >
            <SendEmailIcon className="h-4 w-4 smallTabletScreen:h-5 smallTabletScreen:w-5" />
          </Button>
        </Flexbox>

        <Flexbox row fullWidth className="gap-2">
          <TextInput
            onChange={(e) => handleFilter(e.target.value)}
            icon={<SearchIcon className="w-5" />}
            placeholder="Chercher"
            inputClassName=":focus:bg-transparent bg-transparent h-full text-xs placeholder-[#B4B4B4]"
            className="relative flex !h-full max-h-9 w-full min-w-52 items-center gap-2 bg-gray-inputBg px-[14px] py-1.5 placeholder:text-black smallTabletScreen:ml-0 smallTabletScreen:min-h-10"
            disabled={
              isPending || isPendingPDF || isPendingShowcaseArticlesUpdate
            }
          />

          <Button
            type="button"
            className={cn(
              btnsClassName,
              "relative ml-auto grow-0 bg-gray-inputBg p-2.5",
              {
                "opacity-50":
                  isPending || isPendingPDF || isPendingShowcaseArticlesUpdate,
              },
            )}
            disabled={
              isPending || isPendingPDF || isPendingShowcaseArticlesUpdate
            }
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
        defaultValues={{ title: "", ...localFilters }}
      >
        <ArticlesFilters handleSetFilter={handleSetFilter} />
      </FilterBar>

      <ArticleSendEmailModal
        isOpen={isSendEmailModalOpen}
        onCancel={handleCloseEmail}
      />
      <ArticleSendWhatsAppModal
        isOpen={isSendWhatsAppModalOpen}
        onCancel={handleCloseWhatsApp}
      />
    </>
  );
};

export default ArticleTableHeaderWithFilterTrigger;
