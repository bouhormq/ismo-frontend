import { CellContext } from "@tanstack/react-table";
import { useState } from "react";

import ResponsiveDialog from "$/components/DialogComponents/ResponsiveDialog";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import DeleteTrashCanIcon from "$/icons/Table/DeleteTrashCanIcon";
import { DocumentRecord } from "$/types/models/document.types";

import { DeleteDocumentModal } from "./DeleteDocumentModal";

type Props = {
  cell: CellContext<
    DocumentRecord & {
      actions: string;
    },
    string
  >;
};
function DocumentActions({ cell }: Props) {
  const [isDeleteDocumentModalOpen, setIsDeleteDocumentModalOpen] =
    useState(false);

  return (
    <Flexbox row justify="center" className="gap-3">
      <Button
        className="w-fit rounded-full bg-[#F4F5F7] p-2"
        onClick={(e) => {
          e.stopPropagation();
          setIsDeleteDocumentModalOpen(true);
        }}
      >
        <DeleteTrashCanIcon />
      </Button>
      <ResponsiveDialog
        open={isDeleteDocumentModalOpen}
        handleSetOpen={setIsDeleteDocumentModalOpen}
      >
        <DeleteDocumentModal
          isCompanyDocument
          documentId={cell.row.original.id}
          handleClose={() => setIsDeleteDocumentModalOpen(false)}
        />
      </ResponsiveDialog>
    </Flexbox>
  );
}

export default DocumentActions;
