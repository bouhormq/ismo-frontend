import { Fragment } from "react/jsx-runtime";

import { cn } from "$/utils/functions/misc.functions";

type Props = {
  columns: number;
  rowCount?: number;
};

export default function TableSkeletonLoader({ columns, rowCount = 10 }: Props) {
  const componentArray = Array.from(
    { length: rowCount },
    (_, index) => index + 1,
  );

  return (
    <>
      {componentArray.map((number, index) => (
        <Fragment key={number}>
          {index === 0 && <tr className="h-4" />}
          <tr
            className={cn(
              "animate-pulse relative mx-4 h-16 w-full bg-gray-100",
            )}
          >
            <td
              colSpan={columns}
              className="first:rounded-l-lg last:rounded-r-lg"
            />
          </tr>
          <tr className="h-4" />
        </Fragment>
      ))}
    </>
  );
}
