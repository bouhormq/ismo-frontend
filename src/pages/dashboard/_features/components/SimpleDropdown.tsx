import { ChevronDownIcon } from "lucide-react";
import { useRef, useState } from "react";

import Button from "$/components/ui/Button";
import useOutsideClick from "$/hooks/useOutsideClick";

export type OptionType = {
  value: string | { year: number; month: number };
  label: string;
};

type Props = {
  defaultOption: OptionType;
  options: OptionType[];
  handleOnClick: (option: OptionType) => void;
};

export const SimpleDropdown = ({
  defaultOption,
  options,
  handleOnClick,
}: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => {
    setIsDropdownOpen(false);
  });
  const handleSelectOption = (option: OptionType) => {
    setSelectedOption(option);
    handleOnClick(option);
    setIsDropdownOpen(false);
  };

  return (
    <div ref={ref}>
      <Button
        className="w-fit text-xs"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedOption.label}
        <ChevronDownIcon className="size-4" />
      </Button>
      {isDropdownOpen && (
        <div className="absolute z-50 rounded-md border border-gray-border bg-white shadow-md">
          {options.map((option) => (
            <Button
              className="w-full text-xs"
              onClick={() => handleSelectOption(option)}
              key={`${typeof option.value === "string" ? option.value : option.value.year}-${option.label}`}
            >
              {option.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
