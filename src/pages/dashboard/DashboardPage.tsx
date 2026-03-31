import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren, useEffect, useState } from "react";

import { getDashboardData } from "$/api/dashboard/get-dashboard-data";
import Flexbox from "$/components/ui/Flexbox";
import PageHeaderLayout from "$/layouts/PageHeaderLayout";
import { cn } from "$/utils/functions/misc.functions";

import { ArticlesPieChart } from "./_features/components/ArticlesPieChart";
import { CompaniesDistributionMap } from "./_features/components/CompaniesDistributionMap";
import { CompaniesPieChart } from "./_features/components/CompaniesPieChart";
import { DashboardTitle } from "./_features/components/DashboardTitle";
import RegisteredCompaniesHistogram from "./_features/components/RegisteredCompaniesHistogram";

type LayoutProps = {
  title: string;
  className?: string;
};

export const DashboardPage = () => {
  const [key, setKey] = useState(0);
  const [filterDate, setFilterDate] = useState<{
    start?: Date;
    end?: Date;
  }>();

  const { data } = useQuery({
    queryKey: ["dashboard", filterDate],
    queryFn: () => getDashboardData(filterDate),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const handleSetFilterDate = (start?: Date, end?: Date) => {
    setFilterDate({ start, end });
  };

  const companiesCount = data?.allCompanies.length ?? 0;
  const emailsCount = data?.allEmails ?? 0;
  const chiffreAffaires = data?.chiffreAffaires ?? 0;
  // const companiesCountries =
  //   data?.allCompanies.map((company) => company.country) ?? [];
  const companiesCountriesWithNumberOfCompaniesPerCountry =
    data?.allCompanies.reduce(
      (acc, company) => {
        if (acc[company.country]) {
          acc[company.country]++;
        } else {
          acc[company.country] = 1;
        }
        return acc;
      },
      {} as Record<string, number>,
    ) ?? {};
  const companiesCreatedDates =
    data?.allCompanies.map((company) => company.createdAt) ?? [];

  useEffect(() => {
    if (data) {
      setKey((prev) => prev + 1);
    }
  }, [data]);
  return (
    <PageHeaderLayout headerText="Tableau de bord">
      <Flexbox fullWidth className="gap-5">
        <DashboardTitle
          companiesCount={companiesCount}
          allEmails={emailsCount}
          chiffreAffaires={chiffreAffaires}
          filterDate={filterDate}
          handleSetFilterDate={handleSetFilterDate}
        />
        <div
          className="mb-6 grid h-4/5 w-full grid-cols-1 gap-4 md:grid-cols-2"
          key={key}
        >
          <DashboardLayout title="Répartition des articles">
            <ArticlesPieChart articles={data?.articles} />
          </DashboardLayout>
          <DashboardLayout title="Répartition des sociétés">
            <CompaniesPieChart companies={data?.companies} />
          </DashboardLayout>
        </div>
        <Flexbox fullWidth className="gap-4">
          <DashboardLayout
            className="w-full"
            title="Répartition géographique des sociétés"
          >
            <CompaniesDistributionMap
              countries={companiesCountriesWithNumberOfCompaniesPerCountry}
            />
          </DashboardLayout>
          <DashboardLayout
            title="Le nombre de nouvelles sociétés enregistrées"
            className="w-full"
          >
            <RegisteredCompaniesHistogram
              companiesCreatedDates={companiesCreatedDates}
            />
          </DashboardLayout>
        </Flexbox>
      </Flexbox>
    </PageHeaderLayout>
  );
};

const DashboardLayout = ({
  title,
  className,
  children,
}: PropsWithChildren<LayoutProps>) => {
  return (
    <Flexbox
      className={cn(
        "gap-5 rounded-2xl bg-white px-5 py-6 mobileScreen:px-3 mobileScreen:py-2",
        className,
      )}
    >
      <h1 className="text-[22px] font-semibold text-blue-title">{title}</h1>
      {children}
    </Flexbox>
  );
};
