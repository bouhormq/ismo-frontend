import { XIcon } from "lucide-react";
import { useEffect } from "react";
import { FieldValues, useFormContext } from "react-hook-form";

import useGeneral from "$/hooks/contexts/useGeneral";
import ResetIcon from "$/icons/Filters/ResetIcon";

import Button from "../Button";
import Flexbox from "../Flexbox";

type Props = {
  handleResetFilters?: VoidFunction;
  onCloseFilterBar?: VoidFunction;
  defaultValues?: FieldValues;
};

function CloseAndResetFilters({
  handleResetFilters,
  onCloseFilterBar,
  defaultValues,
}: Props) {
  const { reset } = useFormContext();

  const { isFilterBarOpen, setIsFilterBarOpen } = useGeneral();

  useEffect(() => {
    if (!isFilterBarOpen) {
      onCloseFilterBar?.();
    }
  }, [isFilterBarOpen, onCloseFilterBar]);

  const onReset = () => {
    reset({});
    handleResetFilters?.();
  };

  useEffect(() => {
    if (isFilterBarOpen) reset(defaultValues);
  }, [defaultValues, isFilterBarOpen, reset]);

  return (
    <Flexbox
      fullWidth
      className="border-lightGray-input sticky top-0 z-[200] border-b-[1px] bg-white py-6"
    >
      <Flexbox
        row
        fullWidth
        className="gap-2 tabletScreen:items-start tabletScreen:justify-start"
        align="center"
      >
        <h1 className="text-3xl leading-10 text-[#04152D]">Filtres</h1>
        <Flexbox row className="ml-auto items-center justify-center gap-5">
          <Button className="p-0" type="reset">
            <ResetIcon className="h-3.5 w-3.5" onClick={onReset} />
          </Button>
          <Button
            className="p-0"
            onClick={() => {
              setIsFilterBarOpen(false);
            }}
          >
            <XIcon className="h-3 w-3" />
          </Button>
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
}

export default CloseAndResetFilters;
