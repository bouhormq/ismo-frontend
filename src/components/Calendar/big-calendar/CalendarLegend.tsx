import { debounce } from "lodash";
import { ChevronDown, SearchIcon } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { ActionTypes } from "$/api/actions/get-action-types";
import { CustomCheckbox } from "$/components/inputs/CustomCheckbox";
import TextInput from "$/components/inputs/TextInput";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import useOutsideClick from "$/hooks/useOutsideClick";
import { cn } from "$/utils/functions/misc.functions";

import useCalendar from "../hooks/useCalendar";

type Props = {
  actionTypes: ActionTypes;
};

export const CalendarLegend = ({ actionTypes }: Props) => {
  const { filters, handleSetFilters } = useCalendar();

  const [filteredActionTypeName, setFilteredActionTypeName] = useState("");

  const ref = useRef<HTMLDivElement>(null);
  const [isListOpen, setIsListOpen] = useState(false);

  useOutsideClick(ref, () => {
    setIsListOpen(false);
    setFilteredActionTypeName("");
  });

  const handleFilter = debounce((value: string) => {
    setFilteredActionTypeName(value);
  }, 400);

  const filteredActionTypes = useMemo(
    () =>
      actionTypes.filter(
        (actionType) =>
          actionType.name
            .toLowerCase()
            .includes(filteredActionTypeName.toLowerCase()),
        [actionTypes],
      ),
    [actionTypes, filteredActionTypeName],
  );

  const handleSetOpen = (isOpen: boolean) => {
    if (!isOpen) setFilteredActionTypeName("");
    setIsListOpen(isOpen);
  };

  return (
    <Flexbox ref={ref} className="relative">
      <Button
        className="border-1 border-[#EFEFEF] bg-white px-3 py-2"
        onClick={() => handleSetOpen(!isListOpen)}
      >
        <span className="ml-2">Légende</span>
        <ChevronDown size={16} />
      </Button>

      {isListOpen && (
        <Flexbox
          fullWidth
          className="absolute top-[120%] z-[100] min-w-64 gap-2 rounded-xl border-1 border-[#CED4DA] bg-white px-3 py-2 shadow-sm"
        >
          <TextInput
            onChange={(e) => handleFilter(e.target.value)}
            icon={<SearchIcon className="w-5" />}
            placeholder="Chercher"
            inputClassName="placeholder-[#B4B4B4]"
            className="relative flex !h-full max-h-9 items-center gap-2 bg-gray-inputBg px-[14px] py-1.5"
          />

          {filteredActionTypes.map((actionType) => {
            const isChecked = Boolean(
              filters.actionTypes.find((id) => actionType.id === id),
            );

            const color = actionType.color;

            return (
              <Flexbox
                key={actionType.id}
                row
                align="center"
                fullWidth
                className={cn("gap-2 rounded-lg p-2", {
                  [`hover:bg-[color:--hover-bg] ${color.includes("#000") ? "hover:text-white" : "hover:text-black"}`]:
                    true,
                })}
                style={{ "--hover-bg": color } as React.CSSProperties}
              >
                <CustomCheckbox
                  color={actionType.color}
                  checked={isChecked}
                  allowColorToDarken
                  onChange={(checked) => {
                    handleSetFilters({
                      ...filters,
                      actionTypes: checked
                        ? [...filters.actionTypes, actionType.id]
                        : filters.actionTypes.filter(
                            (id) => id !== actionType.id,
                          ),
                    });
                  }}
                />
                <p className={cn("text-xs")}>{actionType.name}</p>
              </Flexbox>
            );
          })}

          <Flexbox row fullWidth align="center" justify="between">
            <p className="text-custom-10 text-[#495057]">
              Sélectionné : {filters.actionTypes.length}
            </p>

            <Button
              onClick={() => handleSetFilters({ ...filters, actionTypes: [] })}
              className="w-fit p-[unset] text-xs text-[#FF0000] underline"
            >
              Clair
            </Button>
          </Flexbox>
        </Flexbox>
      )}
    </Flexbox>
  );
};
