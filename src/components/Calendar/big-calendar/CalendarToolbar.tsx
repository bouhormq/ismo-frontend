import { useQuery } from "@tanstack/react-query";
import { isArray } from "lodash";
import { useState } from "react";
import type { ToolbarProps } from "react-big-calendar";

import { getActionTypes } from "$/api/actions/get-action-types";
import FormStyledSelectInput from "$/components/common/FormStyledSelectInput";
import Form from "$/components/form/Form";
import { ActionFormModal } from "$/components/form/forms/ClientForm/components/ActionsTab/ActionFormModal";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import { formatDateToFrench } from "$/components/ui/MultiDateRange/date.function";
import { useMediaQuery } from "$/hooks/useMediaQuery";
import CalendarNextIcon from "$/icons/CalendarNextIcon";
import PlusIcon from "$/icons/Filters/PlusIcon";
import {
  convertViewModeToLabel,
  monthlyOptions,
} from "$/utils/functions/date.functions";

import { CalendarViewMode } from "../ToggleableCalendarView/ToggleableCalendarView";
import { CalendarLegend } from "./CalendarLegend";

export default function CalendarToolbar({
  onNavigate,
  date,
  onView,
  view,
}: ToolbarProps) {
  const isDesktop = useMediaQuery("(min-width: 900px)");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { data: actionTypes } = useQuery({
    queryKey: ["action-types"],
    queryFn: getActionTypes,
    retry: false,
  });

  const handleSetOpen = (isOpen: boolean) => {
    setIsPopupOpen(isOpen);
  };

  const goToBack = () => {
    onNavigate("PREV");
  };

  const goToNext = () => {
    onNavigate("NEXT");
  };

  // const goToToday = () => {
  //   onNavigate("TODAY");
  // };

  /** The day of the end week */
  const futureDate = new Date(date);
  futureDate.setDate(futureDate.getDate() + 6);

  return (
    <>
      <Flexbox
        row
        fullWidth
        justify="between"
        className={
          "mb-3 flex h-12 items-center rounded-md text-xs smallTabletScreen:mb-24 smallTabletScreen:flex-col smallTabletScreen:gap-4 mobileScreen:mb-28"
        }
      >
        <Flexbox
          row
          justify="center"
          align="center"
          className="gap-3 smallTabletScreen:gap-1"
        >
          <Flexbox
            row
            align="center"
            justify="center"
            className="gap-1 rounded-2xl bg-[#0A2D6E] px-3 py-2 smallTabletScreen:h-full smallTabletScreen:max-h-[40px] smallTabletScreen:w-fit smallTabletScreen:max-w-[55%] smallTabletScreen:rounded-full"
          >
            <button
              type="button"
              onClick={goToBack}
              className="text-sm font-bold"
            >
              <CalendarNextIcon className="rotate-180 smallTabletScreen:h-6 smallTabletScreen:w-6" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="text-sm font-bold"
            >
              <CalendarNextIcon className="smallTabletScreen:h-6 smallTabletScreen:w-6" />
            </button>
            <button
              type="button"
              // onClick={goToToday}
              className="text-sm font-semibold text-white mobileScreen:text-xs"
            >
              {formatDateToFrench(date)}
            </button>
          </Flexbox>

          <Button
            className="hidden gap-0 bg-[#F4F5F7] px-4 py-2.5 smallTabletScreen:flex smallTabletScreen:h-full smallTabletScreen:max-h-[40px] smallTabletScreen:w-fit smallTabletScreen:max-w-[45%]"
            onClick={() => setIsPopupOpen(true)}
          >
            <PlusIcon className="h-4 w-4 shrink-0" />
            <span className="smallTabletScreen:text-xs">Nouvelle Action</span>
          </Button>
        </Flexbox>

        <Flexbox row align="center" className="gap-3 mobileScreen:flex-col">
          <Button
            className="w-fit gap-0 bg-[#F4F5F7] px-3 py-2 smallTabletScreen:hidden"
            onClick={() => setIsPopupOpen(true)}
          >
            <PlusIcon className="h-4 w-fit" />
            <span>Nouvelle Action</span>
          </Button>

          <Flexbox
            row
            align="center"
            justify="center"
            className="gap-3 smallTabletScreen:rounded-2xl smallTabletScreen:p-2"
            style={{
              boxShadow: !isDesktop ? "0px 8px 20px 0px #9A9A9A4D" : "",
            }}
          >
            <CalendarLegend actionTypes={actionTypes ?? []} />

            <Form onSubmit={() => {}} className="w-32">
              <FormStyledSelectInput<string>
                name="mode"
                defaultOuterValue={view}
                contentClassName="w-32 rounded-2xl border-1 border-[#EFEFEF]"
                mainClassName="w-32 rounded-2xl border-1 border-[#EFEFEF] !bg-white !px-4 !text-base"
                iconClassName="w-4 h-4"
                placeHolder={convertViewModeToLabel(view)}
                handleOnSelect={(value) => {
                  if (isArray(value)) return;
                  onView(value.value as CalendarViewMode);
                }}
                options={monthlyOptions}
              />
            </Form>
          </Flexbox>
        </Flexbox>
      </Flexbox>

      <ActionFormModal
        mode="calendar-create"
        isOpen={isPopupOpen}
        handleSetOpen={handleSetOpen}
      />
    </>
  );
}
