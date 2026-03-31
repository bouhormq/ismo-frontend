import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createCompany } from "$/api/companies/create-company";
import ClientForm from "$/components/form/forms/ClientForm/ClientForm";
import PageHeaderLayout from "$/layouts/PageHeaderLayout";
import { PATHS } from "$/routes/constants";
import { CreateCompanyResponse } from "$/types/api/company.types";
import { QueryError } from "$/types/api/restApiClient.types";

import {
  NewCompanyData,
  NewCompanyDataType,
  newCompanySchema,
} from "./_features/constants/validations.constants";

const CreateClientMainPage = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [isUploading, setIsUploading] = useState(false);

  const handleGoBack = () => {
    navigate(PATHS.CLIENTS);
  };

  const { mutateAsync, isPending } = useMutation<
    CreateCompanyResponse,
    QueryError,
    NewCompanyData
  >({
    mutationFn: createCompany,
  });

  const formatSelectData = (originalData?: (number | string)[]) => {
    if (!originalData) return [];

    return originalData.map((item) => {
      if (typeof item === "number") return { id: item };

      return { name: item };
    });
  };

  const transformData = (data: NewCompanyDataType) => {
    const {
      usedItems,
      desiredItems,
      contactOrigin,
      industries,
      categories,
      sections,
      companyType,
      followedBy,
      ...rest
    } = data;

    return {
      ...rest,
      usedItems: formatSelectData(usedItems ?? []),
      desiredItems: formatSelectData(desiredItems ?? []),

      ...(followedBy && { followedBy }),

      ...(companyType && {
        companyType:
          typeof companyType === "string"
            ? { name: companyType }
            : { id: companyType },
      }),

      ...(contactOrigin && {
        contactOrigin:
          typeof contactOrigin === "string"
            ? { name: contactOrigin }
            : { id: contactOrigin },
      }),

      industries: formatSelectData(industries),
      categories: formatSelectData(categories),
      sections: formatSelectData(sections),
    };
  };

  const handleOnSubmit = async (data: NewCompanyDataType) => {
    setIsUploading(true);
    const transformedData = transformData(data);

    mutateAsync(transformedData)
      .then(async (res) => {
        const id = String(res.id);
        navigate(generatePath(PATHS.CLIENT_SHOW_PAGE, { id }));
        await queryClient.invalidateQueries({
          queryKey: ["all-company-filter-options"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["all-companies"],
        });
        setIsUploading(false);
      })
      .catch(() =>
        toast.error("Erreur lors de la création de la Fiche Société"),
      );
  };

  return (
    <PageHeaderLayout headerText="Fiche Société" handleGoBack={handleGoBack}>
      <ClientForm<NewCompanyDataType>
        schema={newCompanySchema}
        handleOnSubmit={handleOnSubmit}
        isFetching={isPending || isUploading}
        defaultValues={{
          lastProspectionCall: new Date().toISOString().split("T")[0],
        }}
      />
    </PageHeaderLayout>
  );
};

export default CreateClientMainPage;
