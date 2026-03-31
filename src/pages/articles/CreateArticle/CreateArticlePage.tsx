import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generatePath, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createArticle } from "$/api/articles/create-article";
import { uploadFile } from "$/api/media";
import ArticleForm from "$/components/form/forms/ArticleForm/ArticleForm";
import { useDocument } from "$/hooks/zustand/useDocument";
import PageHeaderLayout from "$/layouts/PageHeaderLayout";
import { PATHS } from "$/routes/constants";
import { CreateArticleResponse } from "$/types/api/article.types";
import { QueryError } from "$/types/api/restApiClient.types";
import { DocumentRecord } from "$/types/models/document.types";

import {
  NewArticleDataType,
  NewArticleType,
  newArticleSchema,
} from "./_features/constants/validations.constants";

const CreateArticlePage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { setData } = useDocument();

  const handleGoBack = () => {
    navigate(PATHS.ARTICLES);
  };
  const { data: clientData } = useDocument();

  const { mutateAsync, isPending } = useMutation<
    CreateArticleResponse,
    QueryError,
    NewArticleType
  >({
    mutationFn: createArticle,
  });

  const formatSelectData = (item: number | string) => {
    if (typeof item === "number") return { id: item };

    return { name: item };
  };

  const transformData = (data: NewArticleDataType) => {
    const { industry, category, section, reference: _ref, ...rest } = data;
    const transformedData = {
      ...rest,
      industry: formatSelectData(industry),
      photos: clientData?.articlePhotos || [],
      category: undefined as any,
      section: undefined as any,
    };

    if (category) {
      transformedData.category = formatSelectData(category);
    }

    if (section) {
      transformedData.section = formatSelectData(section);
    }

    return transformedData;
  };

  const handleOnSubmit = async (data: NewArticleDataType) => {
    if (!data.category && !data.section) {
      toast.error("Veuillez sélectionner une catégorie ou une section");
      return;
    }
    const transformedData = transformData(data);
    let documentsWithUrls: DocumentRecord[] = [];
    if (transformedData.photos.length > 0) {
      documentsWithUrls = await Promise.all(
        transformedData.photos.map(async (doc) => {
          if (doc.file) {
            const response = await uploadFile({
              file: doc.file as File,
              isPublic: false,
              path: "documents",
            });
            return {
              ...doc,
              url: response,
            };
          }

          return doc;
        }),
      );
      transformedData.photos = documentsWithUrls;
    }
    mutateAsync(transformedData)
      .then(async () => {
        navigate(PATHS.ARTICLES);

        setData({ articlePhotos: [] });

        await queryClient.invalidateQueries({
          queryKey: ["all-article-filter-options"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["all-articles"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["article-photos"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["articles-filter-options"],
        });
      })
      .catch(() => toast.error("Erreur lors de la création de la Article"));
  };

  return (
    <PageHeaderLayout headerText="Articles" handleGoBack={handleGoBack}>
      <ArticleForm<NewArticleDataType>
        schema={newArticleSchema}
        handleOnSubmit={handleOnSubmit}
        isFetching={isPending}
      />
    </PageHeaderLayout>
  );
};

export default CreateArticlePage;
