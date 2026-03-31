import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, X } from "lucide-react";
import { useState } from "react";

import { SelectOption } from "$/components/inputs/FormComboSelect/ComboSelectInput";
import Button from "$/components/ui/Button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  emptyMessage: string;
  items: SelectOption<string>[];
  deleteFn: (id: number) => Promise<unknown>;
};

const ManageFilterOptionsModal = ({
  isOpen,
  onClose,
  title,
  emptyMessage,
  items,
  deleteFn,
}: Props) => {
  const queryClient = useQueryClient();
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: deleteFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-filter-options"] });
      queryClient.invalidateQueries({ queryKey: ["all-companies"] });
      setConfirmDeleteId(null);
    },
  });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-[500px] max-w-[90vw] rounded-[20px] border border-neutral-500 bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3">
          <h3 className="text-xl font-semibold text-[#082559]">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <p className="py-4 text-center text-sm text-gray-500">
            {emptyMessage}
          </p>
        ) : (
          <div className="max-h-[400px] overflow-y-auto">
            {items.map((item) => {
              const itemId = Number(item.value);
              const isConfirming = confirmDeleteId === itemId;

              return (
                <div
                  key={item.value}
                  className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0"
                >
                  <span className="min-w-0 flex-1 truncate text-sm text-gray-800">
                    {item.label}
                  </span>

                  <div className="ml-4 flex shrink-0 items-center">
                    {isConfirming ? (
                      <div className="flex items-center gap-2">
                        <span className="whitespace-nowrap text-xs text-red-500">
                          Supprimer ?
                        </span>
                        <Button
                          variant="primary"
                          className="h-7 w-fit rounded-full bg-red-500 px-3 text-xs"
                          onClick={() => mutate(itemId)}
                          isLoading={isPending}
                        >
                          Oui
                        </Button>
                        <Button
                          variant="outlined"
                          className="h-7 w-fit rounded-full border-gray-300 px-3 text-xs text-gray-600"
                          onClick={() => setConfirmDeleteId(null)}
                          disabled={isPending}
                        >
                          Non
                        </Button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(itemId)}
                        className="rounded p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageFilterOptionsModal;
