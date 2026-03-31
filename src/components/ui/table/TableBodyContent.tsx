import { type Row, type Table, flexRender } from "@tanstack/react-table";
import { Fragment } from "react/jsx-runtime";

import { cn, valueOrNothing } from "$/utils/functions/misc.functions";

import TableSkeletonLoader from "../Loaders/TableSkeletonLoader";

type Props<T> = {
  data: T[];
  table: Table<T>;
  isPendingData: boolean;
  isErroredData: boolean;
  tableColumns: number;
  noDataComponent: React.ReactNode;
  errorComponent: React.ReactNode;
  rowClassName?: (row: Row<T>) => string;
  onRowClick?: (
    row: Row<T>,
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
  ) => void;
  onContextMenu: (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
};

export default function TableBodyContent<T>({
  table,
  errorComponent,
  noDataComponent,
  data,
  tableColumns,
  isPendingData,
  isErroredData,
  onRowClick,
  rowClassName,
  onContextMenu,
}: Props<T>) {
  if (isPendingData) {
    return <TableSkeletonLoader columns={tableColumns} />;
  }

  if (!data.length) {
    return (
      <tr className="h-32">
        <th colSpan={tableColumns}>
          {noDataComponent ? noDataComponent : "Pas de données"}
        </th>
      </tr>
    );
  }

  if (isErroredData) {
    return (
      <tr>
        <th colSpan={tableColumns}>
          {errorComponent
            ? errorComponent
            : "Erreur lors de la récupération de données"}
        </th>
      </tr>
    );
  }
  return table.getRowModel().rows.map((row, index) => {
    return (
      <Fragment key={row.id}>
        {index === 0 && !row.getIsSelected() && <tr className="h-[3px]" />}
        <tr
          onContextMenu={onContextMenu}
          className={cn(
            "relative mx-4 h-16 cursor-default",
            "after:bg-grey-100 after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full",
            "hover:bg-grey-50 duration-200",
            row.getIsSelected() && "bg-[#5D9EE91A]",
            valueOrNothing(!!onRowClick, "cursor-pointer"),
            rowClassName?.(row),
          )}
          onClick={(e) => {
            onRowClick?.(row, e);
          }}
        >
          {row.getVisibleCells().map((cell, index) => {
            return (
              <td
                key={cell.id}
                className={cn(
                  "text-sm font-semibold first:rounded-bl-lg first:rounded-tl-lg tabletScreen:px-3",
                  index !== 0 && "tabletScreen:pl-[unset]",
                  {
                    "first:rounded-bl-[unset] first:rounded-tl-[unset]":
                      row.getIsSelected(),
                  },
                )}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            );
          })}
        </tr>
        <tr className="border-normal mx-auto h-[1px] border-t-[1px]" />
      </Fragment>
    );
  });
}
