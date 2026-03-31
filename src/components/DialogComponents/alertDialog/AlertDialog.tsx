import { zodResolver } from "@hookform/resolvers/zod";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React, { PropsWithChildren } from "react";
import { FieldValues, useForm } from "react-hook-form";

import RegisterContextProvider from "../../../providers/RegisterProvider";
import { cn } from "../../../utils/functions/misc.functions";
import Form from "../../form/Form";
import Button from "../../ui/Button";

export type ConfirmationDialogProps<
  TFieldValues extends FieldValues = FieldValues,
> = {
  open: boolean;
  onConfirm: (e: TFieldValues) => void;
  icon?: React.ReactNode;
  onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isLoading?: boolean;
  title: string;
  titleClassName?: string;
  resolverSchema?: Parameters<typeof zodResolver>[0];
  mainClassName?: string;
  confirmBtnClassName?: string;
  iconWrapperClassName?: string;
  confirmText?: string;
  childrenClassName?: string;
  actionsWrapperClassName?: string;
  overlayClassName?: string;
};

export default function ConfirmationDialog<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues extends FieldValues = TFieldValues,
>({
  open,
  onConfirm,
  onCancel,
  isLoading,
  title,
  titleClassName,
  actionsWrapperClassName,
  mainClassName,
  iconWrapperClassName,
  confirmBtnClassName,
  icon,
  confirmText,
  childrenClassName,
  children,
  resolverSchema,
  overlayClassName,
}: PropsWithChildren<ConfirmationDialogProps<TFieldValues>>) {
  const { register } = useForm<TFieldValues>({
    resolver: resolverSchema ? zodResolver(resolverSchema) : undefined,
  });

  const onSubmit = (data: TFieldValues) => {
    onConfirm(data);
  };

  return (
    <AlertDialog.Root open={open} data-dialog="true">
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className={cn(
            "data-[state=open]:animate-overlayShow fixed inset-0 z-[200] bg-black/60",
            overlayClassName,
          )}
        />
        <AlertDialog.Content
          className={cn(
            "data-[state=open]:animate-contentShow fixed left-1/2 top-1/2 z-[201] max-h-[90dvh] w-[90vw] max-w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none 13inch:top-1/2",
            "flex flex-col items-center justify-center gap-10",
            mainClassName,
          )}
        >
          {icon && (
            <div
              className={cn(
                "mt-6 flex items-center justify-center rounded-full p-7",
                iconWrapperClassName,
              )}
            >
              {icon}
            </div>
          )}
          <AlertDialog.Title className="hidden"></AlertDialog.Title>
          <Form<TFieldValues, TContext, TTransformedValues>
            // @ts-expect-error - I don't know how to fix this
            onSubmit={onSubmit}
            className="w-full"
            // onSubmitError={(error) => {
            //   console.log(error);
            // }}
          >
            <AlertDialog.Description
              className={cn(
                "text-mauve12 m-0 mx-auto w-fit px-8 py-2 text-center text-sm font-bold",
                titleClassName,
              )}
            >
              {title}
            </AlertDialog.Description>
            {children && (
              <div
                className={cn(
                  "text-mauve12 secondary-body-caption m-0 mx-auto max-w-[90%]",
                  childrenClassName,
                )}
              >
                <RegisterContextProvider register={register}>
                  {children}
                </RegisterContextProvider>
              </div>
            )}
            <div
              className={cn(
                "flex h-fit w-full justify-between gap-9 border-t-1 border-gray-light p-2",
                actionsWrapperClassName,
              )}
            >
              <AlertDialog.Cancel asChild>
                <Button
                  variant="outlined"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCancel(e);
                  }}
                  className="secondary-body-caption inline-flex h-[40px] w-fit min-w-[86px] items-center justify-center rounded-xl border-[1px] bg-white px-4 text-black outline-none hover:shadow-[0_0_0_2px] focus:shadow-[0_0_0_2px]"
                >
                  Annuler
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <Button
                  variant="primary"
                  type="submit"
                  isLoading={isLoading}
                  disabled={isLoading}
                  onClick={(e) => e.stopPropagation()}
                  className={cn(
                    "secondary-body-caption inline-flex h-[40px] w-fit min-w-[86px] items-center justify-center rounded-xl border-[1px] bg-white px-4 text-black outline-none hover:shadow-[0_0_0_2px] focus:shadow-[0_0_0_2px]",
                    confirmBtnClassName,
                  )}
                >
                  {confirmText ?? "Supprimer"}
                </Button>
              </AlertDialog.Action>
            </div>
          </Form>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
