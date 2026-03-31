import { PlusIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import ResponsiveDialog from "$/components/DialogComponents/ResponsiveDialog";
import TextInput from "$/components/inputs/TextInput";
import {
  EnhancedTable,
  EnhancedTableSortableColumnHeader,
} from "$/components/tables/enhanced-table";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import { TableColumn } from "$/components/ui/table/Table";
import useGetMediaUrl from "$/hooks/useGetMediaUrl";
import PdfIcon from "$/icons/Filters/PdfIcon";
import { DocumentRecord } from "$/types/models/document.types";
import { getMediaType } from "$/utils/functions/misc.functions";

import DocumentActions from "./DocumentActions";
import { DocumentModal } from "./DocumentModal";

type Props = {
  onFilter: (value: string) => void;
  isAddingEnable: boolean;
};

const DocumentNameCell = ({
  name,
  media,
}: {
  name: string;
  media: string | File | undefined;
}) => {
  let mediaType: ReturnType<typeof getMediaType> = null;

  if (media) {
    mediaType = getMediaType(media);
  }

  const mediaUrl = useGetMediaUrl(media);

  return (
    <Flexbox row className="gap-2.5 md:pl-5" align="center">
      <Flexbox
        className="w-10 rounded-full p-2 md:w-20"
        align="center"
        justify="center"
      >
        {mediaUrl && (
          <Link
            to={mediaUrl}
            target="_blank"
            className="no-underline"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {mediaType?.extension === "pdf" && (
              <PdfIcon className="size-7 md:size-10" />
            )}
            {mediaType?.type === "image" && (
              <img
                src={mediaUrl}
                alt="file"
                className="max-h-7 max-w-full rounded-lg md:max-h-10"
              />
            )}
          </Link>
        )}
      </Flexbox>
      <p className="text-xs font-normal">{name}</p>
    </Flexbox>
  );
};

const dashboardTableHeaders: TableColumn<
  DocumentRecord & { actions: string }
>[] = [
  {
    selector: "name",
    title: "Document",
    cell: (cell) => {
      const media = cell.row.original.file ?? cell.row.original.url;

      return <DocumentNameCell name={cell.row.original.name} media={media} />;
    },
    header: () => (
      <EnhancedTableSortableColumnHeader
        selector="name"
        title="Document"
        className="w-full pl-10"
      />
    ),
  },
  {
    selector: "createdAt",
    title: "Date",
    cell: (cell) => {
      return (
        <p className="font-normal text-black">
          {new Date(cell.getValue() ?? "").toLocaleDateString("FR")}
        </p>
      );
    },
    header: () => (
      <EnhancedTableSortableColumnHeader selector="date" title="Date" />
    ),
  },
  {
    selector: "actions",
    title: "Actions",
    cell: (cell) => {
      return <DocumentActions cell={cell} />;
    },
    header: () => <p className="text-center text-xs">Actions</p>,
  },
];

const DocumentsTable = ({ onFilter, isAddingEnable }: Props) => {
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<
    number | undefined
  >(undefined);

  const handleRowClick = (id: number) => {
    setSelectedDocumentId(id);
    setIsDocumentModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedDocumentId(undefined);
    setIsDocumentModalOpen(true);
  };

  return (
    <>
      <Flexbox
        row
        fullWidth
        justify="end"
        align="center"
        className="mb-4 mt-2 gap-2"
      >
        <TextInput
          onChange={(e) => onFilter(e.target.value)}
          icon={<SearchIcon className="w-5" />}
          placeholder="Chercher"
          inputClassName=":focus:bg-transparent bg-transparent h-full text-xs placeholder-[#B4B4B4]"
          className="relative flex !h-full max-h-9 w-[250px] min-w-[150px] max-w-64 items-center gap-2 bg-gray-inputBg px-[14px] py-1.5 placeholder:text-black tabletScreen:ml-0 tabletScreen:min-h-10"
        />
        <Button
          type="button"
          className="w-fit gap-1 rounded-full bg-gray-inputBg px-3 py-2 text-sm font-medium"
          onClick={handleAddClick}
          disabled={!isAddingEnable}
        >
          <PlusIcon className="h-4 w-4" />
          Ajouter
        </Button>
      </Flexbox>
      {isDocumentModalOpen && (
        <ResponsiveDialog
          open={isDocumentModalOpen}
          handleSetOpen={setIsDocumentModalOpen}
        >
          <DocumentModal
            handleClose={() => setIsDocumentModalOpen(false)}
            documentId={selectedDocumentId}
            isCompanyDocument
          />
        </ResponsiveDialog>
      )}
      <EnhancedTable<DocumentRecord & { actions: string }>
        tableClassName="rounded-lg max-h-[300px]"
        paginatable
        columns={dashboardTableHeaders}
        onRowClick={(row) => handleRowClick(row.original.id)}
        minWidth={400}
      />
    </>
  );
};

export default DocumentsTable;
