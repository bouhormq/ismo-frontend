import { CountryCode, Option } from "../_types";

export const countriesCodes = [
  "AC",
  "CP",
  "DG",
  "AD",
  "AE",
  "AF",
  "EA",
  "SCOTLAND",
  // "ENGLAND",
  // "WALES",
  // "UN",
  "AG",
  "AI",
  "AL",
  "AM",
  "AO",
  "AQ",
  "AR",
  "AS",
  "AT",
  "AU",
  "AW",
  "AX",
  "AZ",
  "BA",
  "BB",
  "BD",
  "BE",
  "BF",
  "BG",
  "BH",
  "BI",
  "BJ",
  "BL",
  "BM",
  "BN",
  "BO",
  "BQ",
  "BR",
  "BS",
  "BT",
  "BV",
  "BW",
  "BY",
  "BZ",
  "CA",
  "CC",
  "CD",
  "CF",
  "CG",
  "CH",
  "CI",
  "CK",
  "CL",
  "CM",
  "CN",
  "CO",
  "CR",
  "CU",
  "CV",
  "CW",
  "CX",
  "CY",
  "CZ",
  "DE",
  "DJ",
  "DK",
  "DM",
  "DO",
  "DZ",
  "EC",
  "EE",
  "EG",
  // "EH",
  "ER",
  "ES",
  "ET",
  "EU",
  "FI",
  "FJ",
  "FK",
  "FM",
  "FO",
  "FR",
  "GA",
  // "GB",
  "GD",
  "GE",
  "GF",
  "GG",
  "GH",
  "GI",
  "GL",
  "GM",
  "GN",
  "GP",
  "GQ",
  "GR",
  "GS",
  "GT",
  "GU",
  "GW",
  "GY",
  "HK",
  // "HM",
  "HN",
  "HR",
  "HT",
  "HU",
  "IC",
  "ID",
  "IE",
  "IL",
  "IM",
  "IN",
  "IO",
  "IQ",
  "IR",
  "IS",
  "IT",
  "JE",
  "JM",
  "JO",
  "JP",
  "KE",
  "KG",
  "KH",
  "KI",
  "KM",
  "KN",
  "KP",
  "KR",
  "KW",
  "KY",
  "KZ",
  "LA",
  "LB",
  "LC",
  "LI",
  "LK",
  "LR",
  "LS",
  "LT",
  "LU",
  "LV",
  "LY",
  "MA",
  "MC",
  "MD",
  "ME",
  "MF",
  "MG",
  "MH",
  "MK",
  "ML",
  "MM",
  "MN",
  "MO",
  "MP",
  "MQ",
  "MR",
  "MS",
  "MT",
  "MU",
  "MV",
  "MW",
  "MX",
  "MY",
  "RUS",
  "MZ",
  "NA",
  "NC",
  "NE",
  "NF",
  "NG",
  "NI",
  "NL",
  "NO",
  "NP",
  "NR",
  "NU",
  "NZ",
  "OM",
  "PA",
  "PE",
  "PF",
  "PG",
  "PH",
  "PK",
  "PL",
  "PM",
  "PN",
  "PR",
  "PS",
  "PT",
  "PW",
  "PY",
  "QA",
  "RE",
  "RO",
  "EN",
  "RS",
  "RU",
  "RW",
  "SA",
  "SB",
  "SC",
  "SD",
  "SE",
  "SG",
  "SH",
  "SI",
  "SJ",
  "SK",
  "SL",
  "SM",
  "SN",
  "SO",
  "SR",
  "SS",
  "ST",
  "SV",
  "SX",
  "SY",
  "SZ",
  // "TA",
  "TC",
  "TD",
  // "TF",
  "TG",
  "TH",
  "TJ",
  "TK",
  "TL",
  "TM",
  "TN",
  "TO",
  "TR",
  "TT",
  "TV",
  "TW",
  "TZ",
  "UA",
  "UG",
  // "UM",
  "US",
  "UY",
  "UZ",
  "VA",
  "VC",
  "VE",
  "VG",
  "VI",
  "VN",
  "VU",
  "WF",
  "WS",
  "XK",
  "YE",
  "YT",
  "ZA",
  "ZM",
  "ZW",
] as const;

export const countriesPhoneCodes: Record<string, string> = {
  AC: "+247",
  AD: "+376",
  AE: "+971",
  AF: "+93",
  AG: "+1-268",
  AI: "+1-264",
  AL: "+355",
  AM: "+374",
  AO: "+244",
  AQ: "+672",
  AR: "+54",
  AS: "+1-684",
  AT: "+43",
  AU: "+61",
  AW: "+297",
  AX: "+358-18",
  AZ: "+994",
  BA: "+387",
  BB: "+1-246",
  BD: "+880",
  BE: "+32",
  BF: "+226",
  BG: "+359",
  BH: "+973",
  BI: "+257",
  BJ: "+229",
  BL: "+590",
  BM: "+1-441",
  BN: "+673",
  BO: "+591",
  BQ: "+599",
  BR: "+55",
  BS: "+1-242",
  BT: "+975",
  BV: "+47",
  BW: "+267",
  BY: "+375",
  BZ: "+501",
  CA: "+1 ",
  CC: "+61",
  CD: "+243",
  CF: "+236",
  CG: "+242",
  CH: "+41",
  CI: "+225",
  CK: "+682",
  CL: "+56",
  CM: "+237",
  CN: "+86",
  CO: "+57",
  CR: "+506",
  CU: "+53",
  CV: "+238",
  CW: "+599",
  CX: "+61",
  CY: "+357",
  CZ: "+420",
  DE: "+49",
  DJ: "+253",
  DK: "+45",
  DM: "+1-767",
  DO: "+1-809, +1-829, +1-849",
  DZ: "+213",
  EC: "+593",
  EE: "+372",
  EG: "+20",
  // EH: "+212",
  ER: "+291",
  ES: "+34",
  ET: "+251",
  EU: "+0",
  FI: "+358",
  FJ: "+679",
  FK: "+500",
  FM: "+691",
  FO: "+298",
  FR: "+33",
  GA: "+241",
  // GB: "+44",
  GD: "+1-473",
  GE: "+995",
  GF: "+594",
  GG: "+44-1481",
  GH: "+233",
  GI: "+350",
  GL: "+299",
  GM: "+220",
  GN: "+224",
  GP: "+590",
  GQ: "+240",
  GR: "+30",
  GS: "+500",
  GT: "+502",
  GU: "+1-671",
  GW: "+245",
  GY: "+592",
  HK: "+852",
  // HM: "+",
  HN: "+504",
  HR: "+385",
  HT: "+509",
  HU: "+36",
  IC: "+354",
  ID: "+62",
  IE: "+353",
  IL: "+972",
  IM: "+44-1624",
  IN: "+91",
  IO: "+246",
  IQ: "+964",
  IR: "+98",
  IS: "+354",
  IT: "+39",
  JE: "+44-1534",
  JM: "+1-876",
  JO: "+962",
  JP: "+81",
  KE: "+254",
  KG: "+996",
  KH: "+855",
  KI: "+686",
  KM: "+269",
  KN: "+1-869",
  KP: "+850",
  KR: "+82",
  KW: "+965",
  KY: "+1-345",
  KZ: "+7",
  LA: "+856",
  LB: "+961",
  LC: "+1-758",
  LI: "+423",
  LK: "+94",
  LR: "+231",
  LS: "+266",
  LT: "+370",
  LU: "+352",
  LV: "+371",
  LY: "+218",
  MA: "+212",
  MC: "+377",
  MD: "+373",
  ME: "+382",
  MF: "+590",
  MG: "+261",
  MH: "+692",
  MK: "+389",
  ML: "+223",
  MM: "+95",
  MN: "+976",
  MO: "+853",
  MP: "+1-670",
  MQ: "+596",
  MR: "+222",
  MS: "+1-664",
  MT: "+356",
  MU: "+230",
  MV: "+960",
  MW: "+265",
  MX: "+52",
  MY: "+60",
  MZ: "+258",
  NA: "+264",
  NC: "+687",
  NE: "+227",
  NF: "+672",
  NG: "+234",
  NI: "+505",
  NL: "+31",
  NO: "+47",
  NP: "+977",
  NR: "+674",
  NU: "+683",
  NZ: "+64",
  OM: "+968",
  PA: "+507",
  PE: "+51",
  PF: "+689",
  PG: "+675",
  PH: "+63",
  PK: "+92",
  PL: "+48",
  PM: "+508",
  PN: "+64",
  PR: "+1-787, +1-939",
  RUS: "+7",
  PS: "+970",
  PT: "+351",
  PW: "+680",
  PY: "+595",
  QA: "+974",
  RE: "+262",
  RO: "+40",
  RS: "+381",
  RU: "+7",
  RW: "+250",
  SA: "+966",
  SB: "+677",
  SC: "+248",
  SD: "+249",
  SE: "+46",
  SG: "+65",
  SH: "+290",
  SI: "+386",
  SJ: "+47",
  SK: "+421",
  SL: "+232",
  SM: "+378",
  SN: "+221",
  SO: "+252",
  SR: "+597",
  SS: "+211",
  ST: "+239",
  SV: "+503",
  SX: "+1-721",
  SY: "+963",
  SZ: "+268",
  // TA: "+",
  TC: "+1-649",
  TD: "+235",
  // TF: "+",
  TG: "+228",
  TH: "+66",
  TJ: "+992",
  TK: "+690",
  TL: "+670",
  TM: "+993",
  TN: "+216",
  TO: "+676",
  TR: "+90",
  TT: "+1-868",
  TV: "+688",
  TW: "+886",
  TZ: "+255",
  UA: "+380",
  UG: "+256",
  // UM: "+",
  US: "+1",
  UY: "+598",
  UZ: "+998",
  VA: "+379",
  VC: "+1-784",
  VE: "+58",
  VG: "+1-284",
  VI: "+1-340",
  VN: "+84",
  VU: "+678",
  WF: "+681",
  WS: "+685",
  XK: "+383",
  YE: "+967",
  YT: "+262",
  ZA: "+27",
  ZM: "+260",
  ZW: "+263",
  EN: "+44",
  // WALES: "+",
  // ENGLAND: "+44",
};

export const countryNames: Record<string, string> = {
  AC: "Ascension Island",
  AD: "Andorra",
  AE: "United Arab Emirates",
  AF: "Afghanistan",
  AG: "Antigua and Barbuda",
  AI: "Anguilla",
  AL: "Albania",
  AM: "Armenia",
  AO: "Angola",
  AQ: "Antarctica",
  AR: "Argentina",
  AS: "American Samoa",
  AT: "Austria",
  AU: "Australia",
  AW: "Aruba",
  AX: "Åland Islands",
  AZ: "Azerbaijan",
  BA: "Bosnia and Herzegovina",
  BB: "Barbados",
  BD: "Bangladesh",
  BE: "Belgium",
  BF: "Burkina Faso",
  BG: "Bulgaria",
  BH: "Bahrain",
  BI: "Burundi",
  BJ: "Benin",
  BL: "Saint Barthélemy",
  BM: "Bermuda",
  BN: "Brunei Darussalam",
  BO: "Bolivia",
  BQ: "Bonaire, Sint Eustatius and Saba",
  BR: "Brazil",
  BS: "Bahamas",
  BT: "Bhutan",
  BV: "Bouvet Island",
  BW: "Botswana",
  BY: "Belarus",
  BZ: "Belize",
  CA: "Canada",
  CC: "Cocos (Keeling) Islands",
  CD: "Congo, Democratic Republic of the",
  CF: "Central African Republic",
  CG: "Congo",
  CH: "Switzerland",
  CI: "Côte d'Ivoire",
  CK: "Cook Islands",
  CL: "Chile",
  CM: "Cameroon",
  CN: "China",
  CO: "Colombia",
  CR: "Costa Rica",
  CU: "Cuba",
  CV: "Cabo Verde",
  CW: "Curaçao",
  CX: "Christmas Island",
  CY: "Cyprus",
  CZ: "Czech Republic",
  DE: "Germany",
  DJ: "Djibouti",
  DK: "Denmark",
  DM: "Dominica",
  DO: "Dominican Republic",
  DZ: "Algeria",
  EC: "Ecuador",
  EE: "Estonia",
  EG: "Egypt",
  // EH: "Western Sahara",
  ER: "Eritrea",
  ES: "Spain",
  ET: "Ethiopia",
  EU: "European Union",
  FI: "Finland",
  FJ: "Fiji",
  FK: "Falkland Islands",
  FM: "Micronesia",
  FO: "Faroe Islands",
  FR: "France",
  GA: "Gabon",
  // GB: "United Kingdom",
  EN: "England",
  GD: "Grenada",
  GE: "Georgia",
  GF: "French Guiana",
  GG: "Guernsey",
  GH: "Ghana",
  GI: "Gibraltar",
  GL: "Greenland",
  GM: "Gambia",
  GN: "Guinea",
  GP: "Guadeloupe",
  GQ: "Equatorial Guinea",
  GR: "Greece",
  GS: "South Georgia and the South Sandwich Islands",
  GT: "Guatemala",
  GU: "Guam",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HK: "Hong Kong",
  HM: "Heard Island and McDonald Islands",
  HN: "Honduras",
  HR: "Croatia",
  HT: "Haiti",
  HU: "Hungary",
  IC: "Canary Islands",
  ID: "Indonesia",
  IE: "Ireland",
  IL: "Israel",
  IM: "Isle of Man",
  IN: "India",
  IO: "British Indian Ocean Territory",
  IQ: "Iraq",
  IR: "Iran",
  IS: "Iceland",
  IT: "Italy",
  JE: "Jersey",
  JM: "Jamaica",
  JO: "Jordan",
  JP: "Japan",
  KE: "Kenya",
  KG: "Kyrgyzstan",
  KH: "Cambodia",
  KI: "Kiribati",
  KM: "Comoros",
  KN: "Saint Kitts and Nevis",
  KP: "Korea (North)",
  KR: "Korea (South)",
  KW: "Kuwait",
  KY: "Cayman Islands",
  KZ: "Kazakhstan",
  LA: "Lao People's Democratic Republic",
  LB: "Lebanon",
  LC: "Saint Lucia",
  LI: "Liechtenstein",
  LK: "Sri Lanka",
  LR: "Liberia",
  LS: "Lesotho",
  LT: "Lithuania",
  LU: "Luxembourg",
  LV: "Latvia",
  LY: "Libya",
  MA: "Morocco",
  MC: "Monaco",
  MD: "Moldova",
  ME: "Montenegro",
  MF: "Saint Martin (French part)",
  MG: "Madagascar",
  MH: "Marshall Islands",
  MK: "North Macedonia",
  ML: "Mali",
  MM: "Myanmar",
  MN: "Mongolia",
  MO: "Macao",
  MP: "Northern Mariana Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MS: "Montserrat",
  MT: "Malta",
  MU: "Mauritius",
  MV: "Maldives",
  MW: "Malawi",
  MX: "Mexico",
  MY: "Malaysia",
  MZ: "Mozambique",
  NA: "Namibia",
  NC: "New Caledonia",
  NE: "Niger",
  NF: "Norfolk Island",
  NG: "Nigeria",
  NI: "Nicaragua",
  NL: "Netherlands",
  NO: "Norway",
  NP: "Nepal",
  NR: "Nauru",
  NU: "Niue",
  NZ: "New Zealand",
  OM: "Oman",
  PA: "Panama",
  PE: "Peru",
  PF: "French Polynesia",
  PG: "Papua New Guinea",
  PH: "Philippines",
  PK: "Pakistan",
  PL: "Poland",
  PM: "Saint Pierre and Miquelon",
  PN: "Pitcairn",
  PR: "Puerto Rico",
  PS: "Palestine, State of",
  PT: "Portugal",
  PW: "Palau",
  PY: "Paraguay",
  QA: "Qatar",
  RE: "Réunion",
  RO: "Romania",
  RS: "Serbia",
  RU: "Russian Federation",
  RUS: "Russia",
  RW: "Rwanda",
  SA: "Saudi Arabia",
  SB: "Solomon Islands",
  SC: "Seychelles",
  SD: "Sudan",
  SE: "Sweden",
  SG: "Singapore",
  SH: "Saint Helena, Ascension and Tristan da Cunha",
  SI: "Slovenia",
  SJ: "Svalbard and Jan Mayen",
  SK: "Slovakia",
  SL: "Sierra Leone",
  SM: "San Marino",
  SN: "Senegal",
  SO: "Somalia",
  SR: "Suriname",
  SS: "South Sudan",
  ST: "Sao Tome and Principe",
  SV: "El Salvador",
  SX: "Sint Maarten (Dutch part)",
  SY: "Syrian Arab Republic",
  SZ: "Eswatini",
  // TA: "Tristan da Cunha",
  TC: "Turks and Caicos Islands",
  TD: "Chad",
  // TF: "French Southern Territories",
  TG: "Togo",
  TH: "Thailand",
  TJ: "Tajikistan",
  TK: "Tokelau",
  TL: "Timor-Leste",
  TM: "Turkmenistan",
  TN: "Tunisia",
  TO: "Tonga",
  TR: "Turkey",
  TT: "Trinidad and Tobago",
  TV: "Tuvalu",
  TW: "Taiwan",
  TZ: "Tanzania, United Republic of",
  UA: "Ukraine",
  UG: "Uganda",
  // UM: "United States Minor Outlying Islands",
  US: "United States of America",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VA: "Holy See",
  VC: "Saint Vincent and the Grenadines",
  VE: "Venezuela",
  VG: "Virgin Islands (British)",
  VI: "Virgin Islands (U.S.)",
  VN: "Viet Nam",
  VU: "Vanuatu",
  WF: "Wallis and Futuna",
  WS: "Samoa",
  XK: "Kosovo",
  YE: "Yemen",
  YT: "Mayotte",
  ZA: "South Africa",
  ZM: "Zambia",
  ZW: "Zimbabwe",
};

export const phoneNumberLengths: Record<CountryCode, number> = {
  AC: 5, // Ascension Island
  AD: 6, // Andorra
  AE: 9, // United Arab Emirates
  AF: 9, // Afghanistan
  AG: 7, // Antigua and Barbuda
  AI: 7, // Anguilla
  AL: 8, // Albania
  AM: 8, // Armenia
  AO: 9, // Angola
  AR: 10, // Argentina
  AS: 7, // American Samoa
  AT: 10, // Austria
  AU: 9, // Australia
  AW: 7, // Aruba
  AX: 9, // Åland Islands
  AZ: 9, // Azerbaijan
  BA: 8, // Bosnia and Herzegovina
  BB: 7, // Barbados
  BD: 10, // Bangladesh
  BE: 9, // Belgium
  BF: 8, // Burkina Faso
  BG: 8, // Bulgaria
  BH: 8, // Bahrain
  BI: 8, // Burundi
  BJ: 8, // Benin
  BL: 9, // Saint Barthélemy
  BM: 7, // Bermuda
  BN: 7, // Brunei
  BO: 8, // Bolivia
  BQ: 7, // Bonaire
  BR: 12, // Brazil
  BS: 7, // Bahamas
  BT: 8, // Bhutan
  BV: 7, // Bouvet Island
  BW: 8, // Botswana
  BY: 9, // Belarus
  BZ: 7, // Belize
  CA: 10, // Canada
  CC: 9, // Cocos (Keeling) Islands
  CD: 9, // Congo (Kinshasa)
  CF: 8, // Central African Republic
  CG: 9, // Congo (Brazzaville)
  CH: 9, // Switzerland
  CI: 8, // Côte d'Ivoire
  CK: 5, // Cook Islands
  CL: 9, // Chile
  CM: 9, // Cameroon
  CN: 11, // China
  CO: 10, // Colombia
  CR: 8, // Costa Rica
  CU: 8, // Cuba
  CV: 7, // Cape Verde
  CW: 7, // Curaçao
  CX: 9, // Christmas Island
  CY: 8, // Cyprus
  CZ: 9, // Czech Republic
  DE: 10, // Germany
  DJ: 6, // Djibouti
  DK: 8, // Denmark
  DM: 7, // Dominica
  DO: 10, // Dominican Republic
  DZ: 9, // Algeria
  EC: 9, // Ecuador
  EE: 8, // Estonia
  EG: 10, // Egypt
  // EH: 9, // Western Sahara
  ER: 7, // Eritrea
  ES: 9, // Spain
  ET: 9, // Ethiopia
  FI: 9, // Finland
  FJ: 7, // Fiji
  FK: 5, // Falkland Islands
  FM: 7, // Micronesia
  FO: 6, // Faroe Islands
  FR: 9, // France
  GA: 9, // Gabon
  // GB: 10, // United Kingdom
  GD: 7, // Grenada
  GE: 9, // Georgia
  GF: 9, // French Guiana
  GG: 6, // Guernsey
  GH: 9, // Ghana
  GI: 8, // Gibraltar
  GL: 6, // Greenland
  GM: 7, // Gambia
  GN: 9, // Guinea
  GP: 9, // Guadeloupe
  GQ: 9, // Equatorial Guinea
  GR: 10, // Greece
  GT: 8, // Guatemala
  GU: 7, // Guam
  GW: 7, // Guinea-Bissau
  GY: 7, // Guyana
  HK: 8, // Hong Kong
  // HM: 7, // Heard Island and McDonald Islands
  HN: 8, // Honduras
  HR: 9, // Croatia
  HT: 8, // Haiti
  HU: 9, // Hungary
  IC: 9, // Canary Islands
  ID: 10, // Indonesia
  IE: 9, // Ireland
  IL: 9, // Israel
  IM: 6, // Isle of Man
  IN: 10, // India
  IO: 7, // British Indian Ocean Territory
  IQ: 10, // Iraq
  IR: 10, // Iran
  IS: 7, // Iceland
  IT: 10, // Italy
  JE: 6, // Jersey
  JM: 7, // Jamaica
  JO: 9, // Jordan
  JP: 10, // Japan
  KE: 9, // Kenya
  KG: 9, // Kyrgyzstan
  KH: 9, // Cambodia
  KI: 8, // Kiribati
  KM: 7, // Comoros
  KN: 7, // Saint Kitts and Nevis
  KP: 10, // North Korea
  KR: 10, // South Korea
  KW: 8, // Kuwait
  KY: 7, // Cayman Islands
  KZ: 10, // Kazakhstan
  LA: 9, // Laos
  LB: 8, // Lebanon
  LC: 7, // Saint Lucia
  LI: 7, // Liechtenstein
  LK: 9, // Sri Lanka
  LR: 7, // Liberia
  LS: 8, // Lesotho
  LT: 8, // Lithuania
  LU: 9, // Luxembourg
  LV: 8, // Latvia
  LY: 10, // Libya
  MA: 9, // Morocco
  MC: 8, // Monaco
  MD: 8, // Moldova
  ME: 8, // Montenegro
  MF: 9, // Saint Martin
  MG: 9, // Madagascar
  MH: 7, // Marshall Islands
  MK: 8, // North Macedonia
  ML: 8, // Mali
  MM: 9, // Myanmar
  MN: 8, // Mongolia
  MO: 8, // Macau
  MP: 7, // Northern Mariana Islands
  MQ: 9, // Martinique
  MR: 8, // Mauritania
  MS: 7, // Montserrat
  MT: 8, // Malta
  MU: 7, // Mauritius
  MV: 7, // Maldives
  MW: 9, // Malawi
  MX: 10, // Mexico
  MY: 10, // Malaysia
  MZ: 9, // Mozambique
  NA: 9, // Namibia
  NC: 6, // New Caledonia
  NE: 8, // Niger
  NF: 6, // Norfolk Island
  NG: 10, // Nigeria
  NI: 8, // Nicaragua
  NL: 9, // Netherlands
  NO: 8, // Norway
  NP: 10, // Nepal
  NR: 7, // Nauru
  NU: 4, // Niue
  NZ: 9, // New Zealand
  OM: 8, // Oman
  PA: 8, // Panama
  PE: 9, // Peru
  PF: 6, // French Polynesia
  PG: 7, // Papua New Guinea
  PH: 10, // Philippines
  PK: 10, // Pakistan
  PL: 9, // Poland
  PM: 6, // Saint Pierre and Miquelon
  PN: 4, // Pitcairn Islands
  PR: 10, // Puerto Rico
  PS: 9, // Palestine
  PT: 9, // Portugal
  PW: 7, // Palau
  PY: 9, // Paraguay
  QA: 8, // Qatar
  RE: 9, // Réunion
  RO: 10, // Romania
  RS: 9, // Serbia
  RU: 10, // Russia
  RW: 9, // Rwanda
  SA: 9, // Saudi Arabia
  SB: 7, // Solomon Islands
  SC: 7, // Seychelles
  SD: 9, // Sudan
  SE: 9, // Sweden
  SG: 8, // Singapore
  SH: 5, // Saint Helena
  SI: 9, // Slovenia
  SJ: 8, // Svalbard and Jan Mayen
  SK: 9, // Slovakia
  SL: 8, // Sierra Leone
  SM: 10, // San Marino
  SN: 9, // Senegal
  SO: 7, // Somalia
  SR: 6, // Suriname
  SS: 9, // South Sudan
  ST: 7, // São Tomé and Príncipe
  SV: 8, // El Salvador
  SX: 7, // Sint Maarten
  SY: 9, // Syria
  SZ: 8, // Eswatini
  // TA: 7, // Tristan da Cunha
  TC: 7, // Turks and Caicos Islands
  TD: 9, // Chad
  // TF: 6, // French Southern Territories
  TG: 8, // Togo
  TH: 9, // Thailand
  TJ: 9, // Tajikistan
  TK: 4, // Tokelau
  TL: 8, // Timor-Leste
  TM: 9, // Turkmenistan
  TN: 8, // Tunisia
  TO: 7, // Tonga
  TR: 10, // Turkey
  TT: 7, // Trinidad and Tobago
  TV: 5, // Tuvalu
  TW: 9, // Taiwan
  TZ: 9, // Tanzania
  UA: 10, // Ukraine
  UG: 9, // Uganda
  // UM: 10, // United States Minor Outlying Islands
  US: 10, // United States
  UY: 9, // Uruguay
  UZ: 9, // Uzbekistan
  VA: 6, // Vatican City
  VC: 7, // Saint Vincent and the Grenadines
  VE: 10, // Venezuela
  VG: 7, // British Virgin Islands
  VI: 7, // U.S. Virgin Islands
  VN: 10, // Vietnam
  VU: 7, // Vanuatu
  WF: 6, // Wallis and Futuna
  WS: 7, // Samoa
  XK: 8, // Kosovo
  YE: 9, // Yemen
  YT: 6, // Mayotte
  ZA: 9, // South Africa
  ZM: 9, // Zambia
  ZW: 9, // Zimbabwe
  AQ: 7, // Antarctica
  CP: 5, // Clipperton Island
  DG: 5, // Diego Garcia
  EA: 9, // Ceuta and Melilla
  EN: 10, // England
  EU: 10, // European Union
  GS: 7, // South Georgia and the South Sandwich Islands
  RUS: 10, // Russia
  SCOTLAND: 10, // Scotland
  // WALES: 10, // Wales
} as const;

export const countries: Option[] = [
  {
    name: "Île de l'Ascension",
    code: "AC",
    emoji: "🇦🇨",
    unicode: "U+1F1E6 U+1F1E8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AC.svg",
  },
  {
    name: "Andorre",
    code: "AD",
    emoji: "🇦🇩",
    unicode: "U+1F1E6 U+1F1E9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AD.svg",
  },
  {
    name: "Émirats Arabes Unis",
    code: "AE",
    emoji: "🇦🇪",
    unicode: "U+1F1E6 U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AE.svg",
  },
  {
    name: "Afghanistan",
    code: "AF",
    emoji: "🇦🇫",
    unicode: "U+1F1E6 U+1F1EB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AF.svg",
  },
  {
    name: "Antigua-et-Barbuda",
    code: "AG",
    emoji: "🇦🇬",
    unicode: "U+1F1E6 U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AG.svg",
  },
  {
    name: "Anguilla",
    code: "AI",
    emoji: "🇦🇮",
    unicode: "U+1F1E6 U+1F1EE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AI.svg",
  },
  {
    name: "Albanie",
    code: "AL",
    emoji: "🇦🇱",
    unicode: "U+1F1E6 U+1F1F1",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AL.svg",
  },
  {
    name: "Arménie",
    code: "AM",
    emoji: "🇦🇲",
    unicode: "U+1F1E6 U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AM.svg",
  },
  {
    name: "Angola",
    code: "AO",
    emoji: "🇦🇴",
    unicode: "U+1F1E6 U+1F1F4",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AO.svg",
  },
  {
    name: "Antarctique",
    code: "AQ",
    emoji: "🇦🇶",
    unicode: "U+1F1E6 U+1F1F6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AQ.svg",
  },
  {
    name: "Argentine",
    code: "AR",
    emoji: "🇦🇷",
    unicode: "U+1F1E6 U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AR.svg",
  },
  {
    name: "Samoa américaines",
    code: "AS",
    emoji: "🇦🇸",
    unicode: "U+1F1E6 U+1F1F8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AS.svg",
  },
  {
    name: "Autriche",
    code: "AT",
    emoji: "🇦🇹",
    unicode: "U+1F1E6 U+1F1F9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AT.svg",
  },
  {
    name: "Australie",
    code: "AU",
    emoji: "🇦🇺",
    unicode: "U+1F1E6 U+1F1FA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AU.svg",
  },
  {
    name: "Aruba",
    code: "AW",
    emoji: "🇦🇼",
    unicode: "U+1F1E6 U+1F1FC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AW.svg",
  },
  {
    name: "Îles Åland",
    code: "AX",
    emoji: "🇦🇽",
    unicode: "U+1F1E6 U+1F1FD",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AX.svg",
  },
  {
    name: "Azerbaïdjan",
    code: "AZ",
    emoji: "🇦🇿",
    unicode: "U+1F1E6 U+1F1FF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AZ.svg",
  },
  {
    name: "Bosnie-Herzégovine",
    code: "BA",
    emoji: "🇧🇦",
    unicode: "U+1F1E7 U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BA.svg",
  },
  {
    name: "Barbade",
    code: "BB",
    emoji: "🇧🇧",
    unicode: "U+1F1E7 U+1F1E7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BB.svg",
  },
  {
    name: "Bangladesh",
    code: "BD",
    emoji: "🇧🇩",
    unicode: "U+1F1E7 U+1F1E9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BD.svg",
  },
  {
    name: "Belgique",
    code: "BE",
    emoji: "🇧🇪",
    unicode: "U+1F1E7 U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BE.svg",
  },
  {
    name: "Burkina Faso",
    code: "BF",
    emoji: "🇧🇫",
    unicode: "U+1F1E7 U+1F1EB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BF.svg",
  },
  {
    name: "Bulgarie",
    code: "BG",
    emoji: "🇧🇬",
    unicode: "U+1F1E7 U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BG.svg",
  },
  {
    name: "Bahreïn",
    code: "BH",
    emoji: "🇧🇭",
    unicode: "U+1F1E7 U+1F1ED",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BH.svg",
  },
  {
    name: "Burundi",
    code: "BI",
    emoji: "🇧🇮",
    unicode: "U+1F1E7 U+1F1EE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BI.svg",
  },
  {
    name: "Bénin",
    code: "BJ",
    emoji: "🇧🇯",
    unicode: "U+1F1E7 U+1F1EF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BJ.svg",
  },
  {
    name: "Saint-Barthélemy",
    code: "BL",
    emoji: "🇧🇱",
    unicode: "U+1F1E7 U+1F1F1",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BL.svg",
  },
  {
    name: "Bermudes",
    code: "BM",
    emoji: "🇧🇲",
    unicode: "U+1F1E7 U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BM.svg",
  },
  {
    name: "Brunei",
    code: "BN",
    emoji: "🇧🇳",
    unicode: "U+1F1E7 U+1F1F3",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BN.svg",
  },
  {
    name: "Bolivie",
    code: "BO",
    emoji: "🇧🇴",
    unicode: "U+1F1E7 U+1F1F4",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BO.svg",
  },
  {
    name: "Bonaire, Saint-Eustache et Saba",
    code: "BQ",
    emoji: "🇧🇶",
    unicode: "U+1F1E7 U+1F1F6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BQ.svg",
  },
  {
    name: "Brésil",
    code: "BR",
    emoji: "🇧🇷",
    unicode: "U+1F1E7 U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BR.svg",
  },
  {
    name: "Bahamas",
    code: "BS",
    emoji: "🇧🇸",
    unicode: "U+1F1E7 U+1F1F8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BS.svg",
  },
  {
    name: "Bhoutan",
    code: "BT",
    emoji: "🇧🇹",
    unicode: "U+1F1E7 U+1F1F9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BT.svg",
  },
  {
    name: "Île Bouvet",
    code: "BV",
    emoji: "🇧🇻",
    unicode: "U+1F1E7 U+1F1FB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BV.svg",
  },
  {
    name: "Botswana",
    code: "BW",
    emoji: "🇧🇼",
    unicode: "U+1F1E7 U+1F1FC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BW.svg",
  },
  {
    name: "Biélorussie",
    code: "BY",
    emoji: "🇧🇾",
    unicode: "U+1F1E7 U+1F1FE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BY.svg",
  },
  {
    name: "Belize",
    code: "BZ",
    emoji: "🇧🇿",
    unicode: "U+1F1E7 U+1F1FF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BZ.svg",
  },
  {
    name: "Canada",
    code: "CA",
    emoji: "🇨🇦",
    unicode: "U+1F1E8 U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CA.svg",
  },
  {
    name: "Îles Cocos",
    code: "CC",
    emoji: "🇨🇨",
    unicode: "U+1F1E8 U+1F1E8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CC.svg",
  },
  {
    name: "République Démocratique du Congo",
    code: "CD",
    emoji: "🇨🇩",
    unicode: "U+1F1E8 U+1F1E9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CD.svg",
  },
  {
    name: "République centrafricaine",
    code: "CF",
    emoji: "🇨🇫",
    unicode: "U+1F1E8 U+1F1EB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CF.svg",
  },
  {
    name: "Congo",
    code: "CG",
    emoji: "🇨🇬",
    unicode: "U+1F1E8 U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CG.svg",
  },
  {
    name: "Suisse",
    code: "CH",
    emoji: "🇨🇭",
    unicode: "U+1F1E8 U+1F1ED",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CH.svg",
  },
  {
    name: "Côte d'Ivoire",
    code: "CI",
    emoji: "🇨🇮",
    unicode: "U+1F1E8 U+1F1EE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CI.svg",
  },
  {
    name: "Îles Cook",
    code: "CK",
    emoji: "🇨🇰",
    unicode: "U+1F1E8 U+1F1F0",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CK.svg",
  },
  {
    name: "Chili",
    code: "CL",
    emoji: "🇨🇱",
    unicode: "U+1F1E8 U+1F1F1",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CL.svg",
  },
  {
    name: "Cameroun",
    code: "CM",
    emoji: "🇨🇲",
    unicode: "U+1F1E8 U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CM.svg",
  },
  {
    name: "Chine",
    code: "CN",
    emoji: "🇨🇳",
    unicode: "U+1F1E8 U+1F1F3",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CN.svg",
  },
  {
    name: "Colombie",
    code: "CO",
    emoji: "🇨🇴",
    unicode: "U+1F1E8 U+1F1F4",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CO.svg",
  },
  {
    name: "Clipperton Island",
    code: "CP",
    emoji: "🇨🇵",
    unicode: "U+1F1E8 U+1F1F5",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CP.svg",
  },
  {
    name: "Costa Rica",
    code: "CR",
    emoji: "🇨🇷",
    unicode: "U+1F1E8 U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CR.svg",
  },
  {
    name: "Cuba",
    code: "CU",
    emoji: "🇨🇺",
    unicode: "U+1F1E8 U+1F1FA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CU.svg",
  },
  {
    name: "Cap-Vert",
    code: "CV",
    emoji: "🇨🇻",
    unicode: "U+1F1E8 U+1F1FB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CV.svg",
  },
  {
    name: "Curaçao",
    code: "CW",
    emoji: "🇨🇼",
    unicode: "U+1F1E8 U+1F1FC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CW.svg",
  },
  {
    name: "Île Christmas",
    code: "CX",
    emoji: "🇨🇽",
    unicode: "U+1F1E8 U+1F1FD",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CX.svg",
  },
  {
    name: "Chypre",
    code: "CY",
    emoji: "🇨🇾",
    unicode: "U+1F1E8 U+1F1FE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CY.svg",
  },
  {
    name: "République tchèque",
    code: "CZ",
    emoji: "🇨🇿",
    unicode: "U+1F1E8 U+1F1FF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CZ.svg",
  },
  {
    name: "Allemagne",
    code: "DE",
    emoji: "🇩🇪",
    unicode: "U+1F1E9 U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DE.svg",
  },
  {
    name: "Diego Garcia",
    code: "DG",
    emoji: "🇩🇬",
    unicode: "U+1F1E9 U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DG.svg",
  },
  {
    name: "Djibouti",
    code: "DJ",
    emoji: "🇩🇯",
    unicode: "U+1F1E9 U+1F1EF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DJ.svg",
  },
  {
    name: "Danemark",
    code: "DK",
    emoji: "🇩🇰",
    unicode: "U+1F1E9 U+1F1F0",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DK.svg",
  },
  {
    name: "Dominique",
    code: "DM",
    emoji: "🇩🇲",
    unicode: "U+1F1E9 U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DM.svg",
  },
  {
    name: "République dominicaine",
    code: "DO",
    emoji: "🇩🇴",
    unicode: "U+1F1E9 U+1F1F4",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DO.svg",
  },
  {
    name: "Algérie",
    code: "DZ",
    emoji: "🇩🇿",
    unicode: "U+1F1E9 U+1F1FF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DZ.svg",
  },
  {
    name: "Ceuta & Melilla",
    code: "EA",
    emoji: "🇪🇦",
    unicode: "U+1F1EA U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EA.svg",
  },
  {
    name: "Équateur",
    code: "EC",
    emoji: "🇪🇨",
    unicode: "U+1F1EA U+1F1E8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EC.svg",
  },
  {
    name: "Estonie",
    code: "EE",
    emoji: "🇪🇪",
    unicode: "U+1F1EA U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EE.svg",
  },
  {
    name: "Égypte",
    code: "EG",
    emoji: "🇪🇬",
    unicode: "U+1F1EA U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EG.svg",
  },
  // {
  //   name: "Sahara occidental",
  //   code: "EH",
  //   emoji: "🇪🇭",
  //   unicode: "U+1F1EA U+1F1ED",
  //   image:
  //     "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EH.svg",
  // },
  {
    name: "Érythrée",
    code: "ER",
    emoji: "🇪🇷",
    unicode: "U+1F1EA U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ER.svg",
  },
  {
    name: "Espagne",
    code: "ES",
    emoji: "🇪🇸",
    unicode: "U+1F1EA U+1F1F8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ES.svg",
  },
  {
    name: "Éthiopie",
    code: "ET",
    emoji: "🇪🇹",
    unicode: "U+1F1EA U+1F1F9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ET.svg",
  },
  {
    name: "Union Européenne",
    code: "EU",
    emoji: "🇪🇺",
    unicode: "U+1F1EA U+1F1FA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EU.svg",
  },
  {
    name: "Finlande",
    code: "FI",
    emoji: "🇫🇮",
    unicode: "U+1F1EB U+1F1EE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FI.svg",
  },
  {
    name: "Fidji",
    code: "FJ",
    emoji: "🇫🇯",
    unicode: "U+1F1EB U+1F1EF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FJ.svg",
  },
  {
    name: "Îles Malouines",
    code: "FK",
    emoji: "🇫🇰",
    unicode: "U+1F1EB U+1F1F0",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FK.svg",
  },
  {
    name: "Micronésie",
    code: "FM",
    emoji: "🇫🇲",
    unicode: "U+1F1EB U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FM.svg",
  },
  {
    name: "Îles Féroé",
    code: "FO",
    emoji: "🇫🇴",
    unicode: "U+1F1EB U+1F1F4",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FO.svg",
  },
  {
    name: "France",
    code: "FR",
    emoji: "🇫🇷",
    unicode: "U+1F1EB U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FR.svg",
  },
  {
    name: "Gabon",
    code: "GA",
    emoji: "🇬🇦",
    unicode: "U+1F1EC U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GA.svg",
  },
  {
    name: "Angleterre",
    code: "EN",
    emoji: "🇬🇧",
    unicode: "U+1F1EC U+1F1E7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ENGLAND.svg",
  },
  {
    name: "Grenade",
    code: "GD",
    emoji: "🇬🇩",
    unicode: "U+1F1EC U+1F1E9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GD.svg",
  },
  {
    name: "Géorgie",
    code: "GE",
    emoji: "🇬🇪",
    unicode: "U+1F1EC U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GE.svg",
  },
  {
    name: "Guyane française",
    code: "GF",
    emoji: "🇬🇫",
    unicode: "U+1F1EC U+1F1EB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GF.svg",
  },
  {
    name: "Guernesey",
    code: "GG",
    emoji: "🇬🇬",
    unicode: "U+1F1EC U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GG.svg",
  },
  {
    name: "Ghana",
    code: "GH",
    emoji: "🇬🇭",
    unicode: "U+1F1EC U+1F1ED",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GH.svg",
  },
  {
    name: "Gibraltar",
    code: "GI",
    emoji: "🇬🇮",
    unicode: "U+1F1EC U+1F1EE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GI.svg",
  },
  {
    name: "Groenland",
    code: "GL",
    emoji: "🇬🇱",
    unicode: "U+1F1EC U+1F1F1",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GL.svg",
  },
  {
    name: "Gambie",
    code: "GM",
    emoji: "🇬🇲",
    unicode: "U+1F1EC U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GM.svg",
  },
  {
    name: "Guinée",
    code: "GN",
    emoji: "🇬🇳",
    unicode: "U+1F1EC U+1F1F3",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GN.svg",
  },
  {
    name: "Guadeloupe",
    code: "GP",
    emoji: "🇬🇵",
    unicode: "U+1F1EC U+1F1F5",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GP.svg",
  },
  {
    name: "Guinée équatoriale",
    code: "GQ",
    emoji: "🇬🇶",
    unicode: "U+1F1EC U+1F1F6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GQ.svg",
  },
  {
    name: "Grèce",
    code: "GR",
    emoji: "🇬🇷",
    unicode: "U+1F1EC U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GR.svg",
  },
  {
    name: "Géorgie du Sud et îles Sandwich du Sud",
    code: "GS",
    emoji: "🇬🇸",
    unicode: "U+1F1EC U+1F1F8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GS.svg",
  },
  {
    name: "Guatemala",
    code: "GT",
    emoji: "🇬🇹",
    unicode: "U+1F1EC U+1F1F9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GT.svg",
  },
  {
    name: "Guam",
    code: "GU",
    emoji: "🇬🇺",
    unicode: "U+1F1EC U+1F1FA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GU.svg",
  },
  {
    name: "Guinée-Bissau",
    code: "GW",
    emoji: "🇬🇼",
    unicode: "U+1F1EC U+1F1FC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GW.svg",
  },
  {
    name: "Guyane",
    code: "GY",
    emoji: "🇬🇾",
    unicode: "U+1F1EC U+1F1FE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GY.svg",
  },
  {
    name: "Hong Kong",
    code: "HK",
    emoji: "🇭🇰",
    unicode: "U+1F1ED U+1F1F0",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HK.svg",
  },
  {
    name: "Honduras",
    code: "HN",
    emoji: "🇭🇳",
    unicode: "U+1F1ED U+1F1F3",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HN.svg",
  },
  {
    name: "Croatie",
    code: "HR",
    emoji: "🇭🇷",
    unicode: "U+1F1ED U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HR.svg",
  },
  {
    name: "Haïti",
    code: "HT",
    emoji: "🇭🇹",
    unicode: "U+1F1ED U+1F1F9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HT.svg",
  },
  {
    name: "Hongrie",
    code: "HU",
    emoji: "🇭🇺",
    unicode: "U+1F1ED U+1F1FA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HU.svg",
  },
  {
    name: "Îles Canaries",
    code: "IC",
    emoji: "🇮🇨",
    unicode: "U+1F1EE U+1F1E8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IC.svg",
  },
  {
    name: "Indonésie",
    code: "ID",
    emoji: "🇮🇩",
    unicode: "U+1F1EE U+1F1E9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ID.svg",
  },
  {
    name: "Irlande",
    code: "IE",
    emoji: "🇮🇪",
    unicode: "U+1F1EE U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IE.svg",
  },
  {
    name: "Israël",
    code: "IL",
    emoji: "🇮🇱",
    unicode: "U+1F1EE U+1F1F1",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IL.svg",
  },
  {
    name: "Île de Man",
    code: "IM",
    emoji: "🇮🇲",
    unicode: "U+1F1EE U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IM.svg",
  },
  {
    name: "Inde",
    code: "IN",
    emoji: "🇮🇳",
    unicode: "U+1F1EE U+1F1F3",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IN.svg",
  },
  {
    name: "Territoire britannique de l'océan Indien",
    code: "IO",
    emoji: "🇮🇴",
    unicode: "U+1F1EE U+1F1F4",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IO.svg",
  },
  {
    name: "Irak",
    code: "IQ",
    emoji: "🇮🇶",
    unicode: "U+1F1EE U+1F1F6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IQ.svg",
  },
  {
    name: "Iran",
    code: "IR",
    emoji: "🇮🇷",
    unicode: "U+1F1EE U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IR.svg",
  },
  {
    name: "Islande",
    code: "IS",
    emoji: "🇮🇸",
    unicode: "U+1F1EE U+1F1F8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IS.svg",
  },
  {
    name: "Italie",
    code: "IT",
    emoji: "🇮🇹",
    unicode: "U+1F1EE U+1F1F9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IT.svg",
  },
  {
    name: "Jersey",
    code: "JE",
    emoji: "🇯🇪",
    unicode: "U+1F1EF U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JE.svg",
  },
  {
    name: "Jamaïque",
    code: "JM",
    emoji: "🇯🇲",
    unicode: "U+1F1EF U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JM.svg",
  },
  {
    name: "Jordanie",
    code: "JO",
    emoji: "🇯🇴",
    unicode: "U+1F1EF U+1F1F4",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JO.svg",
  },
  {
    name: "Japon",
    code: "JP",
    emoji: "🇯🇵",
    unicode: "U+1F1EF U+1F1F5",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JP.svg",
  },
  {
    name: "Kenya",
    code: "KE",
    emoji: "🇰🇪",
    unicode: "U+1F1F0 U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KE.svg",
  },
  {
    name: "Kirghizistan",
    code: "KG",
    emoji: "🇰🇬",
    unicode: "U+1F1F0 U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KG.svg",
  },
  {
    name: "Cambodge",
    code: "KH",
    emoji: "🇰🇭",
    unicode: "U+1F1F0 U+1F1ED",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KH.svg",
  },
  {
    name: "Kiribati",
    code: "KI",
    emoji: "🇰🇮",
    unicode: "U+1F1F0 U+1F1EE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KI.svg",
  },
  {
    name: "Comores",
    code: "KM",
    emoji: "🇰🇲",
    unicode: "U+1F1F0 U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KM.svg",
  },
  {
    name: "Saint-Christophe-et-Niévès",
    code: "KN",
    emoji: "🇰🇳",
    unicode: "U+1F1F0 U+1F1F3",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KN.svg",
  },
  {
    name: "Corée du Nord",
    code: "KP",
    emoji: "🇰🇵",
    unicode: "U+1F1F0 U+1F1F5",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KP.svg",
  },
  {
    name: "Corée du Sud",
    code: "KR",
    emoji: "🇰🇷",
    unicode: "U+1F1F0 U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KR.svg",
  },
  {
    name: "Koweït",
    code: "KW",
    emoji: "🇰🇼",
    unicode: "U+1F1F0 U+1F1FC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KW.svg",
  },
  {
    name: "Îles Caïmans",
    code: "KY",
    emoji: "🇰🇾",
    unicode: "U+1F1F0 U+1F1FE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KY.svg",
  },
  {
    name: "Kazakhstan",
    code: "KZ",
    emoji: "🇰🇿",
    unicode: "U+1F1F0 U+1F1FF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KZ.svg",
  },
  {
    name: "République démocratique populaire lao",
    code: "LA",
    emoji: "🇱🇦",
    unicode: "U+1F1F1 U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LA.svg",
  },
  {
    name: "Liban",
    code: "LB",
    emoji: "🇱🇧",
    unicode: "U+1F1F1 U+1F1E7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LB.svg",
  },
  {
    name: "Sainte-Lucie",
    code: "LC",
    emoji: "🇱🇨",
    unicode: "U+1F1F1 U+1F1E8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LC.svg",
  },
  {
    name: "Liechtenstein",
    code: "LI",
    emoji: "🇱🇮",
    unicode: "U+1F1F1 U+1F1EE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LI.svg",
  },
  {
    name: "Sri Lanka",
    code: "LK",
    emoji: "🇱🇰",
    unicode: "U+1F1F1 U+1F1F0",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LK.svg",
  },
  {
    name: "Libéria",
    code: "LR",
    emoji: "🇱🇷",
    unicode: "U+1F1F1 U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LR.svg",
  },
  {
    name: "Lesotho",
    code: "LS",
    emoji: "🇱🇸",
    unicode: "U+1F1F1 U+1F1F8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LS.svg",
  },
  {
    name: "Lituanie",
    code: "LT",
    emoji: "🇱🇹",
    unicode: "U+1F1F1 U+1F1F9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LT.svg",
  },
  {
    name: "Luxembourg",
    code: "LU",
    emoji: "🇱🇺",
    unicode: "U+1F1F1 U+1F1FA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LU.svg",
  },
  {
    name: "Lettonie",
    code: "LV",
    emoji: "🇱🇻",
    unicode: "U+1F1F1 U+1F1FB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LV.svg",
  },
  {
    name: "Libye",
    code: "LY",
    emoji: "🇱🇾",
    unicode: "U+1F1F1 U+1F1FE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LY.svg",
  },
  {
    name: "Maroc",
    code: "MA",
    emoji: "🇲🇦",
    unicode: "U+1F1F2 U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MA.svg",
  },
  {
    name: "Monaco",
    code: "MC",
    emoji: "🇲🇨",
    unicode: "U+1F1F2 U+1F1E8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MC.svg",
  },
  {
    name: "Moldavie",
    code: "MD",
    emoji: "🇲🇩",
    unicode: "U+1F1F2 U+1F1E9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MD.svg",
  },
  {
    name: "Monténégro",
    code: "ME",
    emoji: "🇲🇪",
    unicode: "U+1F1F2 U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ME.svg",
  },
  {
    name: "Saint-Martin (partie française)",
    code: "MF",
    emoji: "🇲🇫",
    unicode: "U+1F1F2 U+1F1EB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MF.svg",
  },
  {
    name: "Madagascar",
    code: "MG",
    emoji: "🇲🇬",
    unicode: "U+1F1F2 U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MG.svg",
  },
  {
    name: "Îles Marshall",
    code: "MH",
    emoji: "🇲🇭",
    unicode: "U+1F1F2 U+1F1ED",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MH.svg",
  },
  {
    name: "Macédoine du Nord",
    code: "MK",
    emoji: "🇲🇰",
    unicode: "U+1F1F2 U+1F1F0",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MK.svg",
  },
  {
    name: "Mali",
    code: "ML",
    emoji: "🇲🇱",
    unicode: "U+1F1F2 U+1F1F1",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ML.svg",
  },
  {
    name: "Myanmar",
    code: "MM",
    emoji: "🇲🇲",
    unicode: "U+1F1F2 U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MM.svg",
  },
  {
    name: "Mongolie",
    code: "MN",
    emoji: "🇲🇳",
    unicode: "U+1F1F2 U+1F1F3",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MN.svg",
  },
  {
    name: "Macao",
    code: "MO",
    emoji: "🇲🇴",
    unicode: "U+1F1F2 U+1F1F4",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MO.svg",
  },
  {
    name: "Îles Mariannes du Nord",
    code: "MP",
    emoji: "🇲🇵",
    unicode: "U+1F1F2 U+1F1F5",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MP.svg",
  },
  {
    name: "Martinique",
    code: "MQ",
    emoji: "🇲🇶",
    unicode: "U+1F1F2 U+1F1F6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MQ.svg",
  },
  {
    name: "Mauritanie",
    code: "MR",
    emoji: "🇲🇷",
    unicode: "U+1F1F2 U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MR.svg",
  },
  {
    name: "Montserrat",
    code: "MS",
    emoji: "🇲🇸",
    unicode: "U+1F1F2 U+1F1F8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MS.svg",
  },
  {
    name: "Malte",
    code: "MT",
    emoji: "🇲🇹",
    unicode: "U+1F1F2 U+1F1F9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MT.svg",
  },
  {
    name: "Maurice",
    code: "MU",
    emoji: "🇲🇺",
    unicode: "U+1F1F2 U+1F1FA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MU.svg",
  },
  {
    name: "Maldives",
    code: "MV",
    emoji: "🇲🇻",
    unicode: "U+1F1F2 U+1F1FB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MV.svg",
  },
  {
    name: "Malawi",
    code: "MW",
    emoji: "🇲🇼",
    unicode: "U+1F1F2 U+1F1FC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MW.svg",
  },
  {
    name: "Mexique",
    code: "MX",
    emoji: "🇲🇽",
    unicode: "U+1F1F2 U+1F1FD",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MX.svg",
  },
  {
    name: "Malaisie",
    code: "MY",
    emoji: "🇲🇾",
    unicode: "U+1F1F2 U+1F1FE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MY.svg",
  },
  {
    name: "Mozambique",
    code: "MZ",
    emoji: "🇲🇿",
    unicode: "U+1F1F2 U+1F1FF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MZ.svg",
  },
  {
    name: "Namibie",
    code: "NA",
    emoji: "🇳🇦",
    unicode: "U+1F1F3 U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NA.svg",
  },
  {
    name: "Nouvelle-Calédonie",
    code: "NC",
    emoji: "🇳🇨",
    unicode: "U+1F1F3 U+1F1E8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NC.svg",
  },
  {
    name: "Niger",
    code: "NE",
    emoji: "🇳🇪",
    unicode: "U+1F1F3 U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NE.svg",
  },
  {
    name: "Île Norfolk",
    code: "NF",
    emoji: "🇳🇫",
    unicode: "U+1F1F3 U+1F1EB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NF.svg",
  },
  {
    name: "Nigéria",
    code: "NG",
    emoji: "🇳🇬",
    unicode: "U+1F1F3 U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NG.svg",
  },
  {
    name: "Nicaragua",
    code: "NI",
    emoji: "🇳🇮",
    unicode: "U+1F1F3 U+1F1EE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NI.svg",
  },
  {
    name: "Pays-Bas",
    code: "NL",
    emoji: "🇳🇱",
    unicode: "U+1F1F3 U+1F1F1",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NL.svg",
  },
  {
    name: "Norvège",
    code: "NO",
    emoji: "🇳🇴",
    unicode: "U+1F1F3 U+1F1F4",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NO.svg",
  },
  {
    name: "Népal",
    code: "NP",
    emoji: "🇳🇵",
    unicode: "U+1F1F3 U+1F1F5",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NP.svg",
  },
  {
    name: "Nauru",
    code: "NR",
    emoji: "🇳🇷",
    unicode: "U+1F1F3 U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NR.svg",
  },
  {
    name: "Niue",
    code: "NU",
    emoji: "🇳🇺",
    unicode: "U+1F1F3 U+1F1FA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NU.svg",
  },
  {
    name: "Nouvelle-Zélande",
    code: "NZ",
    emoji: "🇳🇿",
    unicode: "U+1F1F3 U+1F1FF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NZ.svg",
  },
  {
    name: "Oman",
    code: "OM",
    emoji: "🇴🇲",
    unicode: "U+1F1F4 U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/OM.svg",
  },
  {
    name: "Panama",
    code: "PA",
    emoji: "🇵🇦",
    unicode: "U+1F1F5 U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PA.svg",
  },
  {
    name: "Pérou",
    code: "PE",
    emoji: "🇵🇪",
    unicode: "U+1F1F5 U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PE.svg",
  },
  {
    name: "Polynésie française",
    code: "PF",
    emoji: "🇵🇫",
    unicode: "U+1F1F5 U+1F1EB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PF.svg",
  },
  {
    name: "Papouasie-Nouvelle-Guinée",
    code: "PG",
    emoji: "🇵🇬",
    unicode: "U+1F1F5 U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PG.svg",
  },
  {
    name: "Philippines",
    code: "PH",
    emoji: "🇵🇭",
    unicode: "U+1F1F5 U+1F1ED",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PH.svg",
  },
  {
    name: "Pakistan",
    code: "PK",
    emoji: "🇵🇰",
    unicode: "U+1F1F5 U+1F1F0",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PK.svg",
  },
  {
    name: "Pologne",
    code: "PL",
    emoji: "🇵🇱",
    unicode: "U+1F1F5 U+1F1F1",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PL.svg",
  },
  {
    name: "Saint-Pierre-et-Miquelon",
    code: "PM",
    emoji: "🇵🇲",
    unicode: "U+1F1F5 U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PM.svg",
  },
  {
    name: "Pitcairn",
    code: "PN",
    emoji: "🇵🇳",
    unicode: "U+1F1F5 U+1F1F3",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PN.svg",
  },
  {
    name: "Porto Rico",
    code: "PR",
    emoji: "🇵🇷",
    unicode: "U+1F1F5 U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PR.svg",
  },
  {
    name: "Palestine",
    code: "PS",
    emoji: "🇵🇸",
    unicode: "U+1F1F5 U+1F1F8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PS.svg",
  },
  {
    name: "Portugal",
    code: "PT",
    emoji: "🇵🇹",
    unicode: "U+1F1F5 U+1F1F9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PT.svg",
  },
  {
    name: "Palaos",
    code: "PW",
    emoji: "🇵🇼",
    unicode: "U+1F1F5 U+1F1FC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PW.svg",
  },
  {
    name: "Paraguay",
    code: "PY",
    emoji: "🇵🇾",
    unicode: "U+1F1F5 U+1F1FE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PY.svg",
  },
  {
    name: "Qatar",
    code: "QA",
    emoji: "🇶🇦",
    unicode: "U+1F1F6 U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/QA.svg",
  },
  {
    name: "La Réunion",
    code: "RE",
    emoji: "🇷🇪",
    unicode: "U+1F1F7 U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RE.svg",
  },
  {
    name: "Roumanie",
    code: "RO",
    emoji: "🇷🇴",
    unicode: "U+1F1F7 U+1F1F4",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RO.svg",
  },
  {
    name: "Serbie",
    code: "RS",
    emoji: "🇷🇸",
    unicode: "U+1F1F7 U+1F1F8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RS.svg",
  },
  {
    name: "Fédération de Russie",
    code: "RU",
    emoji: "🇷🇺",
    unicode: "U+1F1F7 U+1F1FA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RU.svg",
  },
  {
    name: "Rwanda",
    code: "RW",
    emoji: "🇷🇼",
    unicode: "U+1F1F7 U+1F1FC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RW.svg",
  },
  {
    name: "Arabie Saoudite",
    code: "SA",
    emoji: "🇸🇦",
    unicode: "U+1F1F8 U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SA.svg",
  },
  {
    name: "Îles Salomon",
    code: "SB",
    emoji: "🇸🇧",
    unicode: "U+1F1F8 U+1F1E7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SB.svg",
  },
  {
    name: "Seychelles",
    code: "SC",
    emoji: "🇸🇨",
    unicode: "U+1F1F8 U+1F1E8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SC.svg",
  },
  {
    name: "Soudan",
    code: "SD",
    emoji: "🇸🇩",
    unicode: "U+1F1F8 U+1F1E9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SD.svg",
  },
  {
    name: "Suède",
    code: "SE",
    emoji: "🇸🇪",
    unicode: "U+1F1F8 U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SE.svg",
  },
  {
    name: "Singapour",
    code: "SG",
    emoji: "🇸🇬",
    unicode: "U+1F1F8 U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SG.svg",
  },
  {
    name: "Sainte-Hélène, Ascension et Tristan da Cunha",
    code: "SH",
    emoji: "🇸🇭",
    unicode: "U+1F1F8 U+1F1ED",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SH.svg",
  },
  {
    name: "Slovénie",
    code: "SI",
    emoji: "🇸🇮",
    unicode: "U+1F1F8 U+1F1EE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SI.svg",
  },
  {
    name: "Svalbard et Jan Mayen",
    code: "SJ",
    emoji: "🇸🇯",
    unicode: "U+1F1F8 U+1F1EF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SJ.svg",
  },
  {
    name: "Slovaquie",
    code: "SK",
    emoji: "🇸🇰",
    unicode: "U+1F1F8 U+1F1F0",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SK.svg",
  },
  {
    name: "Sierra Leone",
    code: "SL",
    emoji: "🇸🇱",
    unicode: "U+1F1F8 U+1F1F1",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SL.svg",
  },
  {
    name: "Saint-Marin",
    code: "SM",
    emoji: "🇸🇲",
    unicode: "U+1F1F8 U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SM.svg",
  },
  {
    name: "Sénégal",
    code: "SN",
    emoji: "🇸🇳",
    unicode: "U+1F1F8 U+1F1F3",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SN.svg",
  },
  {
    name: "Somalie",
    code: "SO",
    emoji: "🇸🇴",
    unicode: "U+1F1F8 U+1F1F4",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SO.svg",
  },
  {
    name: "Suriname",
    code: "SR",
    emoji: "🇸🇷",
    unicode: "U+1F1F8 U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SR.svg",
  },
  {
    name: "Soudan du Sud",
    code: "SS",
    emoji: "🇸🇸",
    unicode: "U+1F1F8 U+1F1F8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SS.svg",
  },
  {
    name: "Sao Tomé-et-Principe",
    code: "ST",
    emoji: "🇸🇹",
    unicode: "U+1F1F8 U+1F1F9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ST.svg",
  },
  {
    name: "Salvador",
    code: "SV",
    emoji: "🇸🇻",
    unicode: "U+1F1F8 U+1F1FB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SV.svg",
  },
  {
    name: "Saint-Martin (partie néerlandaise)",
    code: "SX",
    emoji: "🇸🇽",
    unicode: "U+1F1F8 U+1F1FD",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SX.svg",
  },
  {
    name: "Syrie",
    code: "SY",
    emoji: "🇸🇾",
    unicode: "U+1F1F8 U+1F1FE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SY.svg",
  },
  {
    name: "Eswatini",
    code: "SZ",
    emoji: "🇸🇿",
    unicode: "U+1F1F8 U+1F1FF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SZ.svg",
  },
  {
    name: "Îles Turques-et-Caïques",
    code: "TC",
    emoji: "🇹🇨",
    unicode: "U+1F1F9 U+1F1E8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TC.svg",
  },
  {
    name: "Tchad",
    code: "TD",
    emoji: "🇹🇩",
    unicode: "U+1F1F9 U+1F1E9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TD.svg",
  },
  {
    name: "Togo",
    code: "TG",
    emoji: "🇹🇬",
    unicode: "U+1F1F9 U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TG.svg",
  },
  {
    name: "Thaïlande",
    code: "TH",
    emoji: "🇹🇭",
    unicode: "U+1F1F9 U+1F1ED",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TH.svg",
  },
  {
    name: "Tadjikistan",
    code: "TJ",
    emoji: "🇹🇯",
    unicode: "U+1F1F9 U+1F1EF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TJ.svg",
  },
  {
    name: "Tokelau",
    code: "TK",
    emoji: "🇹🇰",
    unicode: "U+1F1F9 U+1F1F0",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TK.svg",
  },
  {
    name: "Timor-Leste",
    code: "TL",
    emoji: "🇹🇱",
    unicode: "U+1F1F9 U+1F1F1",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TL.svg",
  },
  {
    name: "Turkménistan",
    code: "TM",
    emoji: "🇹🇲",
    unicode: "U+1F1F9 U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TM.svg",
  },
  {
    name: "Tunisie",
    code: "TN",
    emoji: "🇹🇳",
    unicode: "U+1F1F9 U+1F1F3",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TN.svg",
  },
  {
    name: "Tonga",
    code: "TO",
    emoji: "🇹🇴",
    unicode: "U+1F1F9 U+1F1F4",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TO.svg",
  },
  {
    name: "Turquie",
    code: "TR",
    emoji: "🇹🇷",
    unicode: "U+1F1F9 U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TR.svg",
  },
  {
    name: "Trinité-et-Tobago",
    code: "TT",
    emoji: "🇹🇹",
    unicode: "U+1F1F9 U+1F1F9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TT.svg",
  },
  {
    name: "Tuvalu",
    code: "TV",
    emoji: "🇹🇻",
    unicode: "U+1F1F9 U+1F1FB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TV.svg",
  },
  {
    name: "Taïwan",
    code: "TW",
    emoji: "🇹🇼",
    unicode: "U+1F1F9 U+1F1FC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TW.svg",
  },
  {
    name: "Tanzanie",
    code: "TZ",
    emoji: "🇹🇿",
    unicode: "U+1F1F9 U+1F1FF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TZ.svg",
  },
  {
    name: "Ukraine",
    code: "UA",
    emoji: "🇺🇦",
    unicode: "U+1F1FA U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UA.svg",
  },
  {
    name: "Ouganda",
    code: "UG",
    emoji: "🇺🇬",
    unicode: "U+1F1FA U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UG.svg",
  },
  {
    name: "États-Unis",
    code: "US",
    emoji: "🇺🇸",
    unicode: "U+1F1FA U+1F1F8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/US.svg",
  },
  {
    name: "Uruguay",
    code: "UY",
    emoji: "🇺🇾",
    unicode: "U+1F1FA U+1F1FE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UY.svg",
  },
  {
    name: "Ouzbékistan",
    code: "UZ",
    emoji: "🇺🇿",
    unicode: "U+1F1FA U+1F1FF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UZ.svg",
  },
  {
    name: "Saint-Siège",
    code: "VA",
    emoji: "🇻🇦",
    unicode: "U+1F1FB U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VA.svg",
  },
  {
    name: "Saint-Vincent-et-les-Grenadines",
    code: "VC",
    emoji: "🇻🇨",
    unicode: "U+1F1FB U+1F1E8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VC.svg",
  },
  {
    name: "Venezuela",
    code: "VE",
    emoji: "🇻🇪",
    unicode: "U+1F1FB U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VE.svg",
  },
  {
    name: "Îles Vierges britanniques",
    code: "VG",
    emoji: "🇻🇬",
    unicode: "U+1F1FB U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VG.svg",
  },
  {
    name: "Îles Vierges américaines",
    code: "VI",
    emoji: "🇻🇮",
    unicode: "U+1F1FB U+1F1EE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VI.svg",
  },
  {
    name: "Viêt Nam",
    code: "VN",
    emoji: "🇻🇳",
    unicode: "U+1F1FB U+1F1F3",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VN.svg",
  },
  {
    name: "Vanuatu",
    code: "VU",
    emoji: "🇻🇺",
    unicode: "U+1F1FB U+1F1FA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VU.svg",
  },
  {
    name: "Wallis-et-Futuna",
    code: "WF",
    emoji: "🇼🇫",
    unicode: "U+1F1FC U+1F1EB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/WF.svg",
  },
  {
    name: "Samoa",
    code: "WS",
    emoji: "🇼🇸",
    unicode: "U+1F1FC U+1F1F8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/WS.svg",
  },
  {
    name: "Kosovo",
    code: "XK",
    emoji: "🇽🇰",
    unicode: "U+1F1FD U+1F1F0",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/XK.svg",
  },
  {
    name: "Yémen",
    code: "YE",
    emoji: "🇾🇪",
    unicode: "U+1F1FE U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/YE.svg",
  },
  {
    name: "Mayotte",
    code: "YT",
    emoji: "🇾🇹",
    unicode: "U+1F1FE U+1F1F9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/YT.svg",
  },
  {
    name: "Afrique du Sud",
    code: "ZA",
    emoji: "🇿🇦",
    unicode: "U+1F1FF U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZA.svg",
  },
  {
    name: "Zambie",
    code: "ZM",
    emoji: "🇿🇲",
    unicode: "U+1F1FF U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZM.svg",
  },
  {
    name: "Zimbabwe",
    code: "ZW",
    emoji: "🇿🇼",
    unicode: "U+1F1FF U+1F1FC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZW.svg",
  },
  {
    name: "Angleterre",
    code: "EN",
    emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    unicode: "U+1F3F4 U+E0067 U+E0062 U+E0065 U+E006E U+E0067 U+E007F",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ENGLAND.svg",
  },
  {
    name: "Scotland",
    code: "SCOTLAND",
    emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    unicode: "U+1F3F4 U+E0067 U+E0062 U+E0073 U+E0063 U+E0074 U+E007F",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SCOTLAND.svg",
  },
  {
    name: "Kosovo",
    code: "XK",
    emoji: "🇽🇰",
    unicode: "U+1F1FD U+1F1F0",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/XK.svg",
  },
  {
    name: "Yemen",
    code: "YE",
    emoji: "🇾🇪",
    unicode: "U+1F1FE U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/YE.svg",
  },
  {
    name: "Mayotte",
    code: "YT",
    emoji: "🇾🇹",
    unicode: "U+1F1FE U+1F1F9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/YT.svg",
  },
  {
    name: "South Africa",
    code: "ZA",
    emoji: "🇿🇦",
    unicode: "U+1F1FF U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZA.svg",
  },
  {
    name: "Zambia",
    code: "ZM",
    emoji: "🇿🇲",
    unicode: "U+1F1FF U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZM.svg",
  },
  {
    name: "Zimbabwe",
    code: "ZW",
    emoji: "🇿🇼",
    unicode: "U+1F1FF U+1F1FC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZW.svg",
  },
  {
    name: "England",
    code: "EN",
    emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    unicode: "U+1F3F4 U+E0067 U+E0062 U+E0065 U+E006E U+E0067 U+E007F",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ENGLAND.svg",
  },
  {
    name: "Scotland",
    code: "SCOTLAND",
    emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    unicode: "U+1F3F4 U+E0067 U+E0062 U+E0073 U+E0063 U+E0074 U+E007F",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SCOTLAND.svg",
  },
  {
    name: "Kosovo",
    code: "XK",
    emoji: "🇽🇰",
    unicode: "U+1F1FD U+1F1F0",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/XK.svg",
  },
  {
    name: "Yemen",
    code: "YE",
    emoji: "🇾🇪",
    unicode: "U+1F1FE U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/YE.svg",
  },
  {
    name: "Mayotte",
    code: "YT",
    emoji: "🇾🇹",
    unicode: "U+1F1FE U+1F1F9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/YT.svg",
  },
  {
    name: "South Africa",
    code: "ZA",
    emoji: "🇿🇦",
    unicode: "U+1F1FF U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZA.svg",
  },
  {
    name: "Zambia",
    code: "ZM",
    emoji: "🇿🇲",
    unicode: "U+1F1FF U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZM.svg",
  },
  {
    name: "Zimbabwe",
    code: "ZW",
    emoji: "🇿🇼",
    unicode: "U+1F1FF U+1F1FC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZW.svg",
  },
  {
    name: "England",
    code: "EN",
    emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    unicode: "U+1F3F4 U+E0067 U+E0062 U+E0065 U+E006E U+E0067 U+E007F",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ENGLAND.svg",
  },
  {
    name: "Scotland",
    code: "SCOTLAND",
    emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    unicode: "U+1F3F4 U+E0067 U+E0062 U+E0073 U+E0063 U+E0074 U+E007F",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SCOTLAND.svg",
  },
];
