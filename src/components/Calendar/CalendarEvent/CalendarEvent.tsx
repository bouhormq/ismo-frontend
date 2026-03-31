import { useEffect, useState } from "react";

import { ActionFormModal } from "$/components/form/forms/ClientForm/components/ActionsTab/ActionFormModal";
import { cn } from "$/utils/functions/misc.functions";

import { TCalendarEvent } from "../context/CalendarProvider";

export type PositionObj = {
  canPlaceAbove: boolean;
  canPlaceBelow: boolean;
  canPlaceLeft: boolean;
  canPlaceRight: boolean;
};

function CalendarEvent({ event }: { event: TCalendarEvent }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClick = () => {
    setIsPopupOpen(true);
  };

  const handleSetOpen = (isOpen: boolean) => {
    setIsPopupOpen(isOpen);
  };

  useEffect(() => {
    const rbcEventContent = document.querySelector(".rbc-event-content");
    if (rbcEventContent) {
      rbcEventContent.setAttribute("style", "position: relative");
    }
  }, []);

  return (
    <>
      <div
        className={cn(
          "flex h-fit min-h-full items-center justify-center overflow-visible rounded-xl smallTabletScreen:overflow-hidden",
        )}
        style={{ backgroundColor: event.color }}
        onClick={handleClick}
      >
        <div className="flex h-full flex-row items-center justify-between smallTabletScreen:w-full smallTabletScreen:text-center">
          <div
            className={cn(
              "flex h-full w-full items-center justify-center p-2 text-white",
            )}
          >
            <span className="whitespace-break-spaces smallTabletScreen:w-full smallTabletScreen:truncate smallTabletScreen:text-sm mobileScreen:text-xs">
              {event.title}
            </span>
          </div>
        </div>
      </div>

      <ActionFormModal
        mode="calendar-edit"
        isOpen={isPopupOpen}
        handleSetOpen={handleSetOpen}
        actionId={event.id}
      />
    </>
  );
}

export default CalendarEvent;
