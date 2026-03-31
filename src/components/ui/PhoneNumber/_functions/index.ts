import {
  countries,
  phoneNumberLengths,
} from "../_constants/countryCodes.constants";
import { countriesPhoneCodes } from "../_constants/countryCodes.constants";
import { CountryCode } from "../_types";

export const coutnriesWithPhoneNumberLength = countries.map((country) => {
  return {
    ...country,
    phoneNumberLength: phoneNumberLengths[country.code],
  };
});

// export const findCountryByPhoneNumber = (phoneNumber: string) => {
//   for (const code in countriesPhoneCodes) {
//     if (phoneNumber.startsWith(countriesPhoneCodes[code])) {
//       return {
//         code,
//         phoneNumberLength:
//           coutnriesWithPhoneNumberLength.find((item) => item.code === code)
//             ?.phoneNumberLength || 15,
//       };
//     }
//   }
//   return null;
// };

export const findCountryByPhoneNumber = (phoneNumber: string) => {
  let matchedCountry = null;

  for (const code in countriesPhoneCodes) {
    const prefix = countriesPhoneCodes[code];
    if (phoneNumber.startsWith(prefix)) {
      if (
        !matchedCountry ||
        prefix.length > countriesPhoneCodes[matchedCountry.code].length
      ) {
        matchedCountry = {
          name: countries.find((item) => item.code === code)?.name || "",
          emoji: countries.find((item) => item.code === code)?.emoji || "",
          unicode: countries.find((item) => item.code === code)?.unicode || "",
          image: countries.find((item) => item.code === code)?.image || "",
          code: code as CountryCode,
          phoneNumberLength:
            coutnriesWithPhoneNumberLength.find((item) => item.code === code)
              ?.phoneNumberLength || 15,
        };
      }
    }
  }

  return matchedCountry;
};
