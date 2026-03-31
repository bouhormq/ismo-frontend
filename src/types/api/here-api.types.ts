export type HereApiAutocomplete = {
  title: "string";
  id: "string";
  language: "string";
  politicalView: "string";
  resultType: "addressBlock";
  houseNumberType: "MPA";
  estimatedPointAddress: true;
  localityType: "city";
  administrativeAreaType: "country";
  address: {
    label: "string";
    countryCode: "string";
    countryName: "string";
    stateCode: "string";
    state: "string";
    countyCode: "string";
    county: "string";
    city: "string";
    district: "string";
    subdistrict: "string";
    street: "string";
    streets: ["string"];
    block: "string";
    subblock: "string";
    postalCode: "string";
    houseNumber: "string";
    building: "string";
    unit: "string";
  };
  distance: 172039;
  highlights: {
    title: [
      {
        start: 0;
        end: 0;
      },
    ];
    address: {
      label: [
        {
          start: 0;
          end: 0;
        },
      ];
      country: [
        {
          start: 0;
          end: 0;
        },
      ];
      countryCode: [
        {
          start: 0;
          end: 0;
        },
      ];
      state: [
        {
          start: 0;
          end: 0;
        },
      ];
      stateCode: [
        {
          start: 0;
          end: 0;
        },
      ];
      county: [
        {
          start: 0;
          end: 0;
        },
      ];
      countyCode: [
        {
          start: 0;
          end: 0;
        },
      ];
      city: [
        {
          start: 0;
          end: 0;
        },
      ];
      district: [
        {
          start: 0;
          end: 0;
        },
      ];
      subdistrict: [
        {
          start: 0;
          end: 0;
        },
      ];
      block: [
        {
          start: 0;
          end: 0;
        },
      ];
      subblock: [
        {
          start: 0;
          end: 0;
        },
      ];
      street: [
        {
          start: 0;
          end: 0;
        },
      ];
      streets: [
        [
          {
            start: 0;
            end: 0;
          },
        ],
      ];
      postalCode: [
        {
          start: 0;
          end: 0;
        },
      ];
      houseNumber: [
        {
          start: 0;
          end: 0;
        },
      ];
      building: [
        {
          start: 0;
          end: 0;
        },
      ];
    };
  };
  streetInfo: [
    {
      baseName: "string";
      streetType: "string";
      streetTypePrecedes: true;
      streetTypeAttached: true;
      prefix: "string";
      suffix: "string";
      direction: "string";
      language: "string";
    },
  ];
};

export type HereApiAutocompleteResponse = {
  items: HereApiAutocomplete[];
};

interface Address {
  label: string;
  countryCode: string;
  countryName: string;
}

interface Position {
  lat: number;
  lng: number;
}

interface MapView {
  west: number;
  south: number;
  east: number;
  north: number;
}

interface Scoring {
  queryScore: number;
  fieldScore: FieldScore;
}

interface FieldScore {
  country: number;
}
export interface GeocodeItem {
  title: string;
  id: string;
  resultType: string;
  administrativeAreaType: string;
  address: Address;
  position: Position;
  mapView: MapView;
  scoring: Scoring;
}
