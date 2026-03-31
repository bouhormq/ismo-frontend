import { restApiClient } from "$/utils/clients/restApiClient";

export type CalendarActions = {
  id: number;
  title: string;
  actionType: string;
  actionTypeColor: string;
  startDate: string;
  endDate?: string;
}[];

export const getCalendarActions = (filters: { actionTypes: number[] }) => {
  return restApiClient
    .url("/actions/calendar-actions")
    .query({ actionTypes: filters.actionTypes.join(",") })
    .get<CalendarActions>();
};
