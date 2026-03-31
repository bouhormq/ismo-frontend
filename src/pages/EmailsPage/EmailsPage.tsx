import {
  EmailLogsResponse,
  EmailWithoutEvent,
  getEmailLogs,
} from "$/api/mail/getEmailLogs.api";
import { EnhancedTableProvider } from "$/components/tables/enhanced-table";
import Flexbox from "$/components/ui/Flexbox";

import EmailsTable from "./EmailsTable";

type Props = {
  companyId: number;
};
function EmailsTab({ companyId }: Props) {
  return (
    <EnhancedTableProvider<EmailLogsResponse, EmailWithoutEvent, any>
      dataSelector={(data) => data.data}
      totalCountSelector={(data) => {
        return data.count;
      }}
      queryOptions={{
        queryKey: ["company-emails", companyId],
        queryFn: ({ pagination }) => getEmailLogs({ companyId, ...pagination }),
        gcTime: 0,
      }}
    >
      <Flexbox fullWidth className="gap-5 rounded-[34px] bg-white p-6">
        <EmailsTable />
      </Flexbox>
    </EnhancedTableProvider>
  );
}

export default EmailsTab;
