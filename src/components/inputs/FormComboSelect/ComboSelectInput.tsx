import { Transition } from "@headlessui/react";
import { cva } from "class-variance-authority";
import { isArray } from "lodash";
import { ChevronDownIcon, ChevronUp } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Controller, FieldValues, useFormContext } from "react-hook-form";

import PlaceHolderLabelAnimatedLayout from "$/components/common/PlaceHolderLabelAnimatedLayout";
import XIcon from "$/components/icons/XIcon";
import { Badge } from "$/components/ui/Badge";
import useOutsideClick from "$/hooks/useOutsideClick";
import {
  cn,
  getDeepFormError,
  rgbToRgba,
  slugify,
} from "$/utils/functions/misc.functions";

import RenderOptions from "./RenderObject";

export type SelectOption<TSelectedValue> = {
  label: string;
  value: TSelectedValue;
  color?: string;
  searchableKey?: string;
};

export type OptionWithGroupKey<TSelectedValue> =
  SelectOption<TSelectedValue> & { groupKey?: string };
export type GroupedOptions<TSelectedValue> = Record<
  string,
  SelectOption<TSelectedValue>[]
>;

// base props for ComboSelectComponent
type BaseComboSelectComponentProps<TSelectedValue> = {
  name: string;
  label?: string;
  wrapperClassName?: string;
  mainWrapperClassName?: string;
  hideLabel?: boolean;
  multiple?: boolean;
  withFilter?: boolean;
  isClearable?: boolean;
  returnSingleValue?: boolean;
  searchInputClassName?: string;
  hideSelectedOptions?: boolean;
  showLabelWithValue?: boolean;
  handleOnSelect?: (
    selected: SelectOption<TSelectedValue> | SelectOption<TSelectedValue>[],
  ) => void;
  isNotFormElement?: boolean;
  defaultOuterValue?:
    | SelectOption<TSelectedValue>
    | SelectOption<TSelectedValue>[]
    | string
    | { value: string; groupKey: string };
  errorMessage?: string;
  placeHolder?: string;
  variant?: "default" | "secondary" | "destructive" | "inverted" | null;
  mainClassName?: string;
  contentClassName?: string;
  searchClassName?: string;
  iconClassName?: string;
  mainParentClassName?: string;
  labelClassName?: string;
  isGrouped?: boolean;
  isScrollable?: boolean;
  isOuterState?: boolean;
  disabled?: boolean;
  onClearOptions?: () => void;
  autoAddOptions?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// conditional props based on isGrouped
type GroupedProps<TSelectedValue> = {
  isGrouped: true;
  options: GroupedOptions<TSelectedValue>;
};

type NonGroupedProps<TSelectedValue> = {
  isGrouped?: false;
  options: SelectOption<TSelectedValue>[];
};

// conditional props based on isOuterState
type OuterStateProps<TSelectedValue> = {
  isOuterState: true;
  externalSelectedOptions: OptionWithGroupKey<TSelectedValue>[];
  setExternalSelectedOptions: (
    options: OptionWithGroupKey<TSelectedValue>[],
  ) => void;
};

type NonOuterStateProps<TSelectedValue> = {
  isOuterState?: false;
  externalSelectedOptions?: OptionWithGroupKey<TSelectedValue>[];
  setExternalSelectedOptions?: (
    options: OptionWithGroupKey<TSelectedValue>[],
  ) => void;
};

// Combining all props
type ComboSelectComponentProps<TSelectedValue> =
  BaseComboSelectComponentProps<TSelectedValue> &
    (GroupedProps<TSelectedValue> | NonGroupedProps<TSelectedValue>) &
    (OuterStateProps<TSelectedValue> | NonOuterStateProps<TSelectedValue>);

const multiSelectVariants = cva(
  "m-1 transition ease-in-out rounded-full delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
  {
    variants: {
      variant: {
        default: "rounded-full  text-foreground bg-card hover:bg-card/80",
        secondary:
          "rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        inverted: "inverted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const bgColor = "bg-gray-inputBg";

export default function ComboSelectComponent<TSelectedValue>({
  name,
  label,
  wrapperClassName,
  // hideLabel,
  multiple = false,
  hideSelectedOptions = false,
  withFilter = false,
  disabled = false,
  options,
  handleOnSelect,
  isNotFormElement = false,
  defaultOuterValue,
  returnSingleValue = false,
  placeHolder = "Sélectionner une option",
  mainClassName,
  mainParentClassName,
  contentClassName,
  searchClassName,
  labelClassName,
  onClearOptions,
  variant,
  isGrouped = true,
  onChange,
  isOuterState = false,
  isClearable = false,
  externalSelectedOptions,
  searchInputClassName,
  setExternalSelectedOptions,
  mainWrapperClassName,
  iconClassName,
  autoAddOptions,
  showLabelWithValue = true,
}: ComboSelectComponentProps<TSelectedValue>) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelectedOptions, setInternalSelectedOptions] = useState<
    OptionWithGroupKey<TSelectedValue>[]
  >([]);

  const [filter, setFilter] = useState("");
  const [addedValue, setAddedValue] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const componentRef = useRef<HTMLDivElement | null>(null);

  const formContext = useFormContext<FieldValues>();
  const control = !isNotFormElement && formContext && formContext.control;

  useOutsideClick(componentRef, () => {
    setFilter("");
    setIsOpen(false);
  });

  const selectedOptions = isOuterState
    ? externalSelectedOptions
    : internalSelectedOptions;

  const setSelectedOptions = isOuterState
    ? setExternalSelectedOptions
    : setInternalSelectedOptions;

  const resolveOptions = (
    opts: SelectOption<TSelectedValue>[] | GroupedOptions<TSelectedValue>,
  ): (SelectOption<TSelectedValue> & { groupKey?: string })[] => {
    if (Array.isArray(opts)) {
      return opts;
    } else {
      return Object.entries(opts).flatMap(([groupKey, groupOpts]) =>
        groupOpts.map((option) => ({ ...option, groupKey })),
      );
    }
  };

  const matchOption = (
    defaultVal: any,
  ): (SelectOption<TSelectedValue> & { groupKey?: string }) | undefined => {
    const flatOptions = resolveOptions(options);

    if (Array.isArray(defaultVal)) {
      return flatOptions.find((option) =>
        defaultVal.some(
          (val) =>
            (val.groupKey ? option.groupKey === val.groupKey : true) &&
            option.value === val.value,
        ),
      );
    }

    if (typeof defaultVal === "string" || typeof defaultVal === "number") {
      return flatOptions.find((option) => option.value === defaultVal);
    }

    if (defaultVal && defaultVal?.groupKey) {
      return flatOptions.find(
        (option) =>
          option.value === defaultVal.value &&
          option.groupKey === defaultVal.groupKey,
      );
    }

    return flatOptions.find((option) => option.value === defaultVal?.value);
  };
  const getSelectedOptions = (defaultValue: any) => {
    return Array.isArray(defaultValue)
      ? (defaultValue
          .map(matchOption)
          .filter(Boolean) as (SelectOption<TSelectedValue> & {
          groupKey?: string;
        })[])
      : ([matchOption(defaultValue)].filter(
          Boolean,
        ) as (SelectOption<TSelectedValue> & {
          groupKey?: string;
        })[]);
  };

  useEffect(() => {
    const formDefaultValue = !isNotFormElement && formContext.getValues(name);

    if (formDefaultValue) {
      if (!defaultOuterValue) {
        setSelectedOptions?.(getSelectedOptions(formDefaultValue));
      } else {
        setSelectedOptions?.(getSelectedOptions(defaultOuterValue));
      }
    } else {
      if (defaultOuterValue) {
        setSelectedOptions?.(getSelectedOptions(defaultOuterValue));
      } else {
        setSelectedOptions?.(getSelectedOptions(formDefaultValue));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    defaultOuterValue,
    isNotFormElement,
    name,
    isOuterState,
    options,
    setSelectedOptions,
  ]);

  useEffect(() => {
    if (focusedIndex !== null && optionsRef.current) {
      const optionElements = optionsRef.current.querySelectorAll(
        "[data-option-index]",
      );
      if (optionElements[focusedIndex]) {
        (optionElements[focusedIndex] as HTMLElement).focus();
      }
    }
  }, [focusedIndex]);

  useEffect(() => {
    if (isOpen && !isNotFormElement) {
      formContext.clearErrors(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, name]);

  const handleToggle = () => {
    if (disabled || filter) return;

    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (
    option: SelectOption<TSelectedValue> & { groupKey?: string },
  ) => {
    setFilter("");
    let updatedOptions;
    if (multiple && selectedOptions) {
      if (
        selectedOptions.find(
          (item) =>
            item.value === option.value && item.groupKey === option.groupKey,
        )
      ) {
        updatedOptions = selectedOptions.filter(
          (item) =>
            item.value !== option.value || item.groupKey !== option.groupKey,
        );
      } else {
        updatedOptions = [...selectedOptions, option];
      }
    } else {
      updatedOptions = [option];
      setIsOpen(false);
    }

    setSelectedOptions && setSelectedOptions(updatedOptions);

    if (!isNotFormElement && control) {
      if (returnSingleValue) {
        const arrayOfStringValues = updatedOptions.map(
          (option) => option.value,
        );
        formContext.setValue(
          name,
          multiple ? arrayOfStringValues : updatedOptions[0].value,
        );
      } else {
        formContext.setValue(
          name,
          multiple ? updatedOptions : updatedOptions[0],
        );
      }
    }

    if (handleOnSelect)
      handleOnSelect(multiple ? updatedOptions : updatedOptions[0]);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isOpen) setIsOpen(true);

    if (onChange) onChange(e);

    setFilter(e.target.value);

    if (autoAddOptions) {
      setAddedValue(e.target.value);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    option: SelectOption<TSelectedValue> & { groupKey?: string },
  ) => {
    const totalOptionsLength = Array.isArray(options)
      ? options.length
      : Object.values(options).flat().length;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOptionSelect(option);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex === null || prevIndex === totalOptionsLength - 1
          ? 0
          : prevIndex + 1,
      );
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex === null || prevIndex === 0
          ? totalOptionsLength - 1
          : prevIndex - 1,
      );
    }
  };

  const handleRemoveOption = (
    event: React.MouseEvent,
    option: OptionWithGroupKey<TSelectedValue>,
  ) => {
    event.stopPropagation();
    if (!selectedOptions) return;

    const updatedOptions = selectedOptions.filter(
      (item) =>
        item.value !== option.value || item.groupKey !== option.groupKey,
    );

    setSelectedOptions?.(updatedOptions);

    if (returnSingleValue) {
      const arrayOfStringValues = updatedOptions.map((option) => option.value);

      formContext.setValue(name, arrayOfStringValues);
    } else {
      formContext.setValue(
        name,
        multiple ? selectedOptions : updatedOptions[0],
      );
    }
  };

  const filterOptions = (opts: SelectOption<TSelectedValue>[]) => {
    return opts.filter((option) => {
      const slugifiedOption = slugify(option.label);
      const slugifiedSearchableKey = slugify(option.searchableKey ?? "");
      return (
        slugifiedOption.includes(filter.toLowerCase()) ||
        slugifiedSearchableKey.includes(filter.toLowerCase())
      );
    });
  };

  const checkIfIsSelected = (
    option: SelectOption<TSelectedValue> & { groupKey?: string },
  ) =>
    !!selectedOptions?.find(
      (item) =>
        item.value === option.value && item.groupKey === option.groupKey,
    );

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (autoAddOptions && addedValue) {
        const newOption: SelectOption<TSelectedValue> = {
          label: addedValue,
          value: addedValue as unknown as TSelectedValue,
        };

        const itemExists = selectedOptions?.find(
          (item) => item.label.trim().toLowerCase() === addedValue.trim(),
        );

        const itemExistsInOptions =
          Array.isArray(options) &&
          options.find(
            (item) => item.label.trim().toLowerCase() === addedValue.trim(),
          );

        if (!itemExists && itemExistsInOptions)
          handleOptionSelect(itemExistsInOptions);

        if (!itemExists && !itemExistsInOptions) handleOptionSelect(newOption);

        setFilter("");
        setAddedValue(null);
      }
    }
    if (e.key === "Backspace") {
      if (selectedOptions && selectedOptions.length > 0 && !filter) {
        setSelectedOptions?.(selectedOptions.slice(0, -1));
        formContext.setValue(
          name,
          multiple ? selectedOptions.slice(0, -1) : null,
        );
      }
    }
  };

  const error =
    !isNotFormElement &&
    getDeepFormError(formContext.formState.errors, name.split("."));

  const val = formContext.watch(name);
  const hasValue = isArray(val) ? !!val.length : !!val;

  const labelToDisplay = useMemo(() => {
    return selectedOptions?.find((option) => option.value === val)?.label;
  }, [selectedOptions, val]);

  const handleSelectStyledLabelClick = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (!val) setSelectedOptions?.([]);
  }, [setSelectedOptions, val]);

  if (!isNotFormElement && control) {
    return (
      <PlaceHolderLabelAnimatedLayout
        name={name}
        hasValue={hasValue}
        isFocused={isOpen}
        label={label}
        labelClassName={labelClassName}
        labelWrapperClassName={wrapperClassName}
        showLabelWithValue={showLabelWithValue}
        handleClick={handleSelectStyledLabelClick}
      >
        <Controller
          name={name}
          control={control}
          defaultValue={multiple ? selectedOptions : null}
          render={({ fieldState }) => (
            <div
              ref={componentRef}
              className={cn("flex w-full flex-col gap-2", {
                "pointer-events-none": disabled,
              })}
            >
              <div
                className={cn(
                  "relative flex w-full flex-col gap-2",
                  mainParentClassName,
                  fieldState.error &&
                    "[&>div>div:nth-of-type(1)]:text-red-500 [&>div]:border-[1px] [&>div]:border-red-500 [&>div]:focus:border-red-500",
                )}
              >
                <div
                  className={cn(
                    "relative z-50 flex min-h-[40px] w-full flex-col gap-3 border-gray-200 px-3 py-2",
                    {
                      "rounded-tl-3xl rounded-tr-3xl": isOpen,
                      "rounded-full": !isOpen,
                      "rounded-3xl":
                        !isOpen &&
                        multiple &&
                        selectedOptions &&
                        selectedOptions.length >= 2,
                      "rounded-[15px]":
                        !multiple && (labelToDisplay ?? "").length > 10,
                      "!rounded-b-none":
                        labelToDisplay && !withFilter && isOpen,
                    },
                    bgColor,
                    mainClassName,
                    disabled && "cursor-not-allowed",
                  )}
                  ref={componentRef}
                  onClick={() => {
                    if (!disabled) {
                      setIsOpen(!isOpen);
                    }
                  }}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && handleToggle()}
                >
                  <div
                    className={cn("flex h-full w-full items-center rounded-lg")}
                  >
                    <div
                      className={cn(
                        "placeHolderDiv secondary-body-tag text-gray-text placeholder:text-gray-text flex h-full w-[80%] flex-row flex-wrap items-center overflow-auto",
                        selectedOptions &&
                          selectedOptions.length > 0 &&
                          "text-black",
                      )}
                    >
                      {multiple && selectedOptions && selectedOptions.length > 0
                        ? selectedOptions.map((option) => {
                            return (
                              <Badge
                                key={`${option.groupKey ?? ""}_${option.value}`}
                                className={cn(
                                  "relative flex w-fit max-w-[75%] flex-row justify-between overflow-hidden rounded-full px-1",
                                  multiSelectVariants({ variant }),
                                  rgbToRgba(0.3, option.color),
                                  {
                                    "rounded-[15px]": option.label.length > 10,
                                  },
                                )}
                                style={{
                                  animationDuration: `0.3s`,
                                  backgroundColor: rgbToRgba(
                                    1,
                                    option.color ?? "rgba(255,255,255, 1)",
                                  ),
                                  color: rgbToRgba(
                                    0.3,
                                    option.color ?? "rgba(0,0,0, 1)",
                                    "text",
                                  ),
                                }}
                              >
                                <p className="w-fit max-w-[75%] whitespace-break-spaces">
                                  {option.label}
                                </p>
                                <div className="ml-2 rounded-full bg-blue-inputBg p-1">
                                  <XIcon
                                    className="h-3 w-3 cursor-pointer rounded-full"
                                    onClick={(event) =>
                                      handleRemoveOption(event, option)
                                    }
                                  />
                                </div>
                              </Badge>
                            );
                          })
                        : // Hide the selected option label when the filter input is displayed
                          !isOpen && <span>{labelToDisplay}</span>}

                      {withFilter && (
                        <input
                          type="text"
                          value={
                            isOpen && !multiple && selectedOptions
                              ? filter
                                ? filter
                                : selectedOptions[0]?.label
                              : filter
                          }
                          onChange={handleFilterChange}
                          placeholder={
                            selectedOptions && selectedOptions.length > 0
                              ? ""
                              : isOpen
                                ? placeHolder
                                : ""
                          }
                          onFocus={() => setIsOpen(true)}
                          className={cn(
                            "focus:border-primaryColor w-[90%] rounded-md border-none text-sm outline-none focus:outline-none",
                            {
                              "border-b-[1px] px-2 transition-all": isOpen,
                            },
                            !isOpen &&
                              selectedOptions &&
                              selectedOptions.length > 0 &&
                              "hidden",
                            bgColor,
                            searchInputClassName,
                          )}
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={handleOnKeyDown}
                        />
                      )}
                    </div>
                    <div className="bb_secondary_second ml-auto mt-[2px] flex items-center justify-between gap-1">
                      {isClearable &&
                        selectedOptions &&
                        selectedOptions.length > 0 && (
                          <XIcon
                            className="text-muted-foreground ml-1.5 h-3 w-3 cursor-pointer"
                            onClick={(event) => {
                              event.stopPropagation();
                              setSelectedOptions?.([]);
                              formContext.setValue(name, multiple ? [] : null);
                              onClearOptions?.();
                            }}
                          />
                        )}
                      {!isOpen ? (
                        <ChevronDownIcon
                          className={cn(
                            "text-muted-foreground h-5 w-5 transition-transform",
                            iconClassName,
                          )}
                        />
                      ) : (
                        <ChevronUp
                          className={cn(
                            "text-muted-foreground h-5 w-5 transition-transform",
                            iconClassName,
                          )}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <Transition
                  show={isOpen}
                  enterFrom="opacity-0"
                  enterTo={cn(
                    "absolute top-full z-[52] flex h-fit max-h-32 min-h-10 w-full flex-col gap-2 overflow-y-auto rounded-bl-3xl rounded-br-3xl  opacity-100 shadow-selectBox",
                    bgColor,
                    contentClassName,
                  )}
                  leaveFrom={cn(
                    "absolute top-full z-[52] flex h-fit max-h-32 min-h-10 w-full flex-col gap-2 overflow-y-auto rounded-bl-3xl rounded-br-3xl opacity-100 shadow-selectBox",
                    bgColor,
                    contentClassName,
                  )}
                  leaveTo={cn(
                    "absolute top-full z-[52] flex h-fit max-h-32 min-h-10 w-full flex-col gap-2 overflow-y-auto rounded-bl-3xl rounded-br-3xl opacity-0 shadow-selectBox",
                    bgColor,
                    contentClassName,
                  )}
                  as="div"
                  className={cn(
                    "shadow-selectBox absolute top-full z-[52] flex h-fit max-h-32 min-h-10 w-full flex-col gap-2 overflow-y-auto rounded-bl-3xl rounded-br-3xl opacity-100",
                    bgColor,
                    contentClassName,
                  )}
                >
                  <div>
                    <RenderOptions<TSelectedValue>
                      checkIfIsSelected={checkIfIsSelected}
                      filterOptions={filterOptions}
                      disabled={disabled}
                      handleKeyDown={handleKeyDown}
                      handleOptionSelect={handleOptionSelect}
                      isGrouped={isGrouped}
                      options={options}
                      multiple={multiple}
                    />
                  </div>
                </Transition>
                {error && (
                  <span className="text-custom-10 font-semibold text-red-500">
                    {error.message?.toString()}
                  </span>
                )}
              </div>
            </div>
          )}
        />
      </PlaceHolderLabelAnimatedLayout>
    );
  }

  return (
    <div
      ref={componentRef}
      className={cn(
        "relative flex w-full flex-col gap-2",
        mainWrapperClassName,
      )}
    >
      <div
        className={cn(
          "relative z-50 flex min-h-[40px] w-full flex-col gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2",
          mainClassName,
          disabled && "cursor-not-allowed",
        )}
        onClick={() => {
          if (!disabled) {
            setIsOpen(!isOpen);
          }
        }}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleToggle()}
      >
        <div
          className={cn("flex h-full w-full items-center rounded-lg", {
            "w-full": !multiple,
            "w-[80%]":
              multiple && selectedOptions && selectedOptions.length > 2,
          })}
        >
          {!hideSelectedOptions && (
            <div
              className={cn(
                "placeHolderDiv secondary-body-tag z-51 text-gray-text flex w-full flex-1 flex-wrap gap-1",
                selectedOptions && selectedOptions.length > 0 && "text-black",
              )}
            >
              {multiple && selectedOptions && selectedOptions.length > 0
                ? selectedOptions.map((option) => (
                    <Badge
                      key={`${option.groupKey ?? ""}_${option.value}`}
                      className={cn(
                        multiSelectVariants({ variant }),
                        "!m-0 !shrink-0",
                      )}
                      style={{
                        animationDuration: `0.3s`,
                      }}
                    >
                      {option.label}
                      <XIcon
                        className="ml-2 cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedOptions?.(
                            selectedOptions.filter(
                              (item) =>
                                item.value !== option.value ||
                                item.groupKey !== option.groupKey,
                            ),
                          );
                          handleOnSelect?.(
                            selectedOptions.filter(
                              (item) =>
                                item.value !== option.value ||
                                item.groupKey !== option.groupKey,
                            ),
                          );
                          formContext.setValue(
                            name,
                            selectedOptions.filter(
                              (item) =>
                                item.value !== option.value ||
                                item.groupKey !== option.groupKey,
                            ),
                          );
                        }}
                      />
                    </Badge>
                  ))
                : (selectedOptions && selectedOptions[0]?.label) || placeHolder}
            </div>
          )}
          {hideSelectedOptions && (
            <div className="placeHolderDiv flex-1">{placeHolder}</div>
          )}
          <div className="bb_secondary_second z-51 flex items-center justify-between">
            {!hideSelectedOptions &&
              selectedOptions &&
              selectedOptions.length > 0 && (
                <>
                  {isClearable && (
                    <XIcon
                      className="text-muted-foreground mx-2 h-4 cursor-pointer"
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedOptions?.([]);
                        handleOnSelect?.([]);
                        !isNotFormElement &&
                          formContext.setValue(name, multiple ? [] : null);
                        onClearOptions?.();
                      }}
                    />
                  )}
                </>
              )}
            {!isOpen ? (
              <ChevronDownIcon
                className={cn(
                  "text-muted-foreground mx-2 h-5 w-5 transition-transform",
                  iconClassName,
                )}
              />
            ) : (
              <ChevronUp
                className={cn(
                  "text-muted-foreground mx-2 h-5 w-5 transition-transform",
                  iconClassName,
                )}
              />
            )}
          </div>
        </div>

        {/* </Transition> */}
      </div>

      {error && (
        <span className="text-custom-12 font-semibold text-red-500">
          {error.message?.toString()}
        </span>
      )}
      {isOpen && (
        <div
          className={cn(
            "z-51 shadow-selectBox absolute top-full flex h-fit max-h-60 min-h-10 w-full flex-col gap-2 overflow-y-auto rounded-xl bg-white opacity-100",
            contentClassName,
          )}
        >
          {withFilter && (
            <div
              className={cn(
                `border-b-gray-shadow-light sticky top-0 z-40 w-full border-b-[1px] p-3`,
                bgColor,
              )}
            >
              <input
                type="text"
                value={filter}
                onChange={handleFilterChange}
                placeholder="Rechercher"
                onFocus={() => setIsOpen(true)}
                className={cn(
                  "focus:border-primaryColor rounded-md border-2 p-2 text-sm focus:outline-none",
                  selectedOptions && selectedOptions.length > 0
                    ? "w-fit"
                    : "w-full",
                  bgColor,
                  searchClassName,
                  searchInputClassName,
                )}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={handleOnKeyDown}
              />
            </div>
          )}
          <RenderOptions
            checkIfIsSelected={checkIfIsSelected}
            filterOptions={filterOptions}
            disabled={disabled}
            handleKeyDown={handleKeyDown}
            handleOptionSelect={handleOptionSelect}
            isGrouped={isGrouped}
            options={options}
            multiple={multiple}
          />
        </div>
      )}
    </div>
  );
}
