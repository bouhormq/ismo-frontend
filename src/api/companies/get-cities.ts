import { restApiClient } from "$/utils/clients/restApiClient";
import { CountryType, SelectOption } from "$/utils/types/misc.types";

export const getAllCitiesForCountry = async (
  country: CountryType,
  city?: string,
) => {
  return restApiClient
    .url("/companies/city-options")
    .query({ country, city })
    .get<SelectOption[]>();
};
