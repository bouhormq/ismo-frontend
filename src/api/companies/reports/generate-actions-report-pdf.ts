import axios from "axios";

import { CompaniesReportTableFilters } from "$/types/api/companies-reports.types";

export const generateActionsReportPDF = async (
  data: CompaniesReportTableFilters,
) => {
  const url = `${import.meta.env.VITE_BASE_API_URL}`;

  return axios.post(`${url}/companies/actions-report/generate-pdf`, data, {
    responseType: "blob",
  });
};
