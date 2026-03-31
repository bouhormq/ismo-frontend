import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import DeleteTrashCanIcon from "$/icons/Table/DeleteTrashCanIcon";

type Props = {
  handleOpenActionModal: VoidFunction;
  handleOpenDeleteModal: VoidFunction;
};

export const CompanyActionsTableActions = ({
  // handleOpenActionModal,
  handleOpenDeleteModal,
}: Props) => {
  return (
    <Flexbox row fullWidth align="center" justify="center" className="gap-4">
      <Button
        className="w-fit rounded-full bg-[#F4F5F7] p-2"
        onClick={(e) => {
          e.stopPropagation();
          handleOpenDeleteModal();
        }}
      >
        <DeleteTrashCanIcon />
      </Button>

      {/* <Button
        className="w-fit rounded-full bg-[#F4F5F7] p-2"
        onClick={(e) => {
          e.stopPropagation();
          handleOpenActionModal();
        }}
      >
        <EditDocumentIcon />
      </Button> */}
    </Flexbox>
  );
};
