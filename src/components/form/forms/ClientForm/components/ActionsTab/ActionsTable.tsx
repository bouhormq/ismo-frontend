import { useMutation, useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";
import { SearchIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { deleteAction } from "$/api/actions/delete-action";
import { updateAction } from "$/api/actions/update-action";
import TextInput from "$/components/inputs/TextInput";
import {
  EnhancedTable,
  EnhancedTableSortableColumnHeader,
} from "$/components/tables/enhanced-table";
import { useEnhancedTable } from "$/components/tables/enhanced-table/EnhancedTableProvider";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import { TableColumn } from "$/components/ui/table/Table";
import PlusIcon from "$/icons/Filters/PlusIcon";
import {
  CompanyActionRecord,
  CompanyActionsResponse,
  CompanyActionsTableFilters,
  UpdateCompanyActionParams,
  UpdateCompanyActionResponse,
} from "$/types/api/action.types";
import { QueryError } from "$/types/api/restApiClient.types";
import { format } from "$/utils/functions/date.functions";

import { ActionFormModal } from "./ActionFormModal";
import { CompanyActionCompletionDropdown } from "./CompanyActionCompletionDropdown";
import { CompanyActionsTableActions } from "./CompanyActionsTableActions";
import DeleteActionModal from "./DeleteActionModal";

type Props = {
  companyId: number;
};

const ActionsTable = ({ companyId }: Props) => {
  const queryClient = useQueryClient();

  const { handleSetFilters } = useEnhancedTable<
    CompanyActionsResponse,
    CompanyActionRecord,
    CompanyActionsTableFilters
  >();

  const { mutateAsync, isPending } = useMutation({ mutationFn: deleteAction });

  const { mutateAsync: updateActionMutation } = useMutation<
    UpdateCompanyActionResponse,
    QueryError,
    { id: number; data: UpdateCompanyActionParams }
  >({
    mutationFn: updateAction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["table-company-actions"],
      });
    },
  });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    id?: number;
  }>({
    isOpen: false,
  });

  const [actionModal, setActionModal] = useState<{
    mode: "create" | "edit";
    isOpen: boolean;
    id?: number;
  }>({
    mode: "create",
    isOpen: false,
  });

  const handleFilter = debounce((value: string) => {
    handleSetFilters("search", value);
  }, 400);

  const handleOpenActionModal = (
    open: boolean,
    mode: "create" | "edit",
    id?: number,
  ) => {
    setActionModal((prev) => ({ ...prev, isOpen: open, mode, id }));
  };

  const handleOpenDeleteModal = (open: boolean, id?: number) => {
    setDeleteModal((prev) => ({ ...prev, isOpen: open, id }));
  };

  const handleChangeActionCompletion = useCallback(
    async (id: number, isDone: boolean) => {
      updateActionMutation({ id, data: { isDone } }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["table-company-actions"] });
      });
    },
    [queryClient, updateActionMutation],
  );

  const dashboardTableHeaders: TableColumn<
    CompanyActionRecord & { actions: string }
  >[] = useMemo(
    () => [
      {
        selector: "isDone",
        title: "Fait",

        cell: (cell) => {
          const { id, isDone } = cell.row.original;
          return (
            <CompanyActionCompletionDropdown
              isDone={isDone}
              handleChangeActionCompletion={() =>
                handleChangeActionCompletion(id, !isDone)
              }
            />
          );
        },
      },
      {
        selector: "createdAt",
        title: "Date",
        cell: (cell) => {
          return (
            <p className="text-center font-normal text-black">
              {format(new Date(cell.getValue()), "dd/MM/yyyy")}
            </p>
          );
        },
        header: () => (
          <EnhancedTableSortableColumnHeader
            selector="createdAt"
            title="Date"
            className="w-full justify-center"
          />
        ),
      },
      {
        selector: "addedBy",
        title: "Fait Par",
        cell: (cell) => {
          return (
            <p className="text-center font-normal text-black">
              {cell.getValue()}
            </p>
          );
        },
        header: () => (
          <EnhancedTableSortableColumnHeader
            selector="addedBy"
            title="Fait Par"
            className="w-full justify-center"
          />
        ),
      },
      {
        selector: "actionType",
        title: "Type d'action",
        cell: (cell) => {
          return (
            <p className="text-center font-normal text-black">
              {cell.getValue()}
            </p>
          );
        },
        header: () => (
          <EnhancedTableSortableColumnHeader
            selector="actionType"
            title="Type d'action"
            className="w-full justify-center"
          />
        ),
      },
      {
        selector: "object",
        title: "Objet",
        cell: (cell) => {
          return (
            <p className="text-center font-normal text-black">
              {cell.getValue()}
            </p>
          );
        },
        header: () => (
          <EnhancedTableSortableColumnHeader
            selector="object"
            title="Objet"
            className="w-full justify-center"
          />
        ),
      },
      {
        selector: "actions",
        title: "",
        cell: (cell) => {
          const { id } = cell.row.original;
          return (
            <CompanyActionsTableActions
              handleOpenActionModal={() =>
                handleOpenActionModal(true, "edit", id)
              }
              handleOpenDeleteModal={() => handleOpenDeleteModal(true, id)}
            />
          );
        },
      },
    ],
    [handleChangeActionCompletion],
  );

  const handleOnDelete = () => {
    if (!deleteModal.id) return;
    mutateAsync(deleteModal.id).then(() => {
      queryClient.invalidateQueries({ queryKey: ["table-company-actions"] });
      setDeleteModal({ isOpen: false });
    });
  };

  const isAddingDisabled = isNaN(companyId);
  return (
    <>
      <Flexbox
        row
        fullWidth
        justify="end"
        align="center"
        className="mb-4 mt-2 gap-2"
      >
        <TextInput
          onChange={(e) => handleFilter(e.target.value)}
          icon={<SearchIcon className="w-5" />}
          placeholder="Chercher"
          inputClassName=":focus:bg-transparent bg-transparent h-full text-xs placeholder-[#B4B4B4]"
          className="relative flex !h-full max-h-9 w-[250px] min-w-[150px] max-w-64 items-center gap-2 bg-gray-inputBg px-[14px] py-1.5 placeholder:text-black tabletScreen:ml-0 tabletScreen:min-h-10"
        />
        <Button
          type="button"
          className="w-fit gap-1 rounded-full bg-gray-inputBg px-3 py-2 text-sm font-medium"
          onClick={() => handleOpenActionModal(true, "create")}
          disabled={isAddingDisabled}
        >
          <PlusIcon className="h-4 w-4" />
          Ajouter
        </Button>
      </Flexbox>

      <EnhancedTable<CompanyActionRecord & { actions: string }>
        tableClassName="rounded-lg max-h-[300px]"
        paginatable
        columns={dashboardTableHeaders}
        onRowClick={(row) => {
          handleOpenActionModal(true, "edit", row.original.id);
        }}
      />

      <ActionFormModal
        isOpen={actionModal.isOpen}
        mode={actionModal.mode}
        actionId={actionModal.id}
        companyId={companyId}
        handleSetOpen={(open) => {
          if (open) setActionModal((prev) => ({ ...prev, isOpen: open }));
          else
            setActionModal((prev) => ({
              ...prev,
              isOpen: open,
              id: undefined,
            }));
        }}
      />

      <DeleteActionModal
        isOpen={deleteModal.isOpen}
        handleSetOpen={(open) =>
          setDeleteModal((prev) => ({ ...prev, isOpen: open }))
        }
        handleOnDelete={handleOnDelete}
        isLoading={isPending}
      />
    </>
  );
};

export default ActionsTable;
