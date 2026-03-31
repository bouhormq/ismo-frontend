import axios from "axios";

export type GenerateCompaniesPDFParams = {
  companiesIds: number[];
};

export const generateCompaniesPDF = async (
  data: GenerateCompaniesPDFParams,
) => {
  const url = `${import.meta.env.VITE_BASE_API_URL}`;

  return axios.post(`${url}/companies/generate-pdf`, data, {
    responseType: "blob", // To handle binary data
  });
};
