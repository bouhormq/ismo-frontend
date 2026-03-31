import { useEffect, useState } from "react";
import {
  Cell,
  LegendProps,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  NameCount,
  NameCountWithColor,
} from "$/api/dashboard/get-dashboard-data";
import Flexbox from "$/components/ui/Flexbox";

import {
  articlesPieChartColors,
  pieChartOptions,
} from "../constants.ts/constants";
import { SimpleDropdown } from "./SimpleDropdown";

type Props = {
  articles:
    | {
        categories: NameCount[];
        sections: NameCount[];
        industries: NameCount[];
      }
    | undefined;
};

export const ArticlesPieChart = ({ articles }: Props) => {
  const [data, setData] = useState<NameCountWithColor[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("industry");

  const assignColors = (
    items: NameCount[],
    colors: string[],
  ): NameCountWithColor[] => {
    return items.map((item, index) => ({
      ...item,
      value: item.count,
      percentage: (
        (item.count / items.reduce((a, b) => a + b.count, 0)) *
        100
      ).toFixed(2),
      color: colors[index % colors.length],
    }));
  };

  useEffect(() => {
    let selectedData: NameCount[] = [];
    switch (selectedOption) {
      case "industry":
        selectedData = articles?.industries || [];
        break;
      case "categories":
        selectedData = articles?.categories || [];
        break;
      case "sections":
        selectedData = articles?.sections || [];
        break;
    }
    setData(assignColors(selectedData, articlesPieChartColors));
  }, [articles, selectedOption]);

  const hasData = data.length > 0;

  return (
    <>
      <Flexbox row fullWidth justify="end">
        <SimpleDropdown
          options={pieChartOptions}
          defaultOption={pieChartOptions[0]}
          handleOnClick={(option) => {
            setSelectedOption(option.value as string);
          }}
        />
      </Flexbox>
      <div className="flex w-full flex-col md:flex-row md:items-start">
        {hasData ? (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart width={400} height={240}>
                <Pie
                  data={data}
                  innerRadius={50}
                  outerRadius={100}
                  paddingAngle={3}
                  cornerRadius={8}
                  dataKey="value"
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <CustomLegend data={data} />
          </>
        ) : (
          <Flexbox
            fullWidth
            justify="center"
            align="center"
            className="h-[300px] text-[#6C757D]"
          >
            <p>Aucune donnée disponible</p>{" "}
          </Flexbox>
        )}
      </div>
    </>
  );
};

interface CustomLegendProps extends LegendProps {
  data: NameCountWithColor[];
}

const CustomLegend = (props: CustomLegendProps) => {
  const { data } = props;

  return (
    <Flexbox fullWidth className="overflow-y-auto md:mt-20">
      {data.map((entry, index) => (
        <Flexbox row fullWidth justify="between" key={`legend-item-${index}`}>
          <Flexbox row align="center" className="mb-2">
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: entry.color,
                marginRight: "8px",
              }}
            />
            <span className="text-xs text-[#6C757D] md:text-sm">
              {entry.name}
            </span>
          </Flexbox>
          <p className="text-xs md:text-sm">
            {entry.percentage}% ({entry.value})
          </p>
        </Flexbox>
      ))}
    </Flexbox>
  );
};
