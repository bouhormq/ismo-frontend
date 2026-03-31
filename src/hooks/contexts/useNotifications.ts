import { useContext } from "react";

import NotificationsContext from "$/contexts/notifications/notifications.context";

export default function useNotifications() {
  return useContext(NotificationsContext);
}
