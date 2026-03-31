import { restApiClient } from "$/utils/clients/restApiClient";

export const deleteCompanyCategory = async (id: number) => {
  return restApiClient.url(`/companies/categories/${id}`).delete();
};

export const deleteCompanySection = async (id: number) => {
  return restApiClient.url(`/companies/sections/${id}`).delete();
};

export const deleteCompanyIndustry = async (id: number) => {
  return restApiClient.url(`/companies/industries/${id}`).delete();
};
