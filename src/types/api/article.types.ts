import { EditArticleDataType } from "$/pages/articles/ArticlePage/_features/constants/validations.constants";
import { DataSheets } from "$/utils/types/misc.types";

import { Article } from "../models/article.types";

export type ArticleRecord = {
  id: number;
  photo: string | null;
  title: string;
  reference?: string;
  category: string;
  section: string;
  purchasePriceWithoutTVA?: number;
  equipmentCondition?: string;
  companyName: string;
  companyCountry: string;
  companyCity: string;
};

export type CompanyArticleRecord = {
  id: number;
  createdAt: string;
  reference: string;
  title: string;
  purchasePriceWithoutTVA: string;
  equipmentCondition: string;
};

export type ArticleRecordResponse = {
  data: ArticleRecord[];
  count: number;
};

export type ArticlesTableFilters = {
  search?: string;
  title?: string;
  section?: string;
  equipmentCondition?: string;
  companyName?: string;
  category?: string;
  industry?: string;
  availability?: string;
  reference?: string;
  companyCountry?: string;
  companyCity?: string;
  isCompleted?: string;
};

export type CreateArticleResponse = Article;

export type DetailedArticleResponse = Article & {
  purchasePriceWithoutTVA?: string;
  purchasePriceWithTVA?: string;
  marginRate?: string;
  sellingPriceWithoutTVA?: string;
  sellingPriceWithTVA?: string;

  industry: { id: number; name: string };
  category: { id: number; name: string };
  section: { id: number; name: string };
};

type SelectParam = {
  id?: number;
  name?: string;
};

type InitialEditArticleParams = Omit<
  EditArticleDataType,
  "industry" | "category" | "section"
>;

export type EditArticleParams = InitialEditArticleParams & {
  isCompleted: boolean;
  industry: SelectParam;
  category: SelectParam;
  section: SelectParam;
};

export type EditArticleResponse = DetailedArticleResponse;
export type GenerateArticlesExcelResponse = { dataSheets: DataSheets };

export type CompanyArticlesTableFilters = {
  search?: string;
};

export type CompanyArticlesResponse = {
  data: CompanyArticleRecord[];
  count: number;
};
