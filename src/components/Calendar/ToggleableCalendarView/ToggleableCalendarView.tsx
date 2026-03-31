import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import { getCalendarActions } from "$/api/actions/get-calendar-actions";
import Flexbox from "$/components/ui/Flexbox";
import MainLoader from "$/components/ui/Loaders/MainLoader";
import useAuth from "$/hooks/contexts/useAuth";
import { cn } from "$/utils/functions/misc.functions";

import BigCalendar from "../big-calendar";
import CalendarProvider from "../context/CalendarProvider";

export type CalendarViewMode =
  | "week"
  | "day"
  | "month"
  | "agenda"
  | "work_week";

function ToggleableCalendarView() {
  const location = useLocation();

  const [filters, setFilters] = useState<{
    actionTypes: number[];
  }>({
    actionTypes: [],
  });

  const { user } = useAuth();

  const interventionId = location.state && location.state.interventionId;

  const { data } = useQuery({
    queryKey: ["calendar-actions", filters],
    queryFn: () => getCalendarActions(filters),
    gcTime: 0,
    retry: false,
  });

  const formatDate = (input: string) => {
    const date = new Date(input);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + userTimezoneOffset);
  };

  const calendarEvents = useMemo(
    () =>
      (data ?? []).map((event) => {
        let endDate = event.endDate
          ? formatDate(event.endDate)
          : new Date(event.startDate);

        if (!event.endDate)
          endDate = formatDate(
            new Date(endDate.setUTCHours(23, 59, 59, 999)).toISOString(),
          );

        return {
          id: event.id,
          title: event.title,
          color: event.actionTypeColor,
          start: formatDate(event.startDate),
          end: endDate,
        };
      }),
    [data],
  );

  const handleSetFilters = (filters: {
    search?: string;
    actionTypes: number[];
  }) => {
    setFilters(filters);
  };

  if (!user) return <MainLoader />;

  return (
    <CalendarProvider
      interventionId={interventionId}
      events={calendarEvents}
      filters={filters}
      handleSetFilters={handleSetFilters}
    >
      <Flexbox
        fullWidth
        className={cn("h-full space-y-3 rounded-2xl bg-white")}
      >
        <Flexbox
          fullWidth
          className={cn(
            "bg-grey-light h-full space-y-3 rounded-2xl bg-white p-4 smallTabletScreen:p-2",
          )}
        >
          <Flexbox
            fullHeight
            fullWidth
            className="h-full rounded-2xl bg-gray-light p-4 smallTabletScreen:p-0"
          >
            <Flexbox
              fullWidth
              className="h-full rounded-2xl bg-white p-4 smallTabletScreen:p-0"
            >
              <BigCalendar />
            </Flexbox>
          </Flexbox>
        </Flexbox>
      </Flexbox>
    </CalendarProvider>
  );
}

export default ToggleableCalendarView;
