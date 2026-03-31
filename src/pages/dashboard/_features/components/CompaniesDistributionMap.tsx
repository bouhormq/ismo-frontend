import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import Flexbox from "$/components/ui/Flexbox";
import { mapCountryNames } from "$/utils/constants/countries.constants";

type Props = {
  countries: Record<string, number>;
};

export const targetCountryIds = [
  // Europe
  "150",
  "151",
  "643",
  "804",
  "616",
  "203",
  "348",
  "112",
  "100",
  "642",
  "703",
  "498",
  "154",
  "826",
  "752",
  "208",
  "246",
  "578",
  "372",
  "440",
  "428",
  "233",
  "352",
  "039",
  "380",
  "724",
  "300",
  "620",
  "191",
  "688",
  "705",
  "070",
  "008",
  "807",
  "499",
  "470",
  "155",
  "276",
  "250",
  "528",
  "056",
  "040",
  "756",
  "442",
  "438",
  "492",

  // Africa
  "002",
  "015",
  "818",
  "012",
  "504",
  "788",
  "434",
  "729",
  "728",
  "202",
  "566",
  "710",
  "404",
  "231",
  "288",
  "834",
  "800",
  "024",
  "508",
  "894",
  "716",
  "686",
  "384",
  "120",
  "450",
  "466",
  "854",
  "562",
  "148",
  "706",
  "646",
  "108",

  // Middle East
  "145",
  "682",
  "784",
  "376",
  "400",
  "422",
  "368",
  "364",
  "414",
  "634",
  "512",
  "887",
  "760",
  "275",
  "792",
  "048",
];

export const CompaniesDistributionMap = ({ countries }: Props) => {
  const [country, setCountry] = useState<string>();
  const [position, setPosition] = useState<{ x: number; y: number }>();

  const geoUrl =
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

  const DEFAULT_COLOR = "#CDD3DA";
  const HIGHLIGHT_COLOR = "#39C4AD";

  return (
    <Flexbox fullWidth fullHeight className="relative overflow-hidden">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{
          scale: 86,
          center: [25, 10],
        }}
        width={350}
        height={245}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) => {
            return (
              geographies
                // .filter((geo) => targetCountryIds.includes(geo.id))
                .map((geo) => {
                  const isHighlighted =
                    countries[mapCountryNames(geo.properties.name)];

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={(e) => {
                        setCountry(mapCountryNames(geo.properties.name));
                        const { offsetX, offsetY } = e.nativeEvent;
                        setPosition({
                          x: offsetX,
                          y: offsetY,
                        });
                      }}
                      onMouseLeave={() => {
                        setCountry(undefined);
                        setPosition(undefined);
                      }}
                      fill={isHighlighted ? HIGHLIGHT_COLOR : DEFAULT_COLOR}
                      stroke="#FFF"
                      strokeWidth={0.5}
                      style={{
                        hover: { outline: "none", stroke: HIGHLIGHT_COLOR },
                      }}
                    />
                  );
                })
            );
          }}
        </Geographies>
      </ComposableMap>
      {country && position && (
        <p
          className="absolute"
          style={{
            display: position && country ? "block" : "none",
            top: position.y + 15,
            left: position.x + 15,
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "5px",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
            zIndex: 100,
          }}
        >
          {country}{" "}
          {country && countries[country] && ` : ${countries[country]}`}
        </p>
      )}
    </Flexbox>
  );
};
