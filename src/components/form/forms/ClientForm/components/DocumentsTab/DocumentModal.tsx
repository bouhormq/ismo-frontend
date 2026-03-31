import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

import { getDocument } from "$/api/documents/get-document";
import FormDocumentPreview from "$/components/DocumentUpload/FormDocumentPreview";
import FQuillInput from "$/components/form/FQuillInput/FQuillInput";
import Form from "$/components/form/Form";
import FormFileInput from "$/components/form/FormFileInput";
import FormTextInput from "$/components/form/FormTextInput";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import { useDocument } from "$/hooks/zustand/useDocument";
import { newDocumentSchema } from "$/pages/ClientPage/_features/constants/validations.constants";
import { createFileFromUrl } from "$/utils/functions/file.functions";
import { getMediaType } from "$/utils/functions/misc.functions";

type Props = {
  isCompanyDocument?: boolean;
  documentId: number | undefined;
  handleClose: () => void;
};

type FormValues = {
  name: string;
  description: string;
  url: FileList;
};

export const DocumentModal = ({
  documentId,
  isCompanyDocument,
  handleClose,
}: Props) => {
  const { data: clientData, setData } = useDocument();

  const documents = isCompanyDocument
    ? clientData?.companyDocuments
    : clientData?.articlePhotos;

  const { data: document } = useQuery({
    queryKey: ["single-document", documentId],
    queryFn: () => getDocument(documentId as number),
    enabled: !!documentId && documentId > 0,
    gcTime: 0,
  });

  const queryClient = useQueryClient();

  const localDocument = documents?.find((doc) => doc.id === documentId);

  const handleSubmit = async (data: FormValues) => {
    const nextDocumentId = Math.round(
      Math.random() * 1000 + new Date().getTime(),
    );

    const ids = Array.from(data.url).map(
      (_file, index) => nextDocumentId + index,
    );

    const updatedDocuments = [...(documents || [])];

    if (documentId) {
      updatedDocuments.forEach((doc) => {
        if (doc.id === documentId) {
          doc.name = data.name;
          doc.description = data.description;
          doc.status = "updated";
          doc.file = data.url[0];
        }
      });
    } else {
      ids.forEach((id, index) => {
        updatedDocuments.push({
          id: -id,
          name: data.name,
          description: data.description,
          createdAt: new Date(),
          file: data.url[index],
          status: "new",
        });
      });
    }

    queryClient.invalidateQueries({
      queryKey: ["single-document", documentId],
    });

    isCompanyDocument
      ? setData({ companyDocuments: updatedDocuments })
      : setData({ articlePhotos: updatedDocuments });

    // setData(() => {
    //   if (isCompanyDocument) return { companyDocuments: updatedDocuments };
    //   return { articlePhotos: updatedDocuments };
    // });

    handleClose();
  };

  useEffect(() => {
    setData({ companyDocuments: documents });
  }, [documentId, setData, documents]);

  if (!document && documentId && documentId > 0) return <></>;

  return (
    <Form<FormValues>
      resolverSchema={newDocumentSchema}
      onSubmit={handleSubmit}
      onSubmitError={(errors) => console.log(errors)}
      className="w-full"
      id="upload-form"
    >
      <Flexbox
        fullWidth
        justify="center"
        align="center"
        className="gap-2.5 rounded-[34px] bg-white px-6 py-5"
      >
        <h1 className="text-center text-xl text-blue-primary md:text-[28px]">
          {`Télécharger un document`}
        </h1>

        <DocumentModalFileInput
          originalUrl={localDocument?.url ?? document?.url}
          lastKnownFile={localDocument?.file}
          isCompanyDocument={isCompanyDocument}
          mode={documentId ? "edit" : "add"}
        />

        <FormTextInput
          name="name"
          wrapperClassName="min-w-[unset]"
          placeholder="Titre"
          defaultValue={localDocument?.name ?? document?.name}
        />
        <FQuillInput
          name="description"
          theme="snow"
          label=""
          value={localDocument?.description ?? document?.description}
        />
        <Flexbox
          row
          fullWidth
          justify="center"
          align="center"
          className="gap-4"
        >
          <Button
            type="button"
            className="w-1/2 rounded-full border-[2px] border-blue-primary text-blue-primary md:w-1/5"
            onClick={handleClose}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            className="w-1/2 border-[2px] border-blue-primary bg-blue-primary text-white md:w-1/5"
          >
            {documentId ? "Modifier" : "Ajouter"}
          </Button>
        </Flexbox>
      </Flexbox>
    </Form>
  );
};

function DocumentModalFileInput({
  originalUrl,
  lastKnownFile,
  // isCompanyDocument,
  mode,
}: {
  originalUrl?: string;
  lastKnownFile?: File;
  isCompanyDocument?: boolean;
  mode: "add" | "edit";
}) {
  const { watch, setValue } = useFormContext<FormValues>();
  const { isPending } = useQuery({
    queryKey: ["document-modal-file-input", { originalUrl, lastKnownFile }],
    queryFn: async () => {
      if (lastKnownFile) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(lastKnownFile);
        setValue("url", dataTransfer.files);

        return true;
      }

      if (originalUrl) {
        const mediaType = getMediaType(originalUrl);

        const fileName = originalUrl.split("/").pop()?.split(".")[0];

        if (mediaType) {
          const file = await createFileFromUrl(originalUrl, {
            name: `${fileName}.${mediaType.extension}`,
            type: mediaType.fullType,
          });

          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);

          setValue("url", dataTransfer.files);
        }
      }

      return true;
    },
    gcTime: 0,
    staleTime: 0,
  });

  const { name, url } = watch();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!!name && name.length > 0 && url && url.length > 1) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(url[0]);
      setValue("url", dataTransfer.files);
    }
  }, [setValue, name, url]);

  return (
    <div className="w-full">
      <FormFileInput
        name="url"
        allowedFiles={[".png", ".jpg", ".jpeg", ".pdf"]}
        // allowedFiles={
        //   isCompanyDocument
        //     ? [".png", ".jpg", ".jpeg", ".pdf"]
        //     : [".png", ".jpg", ".jpeg"]
        // }
        maxSize="20mb"
        multiple={!!originalUrl || mode === "edit" ? false : !name}
        label={`Télécharger des documents`}
        hideLabel
      />

      {isPending && (
        <div className="flex items-center gap-2 py-2 text-sm text-blue-primary">
          <LoaderCircle className="animate-spin" />
          <p>Chargement du document précédent</p>
        </div>
      )}
      <FormDocumentPreview className="my-1 py-2" fieldName="url" />
    </div>
  );
}
