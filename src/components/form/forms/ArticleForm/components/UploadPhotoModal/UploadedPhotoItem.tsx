import FormStyledTextinput from "$/components/common/FormStyledTextInput";
import FQuillInput from "$/components/form/FQuillInput/FQuillInput";
import Flexbox from "$/components/ui/Flexbox";
import { formatFileSizeV2 } from "$/utils/functions/file.functions";

type Props = {
  file: File;
};

const UploadedPhotoItem = ({ file }: Props) => {
  return (
    <Flexbox fullWidth className="gap-6">
      <Flexbox row className="gap-2">
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="h-12 w-12 rounded-lg"
        />

        <Flexbox className="">
          <p className="text-base font-bold text-[#212529]">{file.name}</p>
          <p className="text-xs font-semibold text-[#ADB5BD]">
            {formatFileSizeV2(file.size)}
          </p>
        </Flexbox>
      </Flexbox>

      <FormStyledTextinput
        name={`file-title-${file.name}`}
        label="Titre"
        labelWrapperClassName="w-full"
      />

      <FQuillInput
        name={`file-description-${file.name}`}
        label=""
        theme="snow"
        backgroundColor="bg-[#F4F5F7] shadow-quillShadow"
      />
    </Flexbox>
  );
};

export default UploadedPhotoItem;
