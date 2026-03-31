import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

import {
  generateArticlesPDF,
  generateCataloguePDF,
} from "$/api/articles/generate-pdf";
import Modal from "$/components/DialogComponents/Modal";
import Form from "$/components/form/Form";
import { useEnhancedTable } from "$/components/tables/enhanced-table/EnhancedTableProvider";
import {
  ArticleRecord,
  ArticleRecordResponse,
  ArticlesTableFilters,
} from "$/types/api/article.types";
import { ContactRecord } from "$/types/models/contact.types";
import { generatePDF } from "$/utils/functions/pdf.functions";

import { ArticleSendWhatsAppFormWrapper } from "./ArticleSendWhatsAppFormWrapper";
import {
  SendWhatsAppDataType,
  sendWhatsAppSchema,
} from "./whatsapp.validations";

type Props = {
  isOpen: boolean;
  onCancel: VoidFunction;
};

export const ArticleSendWhatsAppModal = ({ isOpen, onCancel }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const { getSelectedRows } = useEnhancedTable<
    ArticleRecordResponse,
    ArticleRecord,
    ArticlesTableFilters
  >();

  const selectedArticles = getSelectedRows();
  const preselectedArticleIds = selectedArticles.map((a) => a.id);

  const handleOnSubmit = async (data: SendWhatsAppDataType) => {
    const { contactIds, articleIds } = data;

    if (!contactIds || contactIds.length === 0) {
      toast.warning("Veuillez sélectionner au moins un contact");
      return;
    }

    // Resolve contacts from cache synchronously BEFORE any await,
    // so window.open is called while the user gesture is still active.
    const cachedQueries = queryClient.getQueriesData<{
      data: ContactRecord[];
      count: number;
    }>({
      queryKey: ["getCompanyContactsWhatsApp"],
    });

    const allContacts: ContactRecord[] = [];
    cachedQueries.forEach(([, queryData]) => {
      if (queryData?.data) {
        allContacts.push(...queryData.data);
      }
    });

    const selectedContacts = allContacts.filter(
      (c) => contactIds.includes(c.id) && c.hasWhatsapp && c.phoneNumber,
    );

    if (selectedContacts.length === 0) {
      toast.warning(
        "Aucun contact sélectionné n'a de numéro WhatsApp disponible",
      );
      return;
    }

    // Open WhatsApp windows immediately (synchronous — before any await)
    selectedContacts.forEach((contact) => {
      const phone = contact.phoneNumber.replace(/[^0-9+]/g, "");
      window.open(`https://wa.me/${phone}`, "_blank");
    });

    setIsLoading(true);

    try {
      // Generate and download article PDFs if articles are selected
      if (articleIds && articleIds.length > 0) {
        try {
          const isSingle = articleIds.length === 1;
          const blob = isSingle
            ? await generateArticlesPDF({ articleIds })
            : await generateCataloguePDF({ articleIds });
          const filename = isSingle ? "Article.pdf" : "Catalogue.pdf";
          generatePDF(blob, filename, false);
        } catch (error) {
          console.error("Error generating PDF:", error);
        }
      }

      onCancel();
    } catch (error) {
      console.error("Error sending WhatsApp:", error);
      toast.error("Erreur lors de l'envoi WhatsApp");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      className="w-full max-w-[700px] tabletScreen:w-[90%]"
    >
      <Form<SendWhatsAppDataType>
        resolverSchema={sendWhatsAppSchema}
        onSubmit={(data) => handleOnSubmit(data)}
        onSubmitError={(errors) => console.log(errors)}
        isLoading={isLoading}
        className="flex h-full w-full flex-col justify-between"
        options={{
          defaultValues: {
            articleIds: preselectedArticleIds,
          },
        }}
      >
        <ArticleSendWhatsAppFormWrapper
          handleClose={onCancel}
          preselectedArticleIds={preselectedArticleIds}
        />
      </Form>
    </Modal>
  );
};
