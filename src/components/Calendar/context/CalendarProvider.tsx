import { type PropsWithChildren, createContext, useState } from "react";

// import { OpeningHoursType } from "$/types/store/store.type";

export type TCalendarEvent = {
  id?: number;
  start: string | Date;
  end: string | Date;
  title?: React.ReactNode;
  color?: string;
  allDay?: boolean;
  resourceId?: number | string;
  interventionId?: number;
  event?: TCalendarEvent;
};

export type CalendarContextType = {
  events: TCalendarEvent[];
  setEvents?: React.Dispatch<React.SetStateAction<TCalendarEvent[]>>;
  interventionId?: number;
  storeOpeningHours?: any[];
  //   storeOpeningHours?: OpeningHoursType[];
  popupOrientation?: "top" | "bottom" | "left" | "right";
  setPopupOrientation?: (
    orientation: "top" | "bottom" | "left" | "right",
  ) => void;
  filters: { actionTypes: number[] };
  handleSetFilters: (filters: { actionTypes: number[] }) => void;
};

export const CalendarContext = createContext<CalendarContextType>({
  interventionId: -1,
  events: [],
  setEvents: () => {},
  filters: { actionTypes: [] },
  handleSetFilters: () => {},
});

export default function CalendarProvider({
  interventionId,
  storeOpeningHours,
  events,
  setEvents,
  filters,
  handleSetFilters,
  children,
}: PropsWithChildren<CalendarContextType>) {
  const [popupOrientationState, setPopupOrientationState] = useState<
    "top" | "bottom" | "left" | "right"
  >("top");

  const setPopupOrientation = (
    orientation: "top" | "bottom" | "left" | "right",
  ) => {
    setPopupOrientationState(orientation);
  };

  return (
    <CalendarContext.Provider
      value={{
        events,
        setEvents,
        interventionId,
        popupOrientation: popupOrientationState,
        setPopupOrientation,
        storeOpeningHours,
        filters,
        handleSetFilters,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
