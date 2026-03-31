import React from "react";
import Flexbox from "$/components/ui/Flexbox";
import StyledDatePicker from "$/components/ui/MultiDateRange/StyledDatePicker";
import { formatDate } from "$/utils/functions/misc.functions";

import { HandMoneyIcon } from "../icons/HandMoneyIcon";
import { PeopleIcon } from "../icons/PeopleIcon";
import { RedEmailIcon } from "../icons/RedEmailIcon";

type Props = {
  companiesCount: number;
  allEmails: number;
  chiffreAffaires: number;
  filterDate?: {
    start?: Date;
    end?: Date;
  };
  handleSetFilterDate: (start?: Date, end?: Date) => void;
};

export const DashboardTitle = ({
  companiesCount,
  allEmails,
  chiffreAffaires,
  filterDate,
  handleSetFilterDate,
}: Props) => {
  return (
    <Flexbox
      fullWidth
      className="gap-3 rounded-2xl bg-white px-5 py-6 md:gap-5"
    >
      <Flexbox row fullWidth justify="end" align="center">
        <StyledDatePicker
          value={
            filterDate
              ? filterDate.start?.toISOString() +
                "-" +
                filterDate.end?.toISOString()
              : ""
          }
          handleSetDateRange={(start, end) => handleSetFilterDate(start, end)}
          className="flex w-fit min-w-20 flex-row-reverse items-center justify-center gap-2"
          iconClassName="relative right-0"
          calendarClassName="right-0 shadow-md"
          placeholder={
            filterDate?.start
              ? formatDate(filterDate.start) +
                `${filterDate.end ? " - " + formatDate(filterDate.end) : ""}`
              : "Date"
          }
          showResetButton
          handleReset={() => handleSetFilterDate()}
        />
      </Flexbox>
      <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        <StatBox
          title="Nombre de fiches societes"
          value={`${companiesCount}`}
          icon={<PeopleIcon />}
        />
        <StatBox
          title="Chiffre d'affaires (EUR)"
          value={chiffreAffaires.toLocaleString()}
          icon={<HandMoneyIcon />}
        />
        <StatBox
          title="Nombre de emailings"
          value={`${allEmails}`}
          icon={<RedEmailIcon />}
        />
      </div>
    </Flexbox>
  );
};

type StatBoxProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
};

const StatBox = ({ title, value, icon }: StatBoxProps) => {
  return (
    <Flexbox
      fullWidth
      className="h-28 gap-4 rounded-2xl bg-white pl-4 pr-1 pt-5 shadow-md"
    >
      <Flexbox fullWidth row align="start" className="gap-1.5 md:gap-2.5">
        <div>{icon}</div>
        <Flexbox className="gap-1.5 md:gap-2.5">
          <p className="text-xs md:text-sm">{title}</p>
          <p className="text-xl font-semibold md:text-2xl">{value}</p>
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
};
