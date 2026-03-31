import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import getArticle from "$/api/articles/get-article";
import { updateArticle } from "$/api/articles/update-article";
import { uploadFile } from "$/api/media";
import HeaderRightComponent from "$/components/common/HeaderRightContent";
import ArticleForm from "$/components/form/forms/ArticleForm/ArticleForm";
import { CustomCheckbox } from "$/components/inputs/CustomCheckbox";
import Flexbox from "$/components/ui/Flexbox";
import { useDocument } from "$/hooks/zustand/useDocument";
import PageHeaderLayout from "$/layouts/PageHeaderLayout";
import { PATHS } from "$/routes/constants";
import {
  EditArticleParams,
  EditArticleResponse,
} from "$/types/api/article.types";
import { QueryError } from "$/types/api/restApiClient.types";
import { DocumentRecord } from "$/types/models/document.types";

import {
  EditArticleDataType,
  editArticleSchema,
} from "./_features/constants/validations.constants";

export const ArticleShowPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id ? Number(params.id) : NaN;

  const [isCompleted, setIsCompleted] = useState(false);

  if (isNaN(id)) navigate(PATHS.ARTICLES);

  const { data: clientData } = useDocument();

  const { mutateAsync, isPending } = useMutation<
    EditArticleResponse,
    QueryError,
    { id: number; data: EditArticleParams }
  >({
    mutationFn: updateArticle,
  });

  const { data: article, isFetching } = useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticle(id),
  });

  const { id: _articleId, ...rest } = article ?? {};

  const defaultValues: Partial<EditArticleDataType> | undefined = useMemo(
    () =>
      article
        ? {
            ...rest,

            industry: article.industry && article.industry.id,
            category: article.category && article.category.id,
            section: article.section && article.section.id,
          }
        : undefined,
    [article, rest],
  );

  const handleGoBack = () => {
    navigate(PATHS.ARTICLES);
  };

  const formatSelectData = (item: number | string) => {
    if (typeof item === "number") return { id: item };

    return { name: item };
  };

  const transformData = (data: EditArticleDataType) => {
    const {
      industry,
      category,
      section,
      reference: _ref,
      _description,
      ...rest
    } = data;
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

  const handleOnSubmit = async (data: EditArticleDataType) => {
    const updateData = transformData(data);
    let documentsWithUrls: DocumentRecord[] = [];
    if (updateData.photos.length > 0) {
      documentsWithUrls = await Promise.all(
        updateData.photos.map(async (doc) => {
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
      updateData.photos = documentsWithUrls;
    }

    mutateAsync({ id, data: { isCompleted, ...updateData } }).then(async () => {
      await queryClient.invalidateQueries({
        queryKey: ["article"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["all-article-filter-options"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["all-articles"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["article-photos"],
      });
      // navigate(PATHS.ARTICLES);
    });
  };

  useEffect(() => {
    if (article) setIsCompleted(article.isCompleted);
  }, [article]);

  if (!article) return <></>;

  return (
    <PageHeaderLayout
      headerText="Article"
      handleGoBack={handleGoBack}
      headerRightContent={
        <Flexbox
          row
          align="center"
          justify="center"
          className="gap-2 smallTabletScreen:flex-col"
        >
          <CustomCheckbox
            checked={isCompleted}
            onChange={(checked) => {
              setIsCompleted(checked);
            }}
            label="Fiche complète"
          />
          <span className="smallTabletScreen:hidden">|</span>
          <HeaderRightComponent
            createdAt={article.createdAt}
            updatedAt={article.updatedAt}
          />
        </Flexbox>
      }
    >
      <ArticleForm<EditArticleDataType>
        schema={editArticleSchema}
        defaultValues={defaultValues}
        handleOnSubmit={handleOnSubmit}
        isFetching={isFetching || isPending}
      />
    </PageHeaderLayout>
  );
};
