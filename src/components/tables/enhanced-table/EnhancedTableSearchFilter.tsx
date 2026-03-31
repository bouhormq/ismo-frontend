import { useEffect, useState } from "react";

import useMemoizedDebounce from "$/hooks/useMemoizedDebounce";

import { useEnhancedTable } from "./EnhancedTableProvider";

type Props = { placeHolder?: string };

export default function EnhancedTableSearchFilter<
  TFilters extends { search: string },
>({ placeHolder = "Chercher" }: Props) {
  const [searchText, setSearchText] = useState("");
  const { handleSetFilters } = useEnhancedTable<unknown, unknown, TFilters>();

  const debouncedSearchText = useMemoizedDebounce(searchText);

  useEffect(() => {
    handleSetFilters("search", debouncedSearchText);
  }, [debouncedSearchText, handleSetFilters]);

  return (
    <div className="text-grey-300 relative flex h-10 w-full md:w-96">
      {/* <SearchIcon className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2" /> */}
      <input
        type="search"
        placeholder={placeHolder}
        value={searchText}
        className="h-10 w-full rounded-xl bg-blue-light pl-8 pr-4 text-black outline-none"
        onChange={(e) => setSearchText(e.target.value)}
      />
      {searchText && (
        <button
          className="absolute right-[18px] top-1/2 h-full -translate-y-1/2 bg-blue-light"
          type="button"
          onClick={() => setSearchText("")}
        >
          {/* <XIcon width={12} height={12} className="fill-grey-500" /> */}X
        </button>
      )}
    </div>
  );
}
