import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import { useMemo } from "react";

import { createAction } from "$/api/actions/create-action";
import getAction from "$/api/actions/get-action";
import { updateAction } from "$/api/actions/update-action";
import ResponsiveDialog from "$/components/DialogComponents/ResponsiveDialog";
import useNotifications from "$/hooks/contexts/useNotifications";
import {
  CreateCompanyActionParams,
  CreateCompanyActionResponse,
  DetailedActionResponse,
  UpdateCompanyActionParams,
  UpdateCompanyActionResponse,
} from "$/types/api/action.types";
import { QueryError } from "$/types/api/restApiClient.types";

import { ActionForm } from "./ActionForm/ActionForm";
import {
  NewCompanyActionDataType,
  newCompanyActionSchema,
} from "./ActionForm/validations";

type Props = {
  isOpen: boolean;
  mode: "create" | "edit" | "calendar-create" | "calendar-edit";
  actionId?: number;
  companyId?: number;
  handleSetOpen: (open: boolean) => void;
};

export const ActionFormModal = ({
  isOpen,
  mode,
  actionId,
  companyId,
  handleSetOpen,
}: Props) => {
  const queryClient = useQueryClient();

  const { invalidateNotifications } = useNotifications();

  const { data: action, isFetching } = useQuery({
    queryKey: ["action", actionId],
    queryFn: () => (actionId ? getAction(actionId) : undefined),
    enabled: !!actionId && isOpen,
  });

  const { mutateAsync: createActionMutation, isPending: isCreationPending } =
    useMutation<
      CreateCompanyActionResponse,
      QueryError,
      CreateCompanyActionParams
    >({
      mutationFn: createAction,
      onSuccess: async () => {
        handleSetOpen(false);

        if (mode === "create")
          await queryClient.invalidateQueries({
            queryKey: ["table-company-actions"],
          });

        if (mode === "calendar-create") {
          await queryClient.invalidateQueries({
            queryKey: ["calendar-actions"],
          });
          await queryClient.invalidateQueries({
            queryKey: ["action-types"],
          });
        }

        await queryClient.invalidateQueries({
          queryKey: ["all-action-options"],
        });

        invalidateNotifications();
      },
    });

  const { mutateAsync: updateActionMutation, isPending: isUpdatePending } =
    useMutation<
      UpdateCompanyActionResponse,
      QueryError,
      { id: number; data: UpdateCompanyActionParams }
    >({
      mutationFn: updateAction,
      onSuccess: async () => {
        handleSetOpen(false);

        if (mode === "edit")
          await queryClient.invalidateQueries({
            queryKey: ["table-company-actions"],
          });

        if (mode === "calendar-edit")
          await queryClient.invalidateQueries({
            queryKey: ["calendar-actions"],
          });

        await queryClient.invalidateQueries({
          queryKey: ["all-action-options"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["action", actionId],
        });

        invalidateNotifications();
      },
    });

  const defaultValues = useMemo(
    () =>
      mode === "create" || mode === "calendar-create"
        ? {
            isDone: false,
            companyId,
          }
        : action
          ? {
              ...action,
              actionTypeColor: action.actionType.color,
              actionType: action.actionType.id,
              companyId: action.companyId,
              addedBy: action.addedBy.id,
              contact: action.contact?.id,
            }
          : undefined,
    [mode, companyId, action],
  );

  const handleOnSubmit = async (data: NewCompanyActionDataType) => {
    const { companyId: inputCompanyId } = data;

    const inputData = {
      actionType:
        typeof data.actionType === "string"
          ? { name: data.actionType, color: data.actionTypeColor }
          : { id: data.actionType },
      contact: data.contact
        ? typeof data.contact === "string"
          ? { name: data.contact }
          : { id: data.contact }
        : undefined,
      addedBy: { id: data.addedBy },
      isDone: data.isDone,
      startDate: data.startDate + "T" + data.startDateTime + ":00.000Z",
      ...(data.endDate && {
        endDate:
          data.endDate + "T" + (data.endDateTime ?? "23:59") + ":00.000Z",
      }),
      ...(data.alarmDate && {
        alarmDate:
          data.alarmDate + "T" + (data.alarmDateTime ?? "23:59") + ":00.000Z",
      }),
      object: data.object,
      description: data.description,
    };

    if (mode === "create" && companyId) {
      await createActionMutation({ companyId, ...inputData });
      return;
    }

    if (mode === "calendar-create" && inputCompanyId) {
      await createActionMutation({ companyId: inputCompanyId, ...inputData });
      return;
    }

    if (!actionId) return;
    await updateActionMutation({ id: actionId, data: inputData });
  };

  const isDataPrefilled = !["calendar-create", "create"].includes(mode);
  return (
    <ResponsiveDialog
      open={isOpen}
      handleSetOpen={handleSetOpen}
      className="!min-w-[800px] !rounded-[34px] smallTabletScreen:!w-full smallTabletScreen:!min-w-[unset] smallTabletScreen:max-w-[100vw]"
      hasBottomSheet={true}
    >
      <ActionForm
        schema={newCompanyActionSchema}
        handleOnSubmit={handleOnSubmit}
        handleOnCancel={() => handleSetOpen(false)}
        defaultValues={
          defaultValues && {
            ...defaultValues,
            startDate: isDataPrefilled
              ? (defaultValues as DetailedActionResponse).startDate
              : new Date().toISOString().split("T")[0],
            endDate: isDataPrefilled
              ? (defaultValues as DetailedActionResponse).endDate
              : new Date().toISOString().split("T")[0],
            startDateTime: isDataPrefilled
              ? (
                  defaultValues as DetailedActionResponse & {
                    startDateTime: string;
                  }
                ).startDateTime
              : "10:00",
            endDateTime: isDataPrefilled
              ? (
                  defaultValues as DetailedActionResponse & {
                    endDateTime: string;
                  }
                ).endDateTime
              : "10:02",
          }
        }
        mode={mode}
        isLoading={isFetching || isCreationPending || isUpdatePending}
      />
    </ResponsiveDialog>
  );
};
