import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";

import { deleteArticle } from "$/api/articles/delete-article";
import {
  EnhancedTable,
  EnhancedTableSortableColumnHeader,
} from "$/components/tables/enhanced-table";
import Flexbox from "$/components/ui/Flexbox";
import { TableColumn } from "$/components/ui/table/Table";
import { PATHS } from "$/routes/constants";
import { ArticleRecord } from "$/types/api/article.types";

import ArticleActions from "./ArticleActions";
import DeleteArticleModal from "./DeleteArticleModal";

const ArticlesTable = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [deleteArticlePopup, setDeleteArticlePopup] = useState<{
    isOpen: boolean;
    id?: number;
  }>({ isOpen: false });

  const handleOpenDeletePopup = (id: number) => {
    setDeleteArticlePopup({ isOpen: true, id });
  };

  const dashboardTableHeaders: TableColumn<
    ArticleRecord & { actions: string }
  >[] = [
    {
      selector: "photo",
      title: "Photo",

      cell: (cell) => {
        const { photo } = cell.row.original;

        return (
          <Flexbox align="center" justify="center" className="m-2 ml-3 w-14">
            {photo ? (
              <img
                src={photo}
                alt={cell.row.original.companyName}
                className="max-w-full rounded-lg"
              />
            ) : (
              <span>-</span>
            )}
          </Flexbox>
        );
      },
    },
    {
      selector: "reference",
      title: "Référence",

      cell: (cell) => {
        return (
          <p className="text-center text-sm font-medium text-black">
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
          <p className="text-center text-sm font-semibold text-black">
            {cell.getValue()}
          </p>
        );
      },
      header: () => (
        <EnhancedTableSortableColumnHeader
          selector="title"
          title="Titre"
          className="w-[200px] justify-center"
        />
      ),
    },
    {
      selector: "category",
      title: "Categorie",
      cell: (cell) => {
        return (
          <p className="text-center text-sm font-medium text-black">
            {cell.getValue()}
          </p>
        );
      },
      header: () => (
        <EnhancedTableSortableColumnHeader
          selector="category"
          title="Categorie"
          className="w-[120px] justify-center"
        />
      ),
    },
    {
      selector: "section",
      title: "Rubrique",
      cell: (cell) => {
        return (
          <p className="text-center text-sm font-medium text-black">
            {cell.getValue()}
          </p>
        );
      },
      header: () => (
        <EnhancedTableSortableColumnHeader
          selector="section"
          title="Rubrique"
          className="w-[120px] justify-center"
        />
      ),
    },
    {
      selector: "purchasePriceWithoutTVA",
      title: "Prix d’achat (HT)",
      cell: (cell) => {
        return (
          <p className="text-center text-sm font-medium text-black">
            {cell.getValue()}
          </p>
        );
      },
      header: () => (
        <EnhancedTableSortableColumnHeader
          selector="purchasePriceWithoutTVA"
          title="Prix d’achat (HT)"
          className="w-[120px] justify-center"
        />
      ),
    },
    {
      selector: "equipmentCondition",
      title: "Etat",
      cell: (cell) => {
        return (
          <p className="text-center text-sm font-medium text-black">
            {cell.getValue()}
          </p>
        );
      },
      header: () => (
        <EnhancedTableSortableColumnHeader
          selector="equipmentCondition"
          title="Etat"
          className="w-[100px] justify-center"
        />
      ),
    },
    {
      selector: "companyName",
      title: "Société fournisseur",
      cell: (cell) => {
        return (
          <p className="text-center text-sm font-medium text-black">
            {cell.getValue()}
          </p>
        );
      },
      header: () => (
        <EnhancedTableSortableColumnHeader
          selector="companyName"
          title="Société fournisseur"
          className="w-[120px] justify-center"
        />
      ),
    },
    {
      selector: "companyCountry",
      title: "Pays",
      cell: (cell) => {
        return (
          <p className="text-center text-sm font-medium text-black">
            {cell.getValue()}
          </p>
        );
      },
      header: () => (
        <EnhancedTableSortableColumnHeader
          selector="companyCountry"
          title="Pays"
          className="w-full justify-center"
        />
      ),
    },
    {
      selector: "companyCity",
      title: "Ville",
      cell: (cell) => {
        return (
          <p className="text-center text-sm font-medium text-black">
            {cell.getValue()}
          </p>
        );
      },
      header: () => (
        <EnhancedTableSortableColumnHeader
          selector="companyCity"
          title="Ville"
          className="w-full justify-center"
        />
      ),
    },
    {
      selector: "actions",
      title: "Actions",
      cell: (cell) => {
        return (
          <ArticleActions
            cell={cell}
            handleOpenDeletePopup={handleOpenDeletePopup}
          />
        );
      },
    },
  ];

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-articles"] });
      setDeleteArticlePopup({ isOpen: false });
    },
  });

  const handleDeleteArticle = () => {
    if (!deleteArticlePopup.id) return;
    mutateAsync(deleteArticlePopup.id);
  };

  return (
    <>
      <EnhancedTable<ArticleRecord & { actions: string }>
        tableClassName="rounded-lg !text-lg"
        rowClassName={() => "[&>td>p]:text-base"}
        paginatable
        selectable
        onRowClick={(row) => {
          navigate(
            generatePath(PATHS.ARTICLE_SHOW_PAGE, {
              id: String(row.original.id),
            }),
          );
        }}
        columns={dashboardTableHeaders}
      />

      <DeleteArticleModal
        isOpen={deleteArticlePopup.isOpen}
        handleSetOpen={(open) =>
          setDeleteArticlePopup((prev) => ({ ...prev, isOpen: open }))
        }
        handleOnDelete={handleDeleteArticle}
        isLoading={isPending}
      />
    </>
  );
};

export default ArticlesTable;
