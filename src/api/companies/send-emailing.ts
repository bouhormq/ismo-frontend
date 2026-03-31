import { restApiClient } from "../../utils/clients/restApiClient";

export type SendEmailingParams = {
  template: string;
  companyIds: number[];
};

export const sendEmailing = async (data: SendEmailingParams) => {
  const res = await restApiClient
    .url("/companies/send-emailing")
    .post<boolean>(data);
  return res;
};
