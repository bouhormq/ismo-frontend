import { FileText, FilePlus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

import { syncCompanyToZoho } from "$/api/companies/sync-zoho";
import Button from "$/components/ui/Button";

const ZOHO_ORG_ID = "20113082758";

type Props = {
  companyId: number;
  zohoContactId?: string;
  onZohoSynced?: (zohoContactId: string) => void;
};

const ZohoActionButtons = ({ companyId, zohoContactId: initialZohoId, onZohoSynced }: Props) => {
  const [zohoContactId, setZohoContactId] = useState(initialZohoId);
  const [isSyncing, setIsSyncing] = useState(false);

  const ensureZohoContact = async (): Promise<string | null> => {
    setIsSyncing(true);
    try {
      const result = await syncCompanyToZoho(companyId);
      if (result.zohoContactId) {
        setZohoContactId(result.zohoContactId);
        onZohoSynced?.(result.zohoContactId);
        return result.zohoContactId;
      } else {
        toast.error("Impossible de créer la société dans Zoho");
        return null;
      }
    } catch {
      toast.error("Erreur lors de la synchronisation Zoho");
      return null;
    } finally {
      setIsSyncing(false);
    }
  };

  const handleCreateInvoice = async () => {
    const contactId = await ensureZohoContact();
    if (!contactId) return;
    const url = `https://books.zoho.eu/app/${ZOHO_ORG_ID}#/invoices/new?customer_id=${contactId}`;
    window.open(url, "_blank");
  };

  const handleCreateEstimate = async () => {
    const contactId = await ensureZohoContact();
    if (!contactId) return;
    const url = `https://books.zoho.eu/app/${ZOHO_ORG_ID}#/quotes/new?customer_id=${contactId}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-shrink-0 justify-end gap-2 py-2">
      <Button
        variant="primary"
        className="w-fit rounded-full text-sm"
        onClick={handleCreateInvoice}
        disabled={isSyncing}
      >
        <FilePlus size={16} />
        {isSyncing ? "Synchronisation..." : "Créer une facture"}
      </Button>
      <Button
        variant="outlined"
        className="w-fit rounded-full border-[#0A2D6E] text-sm text-[#0A2D6E]"
        onClick={handleCreateEstimate}
        disabled={isSyncing}
      >
        <FileText size={16} />
        {isSyncing ? "Synchronisation..." : "Créer un devis"}
      </Button>
    </div>
  );
};

export default ZohoActionButtons;
