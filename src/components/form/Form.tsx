import { zodResolver } from "@hookform/resolvers/zod";
import type { ComponentProps, PropsWithChildren } from "react";
import type {
  FieldValues,
  SubmitErrorHandler,
  UseFormHandleSubmit,
  UseFormProps,
} from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";

import { cn } from "../../utils/functions/misc.functions";

type Props<
  TFieldValues extends FieldValues,
  TTransformedValues extends FieldValues,
> = Omit<ComponentProps<"form">, "onSubmit"> & {
  className?: string;
  isLoading?: boolean;
  resolverSchema?: Parameters<typeof zodResolver>[0];
  options?: Omit<UseFormProps<TFieldValues>, "resolver">;
  onSubmit: Parameters<
    UseFormHandleSubmit<TFieldValues, TTransformedValues>
  >[0];
  onSubmitError?: SubmitErrorHandler<TFieldValues>;
};

export default function Form<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues extends FieldValues = TFieldValues,
>({
  className,
  resolverSchema,
  options,
  onSubmit,
  onSubmitError,
  children,
  isLoading,
  ...formProps
}: PropsWithChildren<Props<TFieldValues, TTransformedValues>>) {
  // @ts-ignore
  const methods = useForm<TFieldValues, TContext, TTransformedValues>({
    ...options,
    resolver: resolverSchema ? zodResolver(resolverSchema) : undefined,
  });

  const { handleSubmit } = methods;

  const customHandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      handleSubmit(onSubmit, onSubmitError)(e);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className={cn(className, isLoading && "pointer-events-none opacity-50")}
        onSubmit={customHandleSubmit}
        {...formProps}
      >
        {children}
      </form>
    </FormProvider>
  );
}
