import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import getCompany from "$/api/companies/get-company";
import { updateCompany } from "$/api/companies/update-company";
import { uploadFile } from "$/api/media";
import ClientForm from "$/components/form/forms/ClientForm/ClientForm";
import { useClient } from "$/hooks/zustand/useClient";
import { useDocument } from "$/hooks/zustand/useDocument";
import PageHeaderLayout from "$/layouts/PageHeaderLayout";
import { PATHS } from "$/routes/constants";
import {
  EditCompanyParams,
  EditCompanyResponse,
} from "$/types/api/company.types";
import { QueryError } from "$/types/api/restApiClient.types";
import { DocumentRecord } from "$/types/models/document.types";

import HeaderRightComponent from "../../components/common/HeaderRightContent";
import {
  EditCompanyDataType,
  editCompanySchema,
} from "./_features/constants/validations.constants";

const ClientShowPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id ? Number(params.id) : NaN;

  if (isNaN(id)) navigate(PATHS.CLIENTS);

  const { data: documentData } = useDocument();
  const { data: clientData } = useClient();

  const [isUploading, setIsUploading] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  const { mutateAsync, isPending } = useMutation<
    EditCompanyResponse,
    QueryError,
    { id: number; data: EditCompanyParams }
  >({
    mutationFn: updateCompany,
  });

  const { data: company, isFetching } = useQuery({
    queryKey: ["company", id],
    queryFn: () => getCompany(id),
  });

  useEffect(() => {
    if (company?.updatedAt && !lastSavedAt) {
      setLastSavedAt(new Date(company.updatedAt));
    }
  }, [company?.updatedAt, lastSavedAt]);

  const handleAutoSaved = useCallback(() => {
    setLastSavedAt(new Date());
  }, []);

  const { id: _companyId, followedBy, city, ...rest } = company ?? {};

  const defaultValues: Partial<EditCompanyDataType> | undefined = useMemo(
    () =>
      company
        ? {
            ...rest,
            lastProspectionCall: company.lastProspectionCall
              ? new Date(company.lastProspectionCall)
                  .toISOString()
                  .split("T")[0]
              : undefined,
            companyType: company.companyType ? company.companyType.id : null,
            followedBy: followedBy?.id,
            usedItems: company.usedItems.map((item) => item.value),
            desiredItems: company.desiredItems.map((item) => item.value),
            contactOrigin: company.contactOrigin
              ? company.contactOrigin.id
              : null,
            city,
            industries: company.industries.map((industry) => industry.value),
            categories: company.categories.map((category) => category.value),
            sections: company.sections.map((section) => section.value),
          }
        : undefined,
    [company, followedBy?.id, rest, city],
  );

  const handleGoBack = () => {
    navigate(PATHS.CLIENTS);
  };

  const formatSelectData = (originalData: (number | string)[]) => {
    return originalData.map((item) => {
      if (typeof item === "number") return { id: item };

      return { name: item };
    });
  };

  const transformData = (data: EditCompanyDataType) => {
    const {
      _memo,
      usedItems,
      desiredItems,
      contactOrigin,
      companyType,
      industries,
      categories,
      sections,
      documents,
      contacts,
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

      industries: formatSelectData(industries ?? []),
      categories: formatSelectData(categories ?? []),
      sections: formatSelectData(sections ?? []),
      documents: documentData?.companyDocuments ?? [],
      contacts: clientData?.contacts ?? [],
    };
  };

  const saveCompany = useCallback(async (data: EditCompanyDataType) => {
    setIsUploading(true);
    const updateData = transformData(data);
    let documentsWithUrls: DocumentRecord[] = [];
    if (updateData.documents.length > 0) {
      documentsWithUrls = await Promise.all(
        updateData.documents.map(async (doc) => {
          if (doc.file) {
            const response = await uploadFile({
              file: doc.file as File,
              isPublic: false,
              path: "documents",
            });
            return {
              ...doc,
              url: response,
            };
          }
          return doc;
        }),
      );
      updateData.documents = documentsWithUrls;
    }

    await mutateAsync({ id, data: updateData });
    setLastSavedAt(new Date());
    queryClient.invalidateQueries({ queryKey: ["company"] });
    queryClient.invalidateQueries({ queryKey: ["all-company-filter-options"] });
    queryClient.invalidateQueries({ queryKey: ["all-companies"] });
    queryClient.invalidateQueries({ queryKey: ["company-documents"] });
    queryClient.invalidateQueries({ queryKey: ["table-company-documents"] });
    queryClient.invalidateQueries({ queryKey: ["company-contacts"] });
    setIsUploading(false);
  }, [id, mutateAsync, queryClient]);

  const handleOnSubmit = useCallback(async (data: EditCompanyDataType) => {
    await saveCompany(data);
    navigate(PATHS.CLIENTS);
  }, [saveCompany, navigate]);

  if (!company) return <></>;

  return (
    <PageHeaderLayout
      headerText={
        "Fiche Société" +
        (company.companyName ? ` - ${company.companyName}` : "")
      }
      handleGoBack={handleGoBack}
      headerRightContent={
        <HeaderRightComponent
          createdAt={company.createdAt}
          updatedAt={company.updatedAt}
          lastSavedAt={lastSavedAt}
        />
      }
    >
      <ClientForm<EditCompanyDataType>
        mode="edit"
        schema={editCompanySchema}
        defaultValues={defaultValues}
        handleOnSubmit={handleOnSubmit}
        onAutoSave={saveCompany}
        isFetching={isFetching || isPending || isUploading}
        onAutoSaved={handleAutoSaved}
      />
    </PageHeaderLayout>
  );
};

export default ClientShowPage;
