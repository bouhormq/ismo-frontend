import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import { getAllArticles } from "$/api/articles/get-all-articles";
import { getAllCompanies } from "$/api/companies/get-all-companies";
import { getAllCompanyContacts } from "$/api/contacts/get-all-contacts";
import ComboSelectComponent, {
  SelectOption,
} from "$/components/inputs/FormComboSelect/ComboSelectInput";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import { ContactRecord } from "$/types/models/contact.types";

import { SendWhatsAppDataType } from "./whatsapp.validations";

type Props = {
  handleClose: VoidFunction;
  preselectedArticleIds: number[];
};

export const ArticleSendWhatsAppFormWrapper = ({
  handleClose,
  preselectedArticleIds,
}: Props) => {
  const { setValue, watch } = useFormContext<SendWhatsAppDataType>();

  const [contactsOpen, setContactsOpen] = useState(false);
  const [contactSearch, setContactSearch] = useState("");
  const [articlesOpen, setArticlesOpen] = useState(
    preselectedArticleIds.length > 0,
  );
  const [articleQuery, setArticleQuery] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    null,
  );

  const selectedContactIds = watch("contactIds") ?? [];
  const selectedArticleIds = watch("articleIds") ?? [];

  // Fetch companies for dropdown
  const { data: companiesData } = useQuery({
    queryKey: ["getAllCompaniesForWhatsApp"],
    queryFn: () => getAllCompanies(undefined, { limit: 500, offset: 0 }),
  });

  // Fetch contacts for selected company
  const { data: contactsData } = useQuery({
    queryKey: ["getCompanyContactsWhatsApp", selectedCompanyId],
    queryFn: () =>
      getAllCompanyContacts(selectedCompanyId!, undefined, {
        limit: 100,
        offset: 0,
      }),
    enabled: !!selectedCompanyId,
  });

  const contacts: ContactRecord[] = contactsData?.data ?? [];

  const filteredContacts = useMemo(() => {
    if (!contactSearch.trim()) return contacts;
    const q = contactSearch.toLowerCase();
    return contacts.filter(
      (c) =>
        c.firstName?.toLowerCase().includes(q) ||
        c.lastName?.toLowerCase().includes(q) ||
        c.phoneNumber?.toLowerCase().includes(q),
    );
  }, [contacts, contactSearch]);

  const contactsWithPhone = useMemo(
    () => contacts.filter((c) => c.hasWhatsapp && c.phoneNumber),
    [contacts],
  );

  const allSelected =
    contactsWithPhone.length > 0 &&
    contactsWithPhone.every((c) => selectedContactIds.includes(c.id));

  const toggleContact = (id: number) => {
    const current = selectedContactIds;
    if (current.includes(id)) {
      setValue(
        "contactIds",
        current.filter((cid) => cid !== id),
      );
    } else {
      setValue("contactIds", [...current, id]);
    }
  };

  const toggleAll = () => {
    if (allSelected) {
      setValue("contactIds", []);
    } else {
      setValue(
        "contactIds",
        contactsWithPhone.map((c) => c.id),
      );
    }
  };

  // Fetch articles
  const { data: articles } = useQuery({
    queryKey: ["getArticles", articleQuery],
    queryFn: () =>
      getAllArticles(undefined, { limit: 50, offset: 0 }, {
        search: articleQuery,
      }),
  });

  const companyOptions: SelectOption<number>[] = (
    companiesData?.data ?? []
  ).map((company) => ({
    value: company.id,
    label: company.name,
  }));

  const articleOptions: SelectOption<number>[] = (articles?.data ?? []).map(
    (article) => ({
      value: article.id,
      label: `${article.title}${article.reference ? ` (${article.reference})` : ""}`,
    }),
  );

  return (
    <Flexbox
      align="center"
      justify="center"
      fullWidth
      className="relative w-full gap-5 rounded-[34px] bg-white py-2 text-center"
    >
      <h3 className="text-[28px] font-normal text-[#082559] mobileScreen:text-xl">
        Envoyer via whatsapp
      </h3>

      {/* Company selector */}
      <div className="w-full">
        <ComboSelectComponent<number>
          name="_companyId"
          label="Société"
          options={companyOptions}
          returnSingleValue
          withFilter
          placeHolder="Sélectionner une société"
          wrapperClassName="!w-full !min-w-[unset]"
          mainWrapperClassName="w-full"
          handleOnSelect={(selected) => {
            const option = Array.isArray(selected) ? selected[0] : selected;
            if (option) {
              setSelectedCompanyId(option.value);
              setValue("contactIds", []);
              setContactSearch("");
            }
          }}
        />
      </div>

      {/* CONTACT section - collapsible with checkbox list */}
      {selectedCompanyId && (
        <div className="w-full rounded-xl border border-gray-200">
          <button
            type="button"
            onClick={() => setContactsOpen(!contactsOpen)}
            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-[#082559]"
          >
            <span>
              CONTACTS
              {selectedContactIds.length > 0
                ? ` (${selectedContactIds.length})`
                : ""}
            </span>
            {contactsOpen ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>
          {contactsOpen && (
            <div className="border-t border-gray-200">
              {/* Search */}
              <div className="relative px-4 pt-3">
                <Search
                  size={16}
                  className="absolute left-7 top-1/2 -translate-y-1/4 text-gray-400"
                />
                <input
                  type="text"
                  value={contactSearch}
                  onChange={(e) => setContactSearch(e.target.value)}
                  placeholder="Rechercher un contact..."
                  className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-blue-500"
                />
              </div>

              {/* Select all */}
              {contactsWithPhone.length > 0 && (
                <div className="border-b border-gray-100 px-4 py-2">
                  <label className="flex cursor-pointer items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <span className="font-medium text-[#082559]">
                      Tout sélectionner ({contactsWithPhone.length})
                    </span>
                  </label>
                </div>
              )}

              {/* Contact list */}
              <div className="max-h-[200px] overflow-y-auto px-4 py-2">
                {filteredContacts.length === 0 ? (
                  <p className="py-2 text-sm text-gray-400">
                    Aucun contact trouvé
                  </p>
                ) : (
                  <div className="flex flex-col gap-1">
                    {filteredContacts.map((contact) => (
                      <label
                        key={contact.id}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={selectedContactIds.includes(contact.id)}
                          onChange={() => toggleContact(contact.id)}
                          disabled={!contact.hasWhatsapp || !contact.phoneNumber}
                          className="h-4 w-4 shrink-0 rounded border-gray-300 text-blue-600"
                        />
                        <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                          <span className="truncate text-sm text-gray-800">
                            {contact.lastName} {contact.firstName}
                          </span>
                          {contact.hasWhatsapp && contact.phoneNumber ? (
                            <span className="shrink-0 truncate text-xs text-gray-400">
                              {contact.phoneNumber}
                            </span>
                          ) : (
                            <span className="shrink-0 text-xs text-red-400">
                              Pas de WhatsApp
                            </span>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* FICHES D'ARTICLES section - collapsible */}
      <div className="w-full rounded-xl border border-gray-200">
        <button
          type="button"
          onClick={() => setArticlesOpen(!articlesOpen)}
          className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-[#082559]"
        >
          <span>
            FICHES D&apos;ARTICLES
            {selectedArticleIds.length > 0
              ? ` (${selectedArticleIds.length})`
              : ""}
          </span>
          {articlesOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {articlesOpen && (
          <div className="border-t border-gray-200 px-4 py-3">
            <ComboSelectComponent<number>
              name="articleIds"
              label=""
              hideLabel
              options={articleOptions}
              multiple
              returnSingleValue
              withFilter
              onChange={(e) => setArticleQuery(e.target.value)}
              placeHolder="Sélectionner des articles"
            />
          </div>
        )}
      </div>

      {/* Action buttons */}
      <Flexbox row fullWidth justify="center" align="center" className="gap-4">
        <Button
          type="button"
          className="w-1/2 rounded-full border-[2px] border-blue-primary text-blue-primary md:w-1/5"
          onClick={handleClose}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          className="w-1/2 border-[2px] border-blue-primary bg-blue-primary text-white md:w-1/5"
        >
          Envoyer
        </Button>
      </Flexbox>
    </Flexbox>
  );
};
