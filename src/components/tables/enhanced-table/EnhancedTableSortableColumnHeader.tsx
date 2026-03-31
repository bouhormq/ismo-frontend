import { useMemo } from "react";

import SortAscIcon from "$/components/icons/SortAscIcon";
import SortDescIcon from "$/components/icons/SortDescIcon";
import SortIcon from "$/components/icons/SortIcon";
import { cn } from "$/utils/functions/misc.functions";

import { useEnhancedTable } from "./EnhancedTableProvider";
import type { EnhancedTableSorting } from "./types";

type Props<TSelectedData> = {
  selector: keyof TSelectedData;
  title: string;
  className?: string;
};

export default function EnhancedTableSortableColumnHeader<TSelectedData>({
  selector,
  title,
  className,
}: Props<TSelectedData>) {
  const { sorting, handleSetSorting, clearSorting } = useEnhancedTable<
    unknown,
    TSelectedData
  >();

  const handleSort = () => {
    let { key, order } = sorting || {};

    if (key !== selector) {
      key = selector;
      order = "asc";
    } else {
      if (order === "desc") {
        clearSorting();
        return;
      }

      if (order === "asc") {
        order = "desc";
      } else {
        order = "asc";
      }
    }
    handleSetSorting({ key, order });
  };

  return (
    <button
      className={cn("flex items-center gap-2", className)}
      type="button"
      onClick={handleSort}
    >
      <SortingCarets sorting={sorting} selector={selector} />
      {title}
    </button>
  );
}

function SortingCarets<T>({
  selector,
  sorting,
}: {
  sorting: EnhancedTableSorting<T> | undefined;
  selector: keyof T;
}) {
  const { key, order } = sorting || {};

  const isSortedCell = useMemo(() => key === selector, [key, selector]);
  const isAsc = useMemo(
    () => isSortedCell && order === "asc",
    [isSortedCell, order],
  );
  const isDesc = useMemo(
    () => isSortedCell && order === "desc",
    [isSortedCell, order],
  );
  const isNone = useMemo(() => !isAsc && !isDesc, [isAsc, isDesc]);

  return (
    <span>
      {isAsc && <SortDescIcon width={6} />}
      {isDesc && <SortAscIcon width={6} />}
      {isNone && <SortIcon width={6} />}
    </span>
  );
}
