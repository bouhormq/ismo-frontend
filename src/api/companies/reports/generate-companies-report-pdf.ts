import axios from "axios";

import { CompaniesReportTableFilters } from "$/types/api/companies-reports.types";

export const generateCompaniesReportPDF = async (
  data: CompaniesReportTableFilters,
) => {
  const url = `${import.meta.env.VITE_BASE_API_URL}`;

  return axios.post(`${url}/companies/report/generate-pdf`, data, {
    responseType: "blob",
  });
};
