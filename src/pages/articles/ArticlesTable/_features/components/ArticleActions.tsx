import { CellContext } from "@tanstack/react-table";

import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import DeleteTrashCanIcon from "$/icons/Table/DeleteTrashCanIcon";
import { ArticleRecord } from "$/types/api/article.types";

type Props = {
  cell: CellContext<ArticleRecord & { actions: string }, string>;
  handleOpenDeletePopup: (id: number) => void;
};

function ArticleActions({ cell, handleOpenDeletePopup }: Props) {
  return (
    <Flexbox align="center" justify="center" row className="w-[150px] gap-3">
      <Button
        className="h-6 w-6 rounded-full bg-[#F4F5F7] p-2"
        onClick={(e) => {
          e.stopPropagation();
          handleOpenDeletePopup(cell.row.original.id);
        }}
      >
        <DeleteTrashCanIcon className="shrink-0" />
      </Button>
    </Flexbox>
  );
}

export default ArticleActions;
