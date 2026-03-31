import { useState } from "react";
import { useFormContext } from "react-hook-form";

import FQuillInput from "$/components/form/FQuillInput/FQuillInput";
import Flexbox from "$/components/ui/Flexbox";
import { EditCompanyDataType } from "$/pages/ClientPage/_features/constants/validations.constants";

import CompanyMemoModal from "./CompanyMemoModal";

export const MemoTab = () => {
  const form = useFormContext<EditCompanyDataType>();

  const { setValue, watch } = form;

  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);

  const handleOpenMemoModal = () => {
    setIsMemoModalOpen(true);
  };

  const handleSetOpen = (open: boolean) => {
    setIsMemoModalOpen(open);
  };

  const handleOnSave = () => {
    setValue("memo", watch("_memo"));
    setIsMemoModalOpen(false);
  };

  return (
    <>
      <Flexbox fullWidth className="relative mt-2">
        <FQuillInput
          theme="snow"
          name="memo"
          label=""
          backgroundColor="bg-[#F4F5F7] shadow-quillShadow"
        />

        <p
          className="absolute right-8 top-9 cursor-pointer text-xs font-normal text-[#0A2D6E] underline hover:opacity-75 tabletScreen:bottom-8 tabletScreen:top-[unset]"
          onClick={handleOpenMemoModal}
        >
          Voir la description complète
        </p>
      </Flexbox>

      <CompanyMemoModal
        isOpen={isMemoModalOpen}
        handleSetOpen={handleSetOpen}
        handleOnSave={handleOnSave}
      />
    </>
  );
};
