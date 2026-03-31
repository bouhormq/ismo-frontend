import { restApiClient } from "../../../utils/clients/restApiClient";

type GetCompanyOffersData = {
  companyId: number;
};

export type OffersTableColumnsType = {
  reference: number | string;
  title: string;
  status: string;
  total_amount: number;
  pdf_url: string | null;
  customer_portal_url: string;
  createdAt: string;
  type: "Devis" | "Facture" | "Facture Proforma";
  view_link: string;
  number: string;
  product_name: string;
  source?: "axonaut" | "zoho";
};

export type GetCompanyOffersDataResponse = {
  data: OffersTableColumnsType[];
  count: number;
};
export const getCompanyOffers = async (data: GetCompanyOffersData) => {
  return restApiClient
    .url(`/companies/offers`)
    .query({ companyId: String(data.companyId) })
    .get<GetCompanyOffersDataResponse>();
};
