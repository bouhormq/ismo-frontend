import { useEffect, useRef, useState } from "react";

import Form from "$/components/form/Form";
// import { deleteAppointment } from "$/api/appointments/delete-appointment";
// import { AppointmentInterventionDetails } from "$/api/appointments/get-intervention-details";
// import { updateAppointment } from "$/api/appointments/update-appointment";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import BtnSpinner from "$/components/ui/Loaders/BtnSpinner";
import DateComponent from "$/components/ui/table-components/DateComponent";
// import { TimeComponent } from "$/components/ui/table-components/TimeComponent";
import { cn } from "$/utils/functions/misc.functions";

import { getCalendarPopupClassName } from "../big-calendar/utils";
import { PositionObj } from "./CalendarEvent";

type Props = {
  handleCLose: () => void;
  startDate?: Date | string;
  endDate?: Date | string;
  intervention?: any;
  //   intervention?: AppointmentInterventionDetails;
};

function CalendarPopup({
  handleCLose,
  startDate,
  endDate,
  intervention,
}: Props) {
  const [newPosition, setNewPosition] = useState<PositionObj>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const timeContent = document.querySelector(".rbc-time-content");
    if (timeContent && ref.current) {
      const parentRect = timeContent.getBoundingClientRect();
      const absoluteDivRect = ref.current.getBoundingClientRect();
      const canPlaceAbove =
        absoluteDivRect.top - parentRect.top >= absoluteDivRect.height;
      const canPlaceBelow =
        parentRect.bottom - absoluteDivRect.bottom >= absoluteDivRect.height;
      const canPlaceLeft =
        absoluteDivRect.left - parentRect.left >= absoluteDivRect.width;
      const canPlaceRight =
        parentRect.right - absoluteDivRect.right >= absoluteDivRect.width;

      setNewPosition({
        canPlaceAbove,
        canPlaceBelow,
        canPlaceLeft,
        canPlaceRight,
      });
    }
  }, []);

  if (!startDate || !endDate) return null;

  const handleDeleteEvent = () => {
    if (!intervention) return;
    // handleDeleteAppointment(intervention.id);
  };

  const handleChangeEvent = async () => {
    // if (!selectedTimes) return;
    // const { start, end } = selectedTimes;
    // const startingHour = getDateWithTimezoneDifference(start.toString());
    // const endingHour = getDateWithTimezoneDifference(end.toString());
    // await handleUpdateAppointment({
    //   start: new Date(startingHour),
    //   end: new Date(endingHour),
    //   interventionId: intervention?.id,
    // });
    // setEvents((prev) => {
    //   const findEvent = prev.find(
    //     (event) => event.interventionId === intervention?.id,
    //   );
    //   return [
    //     ...prev.filter((event) => event.interventionId !== intervention?.id),
    //     {
    //       ...findEvent,
    //       start: selectedTimes.start,
    //       end: selectedTimes.end,
    //     },
    //   ];
    // });
  };

  // const handleTimeChange = (start: Date, end: Date) => {
  //   setSelectedTimes({ start, end });
  // };

  return (
    <div
      ref={ref}
      className={cn(
        "intervention-[state=open]:animate-contentShow absolute z-[101] max-h-[90dvh] w-[90vw] max-w-[350px] rounded-2xl bg-white text-black shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none 13inch:top-1/2",
        "flex flex-col items-center justify-center gap-2",
        getCalendarPopupClassName(newPosition),
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <Flexbox
        row
        justify="between"
        align="center"
        fullWidth
        className="border-b-1 border-gray-light p-2 text-black"
      >
        <h6 className="text-base font-bold">Détails du rendez-vous</h6>
        <Button
          onClick={handleCLose}
          variant="text"
          className={cn(
            "flex w-fit items-center justify-center rounded-full border-1 border-gray-light p-2",
          )}
        >
          <span>close icon</span>
          {/* <CloseIcon /> */}
        </Button>
      </Flexbox>
      {!intervention ? (
        <Flexbox align="center" justify="center">
          <BtnSpinner />
        </Flexbox>
      ) : (
        <div className="w-full">
          <Form onSubmit={(e) => console.log(e)}>
            <Flexbox fullWidth className="gap-2 p-2 text-sm">
              <h6 className="text-sm font-bold">Type de rendez-vous</h6>
              <Flexbox fullWidth className="text-sm">
                <Flexbox
                  fullWidth
                  row
                  align="center"
                  justify="between"
                  className="text-sm font-semibold"
                >
                  ID : <span>{intervention.id}</span>
                </Flexbox>
                <Flexbox
                  fullWidth
                  row
                  align="center"
                  justify="between"
                  className="text-sm font-semibold"
                >
                  Mode : <span>{intervention.mode}</span>
                </Flexbox>
                <Flexbox
                  fullWidth
                  row
                  align="center"
                  className="text-sm font-semibold"
                  justify="between"
                >
                  Type d'intervention : <span>{intervention.type}</span>
                </Flexbox>
                <Flexbox
                  fullWidth
                  row
                  align="start"
                  justify="between"
                  className="gap-2 text-sm font-semibold"
                >
                  Description&nbsp;:{" "}
                  <span className="text-left">{intervention.description}</span>
                </Flexbox>
              </Flexbox>
              <Flexbox fullWidth>
                <h6 className="text-xs font-bold">Heure du rendez-vous</h6>
                <Flexbox fullWidth row className="space-x-2">
                  <DateComponent
                    date={new Date(startDate)}
                    className="w-full"
                  />
                  {/* <TimeComponent
                    onChange={handleTimeChange}
                    startDate={new Date(startDate)}
                    endDate={new Date(endDate)}
                  /> */}
                </Flexbox>
              </Flexbox>
            </Flexbox>
            <div className="flex h-fit w-full flex-row-reverse justify-between p-2">
              <Button
                variant="primary"
                type="submit"
                onClick={handleChangeEvent}
                className={cn(
                  "secondary-body-caption inline-flex h-[40px] w-fit min-w-[86px] items-center justify-center rounded-xl border-[1px] px-4 outline-none hover:shadow-[0_0_0_2px] focus:shadow-[0_0_0_2px]",
                )}
              >
                Modifier
              </Button>
              <Button
                variant="faded"
                type="submit"
                onClick={handleDeleteEvent}
                className={cn(
                  "secondary-body-caption bg-red-light inline-flex h-[40px] w-fit min-w-[86px] items-center justify-center rounded-xl border-[1px] px-4 text-red-normal outline-none hover:shadow-[0_0_0_2px] focus:shadow-[0_0_0_2px]",
                )}
              >
                Supprimer
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}

export default CalendarPopup;
