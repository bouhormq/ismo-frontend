import { useState } from "react";

import PageHeaderLayout from "$/layouts/PageHeaderLayout";

import { ActionsTableWrapper } from "./_features/actions/ActionsTableWrapper";
import { CompaniesTableWrapper } from "./_features/companies/CompaniesTableWrapper";

export const ReportsPage = () => {
  const [tab, setTab] = useState<"companies" | "actions">("companies");

  const handleSetTab = (tab: "companies" | "actions") => {
    setTab(tab);
  };

  return (
    <PageHeaderLayout headerText="Exportation et rapports">
      {tab === "companies" ? (
        <CompaniesTableWrapper tab={tab} handleSetTab={handleSetTab} />
      ) : (
        <ActionsTableWrapper tab={tab} handleSetTab={handleSetTab} />
      )}
    </PageHeaderLayout>
  );
};
