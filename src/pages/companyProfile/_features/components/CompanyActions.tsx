import { CellContext } from "@tanstack/react-table";

import { CompanyRecord } from "$/api/companies/get-all-companies";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import DeleteTrashCanIcon from "$/icons/Table/DeleteTrashCanIcon";

type Props = {
  cell: CellContext<
    CompanyRecord & {
      actions: string;
    },
    string
  >;
  handleOpenDeletePopup: (id: number) => void;
};

function CompanyActions({ cell, handleOpenDeletePopup }: Props) {
  return (
    <>
      <Flexbox align="center" justify="center" row className="w-20 gap-3">
        {/* <Button className="h-6 w-6 rounded-full bg-[#F4F5F7] p-2">
          <HistoryIcon className="shrink-0" />
        </Button> */}
        {/* {cell.row.original.phoneNumber ? (
          <a
            target="_blank"
            href={`https://wa.me/${cell.row.original.phoneNumber}`}
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full bg-[#F4F5F7] p-2",
            )}
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <WhatsAppIcon className="shrink-0" />
          </a>
        ) : (
          <Button className="h-6 w-6 cursor-not-allowed rounded-full bg-[#F4F5F7] p-2 opacity-50">
            <WhatsAppIcon className="shrink-0" />
          </Button>
        )} */}

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
    </>
  );
}

export default CompanyActions;
