import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import ResponsiveDialog from "$/components/DialogComponents/ResponsiveDialog";
import FQuillInput from "$/components/form/FQuillInput/FQuillInput";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import { EditCompanyDataType } from "$/pages/ClientPage/_features/constants/validations.constants";

type Props = {
  isOpen: boolean;
  handleSetOpen: (open: boolean) => void;
  handleOnSave: VoidFunction;
};

const CompanyMemoModal = ({ isOpen, handleSetOpen, handleOnSave }: Props) => {
  const form = useFormContext<EditCompanyDataType>();

  const [newMemoValue, setNewMemoValue] = useState("");

  const memo = useMemo(() => form.watch("memo") ?? "", [form]);

  const onCancel = () => {
    setNewMemoValue(memo);
    handleSetOpen(false);
  };

  useEffect(() => {
    setNewMemoValue(memo);
  }, [memo]);

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
        <h3 className="text-2xl font-normal text-[#082559]">Mémo</h3>

        <FQuillInput
          theme="snow"
          name="_memo"
          label=""
          newValue={newMemoValue}
          onChange={(e) => setNewMemoValue(e.target.value)}
          backgroundColor="bg-[#F4F5F7] shadow-quillShadow"
        />

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
            onClick={handleOnSave}
          >
            Sauvegarder
          </Button>
        </Flexbox>
      </Flexbox>
    </ResponsiveDialog>
  );
};

export default CompanyMemoModal;
