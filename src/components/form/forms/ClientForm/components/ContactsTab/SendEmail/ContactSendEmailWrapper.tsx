import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getAllArticles } from "$/api/articles/get-all-articles";
import { ContactSendEmailsParams } from "$/api/contacts/contact-send-emails";
import FormDocumentPreview from "$/components/DocumentUpload/FormDocumentPreview";
import { SelectOption } from "$/components/common/FormStyledSelectInput";
import FormStyledTextAreaInput from "$/components/common/FormStyledTextAreaInput";
import FormStyledTextinput from "$/components/common/FormStyledTextInput";
import FormFileInput from "$/components/form/FormFileInput";
import ComboSelectComponent from "$/components/inputs/FormComboSelect/ComboSelectInput";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";

export type LocalContactSendEmailsParams = Omit<
  ContactSendEmailsParams,
  "documents"
> & {
  documents: File[];
};

type Props = {
  isPending: boolean;
  handleClose: VoidFunction;
};

export const ContactSendEmailWrapper = ({ isPending, handleClose }: Props) => {
  const [articleQuery, setArticleQuery] = useState("");
  const [selectedArticle, setSelectedArticle] =
    useState<SelectOption<number>>();

  const { data: articles, isPending: isGettingArticles } = useQuery({
    queryKey: ["getArticles", articleQuery],
    queryFn: () =>
      getAllArticles(
        undefined,
        { limit: 50, offset: 0 },
        { search: articleQuery },
      ),
  });

  return (
    <Flexbox
      align="center"
      justify="center"
      fullWidth
      className="relative w-full gap-6 rounded-[34px] bg-white px-3 py-5 md:px-6"
    >
      <h3 className="text-[28px] font-normal text-[#082559] mobileScreen:text-xl">
        Envoyer un email
      </h3>

      <FormStyledTextinput
        label="Objet"
        name="object"
        labelWrapperClassName="!w-full !min-w-[unset]"
        className="w-full !rounded-[100px] bg-gray-inputBg !px-1.5 !py-2 [&>input]:leading-3"
      />
      <Flexbox row fullWidth className="gap-x-6">
        <FormStyledTextinput
          label="CC"
          name="cc"
          labelWrapperClassName="!w-full !min-w-[unset]"
          className="w-full !rounded-[100px] bg-gray-inputBg !px-1.5 !py-2 [&>input]:leading-3"
        />
        <FormStyledTextinput
          label="Bcc"
          name="bcc"
          labelWrapperClassName="!w-full !min-w-[unset]"
          className="w-full !rounded-[100px] bg-gray-inputBg !px-1.5 !py-2 [&>input]:leading-3"
        />
      </Flexbox>
      <FormStyledTextAreaInput
        label="Message"
        name="message"
        labelWrapperClassName="!w-full !min-w-[unset]"
        className="min-h-40 !w-full !rounded-[30px] border-none bg-gray-inputBg !px-4 !py-3 outline-none"
      />

      <div className="w-full space-y-4">
        <FormFileInput
          name="documents"
          label="Télécharger des documents"
          hideLabel
          allowedFiles={[".png", ".jpg", ".jpeg", ".pdf"]}
          multiple
        />

        <FormDocumentPreview fieldName="documents" />
      </div>
      {(articles || isGettingArticles) && (
        <Flexbox fullWidth justify="center" align="start">
          <ComboSelectComponent<number>
            name="selectedArticleToUploadPdf"
            label="Article PDF"
            defaultOuterValue={
              selectedArticle
                ? selectedArticle
                : { label: "Sélectionner un article", value: 0 }
            }
            options={
              articles
                ? articles.data.map((article) => ({
                    value: article.id,
                    label: article.title,
                  }))
                : []
            }
            returnSingleValue
            handleOnSelect={(selected) => {
              if (Array.isArray(selected)) return;
              setSelectedArticle(selected);
            }}
            withFilter
            onChange={(value) => setArticleQuery(value.target.value)}
          />
        </Flexbox>
      )}
      <Flexbox row fullWidth justify="center" align="center" className="gap-4">
        <Button
          type="button"
          className="w-1/2 rounded-full border-[2px] border-blue-primary text-blue-primary md:w-1/5"
          onClick={handleClose}
        >
          Annuler
        </Button>
        <Button
          isLoading={isPending}
          type="submit"
          className="w-1/2 border-[2px] border-blue-primary bg-blue-primary text-white md:w-1/5"
        >
          Envoyer
        </Button>
      </Flexbox>
    </Flexbox>
  );
};
