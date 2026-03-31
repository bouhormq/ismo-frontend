import { useQuery, useQueryClient } from "@tanstack/react-query";
import { type PropsWithChildren, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

import getNotifications from "$/api/actions/get-notifications";
import NotificationsContext from "$/contexts/notifications/notifications.context";
import { Action } from "$/types/models/action.types";

const NotificationsProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();

  const [notificationsStore, setNofiticationsStore] = useLocalStorage<
    | {
        notifications: Action[];
        hasNewNotifications: boolean;
        lastReadTime: string;
        seenNotifications: number[];
      }
    | undefined
  >("notifications", {
    notifications: [],
    hasNewNotifications: false,
    lastReadTime: new Date().toISOString().split("T")[0],
    seenNotifications: [],
  });

  const { data, isFetching, isRefetching } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    retry: false,
    refetchOnWindowFocus: true,
    refetchInterval: 20 * 1000,
    gcTime: 0,
  });

  const handleInvalidateNotifications = () => {
    queryClient.invalidateQueries({
      queryKey: ["notifications"],
    });
  };

  const handleSetNotifications = (data: Action[]) => {
    queryClient.setQueryData(["notifications"], data);
  };

  useEffect(() => {
    if (data && notificationsStore && !isRefetching) {
      const { lastReadTime, seenNotifications } = notificationsStore;

      const now = new Date();

      const todayDate = now.toISOString().split("T")[0];

      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      const timezoneOffset = now.getTimezoneOffset() / 60;

      const toBeDisplayed = data
        .filter((t) => {
          const startHour = new Date(t.alarmDate).getHours() + timezoneOffset;

          const startMinute = new Date(t.alarmDate).getMinutes();

          return startHour === currentHour && startMinute <= currentMinute;
        })
        .sort(
          (a, b) =>
            new Date(b.alarmDate).getTime() - new Date(a.alarmDate).getTime(),
        );

      const hasNewNotifications =
        todayDate === lastReadTime
          ? toBeDisplayed.length > 0 &&
            Boolean(
              toBeDisplayed.map(({ id }) => id).join(",") !==
                seenNotifications.join(","),
            )
          : toBeDisplayed.length > 0;

      setNofiticationsStore({
        notifications: toBeDisplayed,
        hasNewNotifications,
        lastReadTime:
          new Date(lastReadTime) < new Date(todayDate)
            ? todayDate
            : lastReadTime,
        seenNotifications: toBeDisplayed.length > 0 ? seenNotifications : [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isRefetching]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications: data ?? [],
        isPending: isFetching,
        setNotificationsData: handleSetNotifications,
        invalidateNotifications: handleInvalidateNotifications,
        clearNotifications: () => {
          queryClient.setQueryData(["notifications"], []);
        },
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsProvider;
