import {
  CSSProperties,
  ComponentProps,
  PropsWithChildren,
  ReactNode,
  forwardRef,
} from "react";

import { cn } from "$/utils/functions/misc.functions";

type Props = {
  cells: ReactNode[];
  headers: ReactNode[];
  sidebars: ReactNode[];
  containerProps?: ComponentProps<"div">;
  tableProps?: Omit<
    ComponentProps<"table">,
    "cellSpacing" | "cellPadding" | "children"
  >;
  maxWidth?: CSSProperties["maxWidth"];
  maxHeight?: CSSProperties["maxHeight"];
};

const DataGrid = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  ({ cells, headers, sidebars, containerProps, tableProps, children }, ref) => {
    return (
      <div
        {...containerProps}
        ref={ref}
        className={cn(
          "relative max-h-full max-w-full overflow-auto",
          containerProps?.className,
        )}
      >
        <table
          {...tableProps}
          cellSpacing={0}
          cellPadding={0}
          className={cn(
            "w-full border-separate border-spacing-0",
            tableProps?.className,
          )}
        >
          <thead className="bg-background sticky top-0 z-20">
            <tr className="bg-white">
              <th />
              {headers.map((header, index) => (
                <th className="font-normal" key={index}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sidebars.map((sidebar, sidebarIndex) => {
              return (
                <tr key={sidebarIndex}>
                  <td className="bg-background sticky left-0 z-10 w-10 whitespace-nowrap border-r-2 border-gray-light">
                    {sidebar}
                  </td>
                  {Array.from({ length: headers.length }, (_, headerIndex) => {
                    const cellIndex =
                      sidebarIndex * headers.length + headerIndex;
                    const cell = cells.at(cellIndex);

                    if (!cell) {
                      return <td key={headerIndex} />;
                    }

                    return (
                      <td
                        key={headerIndex}
                        className="border-l-1 border-r-1 border-gray-light"
                      >
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {children}
      </div>
    );
  },
);

DataGrid.displayName = "DataGrid";

export default DataGrid;
