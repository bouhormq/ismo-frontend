import { debounce } from "lodash";
import { SearchIcon } from "lucide-react";
import { generatePath, useNavigate } from "react-router-dom";

import TextInput from "$/components/inputs/TextInput";
import {
  EnhancedTable,
  EnhancedTableSortableColumnHeader,
} from "$/components/tables/enhanced-table";
import { useEnhancedTable } from "$/components/tables/enhanced-table/EnhancedTableProvider";
import Flexbox from "$/components/ui/Flexbox";
import { TableColumn } from "$/components/ui/table/Table";
import { PATHS } from "$/routes/constants";
import {
  CompanyArticleRecord,
  CompanyArticlesResponse,
  CompanyArticlesTableFilters,
} from "$/types/api/article.types";
import { format } from "$/utils/functions/date.functions";

const dashboardTableHeaders: TableColumn<CompanyArticleRecord>[] = [
  {
    selector: "createdAt",
    title: "Date de création",

    cell: (cell) => {
      return (
        <p className="text-center text-xs font-normal text-black">
          {format(new Date(cell.getValue()), "dd/MM/yyyy")}
        </p>
      );
    },
    header: () => (
      <EnhancedTableSortableColumnHeader
        selector="createdAt"
        title="Date de création"
        className="w-full justify-center"
      />
    ),
  },
  {
    selector: "reference",
    title: "Référence",

    cell: (cell) => {
      return (
        <p className="text-center text-xs font-normal text-black">
          {cell.getValue()}
        </p>
      );
    },
    header: () => (
      <EnhancedTableSortableColumnHeader
        selector="reference"
        title="Référence"
        className="w-full justify-center"
      />
    ),
  },
  {
    selector: "title",
    title: "Titre",

    cell: (cell) => {
      return (
        <p className="text-center text-xs font-normal text-black">
          {cell.getValue()}
        </p>
      );
    },
    header: () => (
      <EnhancedTableSortableColumnHeader
        selector="title"
        title="Titre"
        className="w-full justify-center"
      />
    ),
  },
  {
    selector: "purchasePriceWithoutTVA",
    title: "Prix d'achat (HT)",

    cell: (cell) => {
      return (
        <p className="text-center text-xs font-normal text-black">
          {cell.getValue()}
        </p>
      );
    },
    header: () => (
      <EnhancedTableSortableColumnHeader
        selector="purchasePriceWithoutTVA"
        title="Prix d'achat (HT)"
        className="w-full justify-center"
      />
    ),
  },
  {
    selector: "equipmentCondition",
    title: "Etat",

    cell: (cell) => {
      return (
        <p className="text-center text-xs font-normal text-black">
          {cell.getValue()}
        </p>
      );
    },
    header: () => (
      <EnhancedTableSortableColumnHeader
        selector="equipmentCondition"
        title="Etat"
        className="w-full justify-center"
      />
    ),
  },
];

export const CompanyArticlesTable = () => {
  const navigate = useNavigate();

  const { handleSetFilters } = useEnhancedTable<
    CompanyArticlesResponse,
    CompanyArticleRecord,
    CompanyArticlesTableFilters
  >();

  const handleFilter = debounce((value: string) => {
    handleSetFilters("search", value);
  }, 400);

  return (
    <Flexbox fullWidth className="gap-4">
      <TextInput
        onChange={(e) => handleFilter(e.target.value)}
        icon={<SearchIcon className="w-5" />}
        placeholder="Chercher"
        inputClassName=":focus:bg-transparent bg-transparent h-full text-xs placeholder-[#B4B4B4]"
        className="relative flex !h-full max-h-9 min-w-[250px] max-w-64 items-center gap-2 self-end bg-gray-inputBg px-[14px] py-1.5 placeholder:text-black tabletScreen:ml-0 tabletScreen:min-h-10"
      />

      <EnhancedTable<CompanyArticleRecord>
        tableClassName="rounded-lg max-h-[300px]"
        paginatable
        columns={dashboardTableHeaders}
        onRowClick={(row) => {
          const { id } = row.original;
          navigate(generatePath(PATHS.ARTICLE_SHOW_PAGE, { id: String(id) }));
        }}
      />
    </Flexbox>
  );
};
