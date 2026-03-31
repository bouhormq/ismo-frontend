import ResponsiveDialog from "$/components/DialogComponents/ResponsiveDialog";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";

import UploadedPhotoItem from "./UploadedPhotoItem";

type Props = {
  isOpen: boolean;
  handleSetOpen: (open: boolean) => void;
  files: File[];
};

const UploadPhotoModal = ({ isOpen, handleSetOpen, files }: Props) => {
  // const defaultFiles =

  const onCancel = () => {
    handleSetOpen(false);
  };

  return (
    <ResponsiveDialog
      open={isOpen}
      handleSetOpen={handleSetOpen}
      className="w-full max-w-screen-2xl"
    >
      <Flexbox
        align="center"
        justify="center"
        fullWidth
        className="relative gap-6 rounded-[34px] bg-white px-6 py-5"
      >
        <h3 className="text-2xl font-normal text-[#082559]">
          Télécharger une photo
        </h3>

        {files.map((file) => (
          <UploadedPhotoItem key={file.name} file={file} />
        ))}

        <Flexbox row fullWidth justify="center" className="gap-2">
          <Button
            variant="outlined"
            className="w-fit rounded-full border-[#0A2D6E] text-[#0A2D6E]"
            onClick={onCancel}
          >
            Annuler
          </Button>

          <Button
            variant="primary"
            className="w-fit rounded-full"
            // onClick={handleOnSave}
          >
            Sauvegarder
          </Button>
        </Flexbox>
      </Flexbox>
    </ResponsiveDialog>
  );
};

export default UploadPhotoModal;
