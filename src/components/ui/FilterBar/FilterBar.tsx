import { PropsWithChildren } from "react";
import { FieldValues } from "react-hook-form";

import useGeneral from "$/hooks/contexts/useGeneral";
import { cn } from "$/utils/functions/misc.functions";

import Form from "../../form/Form";
import Button from "../Button";
import Flexbox from "../Flexbox";
import CloseAndResetFilters from "./CloseAndResetFilters";

const filterBtnsClassName =
  "secondary-body-caption flex h-[38px] min-w-24  items-center gap-4 rounded-xl border-[1px] border-lightGray-input bg-white px-4 tabletScreen:text-xs";

type Props = {
  handleSubmit: (e: FieldValues) => void;
  handleResetFilters?: VoidFunction;
  onCloseFilterBar?: VoidFunction;
  defaultValues?: FieldValues;
};

const FilterBar = ({
  handleSubmit,
  handleResetFilters,
  onCloseFilterBar,
  defaultValues,
  children,
}: PropsWithChildren<Props>) => {
  const { isFilterBarOpen, setIsFilterBarOpen } = useGeneral();

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[202] !mt-0 w-full bg-black bg-opacity-50 transition-opacity duration-300",
          isFilterBarOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setIsFilterBarOpen(false)}
      />
      <div
        className={cn(
          "fixed right-0 top-0 z-[203] !mt-0 h-full w-[525px] overflow-y-auto rounded-l-[28px] bg-white px-5 transition-transform duration-300 mobileScreen:w-[290px]",
          isFilterBarOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <Form onSubmit={handleSubmit} className="w-full">
          <CloseAndResetFilters
            handleResetFilters={handleResetFilters}
            defaultValues={defaultValues}
            onCloseFilterBar={onCloseFilterBar}
          />
          <Flexbox
            className="z-[100] mt-4 h-full gap-4 tabletScreen:mt-2 tabletScreen:px-3"
            fullWidth
          >
            {children}
          </Flexbox>
          <Flexbox fullWidth className="my-5 gap-4">
            <div className="h-[1px] w-full bg-[#0000001A]" />
            <Button
              type="submit"
              className={cn(
                filterBtnsClassName,
                "bg-[#0b204b] font-normal text-white",
              )}
            >
              Appliquer le filtre
            </Button>
          </Flexbox>
        </Form>
      </div>
    </>
  );
};

export default FilterBar;
