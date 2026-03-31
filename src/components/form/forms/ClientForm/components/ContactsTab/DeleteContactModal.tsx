import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import { useClient } from "$/hooks/zustand/useClient";
import DeleteTrashCanIcon from "$/icons/Table/DeleteTrashCanIcon";

type Props = {
  contactId: number;
  handleClose: () => void;
};

export const DeleteContactModal = ({ contactId, handleClose }: Props) => {
  const { data, setData } = useClient();

  const handleDelete = () => {
    const updatedContacts = data?.contacts?.map((contact) => {
      if (contact.id === contactId) {
        return { ...contact, status: "deleted" };
      }
      return contact;
    });

    setData({ contacts: updatedContacts });
    handleClose();
  };

  return (
    <Flexbox
      fullWidth
      justify="center"
      align="center"
      className="gap-8 rounded-[34px] bg-white px-6 py-5"
    >
      <h1 className="mt-3 text-xl text-blue-primary md:text-[28px]">
        Supprimer le contact{" "}
      </h1>
      <DeleteTrashCanIcon height="100px" width="80px" className="my-5" />
      <p className="text-center">
        {" "}
        Êtes-vous sûr de vouloir supprimer ce contact ?
      </p>
      <Flexbox row fullWidth justify="center" className="gap-2.5">
        <Button
          type="button"
          className="w-1/2 border-[2px] border-blue-primary md:w-2/5"
          onClick={handleClose}
        >
          Annuler
        </Button>
        <Button
          className="w-1/2 bg-red-normal text-white md:w-2/5"
          onClick={handleDelete}
        >
          Supprimer
        </Button>
      </Flexbox>
    </Flexbox>
  );
};
