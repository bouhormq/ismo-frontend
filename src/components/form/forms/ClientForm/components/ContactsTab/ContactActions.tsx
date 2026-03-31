import { CellContext } from "@tanstack/react-table";
import { useState } from "react";

import ResponsiveDialog from "$/components/DialogComponents/ResponsiveDialog";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import DeleteTrashCanIcon from "$/icons/Table/DeleteTrashCanIcon";
import { ContactRecord } from "$/types/models/contact.types";

import { DeleteContactModal } from "./DeleteContactModal";

type Props = {
  cell: CellContext<
    ContactRecord & {
      actions: string;
    },
    string
  >;
};
export const ContactActions = ({ cell }: Props) => {
  const [isDeleteContactModalOpen, setIsDeleteContactModalOpen] =
    useState(false);

  return (
    <Flexbox row align="center" justify="center" className="gap-3">
      <Button
        className="w-fit rounded-full bg-[#F4F5F7] p-2"
        onClick={(e) => {
          e.stopPropagation();
          setIsDeleteContactModalOpen(true);
        }}
      >
        <DeleteTrashCanIcon />
      </Button>
      <ResponsiveDialog
        open={isDeleteContactModalOpen}
        handleSetOpen={setIsDeleteContactModalOpen}
      >
        <DeleteContactModal
          contactId={cell.row.original.id}
          handleClose={() => setIsDeleteContactModalOpen(false)}
        />
      </ResponsiveDialog>
    </Flexbox>
  );
};

export default ContactActions;
