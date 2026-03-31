import { ChevronsUpDownIcon } from "lucide-react";
import React, {
  FormEventHandler,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";

import useOutsideClick from "$/hooks/useOutsideClick";
import { inputClassname } from "$/pages/test/InputsStyling";
import { cn } from "$/utils/functions/misc.functions";

import RenderOptions from "../ui/PhoneNumber/_components/RenderObject";
import {
  countriesPhoneCodes,
  countryNames,
} from "../ui/PhoneNumber/_constants/countryCodes.constants";
import {
  coutnriesWithPhoneNumberLength,
  findCountryByPhoneNumber,
} from "../ui/PhoneNumber/_functions";
import "../ui/PhoneNumber/_styles/index.css";
import { Option } from "../ui/PhoneNumber/_types";
import PlaceHolderLabelAnimatedLayout from "./PlaceHolderLabelAnimatedLayout";

type ComboSelectComponentProps = {
  name: string;
  label?: string;
  hideLabel?: boolean;
  placeHolder?: string;
  wrapperClassName?: string;
  mainClassName?: string;
  contentClassName?: string;
  searchClassName?: string;
  defaultValue?: Option;
  disabled?: boolean;
  isFormElement?: boolean;
  labelClassName?: string;
  labelWrapperClassName?: string;
  handleChange?: (value: string) => void;
};

const popupClassname =
  "absolute top-full flex h-fit max-h-60 min-h-10 w-full flex-col gap-2 overflow-y-auto rounded-xl bg-white opacity-100 shadow-selectBox z-[110]";
const FormStyledCountryInput = forwardRef<
  HTMLInputElement,
  ComboSelectComponentProps
>(
  (
    {
      name: outerName,
      label,
      mainClassName,
      labelClassName,
      labelWrapperClassName,
      contentClassName,
      searchClassName,
      disabled = false,
      isFormElement = false,
      handleChange,
      defaultValue,
    },
    ref,
  ) => {
    const options = coutnriesWithPhoneNumberLength;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option>({
      name: "France",
      code: "FR",
      emoji: "🇫🇷",
      unicode: "U+1F1EB U+1F1F7",
      image:
        "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FR.svg",
      phoneNumberLength: 9,
    });
    const [filter, setFilter] = useState("");
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const optionsRef = useRef<HTMLDivElement | null>(null);
    const componentRef = useRef<HTMLDivElement | null>(null);
    const formContext = useFormContext();
    const {
      ref: inputRef,
      name,
      onChange,
      onBlur,
      ...rest
    } = formContext.register(outerName);
    useOutsideClick(componentRef, () => setIsOpen(false));
    const isInitialRender = useRef(true);

    useEffect(() => {
      const initialValue: string = formContext.getValues(name);
      if (initialValue) {
        setPhoneNumber(initialValue);
        const matchedCountry = findCountryByPhoneNumber(initialValue);
        if (matchedCountry && initialValue.startsWith("+")) {
          const selectedCountryOption = options.find(
            (option) => option.code === matchedCountry.code,
          );
          setSelectedOption(
            (prev) => selectedCountryOption ?? defaultValue ?? prev,
          );
        }
      } else {
        if (selectedOption) {
          setPhoneNumber(countriesPhoneCodes[selectedOption.code]);
          if (isFormElement) {
            formContext.setValue(
              name,
              countriesPhoneCodes[selectedOption.code],
            );
          }
        }
      }
    }, [
      formContext,
      name,
      options,
      defaultValue,
      isFormElement,
      selectedOption,
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
      if (isInitialRender.current) {
        if (isFormElement && !formContext.getValues(name)) {
          if (selectedOption && selectedOption.phoneNumberLength) {
            setPhoneNumber(countriesPhoneCodes[selectedOption.code]);
            if (isFormElement) {
              formContext.setValue(
                name,
                countriesPhoneCodes[selectedOption.code],
              );
            }
          }
          isInitialRender.current = false;
        }
      }
    }, [selectedOption, isFormElement, formContext, name]);

    const handleToggle = () => {
      if (disabled) return;
      setIsOpen(!isOpen);
    };

    const handleOptionSelect = (option: Option) => {
      const previousOptionCode = selectedOption.code;

      setSelectedOption(option);
      setIsOpen(false);
      const phoneNumberWithoutOldCodeValue = phoneNumber
        .replace(countriesPhoneCodes[previousOptionCode ?? ""], "")
        .trim();
      const cutPhoneNumberWithoutOldCodeValue =
        phoneNumberWithoutOldCodeValue.slice(0, option.phoneNumberLength);

      handleChange?.(
        `${countriesPhoneCodes[option.code]}${cutPhoneNumberWithoutOldCodeValue}`,
      );
      setPhoneNumber(
        `${countriesPhoneCodes[option.code]}${cutPhoneNumberWithoutOldCodeValue}`,
      );
      if (isFormElement) {
        formContext.setValue(
          name,
          `${countriesPhoneCodes[option.code]}${cutPhoneNumberWithoutOldCodeValue}`,
        );
        formContext.clearErrors(name);
      }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilter(e.target.value);
    };

    const handlePhoneNumberChange = (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const inputValue = e.target.value;
      const matchedCountry = findCountryByPhoneNumber(inputValue);

      if (matchedCountry) {
        setSelectedOption(matchedCountry);
        const validValue = inputValue.slice(
          0,
          matchedCountry.phoneNumberLength +
            countriesPhoneCodes[matchedCountry.code].length,
        );
        if (isFormElement) {
          formContext.setValue(name, validValue);
          formContext.clearErrors(name);
        }
        setPhoneNumber(validValue);
      } else {
        const validValue = inputValue.slice(0, 15);
        if (isFormElement) {
          formContext.setValue(name, validValue);
          formContext.clearErrors(name);
        }
        setPhoneNumber(validValue);
      }
    };

    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLDivElement>,
      option: Option,
    ) => {
      const totalOptionsLength = options.length;

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

    const filterOptions = (options: Option[]) => {
      return options.filter((option) => {
        const countryCode = countriesPhoneCodes[option.code];
        return (
          option.name.toLowerCase().includes(filter.toLowerCase()) ||
          (countryNames[option.code] &&
            countryNames[option.code]
              .toLowerCase()
              .includes(filter.toLowerCase())) ||
          (filter && countryCode && countryCode.includes(filter))
        );
      });
    };

    const onBeforeInput: FormEventHandler<HTMLInputElement> = useCallback(
      (e) => {
        const allowedCharacters: string[] = ["(", ")", ".", "-", "+"];
        const newCharacter = (e.nativeEvent as InputEvent).data;
        const currentValue = (e.target as HTMLInputElement).value;
        if (
          newCharacter === null ||
          (!/^\d+$/.test(newCharacter) &&
            !allowedCharacters.includes(newCharacter)) ||
          (currentValue.replace(/\D/g, "").length >= 15 &&
            /^\d+$/.test(newCharacter))
        ) {
          e.preventDefault();
        }
      },
      [],
    );
    const checkIfIsSelected = (option: Option) =>
      selectedOption.name === option.name;

    const hasError = isFormElement
      ? !!formContext.formState.errors[name]
      : false;

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const paste = (e.clipboardData || navigator.clipboard).getData("text");
      const allowedCharacters = paste.replace(/[^0-9()+-.]/g, "");
      setPhoneNumber(() => {
        const newValue = allowedCharacters;
        const matchedCountry = findCountryByPhoneNumber(newValue);
        if (matchedCountry) {
          setSelectedOption(matchedCountry);
        }
        if (matchedCountry) {
          const validValue = newValue.slice(
            0,
            matchedCountry.phoneNumberLength +
              countriesPhoneCodes[matchedCountry.code].length,
          );
          if (isFormElement) {
            formContext.setValue(name, validValue);
          }
          return validValue;
        }
        const validValue = newValue.slice(0, 15);
        if (isFormElement) {
          formContext.setValue(name, validValue);
        }
        return validValue;
      });
    };
    return (
      <PlaceHolderLabelAnimatedLayout
        name={name}
        hasValue
        isFocused
        label={label}
        labelClassName={labelClassName}
        labelWrapperClassName={labelWrapperClassName}
      >
        <div
          ref={componentRef}
          className={cn(
            "z-52 relative flex w-full items-center rounded-xl bg-transparent px-3 py-2",
            {
              "cursor-not-allowed": disabled,
              "border border-red-500": hasError,
            },
            inputClassname,
            mainClassName,
          )}
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleToggle()}
        >
          <div className="relative h-fit flex-col">
            <div
              className="flex h-fit w-full cursor-pointer items-center rounded-lg"
              onClick={() => {
                if (!disabled) {
                  setIsOpen(!isOpen);
                }
              }}
            >
              <div className="w-fit shrink-0">
                {!selectedOption && (
                  // replace this with an international flag icon
                  <div className="h-5 w-5 rounded-full bg-gray-400"></div>
                )}
                {selectedOption && (
                  <div className="secondary-body-tag flex items-center gap-1">
                    <div className="relative flex h-[14px] w-5 overflow-hidden rounded-sm">
                      <img
                        src={selectedOption.image}
                        alt={selectedOption.code}
                        loading="lazy"
                        className="absolute left-1/2 top-1/2 h-5 w-full shrink-0 -translate-x-1/2 -translate-y-1/2 scale-x-[1.25] scale-y-[2] object-fill"
                      />
                    </div>

                    <span className="text-xs font-medium">
                      {selectedOption.code}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <ChevronsUpDownIcon className="text-muted-foreground mx-2 h-3 w-3 text-gray-300" />
              </div>
            </div>
            {isOpen && (
              <div
                ref={optionsRef}
                className={cn(
                  // "scrollbar-none absolute left-0 mt-2 flex h-full min-h-60 min-w-60 flex-col overflow-y-auto bg-white opacity-100 shadow-md",
                  "left-0 min-h-60 w-full min-w-60",
                  popupClassname,
                  contentClassName,
                )}
              >
                <input
                  value={filter}
                  onChange={handleFilterChange}
                  placeholder="Rechercher"
                  className={cn(
                    "focus:border-primaryColor secondary-body-tag sticky top-0 z-40 w-full border-b-2 bg-white p-2 placeholder-gray-300 outline-none focus:outline-none",
                    searchClassName,
                  )}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                />
                <RenderOptions
                  checkIfIsSelected={checkIfIsSelected}
                  filterOptions={filterOptions}
                  handleKeyDown={handleKeyDown}
                  handleOptionSelect={handleOptionSelect}
                  options={options}
                />
              </div>
            )}
          </div>

          {isFormElement ? (
            <div className="flex">
              <input
                type="tel"
                value={phoneNumber}
                placeholder="000-000-0000"
                className=":focus:outline-none :focus:border-none h-full w-full border-none bg-transparent font-medium placeholder-gray-300 outline-none focus:outline-none"
                // maxLength={inputLength}
                onBeforeInput={onBeforeInput}
                disabled={disabled}
                name={name}
                ref={ref}
                onPaste={handlePaste}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.stopPropagation();
                  }
                }}
                onChange={handlePhoneNumberChange}
                {...rest}
              />
            </div>
          ) : (
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              onPaste={handlePaste}
              placeholder="000-000-0000"
              className=":focus:outline-none :focus:border-none h-full w-full border-none bg-transparent font-medium placeholder-gray-300 outline-none focus:outline-none"
              ref={ref}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.stopPropagation();
                }
              }}
              // maxLength={inputLength}
              onBeforeInput={onBeforeInput}
              disabled={disabled}
            />
          )}
        </div>
        {!!hasError && (
          <span className="ml-2 mt-2 text-custom-10 font-semibold text-red-500">{`${formContext.formState.errors[name]?.message}`}</span>
        )}
      </PlaceHolderLabelAnimatedLayout>
    );
  },
);

FormStyledCountryInput.displayName = "FormStyledCountryInput";

export default FormStyledCountryInput;
