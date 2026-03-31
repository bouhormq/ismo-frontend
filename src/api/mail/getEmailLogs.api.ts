import { restApiClient } from "$/utils/clients/restApiClient";
import { Pagination } from "$/utils/types/misc.types";

export interface EmailWithoutEvent {
  email: string;
  subject: string;
  templateId: number;
  messageId: string;
  uuid: string;
  date: string;
  from: string;
  tags: string[];
  source?: "brevo" | "zoho";
}

export type EmailLogsResponse = {
  count: number;
  data: EmailWithoutEvent[];
};
export function getEmailLogs({
  companyId,
  offset,
  limit,
}: { companyId: number } & Pagination) {
  return restApiClient
    .url("/mail/logs")
    .query({ companyId, limit, offset })
    .get<EmailLogsResponse>();
}
