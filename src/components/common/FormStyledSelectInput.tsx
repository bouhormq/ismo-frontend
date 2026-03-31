import { Transition } from "@headlessui/react";
import { cva } from "class-variance-authority";
import {
  Badge,
  ChevronDownIcon,
  ChevronUp,
  XCircle,
  XIcon,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Controller, FieldValues, useFormContext } from "react-hook-form";

import useOutsideClick from "$/hooks/useOutsideClick";
import { inputClassname } from "$/pages/test/InputsStyling";
import {
  cn,
  getDeepFormError,
  rgbToRgba,
  slugify,
} from "$/utils/functions/misc.functions";

import RenderOptions from "../inputs/FormComboSelect/RenderObject";
import PlaceHolderLabelAnimatedLayout from "./PlaceHolderLabelAnimatedLayout";

export type SelectOption<TSelectedValue> = {
  label: string;
  value: TSelectedValue;
  color?: string;
};

export type OptionWithGroupKey<TSelectedValue> =
  SelectOption<TSelectedValue> & { groupKey?: string };
export type GroupedOptions<TSelectedValue> = Record<
  string,
  SelectOption<TSelectedValue>[]
>;

// base props for FormStyledSelectInput
type BaseFormStyledSelectInputProps<TSelectedValue> = {
  name: string;
  label?: string;
  wrapperClassName?: string;
  mainWrapperClassName?: string;
  hideLabel?: boolean;
  multiple?: boolean;
  withFilter?: boolean;
  isClearable?: boolean;
  returnSingleValue?: boolean;
  labelClassName?: string;
  labelWrapperClassName?: string;
  hideSelectedOptions?: boolean;
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
  isGrouped?: boolean;
  isOuterState?: boolean;
  disabled?: boolean;
  onClearOptions?: () => void;
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
type FormStyledSelectInputProps<TSelectedValue> =
  BaseFormStyledSelectInputProps<TSelectedValue> &
    (GroupedProps<TSelectedValue> | NonGroupedProps<TSelectedValue>) &
    (OuterStateProps<TSelectedValue> | NonOuterStateProps<TSelectedValue>);

const multiSelectVariants = cva(
  "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
  {
    variants: {
      variant: {
        default:
          "border-foreground/10 drop-shadow-md text-foreground bg-card hover:bg-card/80",
        secondary:
          "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
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
export default function FormStyledSelectInput<TSelectedValue>({
  name,
  label,
  multiple = false,
  hideSelectedOptions = false,
  withFilter = false,
  disabled = false,
  options,
  handleOnSelect,
  isNotFormElement = false,
  defaultOuterValue,
  returnSingleValue = false,
  placeHolder = "Select an option",
  mainClassName,
  mainParentClassName,
  contentClassName,
  searchClassName,
  onClearOptions,
  labelClassName,
  labelWrapperClassName,
  variant,
  isGrouped = true,
  isOuterState = false,
  isClearable = false,
  externalSelectedOptions,
  setExternalSelectedOptions,
  mainWrapperClassName,
  iconClassName,
}: FormStyledSelectInputProps<TSelectedValue>) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelectedOptions, setInternalSelectedOptions] = useState<
    OptionWithGroupKey<TSelectedValue>[]
  >([]);
  const [filter, setFilter] = useState("");
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const componentRef = useRef<HTMLDivElement | null>(null);

  const formContext = useFormContext<FieldValues>();
  const control = !isNotFormElement && formContext && formContext.control;

  useOutsideClick(componentRef, () => setIsOpen(false));

  const selectedOptions = isOuterState
    ? externalSelectedOptions
    : internalSelectedOptions;

  const setSelectedOptions = isOuterState
    ? setExternalSelectedOptions
    : setInternalSelectedOptions;

  useEffect(() => {
    const matchOption = (
      defaultVal: any,
    ): (SelectOption<TSelectedValue> & { groupKey?: string }) | undefined => {
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
    const formDefaultValue = !isNotFormElement && formContext.getValues(name);

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
    if (!isNotFormElement && formDefaultValue) {
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
  }, [
    defaultOuterValue,
    isNotFormElement,
    formContext,
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
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (
    option: SelectOption<TSelectedValue> & { groupKey?: string },
  ) => {
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

    if (handleOnSelect) {
      handleOnSelect(multiple ? updatedOptions : updatedOptions[0]);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
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
    setSelectedOptions?.(
      selectedOptions.filter(
        (item) =>
          item.value !== option.value || item.groupKey !== option.groupKey,
      ),
    );
    formContext.setValue(
      name,
      selectedOptions.filter(
        (item) =>
          item.value !== option.value || item.groupKey !== option.groupKey,
      ),
    );
  };

  const filterOptions = (opts: SelectOption<TSelectedValue>[]) => {
    return opts.filter((option) => {
      const slugifiedOption = slugify(option.label);
      return slugifiedOption.includes(filter.toLowerCase());
    });
  };
  const checkIfIsSelected = (
    option: SelectOption<TSelectedValue> & { groupKey?: string },
  ) =>
    !!selectedOptions?.find(
      (item) =>
        item.value === option.value && item.groupKey === option.groupKey,
    );

  const error =
    !isNotFormElement &&
    getDeepFormError(formContext.formState.errors, name.split("."));

  const { watch } = useFormContext<FieldValues>();
  const hasValue = !!watch(name);

  const handleSelectStyledLabelClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };
  if (!isNotFormElement && control) {
    return (
      <PlaceHolderLabelAnimatedLayout
        name={name}
        hasValue={hasValue}
        isFocused={isOpen}
        label={label}
        labelClassName={labelClassName}
        labelWrapperClassName={labelWrapperClassName}
        handleClick={handleSelectStyledLabelClick}
      >
        <Controller
          name={name}
          control={control}
          defaultValue={multiple ? [] : null}
          render={({ fieldState }) => (
            <div ref={componentRef} className="flex w-full flex-col gap-2">
              <div
                className={cn(
                  "relative flex w-full flex-col gap-2",
                  mainParentClassName,
                  {
                    "[&>div>div:nth-of-type(1)]:text-red-500 [&>div]:border-[1px] [&>div]:border-red-500 [&>div]:focus:border-red-500":
                      fieldState.error,
                  },
                )}
              >
                <div
                  className={cn(
                    "relative z-50 flex min-h-[40px] w-full flex-col justify-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2",
                    inputClassname,
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
                  <div className="flex h-full w-full items-center">
                    <div
                      className={cn(
                        "placeHolderDiv secondary-body-tag text-gray-text placeholder:text-gray-text h-full max-h-[61px] flex-1 overflow-auto",
                        selectedOptions &&
                          selectedOptions.length > 0 &&
                          "text-black",
                      )}
                    >
                      {multiple &&
                      selectedOptions &&
                      selectedOptions.length > 0 ? (
                        selectedOptions.map((option) => {
                          return (
                            <Badge
                              key={`${option.groupKey ?? ""}_${option.value}`}
                              className={cn(
                                "!rounded-lg p-1",
                                multiSelectVariants({ variant }),
                                rgbToRgba(0.3, option.color),
                              )}
                              style={{
                                animationDuration: `0.3s`,
                                backgroundColor: rgbToRgba(0.2, option.color),
                                color: rgbToRgba(
                                  0.3,
                                  option.color ?? "rgba(166, 166, 166, 1)",
                                  "text",
                                ),
                              }}
                            >
                              {option.label}
                              <XCircle
                                className="ml-2 h-4 w-4 cursor-pointer"
                                onClick={(event) =>
                                  handleRemoveOption(event, option)
                                }
                              />
                            </Badge>
                          );
                        })
                      ) : (
                        <span className="whitespace-nowrap">
                          {" "}
                          {(selectedOptions && selectedOptions[0]?.label) ||
                            (isOpen ? placeHolder : "")}
                        </span>
                      )}
                    </div>
                    <div className="bb_secondary_second flex items-center justify-between">
                      {isClearable &&
                        selectedOptions &&
                        selectedOptions.length > 0 && (
                          <XIcon
                            className="text-muted-foreground h-4 cursor-pointer"
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
                    "absolute top-[110%] z-[52] flex h-fit max-h-60 min-h-10 w-full flex-col gap-2 overflow-y-auto rounded-lg bg-white opacity-100 shadow-selectBox",
                    contentClassName,
                  )}
                  leaveFrom={cn(
                    "absolute top-[110%] z-[52] flex h-fit max-h-60 min-h-10 w-full flex-col gap-2 overflow-y-auto rounded-lg bg-white opacity-100 shadow-selectBox",
                    contentClassName,
                  )}
                  leaveTo={cn(
                    "absolute top-[110%] z-[52] flex h-fit max-h-60 min-h-10 w-full flex-col gap-2 overflow-y-auto rounded-lg bg-white opacity-0 shadow-selectBox",
                    contentClassName,
                  )}
                  as="div"
                  className={cn(
                    "shadow-selectBox absolute top-[110%] z-[52] flex h-fit max-h-60 min-h-10 w-full flex-col gap-2 overflow-y-auto rounded-lg bg-white opacity-100",
                    contentClassName,
                  )}
                >
                  <div>
                    {withFilter && (
                      <div className="border-b-gray-shadow-light sticky top-0 z-40 w-full border-b-[1px] bg-white p-3">
                        <input
                          type="text"
                          value={filter}
                          onChange={handleFilterChange}
                          placeholder="Rechercher"
                          className={cn(
                            "focus:border-primaryColor w-full rounded-md border-2 p-2 text-sm focus:outline-none",
                            searchClassName,
                          )}
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                    )}
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
                  <span className="ml-2 text-custom-10 font-semibold text-red-500">
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
          "relative z-50 flex min-h-[40px] w-full flex-col justify-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2",
          inputClassname,
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
        <div className="flex h-full w-full items-center rounded-lg">
          {!hideSelectedOptions && (
            <div
              className={cn(
                "placeHolderDiv secondary-body-tag text-gray-text z-[52] flex w-full flex-1 flex-wrap gap-1",
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
                      <XCircle
                        className="ml-2 h-4 w-4 cursor-pointer"
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
          <div className="bb_secondary_second z-[52] flex items-center justify-between">
            {!hideSelectedOptions &&
              selectedOptions &&
              selectedOptions.length > 0 && (
                <>
                  {isClearable && (
                    <XIcon
                      className="text-muted-foreground h-4 cursor-pointer"
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

        {/* </Transition> */}
      </div>

      {error && (
        <span className="ml-2 mt-2 text-custom-10 font-semibold text-red-500">
          {error.message?.toString()}
        </span>
      )}
      {isOpen && (
        <div
          className={cn(
            "shadow-selectBox absolute top-[110%] z-[52] flex h-fit max-h-60 min-h-10 w-full flex-col gap-2 overflow-y-auto rounded-lg bg-white opacity-100",
            contentClassName,
          )}
        >
          {withFilter && (
            <div className="border-b-gray-shadow-light sticky top-0 z-40 w-full border-b-[1px] bg-white p-3">
              <input
                type="text"
                value={filter}
                onChange={handleFilterChange}
                placeholder="Rechercher"
                className={cn(
                  "focus:border-primaryColor w-full rounded-md border-2 p-2 text-sm focus:outline-none",
                  searchClassName,
                )}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
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
