import {
  type DeepKeys,
  type DeepValue,
  type IdentifiedColumnDef,
  type OnChangeFn,
  type Row,
  type RowSelectionState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ReactNode } from "react";
import React, {
  type ComponentProps,
  Fragment,
  useEffect,
  useMemo,
  useRef,
} from "react";

import useOutsideClick from "$/hooks/useOutsideClick";
import { cn } from "$/utils/functions/misc.functions";

import ContextMenu from "./ContextMenu/ContextMenu";
import Pagination from "./Pagination";
import TableBodyContent from "./TableBodyContent";
import TableRowCheckbox from "./TableRowCheckbox";

type TableBaseProps<T> = {
  columns: TableColumn<T>[];
  errorComponent?: ReactNode;
  noDataComponent?: ReactNode;
  contextMenu?: JSX.Element;
  headerClassName?: string;
  className?: string;
  singleSelectable?: boolean;
  tableClassName?: string;
  rowClassName?: (row: Row<T>) => string;
  onContextMenu?: (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
  ) => void;
  onRowClick?: (
    row: Row<T>,
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
  ) => void;
};

export type TableDataProps<T> = {
  data: T[] | undefined;
  isPendingData: boolean;
  isErroredData: boolean;
  minWidth?: number;
};

type TableSelectableProps =
  | {
      selectable?: false;
      onRowSelectionChange?: never;
      selectedRows?: never;
    }
  | {
      selectable: true;
      selectedRows: { [key: number]: boolean };
      onRowSelectionChange: OnChangeFn<RowSelectionState>;
    };

type TablePaginationProps =
  | {
      paginatable: true;
      pagination: Omit<
        ComponentProps<typeof Pagination>,
        "isPendingData" | "isErroredData"
      >;
    }
  | {
      paginatable?: false;
      pagination?: never;
    };

type TableProps<T> = TableBaseProps<T> &
  TableDataProps<T> &
  TableSelectableProps &
  TablePaginationProps;

type SelectorWithValues<T> = {
  [K in DeepKeys<T>]: {
    selector: K;
  } & IdentifiedColumnDef<T, DeepValue<T, K>>;
}[DeepKeys<T>];

type BaseColumn = {
  title: string;
  size?: number;
};

export type TableColumn<T> = BaseColumn & SelectorWithValues<T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EMPTY_DATA_ARR: any[] = [];

export default function Table<T>({
  data,
  isPendingData = true,
  isErroredData,
  minWidth,
  selectable,
  columns,
  selectedRows,
  errorComponent,
  noDataComponent,
  singleSelectable,
  className,
  headerClassName,
  tableClassName,
  rowClassName,
  pagination,
  paginatable,
  contextMenu,
  onRowSelectionChange,
  onRowClick,
}: TableProps<T>) {
  const lastSelectedRowRef = useRef<{ index: number; checked: boolean }>({
    index: -1,
    checked: false,
  });
  const handleSetLastSelectedRow = (index: number, checked: boolean) => {
    lastSelectedRowRef.current = { index, checked };
  };

  const containerRef = useRef<HTMLDivElement | null>(null);
  const tableHeaderRef = useRef<HTMLTableRowElement | null>(null);
  const contextMenuRef = useRef<HTMLTableRowElement | null>(null);

  // since the data is an array passed from the props and usually coming from
  // react-query, it's best if we memoize it here to prevent unnecessary rerenders.
  // This becomes especially relevant when using the getIsAllRowsSelected() method
  // on the table (https://github.com/TanStack/table/issues/4614)
  const memoizedData = useMemo(() => {
    // the EMPTY_DATA_ARR also prevents unnecessary rerenders by keeping the
    // same array reference
    if (!data || data.length === 0) return EMPTY_DATA_ARR as T[];
    return data;
  }, [data]);

  const columnHelper = createColumnHelper<T>();
  const tableColumns = useMemo(() => {
    const mappedColumns = columns.map(
      ({ selector, cell, header, title, ...column }) => {
        return columnHelper.accessor(selector, {
          id: column.id || (selector as string),
          header: header ?? (() => title),
          cell: cell ?? ((info) => info.getValue()),
          ...column,
        });
      },
    );

    if (selectable) {
      const selectorColumn = columnHelper.accessor(() => {}, {
        id: "$_TABLE_SELECTOR_COLUMN_$", // no need for a real id
        enableResizing: false,
        maxSize: 60,
        header: ({ table }) => (
          <div className="flex items-center justify-center md:ml-4">
            <input
              className="size-4 accent-[#082559] hover:cursor-pointer"
              disabled={!memoizedData.length || isPendingData}
              type="checkbox"
              checked={table.getIsAllRowsSelected()}
              onChange={() => table.toggleAllRowsSelected()}
            />
          </div>
        ),
        cell: ({ row, table }) => {
          return (
            <TableRowCheckbox
              table={table}
              row={row}
              lastSelectedRow={lastSelectedRowRef.current}
              handleSetLastSelectedRow={handleSetLastSelectedRow}
            />
          );
        },
      });

      mappedColumns.unshift(selectorColumn as (typeof mappedColumns)[0]);
    }

    return mappedColumns;
  }, [isPendingData, columns, selectable, memoizedData, columnHelper]);

  const table = useReactTable<T>({
    data: memoizedData,
    columns: tableColumns,
    onRowSelectionChange,
    enableMultiRowSelection: !singleSelectable,
    defaultColumn: {
      size: 150,
      minSize: 50,
      maxSize: 500,
    },
    ...(selectable && {
      state: {
        rowSelection: selectedRows,
      },
    }),
    getCoreRowModel: getCoreRowModel(),
  });

  const handleCloseDropdown = () => {
    if (contextMenuRef.current) {
      containerRef.current?.style.setProperty("overflow", "auto");
      contextMenuRef.current.style.setProperty("opacity", "0");
      contextMenuRef.current.style.setProperty("z-index", "-1");
    }
  };

  const handleOnlySelectOneRow = (row: Row<T>) => {
    const isSelected = row.getIsSelected();

    if (!isSelected) {
      table.toggleAllRowsSelected(false);
    }
    row.toggleSelected(true);
  };
  // @ts-expect-error - TODO: @albertgeokgeuzian allow only one row to be selected
  const onRowSelectionChangeWrapper = (xyz?: OnChangeFn<RowSelectionState>) => {
    // TODO: @albertgeokgeuzian allow only one row to be selected
  };

  const handleOnContextMenu = async (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
  ) => {
    if (!contextMenuRef.current) return;
    e.preventDefault();
    const rowIndex = e.currentTarget.rowIndex / 2;
    const row = table.getRowModel().rows[rowIndex - 1];

    handleOnlySelectOneRow(row);

    const contextMenuWidth = contextMenuRef.current.offsetWidth;
    const contextMenuHeight = contextMenuRef.current.offsetHeight;

    containerRef.current?.style.setProperty("overflow", "hidden");

    const x = e.pageX + contextMenuWidth / 5;
    const y = e.pageY + contextMenuHeight / 2;
    contextMenuRef.current.style.setProperty("opacity", "100");
    contextMenuRef.current.style.setProperty("z-index", "");
    contextMenuRef.current.style.setProperty("top", `${y}px`);
    contextMenuRef.current.style.setProperty("left", `${x}px`);
    row.toggleSelected(true);
  };

  useOutsideClick(contextMenuRef, () => {
    handleCloseDropdown();
  });

  useEffect(() => {
    const container = containerRef.current;

    handleCloseDropdown();

    if (container) {
      // eslint-disable-next-line no-inner-declarations
      function handleScroll() {
        if (container) {
          const scrollPosition = container.scrollTop;
          if (scrollPosition > 20) {
            tableHeaderRef.current?.classList.add("shadow-md");
          } else {
            tableHeaderRef.current?.classList.remove("shadow-md");
          }
        }
      }

      container.addEventListener("scroll", handleScroll);

      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-between gap-6",
        className,
      )}
    >
      <ContextMenu handleCloseMenu={handleCloseDropdown} ref={contextMenuRef}>
        {contextMenu}
      </ContextMenu>
      <div className="relative w-full">
        <div
          ref={containerRef}
          className={cn(
            "border-normal relative z-50 h-[585px] w-full overflow-auto border-1 border-tableBorderColor bg-white shadow-tableShadow",
            tableClassName,
          )}
        >
          <table
            className={cn(
              "text-grey-500 w-full border-collapse border-spacing-0 border-transparent bg-white",
              !minWidth && "min-w-[1000px]",
            )}
            style={minWidth ? { minWidth: `${minWidth}px` } : undefined}
          >
            <thead className="z-50 bg-white">
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <Fragment key={headerGroup.id}>
                    <tr
                      className="sticky top-0 z-50 h-16 rounded-b-lg bg-white duration-200 ease-in"
                      ref={tableHeaderRef}
                      key={headerGroup.id}
                    >
                      {headerGroup.headers.map((header, index) => {
                        return (
                          <th
                            key={header.id}
                            colSpan={header.colSpan}
                            className={cn(
                              "rounded-none bg-[#F5F6FA] text-center text-sm font-bold text-[#495057] md:px-5 tabletScreen:text-custom-12",
                              headerClassName,
                              index !== 0 && "tabletScreen:pl-[unset]",
                            )}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {/* TODO: implement resizing kept this for reference
                          {header.column.getCanResize() && (
                            <button
                              {...{
                                onDoubleClick: () => header.column.resetSize(),
                                onMouseDown: header.getResizeHandler(),
                                onTouchStart: header.getResizeHandler(),
                                className: ` w-[2px] bg-grey  hover:bg-black cursor-col-resize  active:cursor-col-resize focus:cursor-col-resize   absolute right-1 top-1/2  -translate-y-1/2  h-1/2 resizer `,
                              }}
                            />
                          )} */}
                          </th>
                        );
                      })}
                      <th>{""}</th>
                    </tr>
                  </Fragment>
                );
              })}
            </thead>
            <tbody>
              <TableBodyContent<T>
                data={memoizedData}
                noDataComponent={noDataComponent}
                errorComponent={errorComponent}
                isErroredData={isErroredData}
                isPendingData={isPendingData}
                table={table}
                tableColumns={tableColumns.length}
                onRowClick={onRowClick}
                rowClassName={rowClassName}
                onContextMenu={handleOnContextMenu}
              />
            </tbody>
          </table>
        </div>
        {/* {showScrollButton && (
          <button
            type="button"
            className="blurry_btn absolute right-0 top-1/2 z-50 -translate-y-1/2"
            onClick={handleScrollRight}
          >
            <ChevronsRight />
          </button>
        )} */}
      </div>

      {paginatable && !isErroredData && (
        <Pagination {...pagination} isPendingData={isPendingData} />
      )}
    </div>
  );
}
