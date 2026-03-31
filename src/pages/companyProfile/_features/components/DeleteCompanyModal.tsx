import Modal from "$/components/DialogComponents/Modal";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import DeleteIcon from "$/icons/DeleteIcon";

type Props = {
  isOpen: boolean;
  handleSetOpen: (open: boolean) => void;
  handleOnDelete: VoidFunction;
  isLoading: boolean;
};

const DeleteCompanyModal = ({
  isOpen,
  handleSetOpen,
  handleOnDelete,
  isLoading,
}: Props) => {
  const onCancel = () => {
    handleSetOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      className="w-full max-w-[700px] mobileScreen:w-[90%]"
    >
      <Flexbox
        align="center"
        justify="center"
        fullWidth
        className="relative w-full gap-6 rounded-[34px] bg-white py-8 text-center"
      >
        <h3 className="text-[28px] font-normal text-[#082559] mobileScreen:text-xl">
          Supprimer la fiche société
        </h3>

        <DeleteIcon />

        <p className="text-base font-normal text-black mobileScreen:text-xs">
          Êtes-vous sûr de vouloir supprimer cette fiche ?
        </p>

        <Flexbox row fullWidth justify="center" className="mt-4 gap-2">
          <Button
            variant="outlined"
            className="w-fit rounded-full border-[#0A2D6E] text-sm font-normal text-[#0A2D6E]"
            onClick={onCancel}
            disabled={isLoading}
          >
            Annuler
          </Button>

          <Button
            variant="primary"
            className="w-fit rounded-full bg-[#FF0000] text-sm font-normal"
            onClick={handleOnDelete}
            isLoading={isLoading}
          >
            Supprimer
          </Button>
        </Flexbox>
      </Flexbox>
    </Modal>
  );
};

export default DeleteCompanyModal;
