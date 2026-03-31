import { countriesCodes } from "../_constants/countryCodes.constants";

export type CountryCode = (typeof countriesCodes)[number];

export type Option = {
  name: string;
  code: CountryCode;
  emoji: string;
  unicode: string;
  image: string;
  phoneNumberLength?: number;
};
