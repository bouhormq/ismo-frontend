import { useQuery } from "@tanstack/react-query";
import { DefaultValues } from "react-hook-form";
import { ZodType } from "zod";

import getAllCompanyFilterOptions from "$/api/companies/get-all-companies-filter-options";
import { EditCompanyDataType } from "$/pages/ClientPage/_features/constants/validations.constants";
import { NewCompanyDataType } from "$/pages/createClient/_features/constants/validations.constants";

import Form from "../../Form";
import ClientFormWrapper from "./components/ClientFormWrapper";

type Props<T extends NewCompanyDataType | EditCompanyDataType> = {
  mode?: "create" | "edit";
  isFetching?: boolean;
  defaultValues?: DefaultValues<T>;
  schema: ZodType<any, any, any> | undefined;
  handleOnSubmit: (data: T) => Promise<void>;
  onAutoSave?: (data: T) => Promise<void>;
  onAutoSaved?: () => void;
};

const ClientForm = <T extends NewCompanyDataType | EditCompanyDataType>({
  mode = "create",
  isFetching,
  schema,
  defaultValues,
  handleOnSubmit,
  onAutoSave,
  onAutoSaved,
}: Props<T>) => {
  const { data: companyFilterOptions, isLoading } = useQuery({
    queryKey: ["all-company-filter-options"],
    queryFn: getAllCompanyFilterOptions,
    gcTime: 0,
  });

  return (
    <Form<T>
      resolverSchema={schema}
      // @ts-ignore
      onSubmit={(data: T) => handleOnSubmit(data)}
      options={{ defaultValues }}
      isLoading={isFetching || isLoading}
      className="flex h-full w-full flex-col justify-between"
    >
      <ClientFormWrapper<T>
        defaultValues={defaultValues}
        companyFilterOptions={companyFilterOptions}
        mode={mode}
        isLoading={isFetching || isLoading}
        handleOnSubmit={handleOnSubmit}
        onAutoSave={onAutoSave}
        onAutoSaved={onAutoSaved}
      />
    </Form>
  );
};

export default ClientForm;
