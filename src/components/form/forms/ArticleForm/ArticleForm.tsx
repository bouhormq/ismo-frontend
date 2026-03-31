import { useQuery } from "@tanstack/react-query";
import { DefaultValues } from "react-hook-form";
import { ZodType } from "zod";

import { getArticlesFilterOptions } from "$/api/articles/get-filter-options";
import { EditArticleDataType } from "$/pages/articles/ArticlePage/_features/constants/validations.constants";
import { NewArticleDataType } from "$/pages/articles/CreateArticle/_features/constants/validations.constants";

import Form from "../../Form";
import ArticleFormWrapper from "./components/ArticleFormWrapper";

type Props<T extends NewArticleDataType | EditArticleDataType> = {
  isFetching?: boolean;
  defaultValues?: DefaultValues<T>;
  schema: ZodType<any, any, any> | undefined;
  handleOnSubmit: (data: T) => Promise<void>;
};

const ArticleForm = <T extends NewArticleDataType | EditArticleDataType>({
  isFetching,
  schema,
  defaultValues,
  handleOnSubmit,
}: Props<T>) => {
  const { data: articleFilterOptions, isLoading } = useQuery({
    queryKey: ["all-article-filter-options"],
    queryFn: getArticlesFilterOptions,
    gcTime: 0,
  });

  return (
    <Form<T>
      resolverSchema={schema}
      // @ts-ignore
      onSubmit={(data: T) => handleOnSubmit(data)}
      options={{ defaultValues }}
      isLoading={isFetching || isLoading}
      className="flex h-full w-full flex-col gap-y-6 pb-20"
    >
      <ArticleFormWrapper
        options={articleFilterOptions}
        defaultValues={defaultValues}
      />
    </Form>
  );
};

export default ArticleForm;
