import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import getCompany from "$/api/companies/get-company";
import Flexbox from "$/components/ui/Flexbox";
import EmailsIcon from "$/icons/SideBar/EmailsIcon";
import { ActionsIcon } from "$/icons/Table/ActionsIcon";
import { MemoIcon } from "$/icons/Table/MemoIcon";
import LocationIcon from "$/icons/Ui/LocationIcon";
import OffersIcon from "$/icons/Ui/OffersIcon";
import PaperClipIcon from "$/icons/Ui/PaperClipIcon";
import PhoneIcon from "$/icons/Ui/PhoneIcon";
import EmailsTab from "$/pages/EmailsPage/EmailsPage";
import { cn } from "$/utils/functions/misc.functions";

import { ActionsTab } from "./ActionsTab/ActionsTab";
import { ArticlesTab } from "./ArticlesTab/ArticlesTab";
import { ContactsTab } from "./ContactsTab/ContactsTab";
import { DocumentsTab } from "./DocumentsTab/DocumentsTab";
import { MemoTab } from "./MemoTab/MemoTab";
import { OffersTab } from "./OffersTab/OffersTab";
import ZohoActionButtons from "./ZohoActionButtons";

export const ClientFormTabs = () => {
  const params = useParams();
  const companyId = params.id ? Number(params.id) : NaN;
  const [selectedTab, setSelectedTab] = useState("Documents");

  const { data: company } = useQuery({
    queryKey: ["company", companyId],
    queryFn: () => getCompany(companyId),
    enabled: !isNaN(companyId),
  });

  const tabs = [
    {
      title: "Contacts",
      icon: <PhoneIcon />, 
      content: <ContactsTab companyId={companyId} />, 
    },
    {
      title: "Actions",
      icon: <ActionsIcon />, 
      content: <ActionsTab companyId={companyId} />, 
    },
    {
      title: "Mémo",
      icon: <MemoIcon />, 
      content: <MemoTab />, 
    },
    {
      title: "Emails",
      icon: <EmailsIcon height={20} />, 
      content: <EmailsTab companyId={companyId} />, 
    },
    {
      title: "Parc",
      icon: <LocationIcon />, 
      content: <ArticlesTab companyId={companyId} />, 
    },
    {
      title: "Offres",
      icon: <OffersIcon />, 
      content: <OffersTab companyId={companyId} />, 
    },
    {
      title: "Documents",
      icon: <PaperClipIcon />, 
      content: <DocumentsTab companyId={companyId} />, 
    },
  ];

  return (
    <Flexbox className="mt-5 w-full rounded-[34px] bg-white p-6">
      <Flexbox
        row
        fullWidth
        align="center"
        justify="center"
        className="h-14 gap-6 tabletScreen:scroll-px-20 tabletScreen:overflow-x-auto"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.title}
            title={tab.title}
            icon={React.cloneElement(tab.icon, {
              fill: selectedTab === tab.title ? "#69CFFD" : undefined,
            })}
            selected={selectedTab === tab.title}
            onClick={() => setSelectedTab(tab.title)}
            className=""
          />
        ))}
      </Flexbox>
      {selectedTab === "Offres" && (
        <ZohoActionButtons
          companyId={companyId}
          zohoContactId={company?.zohoContactId}
        />
      )}
      {tabs.find((tab) => tab.title === selectedTab)?.content}
    </Flexbox>
  );
};

type TabProps = {
  title: string;
  icon: JSX.Element;
  selected: boolean;
  className: string;
  onClick: () => void;
};

const Tab = ({ title, icon, selected, className, onClick }: TabProps) => {
  return (
    <Flexbox className={cn("h-9 gap-1.5", className)}>
      <Flexbox
        row
        align="center"
        className="cursor-pointer gap-2.5"
        onClick={onClick}
      >
        {icon}
        <p className="text-nowrap text-lg">{title}</p>
      </Flexbox>
      {selected && <div className="h-[3px] w-full rounded-3xl bg-blue-sky" />}
    </Flexbox>
  );
};
