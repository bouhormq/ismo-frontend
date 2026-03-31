import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ResponsiveDialog from "$/components/DialogComponents/ResponsiveDialog";
import ConfirmationDialog from "$/components/DialogComponents/alertDialog/AlertDialog";
import TimeInput from "$/components/inputs/TimeInput";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import { cn } from "$/utils/functions/misc.functions";

import { CalendarType } from "../big-calendar";
import { isWithinOpeningHours } from "../big-calendar/utils";
import useCalendar from "../hooks/useCalendar";

type StartEndDate = {
  start: Date;
  end: Date;
};

const DateInputTriggerer = ({ canAddEvents }: CalendarType) => {
  const [open, setOpen] = useState(false);
  const [openDateInput, setOpenDateInput] = useState(false);
  const [dateObj, setDateObj] = useState<StartEndDate | null>(null);
  const { storeOpeningHours } = useCalendar();
  const today = new Date().toISOString().split("T")[0];

  //   const { mutate: handleCreateAppointment, isPending } = useMutation({
  //     mutationFn: createAppointment,
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({
  //         predicate: (query) => query.queryKey[0] === "getUserAppointments",
  //       });
  //       setOpen(false);
  //       setDateObj(null);
  //       setOpenDateInput(false);
  //     },
  //     onError: (error, variables) => {
  //       const err = error as AxiosError;
  //       console.log(error);
  //       // @ts-ignore
  //       toast.error(err.response?.data.message);

  //       setEvents((prev) => {
  //         const index = prev.findIndex(
  //           (e) => e.interventionId === variables.interventionId,
  //         );
  //         if (index === -1) return prev;
  //         prev.splice(index, 1);
  //         return prev;
  //       });
  //       queryClient.invalidateQueries({
  //         predicate: (query) => query.queryKey[0] === "getUserAppointments",
  //       });
  //       setOpen(false);
  //       setDateObj(null);
  //       setOpenDateInput(false);
  //     },
  //   });

  const [start, setStart] = useState(dateObj?.start || new Date());
  const [end, setEnd] = useState(
    dateObj?.end || new Date(start.getTime() + 30 * 60 * 1000),
  );

  const handleOnStartChange = (time: string) => {
    const [hours, minutes] = time.split(":");
    const newDate = new Date(start);
    newDate.setHours(parseInt(hours));
    newDate.setMinutes(parseInt(minutes));
    setStart(newDate);
  };

  const handleOnEndChange = (time: string) => {
    const [hours, minutes] = time.split(":");
    const newDate = new Date(end);
    newDate.setHours(parseInt(hours));
    newDate.setMinutes(parseInt(minutes));
    setEnd(newDate);
  };

  useEffect(() => {
    if (start >= end) {
      const newEnd = new Date(start);
      newEnd.setMinutes(start.getMinutes() + 15);
      setEnd(newEnd);
    } else if (end.getTime() - start.getTime() < 15 * 60 * 1000) {
      const newEnd = new Date(start);
      newEnd.setMinutes(start.getMinutes() + 15);
      setEnd(newEnd);
    }

    setDateObj({ start, end });
  }, [start, end]);

  const handleAddEvent = async () => {
    if (!canAddEvents || !dateObj) {
      toast.error("Ne peut pas ajouter d'événement pour le moment");
      setOpen(false);
      setDateObj(null);
      return;
    }

    const { start } = dateObj;
    if (!storeOpeningHours) {
      toast.error("Pas dans la plage des heures d'ouverture du magasin");
      setOpen(false);
      setDateObj(null);
      return;
    }

    const isValid = isWithinOpeningHours(
      storeOpeningHours,
      start.toISOString(),
    );
    if (!isValid) {
      toast.error("L'heure de début n'est pas valide");
      setOpen(false);
      return;
    }

    // handleCreateAppointment({ start, end, interventionId });
    // setEvents((prev) => [...prev, { start, end, interventionId }]);
  };

  const handleCancel = () => {
    setOpenDateInput(false);
    setDateObj(null);
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpenDateInput(false);
    setOpen(true);
  };

  return (
    <>
      <Button
        onClick={() => setOpenDateInput(true)}
        className="border-purple-normal text-purple-normal w-fit border-2 bg-purple-200"
      >
        Choisir un Rendez vous
      </Button>

      <ConfirmationDialog
        isLoading={false}
        // isLoading={isPending}
        title="Êtes-vous sûr de vouloir planifier cet événement ?"
        open={open}
        // icon={<WaitingForAppointment className="h-10 w-10" />}
        onCancel={handleCancel}
        onConfirm={() => handleAddEvent()}
        confirmText="Planifier"
        iconWrapperClassName="bg-gray-light"
        confirmBtnClassName="bg-green-light text-green-normal"
      />

      <ResponsiveDialog handleSetOpen={setOpenDateInput} open={openDateInput}>
        <Flexbox className="gap-3 rounded-2xl bg-white p-5">
          <div className="flex flex-col gap-5">
            <h6>Planifier un événement</h6>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Date de début:</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  min={today}
                  value={dateObj?.start.toISOString().split("T")[0] || ""}
                  onChange={(e) => setStart(new Date(e.target.value))}
                  className="input-field rounded-xl border-1 border-gray-200 p-2"
                />
                <TimeInput
                  defaultValue={start.toTimeString().slice(0, 5)}
                  onChange={handleOnStartChange}
                  minuteStep={30}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Date de fin:</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  min={today}
                  value={dateObj?.end.toISOString().split("T")[0] || ""}
                  onChange={(e) => setEnd(new Date(e.target.value))}
                  className="input-field rounded-xl border-1 border-gray-200 p-2"
                />
                <TimeInput
                  defaultValue={end.toTimeString().slice(0, 5)}
                  onChange={handleOnEndChange}
                  minuteStep={30}
                />
              </div>
            </div>
          </div>
          <div
            className={cn(
              "flex h-fit w-full justify-between gap-9 border-t-1 border-gray-light p-2 pb-0",
            )}
          >
            <Button
              type="button"
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation();
                handleCancel();
              }}
              className="secondary-body-caption inline-flex h-[40px] w-fit min-w-[86px] items-center justify-center rounded-xl border-[1px] bg-white px-4 text-black outline-none hover:shadow-[0_0_0_2px] focus:shadow-[0_0_0_2px]"
            >
              Annuler
            </Button>
            <Button
              variant="primary"
              type="button"
              isLoading={false}
              disabled={false}
              //   isLoading={isPending}
              //   disabled={isPending}
              onClick={(e) => {
                e.stopPropagation();
                handleConfirm();
              }}
              className={cn(
                "bg-secondary-body-caption bg-purple-light hover:text-purple-normal focus:bg-purple-light focus:text-purple-normal inline-flex h-[40px] w-fit min-w-[86px] items-center justify-center rounded-xl border-[1px] bg-white px-4 text-black outline-none hover:shadow-[0_0_0_2px] focus:shadow-[0_0_0_2px]",
              )}
            >
              Ajouter
            </Button>
          </div>
        </Flexbox>
      </ResponsiveDialog>
    </>
  );
};

export default DateInputTriggerer;
