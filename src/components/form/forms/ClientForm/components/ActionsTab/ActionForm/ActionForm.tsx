import { DefaultValues } from "react-hook-form";
import { ZodType } from "zod";

import Form from "$/components/form/Form";

import { ActionFormWrapper } from "./ActionFormWrapper";
import { NewCompanyActionDataType } from "./validations";

type Props<T extends NewCompanyActionDataType> = {
  isLoading?: boolean;
  mode: "create" | "edit" | "calendar-create" | "calendar-edit";
  defaultValues?: DefaultValues<T>;
  schema: ZodType<any, any, any> | undefined;
  handleOnSubmit: (data: T) => Promise<void>;
  handleOnCancel: VoidFunction;
};

export const ActionForm = <T extends NewCompanyActionDataType>({
  schema,
  defaultValues,
  mode,
  isLoading,
  handleOnSubmit,
  handleOnCancel,
}: Props<T>) => {
  return (
    <Form<T>
      resolverSchema={schema}
      // @ts-ignore
      onSubmit={(data: T) => handleOnSubmit(data)}
      options={{ defaultValues }}
      isLoading={isLoading}
      className="flex h-full w-full flex-col justify-between"
    >
      <ActionFormWrapper
        mode={mode}
        isLoading={isLoading}
        handleOnCancel={handleOnCancel}
        defaultValues={defaultValues}
      />
    </Form>
  );
};
