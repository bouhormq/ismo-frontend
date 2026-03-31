import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import "react-quill/dist/quill.bubble.css";
import { useParams } from "react-router-dom";

import { getAllDocuments } from "$/api/documents/get-all-documents";
import ResponsiveDialog from "$/components/DialogComponents/ResponsiveDialog";
import FQuillInput from "$/components/form/FQuillInput/FQuillInput";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import { useDocument } from "$/hooks/zustand/useDocument";
import PdfIcon from "$/icons/Filters/PdfIcon";
import PlusIcon from "$/icons/Filters/PlusIcon";
import DeleteTrashCanIcon from "$/icons/Table/DeleteTrashCanIcon";
import { NewArticleDataType } from "$/pages/articles/CreateArticle/_features/constants/validations.constants";
import {
  createFileFromUrl,
  formatFileSizeV2,
} from "$/utils/functions/file.functions";

import { DeleteDocumentModal } from "../../ClientForm/components/DocumentsTab/DeleteDocumentModal";
import { DocumentModal } from "../../ClientForm/components/DocumentsTab/DocumentModal";
import ArticleDescriptionModal from "./ArticleDescriptionModal";

const ArticleSecondSection = () => {
  const form = useFormContext<NewArticleDataType>();
  const params = useParams();
  const articleId = params.id ? Number(params.id) : NaN;
  const { setValue, watch } = form;
  const { data, setData } = useDocument();
  const { data: photos } = useQuery({
    queryKey: ["article-photos", articleId],
    queryFn: () =>
      getAllDocuments(
        articleId,
        undefined,
        { limit: 10, offset: 0 },
        "article",
      ),
    gcTime: 0,
    enabled: !!articleId,
  });

  const generateFileSize = (url: string) => {
    const file = createFileFromUrl(url, {
      name: "file",
      type: "image/jpeg",
    });
    return file.then((f) => f.size);
  };

  const displayedPhotos = useMemo(
    () => (data?.articlePhotos ?? []).filter((doc) => doc.status !== "deleted"),
    [data?.articlePhotos],
  );

  const [sizes, setSizes] = useState<{ id: number; size: number }[]>([]);

  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState<number | undefined>(
    undefined,
  );
  const [isDeleteDocumentModalOpen, setIsDeleteDocumentModalOpen] =
    useState(false);

  const stripHtmlTags = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html || "";
    return div.textContent || div.innerText || "";
  };

  const handleOpenDescriptionModal = () => {
    setIsDescriptionModalOpen(true);
  };

  const handleSetOpen = (open: boolean) => {
    setIsDescriptionModalOpen(open);
  };

  const handleOnSave = () => {
    setValue("description", watch("_description"));
    setIsDescriptionModalOpen(false);
  };

  const handleAddClick = () => {
    setSelectedPhotoId(undefined);
    setIsPhotoModalOpen(true);
  };

  useEffect(() => {
    if (photos) {
      setData({ articlePhotos: photos.data });
    }
    if (!articleId) {
      setData({ articlePhotos: [] });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos, setData]);

  useEffect(() => {
    Promise.all(
      displayedPhotos.map((photo) => generateFileSize(photo.url ?? "")),
    ).then((size) => {
      setSizes(
        size.map((s, i) => ({
          id: displayedPhotos[i].id,
          size: s,
        })),
      );
    });
  }, [displayedPhotos]);

  return (
    <>
      <Flexbox
        fullWidth
        className="relative gap-6 rounded-[34px] bg-white px-6 py-4"
      >
        <Flexbox fullWidth className="relative">
          <FQuillInput
            theme="snow"
            name="description"
            label=""
            backgroundColor="bg-[#F4F5F7] shadow-quillShadow"
          />

          <p
            className="absolute right-8 top-5 cursor-pointer text-xs font-normal text-[#0A2D6E] underline hover:opacity-75 tabletScreen:bottom-5 tabletScreen:top-[unset]"
            onClick={handleOpenDescriptionModal}
          >
            voir la description complète
          </p>
        </Flexbox>

        <Flexbox fullWidth className="relative gap-2">
          <p className="text-base font-semibold text-gray-700">
            Description pour le catalogue
          </p>
          <FQuillInput
            theme="snow"
            name="catalogDescription"
            label=""
            backgroundColor="bg-[#F4F5F7] shadow-quillShadow"
          />
        </Flexbox>

        <Flexbox fullWidth>
          <Flexbox
            row
            fullWidth
            justify="end"
            align="center"
            className="mb-3.5 gap-2 smallTabletScreen:justify-center"
          >
            <Button
              type="button"
              className="w-fit gap-1 rounded-full bg-gray-inputBg px-3 py-2 text-sm font-medium smallTabletScreen:!w-full"
              onClick={handleAddClick}
            >
              <PlusIcon className="h-4 w-4" />
              Ajouter un document
            </Button>
          </Flexbox>
          {displayedPhotos.length === 0 ? (
            <Flexbox justify="center" align="center" className="w-full">
              <p className="text-sm text-gray-border">
                Aucune photo n'a été ajoutée
              </p>
            </Flexbox>
          ) : (
            <Flexbox
              fullWidth
              className="gap-2.5 rounded-2xl bg-gray-light p-3"
            >
              {displayedPhotos.map((photo) => {
                const file = new File([photo.url ?? ""], photo.url ?? "", {
                  type: photo.url?.endsWith(".pdf")
                    ? "application/pdf"
                    : "image/jpeg",
                });
                const fileUrl = URL.createObjectURL(photo.file ?? file);

                return (
                  <Fragment key={photo.id}>
                    <Flexbox
                      row
                      align="center"
                      justify="between"
                      className="w-full cursor-pointer gap-4 rounded-xl bg-white px-5 py-3"
                      onClick={() => {
                        setSelectedPhotoId(photo.id);
                        setIsPhotoModalOpen(true);
                      }}
                    >
                      <Flexbox row align="center" className="gap-3">
                        <div className="w-10">
                          {(photo.file &&
                            photo.file.type === "application/pdf") ||
                          (!photo.file && file.name.endsWith(".pdf")) ? (
                            <PdfIcon width={42} height={42} />
                          ) : (
                            <img
                              className="max-h-12 max-w-full rounded-lg"
                              src={photo.file ? fileUrl : file.name}
                              alt={photo.name}
                            />
                          )}
                        </div>
                        <Flexbox>
                          <p className="text-nowrap text-sm font-light">
                            {photo.name.length > 10
                              ? photo.name.slice(0, 10) +
                                "..." +
                                photo.name.slice(-3)
                              : photo.name}
                          </p>
                          <p className="text-xs font-semibold text-gray-border">
                            {formatFileSizeV2(
                              !photo.file
                                ? (sizes.find((size) => size.id === photo.id)
                                    ?.size ?? 0)
                                : photo.file.size,
                            )}
                          </p>
                          <p className="text-xs text-gray-border">
                            {stripHtmlTags(photo.description ?? "")}
                          </p>
                        </Flexbox>
                      </Flexbox>
                      <Button
                        type="button"
                        className="w-fit rounded-full bg-gray-inputBg px-3 py-2 text-sm font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPhotoId(photo.id);
                          setIsDeleteDocumentModalOpen(true);
                        }}
                      >
                        <DeleteTrashCanIcon />
                      </Button>
                    </Flexbox>
                  </Fragment>
                );
              })}
            </Flexbox>
          )}
          <ResponsiveDialog
            open={isPhotoModalOpen}
            handleSetOpen={setIsPhotoModalOpen}
          >
            <DocumentModal
              handleClose={() => setIsPhotoModalOpen(false)}
              documentId={selectedPhotoId}
            />
          </ResponsiveDialog>
        </Flexbox>
      </Flexbox>

      <ResponsiveDialog
        open={isDeleteDocumentModalOpen}
        handleSetOpen={setIsDeleteDocumentModalOpen}
      >
        {selectedPhotoId && (
          <DeleteDocumentModal
            documentId={selectedPhotoId}
            handleClose={() => setIsDeleteDocumentModalOpen(false)}
          />
        )}
      </ResponsiveDialog>

      <ArticleDescriptionModal
        isOpen={isDescriptionModalOpen}
        handleSetOpen={handleSetOpen}
        handleOnSave={handleOnSave}
      />
    </>
  );
};

export default ArticleSecondSection;
