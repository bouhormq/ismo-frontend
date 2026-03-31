import { DebouncedFunc } from "lodash";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import ResponsiveDialog from "$/components/DialogComponents/ResponsiveDialog";
import TextInput from "$/components/inputs/TextInput";
import {
  EnhancedTable,
  EnhancedTableSortableColumnHeader,
} from "$/components/tables/enhanced-table";
import { useEnhancedTable } from "$/components/tables/enhanced-table/EnhancedTableProvider";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import { TableColumn } from "$/components/ui/table/Table";
import PlusIcon from "$/icons/Filters/PlusIcon";
import { GreenCheckIcon } from "$/icons/Table/GreenCheckIcon";
import { RedXIcon } from "$/icons/Table/RedXIcon";
import WhatsAppIcon from "$/icons/Table/WhatsAppIcon";
import EnvelopeEmailIcon from "$/icons/Ui/EnvelopeEmailIcon";
import {
  ContactRecord,
  ContactRecordResponse,
  ContactsTableFilters,
} from "$/types/models/contact.types";

import ContactActions from "./ContactActions";
import { ContactModal } from "./ContactModal";
import { ContactSendEmailModal } from "./SendEmail/ContactSendEmailModal";

type Props = {
  onFilter: DebouncedFunc<(value: string) => void>;
  companyId: number;
};

const ContactsTable = ({ onFilter, companyId }: Props) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<
    number | undefined
  >(undefined);
  const [isSendEmailModalOpen, setIsSendEmailModalOpen] = useState(false);
  const { getSelectedRows } = useEnhancedTable<
    ContactRecordResponse,
    ContactRecord,
    ContactsTableFilters
  >();

  const { resetField } = useFormContext();

  const dashboardTableHeaders: TableColumn<
    ContactRecord & { actions: string }
  >[] = [
    {
      selector: "gender",
      title: "Civilitie",
      cell: (cell) => {
        return (
          <p className="text-center font-normal text-black">
            {cell.getValue() === "MALE" ? "Monsieur" : "Madame"}
          </p>
        );
      },
      header: () => (
        <EnhancedTableSortableColumnHeader
          selector="gender"
          title="Civilitie"
          className="min-w-[75px] justify-center"
        />
      ),
    },
    {
      selector: "firstName",
      title: "Nom",

      cell: (cell) => {
        return (
          <p className="text-center font-normal text-black">
            {cell.getValue()}
          </p>
        );
      },
      header: () => (
        <EnhancedTableSortableColumnHeader
          selector="firstName"
          title="Nom"
          className="min-w-[75px] justify-center"
        />
      ),
    },
    {
      selector: "lastName",
      title: "Prénom",

      cell: (cell) => {
        return (
          <p className="text-center font-normal text-black">
            {cell.getValue()}
          </p>
        );
      },
      header: () => (
        <EnhancedTableSortableColumnHeader
          selector="lastName"
          title="Prénom"
          className="min-w-[75px] justify-center"
        />
      ),
    },
    {
      selector: "functionality",
      title: "Fonctionnalité",

      cell: (cell) => {
        return (
          <p className="text-center font-normal text-black">
            {cell.getValue() ?? "-"}
          </p>
        );
      },
      header: () => (
        <EnhancedTableSortableColumnHeader
          selector="functionality"
          title="Fonctionnalité"
          className="min-w-[75px] justify-center"
        />
      ),
    },
    {
      selector: "phoneNumber",
      title: "GSM",

      cell: (cell) => {
        return (
          <p className="text-center font-normal text-black">
            {cell.getValue()}
          </p>
        );
      },
      header: () => (
        <EnhancedTableSortableColumnHeader
          selector="phoneNumber"
          title="GSM"
          className="min-w-[75px] justify-center"
        />
      ),
    },
    {
      selector: "hasWhatsapp",
      title: "Whatsapp",

      cell: (cell) => {
        return (
          <p className="text-center text-lg font-semibold text-black">
            {cell.getValue() ? (
              <Flexbox fullWidth align="center">
                <GreenCheckIcon />
              </Flexbox>
            ) : (
              <Flexbox fullWidth align="center">
                <RedXIcon />
              </Flexbox>
            )}
          </p>
        );
      },
      header: () => (
        <EnhancedTableSortableColumnHeader
          selector="hasWhatsapp"
          title="Whatsapp"
          className="min-w-[80px] justify-center"
        />
      ),
    },
    {
      selector: "note",
      title: "Note",

      cell: (cell) => {
        return (
          <p className="w-full py-2 text-center font-normal text-black">
            {cell.getValue()}
          </p>
        );
      },
      header: () => (
        <EnhancedTableSortableColumnHeader
          selector="note"
          title="Note"
          className="!w-full min-w-[400px] justify-center"
        />
      ),
    },
    {
      selector: "actions",
      title: "Actions",
      cell: (cell) => {
        return <ContactActions cell={cell} />;
      },
      header: () => <p className="min-w-[100px] text-center">Actions</p>,
    },
  ];

  const selectedContacts = getSelectedRows();

  const handleRowClick = (id: number) => {
    setSelectedContactId(id);
    setIsContactModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedContactId(undefined);
    setIsContactModalOpen(true);
  };

  const handleOpenMailModal = () => {
    if (selectedContacts.length === 0) {
      toast.warning(
        "Veuillez sélectionner au moins une société pour envoyer un email",
      );
      return;
    }
    setIsSendEmailModalOpen(true);
  };
  const areButtonsDisabled = isNaN(companyId);
  return (
    <>
      <Flexbox
        row
        fullWidth
        className="my-5 h-14 gap-2 md:justify-end mobileScreen:overflow-x-scroll"
      >
        <TextInput
          onChange={(e) => onFilter(e.target.value)}
          icon={<SearchIcon className="w-5" />}
          placeholder="Chercher"
          inputClassName=":focus:bg-transparent bg-transparent h-full text-xs placeholder-[#B4B4B4]"
          className="relative flex !h-full max-h-9 min-w-[150px] max-w-64 items-center gap-2 bg-gray-inputBg px-[14px] py-1.5 placeholder:text-black tabletScreen:ml-0 tabletScreen:min-h-10"
        />
        <Button
          type="button"
          className="w-fit bg-gray-inputBg"
          onClick={handleAddClick}
          disabled={areButtonsDisabled}
        >
          <PlusIcon className="h-4 w-4" />
          Ajouter
        </Button>
        <Link
          to={
            selectedContacts[0]?.phoneNumber && !areButtonsDisabled
              ? `https://wa.me/${selectedContacts[0].phoneNumber}`
              : ""
          }
          aria-disabled={areButtonsDisabled}
          target={selectedContacts[0]?.phoneNumber ? "_blank" : undefined}
        >
          <Button
            type="button"
            className="w-fit bg-blue-lighter"
            disabled={areButtonsDisabled}
          >
            <WhatsAppIcon
              className="size-5 minTabletScreen:size-4"
              fill="black"
            />
            <p className="hidden minTabletScreen:block">
              Contacter via whatsapp{" "}
            </p>
          </Button>
        </Link>
        <Button
          type="button"
          className="w-fit bg-light-green-normal"
          onClick={handleOpenMailModal}
          disabled={areButtonsDisabled}
        >
          <EnvelopeEmailIcon className="size-5 minTabletScreen:size-4" />
          <p className="hidden minTabletScreen:block">Envoyer un email</p>
        </Button>
      </Flexbox>

      <EnhancedTable<ContactRecord & { actions: string }>
        tableClassName="rounded-lg max-h-[300px]"
        paginatable
        columns={dashboardTableHeaders}
        selectable
        rowClassName={() => "bg-blue-skyDarkWithOpacity"}
        onRowClick={(row) => handleRowClick(row.original.id)}
      />

      {isContactModalOpen && (
        <ResponsiveDialog
          open={isContactModalOpen}
          handleSetOpen={setIsContactModalOpen}
          className="mobileScreen:!w-full"
        >
          <ContactModal
            handleClose={() => setIsContactModalOpen(false)}
            contactId={selectedContactId}
            companyId={companyId}
          />
        </ResponsiveDialog>
      )}

      {isSendEmailModalOpen && (
        <ResponsiveDialog
          open={isSendEmailModalOpen}
          handleSetOpen={setIsSendEmailModalOpen}
          className="w-full max-w-[700px] mobileScreen:!w-full mobileScreen:!max-w-[unset]"
        >
          <ContactSendEmailModal
            onCancel={() => {
              setIsSendEmailModalOpen(false);
              resetField("object");
              resetField("message");
            }}
          />
        </ResponsiveDialog>
      )}
    </>
  );
};

export default ContactsTable;
