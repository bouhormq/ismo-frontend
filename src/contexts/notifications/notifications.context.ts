import { createContext } from "react";

import { Action } from "$/types/models/action.types";

type NotificationsContextType = {
  notifications: Action[];
  isPending: boolean;
  invalidateNotifications: () => void;
  setNotificationsData: (actions: Action[]) => void;
  clearNotifications: () => void;
};

const NotificationsContext = createContext<NotificationsContextType>({
  notifications: [],
  isPending: true,
  setNotificationsData: () => {},
  invalidateNotifications: () => {},
  clearNotifications: () => {},
});

export default NotificationsContext;
