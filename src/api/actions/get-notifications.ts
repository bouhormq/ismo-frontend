import { Action } from "$/types/models/action.types";

import { restApiClient } from "../../utils/clients/restApiClient";

export default async function getNotifications() {
  if (import.meta.env.VITE_BASE_ENV === "DEV") return;
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;

  return restApiClient
    .url("/actions/notifications")
    .query({ date: now, tzOffset: timezoneOffset })
    .get<(Omit<Action, "alarmDate"> & { alarmDate: string })[]>();
}
