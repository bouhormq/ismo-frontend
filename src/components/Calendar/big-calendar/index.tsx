import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import {
  Calendar as CoreCalendar,
  SlotInfo,
  View,
  momentLocalizer,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { toast } from "react-toastify";

import ConfirmationDialog from "$/components/DialogComponents/alertDialog/AlertDialog";

import CalendarEvent from "../CalendarEvent/CalendarEvent";
import { TCalendarEvent } from "../context/CalendarProvider";
import useCalendar from "../hooks/useCalendar";
import CalendarHeader from "./CalendarHeader";
import CalendarTimeSlotWrapper from "./CalendarTimeSlotWrapper";
import CalendarToolbar from "./CalendarToolbar";
import MyMonthDateHeader from "./MyMonthDateHeader";
import MyMonthEvent from "./MyMonthEvent";
import MyMonthHeader from "./MyMonthHeader";
import "./styles.scss";
import { isWithinOpeningHours, returnDateTo } from "./utils";

const DnDCalendar = withDragAndDrop(CoreCalendar);

moment.locale("fr", {
  week: {
    dow: 1,
  },
});

export interface StartEndDate {
  start: Date;
  end: Date;
}

export type DisabledCalendarEvent = {
  start: Date;
  end: Date;
};

export interface CalendarType {
  disabledEvents?: DisabledCalendarEvent[];
  canAddEvents?: boolean;
  hourlySlots?: Event[];
  selectable?: boolean;
  onSelectSlot?: (slotInfo: SlotInfo) => void;
  onRangeChange?: (start: Date, end: Date) => void;
  isDataPending?: boolean;
  calendarError?: string;
}

export default function BigCalendar({
  onRangeChange,
  selectable = true,
  calendarError,
  canAddEvents = false,
}: CalendarType) {
  const [open, setOpen] = useState(false);
  const [slotInfo, setSlotInfo] = useState<SlotInfo | null>(null);
  const [startDate, setStartDate] = useState(returnDateTo(new Date()));
  const [view, setView] = useState<View>("week");
  const { events } = useCalendar();
  const localizer = momentLocalizer(moment);

  const onNavigate = (newDate: Date) => {
    setStartDate(newDate);
  };

  const { storeOpeningHours } = useCalendar();

  const handleOpenConfirmationDialog = (slotInfo: SlotInfo) => {
    if (!canAddEvents) return toast.error(calendarError);

    setOpen(true);
    setSlotInfo(slotInfo);
  };

  const handleConfirm = () => {
    if (!slotInfo) return;
    handleAddEvent(slotInfo);
  };

  const handleCancel = () => {
    setSlotInfo(null);
    setOpen(false);
  };

  const handleAddEvent = async (slotInfo: SlotInfo) => {
    const { start } = slotInfo;
    if (!storeOpeningHours)
      return toast.error("Les horaires ne sont pas définis");
    const isValid = isWithinOpeningHours(
      storeOpeningHours,
      start.toISOString(),
    );

    if (!isValid)
      return toast.error("L'événement n'est pas dans les horaires d'ouverture");

    // handleCreateAppointment({
    //   start,
    //   end,
    //   interventionId,
    // });

    // setEvents((prev) => [
    //   ...prev,
    //   {
    //     start,
    //     end,
    //     interventionId: interventionId,
    //   },
    // ]);
  };

  const handleDragDrop = async (event: TCalendarEvent) => {
    if (!event.event) return;
    // const { start, end } = event;

    // const startingHour = getDateWithTimezoneDifference(start.toString());
    // const endingHour = getDateWithTimezoneDifference(end.toString());

    // handleUpdateAppointment({
    //   start: new Date(startingHour),
    //   end: new Date(endingHour),
    //   interventionId: event.event.interventionId,
    // });
    // setEvents((prev) => {
    //   const index = prev.findIndex(
    //     (e) => e.interventionId === event.event?.interventionId,
    //   );
    //   if (index === -1) return prev;
    //   prev[index] = {
    //     ...event,
    //     interventionId: event.event?.interventionId,
    //   };
    //   return prev;
    // });
  };

  const handleEventResize = (event: TCalendarEvent) => {
    if (!event.event) return;
    // const { start, end } = event;

    // const startingHour = getDateWithTimezoneDifference(start.toString());
    // const endingHour = getDateWithTimezoneDifference(end.toString());

    // handleUpdateAppointment({
    //   start: new Date(startingHour),
    //   end: new Date(endingHour),
    //   interventionId: event.event.interventionId,
    // });
    // setEvents((prev) => {
    //   const index = prev.findIndex(
    //     (e) => e.interventionId === event.event?.interventionId,
    //   );
    //   if (index === -1) return prev;
    //   prev[index] = {
    //     ...event,
    //     interventionId: event.event?.interventionId,
    //   };
    //   return prev;
    // });
  };

  const onView = useCallback(
    (view: View) => {
      setView(view);
      setStartDate(returnDateTo(new Date()));
    },
    [setView, setStartDate],
  );

  useEffect(() => {
    const eventContentContainers =
      document.querySelectorAll(".rbc-event-content");

    if (view === "month") {
      // set the class to overflow visible
      eventContentContainers.forEach((element) => {
        element.setAttribute("style", "overflow: visible");
      });
    }
  }, [view]);

  return (
    <>
      <DnDCalendar
        className="m-auto flex h-full w-[98%] smallTabletScreen:h-full smallTabletScreen:w-full [&>div:nth-child(2)]:border-none"
        timeslots={1}
        step={15}
        date={startDate}
        // min={
        //   new Date(now.getFullYear(), now.getMonth(), now.getDate(), 3, 0, 0)
        // }
        // max={new Date(2080, 10, 0, 20, 44, 59)}
        localizer={localizer}
        formats={{
          timeGutterFormat: "HH:mm",
        }}
        showMultiDayTimes
        views={{ week: true, day: true, month: true }}
        resizable={true}
        components={{
          toolbar: CalendarToolbar,
          header: CalendarHeader,
          // @ts-expect-error - eventWrapper is not in the type definition
          event: CalendarEvent,
          // @ts-expect-error - timeSlotWrapper is not in the type definition
          timeSlotWrapper: CalendarTimeSlotWrapper,
          // timeGutterWrapper: CalendarTimeGutter,
          // eventWrapper: CalendarEventWrapper,
          week: {
            header: MyMonthHeader,
          },
          month: {
            header: MyMonthHeader,
            dateHeader: MyMonthDateHeader,
            // @ts-expect-error - event is not in the type definition
            event: MyMonthEvent,
          },
        }}
        draggableAccessor={() => false}
        // @ts-expect-error - draggableAccessor is not in the type definition
        onEventDrop={(e) => handleDragDrop(e)}
        defaultView={"month"}
        showAllEvents
        // @ts-expect-error - showAllEvents is not in the type definition
        onEventResize={(e) => handleEventResize(e)}
        onSelecting={() => false}
        onNavigate={onNavigate}
        selectable={selectable}
        events={events}
        onView={onView}
        onSelectSlot={(slotInfo) => handleOpenConfirmationDialog(slotInfo)}
        onRangeChange={(e) => {
          if (Array.isArray(e)) onRangeChange?.(e[0], e[6]);
        }}
        dayLayoutAlgorithm={"overlap"}
      />

      <ConfirmationDialog
        isLoading={false}
        // isLoading={isPending}
        title={"Êtes-vous sûr de vouloir planifier cet événement ?"}
        open={open}
        // icon={<WaitingForAppointment className="h-10 w-10" />}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        confirmText="Planifier"
        iconWrapperClassName="bg-gray-light"
        confirmBtnClassName="bg-green-light text-green-normal"
      />
    </>
  );
}
