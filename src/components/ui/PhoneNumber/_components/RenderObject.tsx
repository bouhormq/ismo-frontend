import React from "react";

import {
  countriesPhoneCodes,
  countryNames,
} from "../_constants/countryCodes.constants";
import { Option } from "../_types";

type Props = {
  options: Option[];
  filterOptions: (options: Option[]) => Option[];
  handleOptionSelect: (option: Option) => void;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLDivElement>,
    option: Option,
  ) => void;
  checkIfIsSelected: (option: Option) => boolean;
};

function RenderOptions({
  options,
  filterOptions,
  handleOptionSelect,
  handleKeyDown,
  checkIfIsSelected,
}: Props) {
  if (!Array.isArray(options)) return null;

  return (
    <div className="h-full">
      {filterOptions(options).length > 0 ? (
        filterOptions(options).map((option, index) => (
          <div
            tabIndex={0}
            key={index}
            data-option-index={index}
            onClick={(e) => {
              e.stopPropagation();
              handleOptionSelect({
                ...option,
                name: countryNames[option.code],
              });
            }}
            onKeyDown={(event) => handleKeyDown(event, option)}
            className={`flex cursor-pointer items-center gap-3 border-b-[1px] border-gray-200 px-3 py-2 text-sm ${
              checkIfIsSelected(option)
                ? "text-purple-normal bg-blue-light"
                : "hover:bg-gray-100"
            } focus:bg-gray-100 focus:outline-none`}
          >
            <div className="flex h-5 w-5 overflow-hidden rounded-full border-[1px] border-gray-200">
              <img
                src={option.image}
                alt="RUS"
                loading="lazy"
                className="h-full w-full shrink-0 scale-x-[1.3] scale-y-[2] object-fill"
              />
            </div>
            {option.name}
            <span className="ml-auto">
              {countriesPhoneCodes[option.unicode]}
            </span>
          </div>
        ))
      ) : (
        <div className="h-full px-4 py-2 text-center text-sm text-gray-500">
          Pas des résultats
        </div>
      )}
    </div>
  );
}

export default RenderOptions;
