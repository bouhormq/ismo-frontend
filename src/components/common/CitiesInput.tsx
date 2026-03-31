import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  GeocodeItem,
  HereApiAutocompleteResponse,
} from "$/types/api/here-api.types";

import ComboSelectComponent, {
  SelectOption,
} from "../inputs/FormComboSelect/ComboSelectInput";

type Props = {
  mainClassName?: string;
  wrapperClassName?: string;
  contentClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSelect?: (
    selected: SelectOption<string> | SelectOption<string>[],
  ) => void;
  onClearOptions?: () => void;
  withFilter?: boolean;
  returnSingleValue?: boolean;
  isClearable?: boolean;
  placeHolder?: string;
  defaultOuterValue?: SelectOption<string>;
  country?: string;
};
function CitiesInput({
  country,
  contentClassName,
  handleOnSelect,
  mainClassName,
  wrapperClassName,
  withFilter,
  isClearable,
  returnSingleValue,
  defaultOuterValue,
  placeHolder,
  onClearOptions,
}: Props) {
  const [cities, setCities] = useState<SelectOption<string>[]>([]);
  const [query, setQuery] = useState<string>();
  const [boundingBox, setBoundingBox] = useState<string>();

  const { data: countryDetails } = useQuery<{ data: { items: GeocodeItem[] } }>(
    {
      queryKey: ["boundingBox", country],
      queryFn: () =>
        axios.get(
          `https://geocode.search.hereapi.com/v1/geocode?q=${country}&apiKey=V5UVroEX_lo_7nEcKwXGqo3qva0CpufcVFD-r_n9z-A`,
        ),
    },
  );

  const { data: results } = useQuery<{ data: HereApiAutocompleteResponse }>({
    queryKey: ["cities", query, boundingBox],
    queryFn: () => {
      return axios.get(
        "https://autosuggest.search.hereapi.com/v1/autosuggest",
        {
          params: {
            q: query,
            in: `bbox:${boundingBox}`,
            limit: 100,
            apiKey: "V5UVroEX_lo_7nEcKwXGqo3qva0CpufcVFD-r_n9z-A",
          },
        },
      );
    },
    enabled: !!query && !!boundingBox,
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  useEffect(() => {
    if (countryDetails?.data.items.length) {
      const mapView = countryDetails.data.items[0].mapView;

      setBoundingBox(
        `${mapView.west},${mapView.south},${mapView.east},${mapView.north}`,
      );
    }
  }, [countryDetails]);

  useEffect(() => {
    if (results?.data.items) {
      const citiesResponse = results.data.items.filter(
        (item) => item.localityType === "city",
      );
      setCities(
        citiesResponse.map((cityResponse) => {
          const city = cityResponse.title.split(",")[0];
          return {
            label: city,
            value: city,
          };
        }),
      );
    } else {
      if (defaultOuterValue) setCities([defaultOuterValue]);
    }
  }, [results, defaultOuterValue]);

  useEffect(() => {
    if (country) {
      setCities([]);
      setQuery("");
    }
  }, [country]);
  return (
    <ComboSelectComponent
      name="city"
      mainClassName={mainClassName}
      wrapperClassName={wrapperClassName}
      contentClassName={contentClassName}
      options={cities}
      onChange={handleOnChange}
      handleOnSelect={handleOnSelect}
      label="Ville"
      withFilter={withFilter}
      isClearable={isClearable}
      returnSingleValue={returnSingleValue}
      placeHolder={placeHolder}
      defaultOuterValue={defaultOuterValue}
      onClearOptions={onClearOptions}
    />
  );
}

export default CitiesInput;
