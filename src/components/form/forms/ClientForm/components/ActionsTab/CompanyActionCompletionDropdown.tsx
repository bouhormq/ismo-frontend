import { ChevronDownIcon, ChevronUp } from "lucide-react";
import { useRef, useState } from "react";

import Flexbox from "$/components/ui/Flexbox";
import useOutsideClick from "$/hooks/useOutsideClick";
import DoneIcon from "$/icons/DoneIcon";
import NotDoneIcon from "$/icons/NotDoneIcon";
import { cn } from "$/utils/functions/misc.functions";

type Props = {
  isDone: boolean;
  handleChangeActionCompletion: () => Promise<void>;
};

export const CompanyActionCompletionDropdown = ({
  isDone,
  handleChangeActionCompletion,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleCompanyCompletionCLick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useOutsideClick(ref, () => {
    setIsOpen(false);
  });
  return (
    <Flexbox
      ref={ref}
      row
      align="center"
      justify="center"
      className="relative cursor-pointer gap-2"
      onClick={handleCompanyCompletionCLick}
    >
      {isDone ? <DoneIcon /> : <NotDoneIcon />}

      {isOpen && (
        <Flexbox
          onClick={(e) => {
            e.stopPropagation();
            handleChangeActionCompletion().then(() => {
              setIsOpen(false);
            });
          }}
          className="absolute right-2 top-[120%] z-[100] gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2"
        >
          {isDone ? (
            <NotDoneIcon
              onClick={(e) => {
                e.stopPropagation();
                handleChangeActionCompletion().then(() => {
                  setIsOpen(false);
                });
              }}
            />
          ) : (
            <DoneIcon
              onClick={(e) => {
                e.stopPropagation();
                handleChangeActionCompletion().then(() => {
                  setIsOpen(false);
                });
              }}
            />
          )}
        </Flexbox>
      )}

      {!isOpen ? (
        <ChevronDownIcon
          className={cn("text-muted-foreground h-5 w-5 transition-transform")}
        />
      ) : (
        <ChevronUp
          className={cn("text-muted-foreground h-5 w-5 transition-transform")}
        />
      )}
    </Flexbox>
  );
};
