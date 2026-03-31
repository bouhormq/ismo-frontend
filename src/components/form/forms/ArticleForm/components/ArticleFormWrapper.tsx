import { useEffect } from "react";
import { DefaultValues, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { ArticleFilterOptions } from "$/api/articles/get-filter-options";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import { EditArticleDataType } from "$/pages/articles/ArticlePage/_features/constants/validations.constants";
import { NewArticleDataType } from "$/pages/articles/CreateArticle/_features/constants/validations.constants";
import { PATHS } from "$/routes/constants";

import ArticleCompanyBox from "./ArticleCompanyBox";
import ArticleInformationBox from "./ArticleInformationBox";
import ArticlePricesBox from "./ArticlePricesBox";
import ArticleSecondSection from "./ArticleSecondSection";

type Props<T extends NewArticleDataType | EditArticleDataType> = {
  isFetching?: boolean;
  defaultValues?: DefaultValues<T>;
  options?: ArticleFilterOptions;
};

const ArticleFormWrapper = <
  T extends NewArticleDataType | EditArticleDataType,
>({
  options,
  defaultValues,
}: Props<T>) => {
  const navigate = useNavigate();

  const form = useFormContext<T>();
  const { reset, control } = form;

  const { _defaultValues } = control;

  const handleCancel = () => {
    navigate(PATHS.ARTICLES);
  };

  useEffect(() => {
    if (JSON.stringify(defaultValues) !== JSON.stringify(_defaultValues))
      reset(defaultValues);
  }, [defaultValues, _defaultValues, reset]);

  return (
    <>
      <Flexbox
        row
        className="gap-3 tabletScreen:flex-wrap smallTabletScreen:flex-col"
        align="stretch"
        fullWidth
      >
        <ArticleInformationBox options={options} />
        <ArticleCompanyBox />
        <ArticlePricesBox />
      </Flexbox>

      <ArticleSecondSection />

      <Flexbox
        row
        fullWidth
        justify="end"
        className="mt-4 gap-2 mobileScreen:relative mobileScreen:flex-col-reverse"
      >
        <Button
          variant="outlined"
          className="w-fit rounded-full border-[#0A2D6E] text-[#0A2D6E] mobileScreen:mb-4 mobileScreen:w-full"
          onClick={handleCancel}
        >
          Annuler
        </Button>

        <Button
          type="submit"
          variant="primary"
          className="w-fit rounded-full mobileScreen:w-full"
        >
          Sauvegarder
        </Button>
      </Flexbox>
    </>
  );
};

export default ArticleFormWrapper;
