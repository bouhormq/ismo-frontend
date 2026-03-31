import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import useOutsideClick from "$/hooks/useOutsideClick";
import NotificationIcon from "$/icons/Ui/NotificationIcon";
import { Action } from "$/types/models/action.types";
import { format } from "$/utils/functions/date.functions";
import { cn } from "$/utils/functions/misc.functions";

import { ActionFormModal } from "../form/forms/ClientForm/components/ActionsTab/ActionFormModal";
import Button from "../ui/Button";
import Flexbox from "../ui/Flexbox";

type Props = {
  className?: string;
};

export const Notifications = ({ className }: Props) => {
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

  const ref = useRef<HTMLDivElement>(null);

  const [showNotifications, setShowNotifications] = useState(false);
  const [actionModal, setActionModal] = useState<{
    isOpen: boolean;
    id?: number;
  }>({
    isOpen: false,
  });

  // const lastCreatedAt = useMemo(() => {
  //   if (notificationsStore?.notifications.length) {
  //     return notificationsStore.notifications
  //       .map((n) => new Date(n.createdAt))
  //       .sort()
  //       .reverse()[0];
  //   }

  //   return null;
  // }, [notificationsStore]);

  useOutsideClick(ref, () => {
    if (showNotifications) {
      setNofiticationsStore((prev) => {
        return {
          notifications: prev?.notifications ?? [],
          hasNewNotifications: false,
          lastReadTime:
            prev?.lastReadTime ?? new Date().toISOString().split("T")[0],
          seenNotifications: (prev?.notifications ?? []).map((n) => n.id),
        };
      });
    }

    setShowNotifications(false);
  });

  useEffect(() => {
    if (showNotifications) {
      setNofiticationsStore((prev) => {
        return {
          notifications: prev?.notifications ?? [],
          hasNewNotifications: false,
          lastReadTime:
            prev?.lastReadTime ?? new Date().toISOString().split("T")[0],
          seenNotifications: prev?.seenNotifications ?? [],
        };
      });
    }
  }, [setNofiticationsStore, showNotifications]);

  return (
    <>
      <Flexbox ref={ref} className={cn("relative", className)}>
        <Button
          className="relative h-12 w-12 rounded-full bg-white"
          onClick={() => {
            if (showNotifications) {
              setNofiticationsStore((prev) => {
                return {
                  notifications: prev?.notifications ?? [],
                  hasNewNotifications: false,
                  lastReadTime:
                    prev?.lastReadTime ??
                    new Date().toISOString().split("T")[0],
                  seenNotifications: (prev?.notifications ?? []).map(
                    (n) => n.id,
                  ),
                };
              });
            }

            setShowNotifications(!showNotifications);
          }}
        >
          <NotificationIcon className="shrink-0" />
          {notificationsStore?.hasNewNotifications && (
            <div className="absolute right-1 top-[4px] rounded-full bg-red-500 p-2 text-[10px] leading-[1px] text-white">
              {notificationsStore.notifications.length}
            </div>
          )}
        </Button>

        {showNotifications && (
          <Flexbox
            fullWidth
            className="absolute right-0 top-[125%] max-h-[400px] min-w-[500px] gap-2 overflow-auto rounded-[30px] bg-white px-4 py-5 mobileScreen:min-w-[90vw]"
            style={{
              boxShadow: "0px 0px 4px 0px #00000040",
            }}
          >
            <h3 className="pl-3 text-lg font-bold">Notifications</h3>

            {notificationsStore?.notifications.map((action) => {
              const isNew = !notificationsStore.seenNotifications.includes(
                action.id,
              );

              return (
                <Flexbox
                  fullWidth
                  key={action.id}
                  className={cn("cursor-pointer gap-2 py-4", {
                    "rounded-xl bg-[#F1F1F1]": isNew,
                  })}
                  onClick={() => {
                    setActionModal({
                      isOpen: true,
                      id: action.id,
                    });
                  }}
                >
                  <Flexbox className="gap-2 px-3">
                    <p className="text-sm font-bold text-[#0A2D6E]">
                      {action.object}
                    </p>
                    <p className="text-xs font-normal">{action.description}</p>
                    <p className="text-sm font-light text-[#BCBCBC]">
                      {format(new Date(action.createdAt), "dd/MM/yyyy")}
                    </p>
                  </Flexbox>

                  <span className="h-[1px] w-full bg-[#BCBCBC]" />
                </Flexbox>
              );
            })}
          </Flexbox>
        )}
      </Flexbox>

      <ActionFormModal
        mode="edit"
        isOpen={actionModal.isOpen}
        handleSetOpen={(open) => {
          setActionModal((prev) => ({ ...prev, isOpen: open }));
        }}
        actionId={actionModal.id}
      />
    </>
  );
};
