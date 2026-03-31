import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import { useDocument } from "$/hooks/zustand/useDocument";
import DeleteTrashCanIcon from "$/icons/Table/DeleteTrashCanIcon";

type Props = {
  isCompanyDocument?: boolean;
  documentId: number;
  handleClose: () => void;
};

export const DeleteDocumentModal = ({
  documentId,
  isCompanyDocument,
  handleClose,
}: Props) => {
  const { data, setData } = useDocument();

  const handleDelete = () => {
    const documents = isCompanyDocument
      ? data?.companyDocuments
      : data?.articlePhotos;
    const updatedDocuments = documents?.map((doc) => {
      if (doc.id === documentId) {
        return { ...doc, status: "deleted" };
      }
      return doc;
    });
    isCompanyDocument
      ? setData({ companyDocuments: updatedDocuments })
      : setData({ articlePhotos: updatedDocuments });
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
        Supprimer le document{" "}
      </h1>
      <DeleteTrashCanIcon height="100px" width="80px" className="my-5" />
      <p className="text-center">
        {" "}
        Êtes-vous sûr de vouloir supprimer ce document ?
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
