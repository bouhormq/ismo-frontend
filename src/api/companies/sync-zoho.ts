import { restApiClient } from "../../utils/clients/restApiClient";

export async function syncCompanyToZoho(
  companyId: number,
): Promise<{ zohoContactId: string | null }> {
  return restApiClient
    .url(`/companies/${companyId}/sync-zoho`)
    .post<{ zohoContactId: string | null }>();
}
