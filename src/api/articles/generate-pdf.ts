import { rawRestApiClient } from "$/utils/clients/restApiClient";

export type GenerateArticlesPDFParams = {
  articleIds: number[];
};

export const generateArticlesPDF = async (
  data: GenerateArticlesPDFParams,
): Promise<Blob> => {
  return rawRestApiClient
    .options({ credentials: "include" })
    .url("/articles/generate-pdf")
    .post(data)
    .res((res) => res.blob());
};

export const generateCataloguePDF = async (
  data: GenerateArticlesPDFParams,
): Promise<Blob> => {
  return rawRestApiClient
    .options({ credentials: "include" })
    .url("/articles/generate-catalogue-pdf")
    .post(data)
    .res((res) => res.blob());
};
