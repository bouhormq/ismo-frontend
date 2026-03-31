import { useFormContext } from "react-hook-form";

import { FormDatePicker } from "$/components/form/FormDatePicker";
import { FormTimeInput } from "$/components/form/FormTimeInput";
import Flexbox from "$/components/ui/Flexbox";

import { NewCompanyActionDataType } from "./validations";

type Props = {
  disabled: boolean;
};

export const SecondSection = ({ disabled }: Props) => {
  const form = useFormContext<NewCompanyActionDataType>();

  const { setValue } = form;

  const handleChangeDate = (
    key: "startDate" | "endDate" | "alarmDate",
    date: Date,
  ) => {
    if (key === "startDate") {
      setValue(key, date.toISOString().split("T")[0]);
      setValue("endDate", date.toISOString().split("T")[0]);
    } else {
      setValue(key, date.toISOString().split("T")[0]);
    }
  };

  const handleTimeChange = (
    key: "startDateTime" | "endDateTime" | "alarmDateTime",
    value: string,
  ) => {
    if (key === "startDateTime") {
      const [hours, minutes] = value.split(":").map(Number);
      const newMinutes = minutes + 2;
      const newTime = `${
        hours < 10 ? `0${hours}` : hours
      }:${newMinutes < 10 ? `0${newMinutes}` : newMinutes}`;
      setValue("endDateTime", newTime);
    }
  };
  return (
    <Flexbox
      fullWidth
      className="gap-4 rounded-3xl border border-[#EEF6F7] smallTabletScreen:border-none"
    >
      <Flexbox
        fullWidth
        row
        className="gap-4 rounded-t-3xl bg-[#E5F7FF] p-4 smallTabletScreen:hidden"
      >
        <p className="ml-20 w-1/2">Date</p>
        <p className="ml-6 w-1/2">Heure</p>
      </Flexbox>

      <Flexbox
        align="center"
        fullWidth
        className="gap-4 px-4 pb-4 smallTabletScreen:flex-col smallTabletScreen:px-[unset] smallTabletScreen:pb-[unset]"
      >
        <Flexbox
          row
          align="center"
          justify="center"
          fullWidth
          className="gap-6 smallTabletScreen:gap-2"
        >
          <p className="w-[6%] smallTabletScreen:w-[15%] smallTabletScreen:text-xs">
            Début
          </p>
          <FormDatePicker
            name="startDate"
            handleSetDateRange={(date) => handleChangeDate("startDate", date)}
            label="Date"
            labelWrapperClassName="!min-w-[unset] !w-1/2"
            iconClassName="!text-[#43454E]"
            value={form.watch("startDate")}
            singleDate
            disabled={disabled}
            showLabelWithValue={false}
          />

          <FormTimeInput
            handleOnChange={(value) => handleTimeChange("startDateTime", value)}
            name="startDateTime"
            label="Heure"
            labelWrapperClassName="!min-w-[unset] !w-1/2"
            disabled={disabled}
            showLabelWithValue={false}
          />
        </Flexbox>

        <Flexbox
          row
          align="center"
          justify="center"
          fullWidth
          className="gap-6 smallTabletScreen:gap-2"
        >
          <p className="w-[6%] smallTabletScreen:w-[15%] smallTabletScreen:text-xs">
            Fin
          </p>
          <FormDatePicker
            name="endDate"
            handleSetDateRange={(date) => handleChangeDate("endDate", date)}
            label="Date"
            labelWrapperClassName="!min-w-[unset] !w-1/2"
            iconClassName="!text-[#43454E]"
            value={form.watch("endDate")}
            singleDate
            disabled={disabled}
            showLabelWithValue={false}
          />

          <FormTimeInput
            name="endDateTime"
            label="Heure"
            labelWrapperClassName="!min-w-[unset] !w-1/2"
            disabled={disabled}
            showLabelWithValue={false}
          />
        </Flexbox>

        <Flexbox
          row
          align="center"
          justify="center"
          fullWidth
          className="gap-6 smallTabletScreen:gap-2"
        >
          <p className="w-[6%] smallTabletScreen:w-[15%] smallTabletScreen:text-xs">
            Alarme
          </p>
          <FormDatePicker
            name="alarmDate"
            handleSetDateRange={(date) => handleChangeDate("alarmDate", date)}
            label="Date"
            labelWrapperClassName="!min-w-[unset] !w-1/2"
            iconClassName="!text-[#43454E]"
            singleDate
            disabled={disabled}
            showLabelWithValue={false}
          />

          <FormTimeInput
            name="alarmDateTime"
            label="Heure"
            labelWrapperClassName="!min-w-[unset] !w-1/2"
            disabled={disabled}
            showLabelWithValue={false}
          />
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
};
