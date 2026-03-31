import React from "react";

export type Option<TSelectedValue> = {
  label: string;
  value: TSelectedValue;
};

export type GroupedOptions<TSelectedValue> = Record<
  string,
  Option<TSelectedValue>[]
>;

type Props<TSelectedValue> = {
  isGrouped: boolean;
  options: Option<TSelectedValue>[] | GroupedOptions<TSelectedValue>;
  filterOptions: (
    options: Option<TSelectedValue>[],
  ) => Option<TSelectedValue>[];
  handleOptionSelect: (
    option: Option<TSelectedValue> & {
      groupKey?: string;
    },
  ) => void;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLDivElement>,
    option: Option<TSelectedValue> & {
      groupKey?: string;
    },
  ) => void;
  multiple: boolean;
  disabled: boolean;
  checkIfIsSelected: (
    option: Option<TSelectedValue> & {
      groupKey?: string;
    },
  ) => boolean;
};

function RenderOptions<TSelectedValue>({
  isGrouped,
  options,
  filterOptions,
  handleOptionSelect,
  handleKeyDown,
  multiple,
  disabled,
  checkIfIsSelected,
}: Props<TSelectedValue>) {
  if (!isGrouped && !Array.isArray(options)) return null;

  if (!Array.isArray(options)) {
    return Object.entries(options).map(([groupKey, groupOptions]) => (
      <div
        key={groupKey}
        className="options_group flex max-h-40 w-full shrink-0 flex-col gap-1 overflow-y-auto rounded-xl bg-white pb-2 shadow-md"
      >
        <div className="sticky top-0 z-10 border-b-[1px] border-gray-200 bg-white p-2 font-semibold">
          {groupKey}
        </div>
        {filterOptions(groupOptions as Option<TSelectedValue>[]).length > 0 ? (
          filterOptions(groupOptions as Option<TSelectedValue>[]).map(
            (option, index) => (
              <div
                tabIndex={0}
                key={index}
                data-option-index={index}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOptionSelect({ ...option, groupKey });
                }}
                onKeyDown={(event) =>
                  handleKeyDown(event, { ...option, groupKey })
                }
                className={`mx-1 flex cursor-pointer items-center rounded-lg p-2 ${
                  checkIfIsSelected({ ...option, groupKey })
                    ? "bg-gray-200"
                    : "hover:bg-purple-light"
                } focus:bg-purple-light focus:outline-none`}
              >
                {multiple && (
                  <div
                    className={`custom-checkbox mr-2 ${checkIfIsSelected({ ...option, groupKey }) ? "checked" : ""} ${
                      disabled ? "cursor-not-allowed" : ""
                    }`}
                  />
                )}
                <span className="select-none text-sm">{option.label}</span>
              </div>
            ),
          )
        ) : (
          <div className="px-4 py-2 text-sm text-gray-500">
            Pas des résultats
          </div>
        )}
      </div>
    ));
  }

  return (
    <div className="flex w-full flex-col gap-1 p-1">
      {filterOptions(options).length > 0 ? (
        filterOptions(options).map((option, index) => (
          <div
            tabIndex={0}
            key={index}
            data-option-index={index}
            onClick={(e) => {
              e.stopPropagation();
              handleOptionSelect(option);
            }}
            onKeyDown={(event) => handleKeyDown(event, option)}
            className={`small-semibold flex min-h-[34px] cursor-pointer items-center rounded-xl p-2 ${
              checkIfIsSelected(option)
                ? "bg-purple-light text-purple-normal"
                : "hover:bg-gray-100"
            } focus:bg-gray-100 focus:outline-none`}
          >
            {multiple && (
              <div
                className={`custom-checkbox mr-2 ${checkIfIsSelected(option) ? "checked" : ""}`}
              />
            )}
            <span className="select-none text-sm">{option.label}</span>
          </div>
        ))
      ) : (
        <div className="px-4 py-2 text-sm text-gray-500">Pas de résultats</div>
      )}
    </div>
  );
}

export default RenderOptions;
