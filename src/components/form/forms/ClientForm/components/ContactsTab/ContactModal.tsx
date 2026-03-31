import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import "react-quill/dist/quill.snow.css";

import { createContact } from "$/api/contacts/create-contact";
import { getContact } from "$/api/contacts/get-contact";
import { updateContact } from "$/api/contacts/update-contact";
import Form from "$/components/form/Form";
import { useClient } from "$/hooks/zustand/useClient";
import { newContactSchema } from "$/pages/ClientPage/_features/constants/validations.constants";

import { ContactFormWrapper } from "./ContactFormWrapper";

type Props = {
  contactId: number | undefined;
  handleClose: () => void;
  companyId: number;
};

type FormValues = {
  gender: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  functionality: string;
  hasWhatsapp: boolean;
  note: string;
};

export const ContactModal = ({ contactId, companyId, handleClose }: Props) => {
  const queryClient = useQueryClient();

  const { data: clientData, setData } = useClient();

  const { data: contact, isLoading } = useQuery({
    queryKey: ["company-contact", contactId],
    queryFn: () => getContact(contactId as number),
    enabled: !!contactId && contactId > 0,
    gcTime: 0,
  });

  const { mutateAsync: createContactMutation, isPending: isPendingCreate } =
    useMutation({
      mutationFn: createContact,
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["table-company-contacts", companyId],
        });
      },
    });

  const { mutateAsync: updateContactMutation, isPending: isPendingUpdate } =
    useMutation({
      mutationFn: updateContact,
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["table-company-contacts", companyId],
        });
      },
    });

  const localContact = clientData?.contacts?.find(
    (contact) => contact.id === contactId,
  );

  const handleSubmit = async (data: FormValues) => {
    // const nextcontactId =
    //   (clientData?.contacts?.reduce((minId, contact) => {
    //     if (typeof contact.id === "number") {
    //       return contact.id < minId ? contact.id : minId;
    //     }
    //     return minId;
    //   }, 0) || 0) - 1;

    // const updatedContacts = [...(clientData?.contacts || [])];

    //update contact
    // if (contactId) {
    //   updatedContacts.forEach((contact) => {
    //     if (contact.id === contactId) {
    //       contact.firstName = data.firstName;
    //       contact.lastName = data.lastName;
    //       contact.email = data.email;
    //       contact.phoneNumber = data.phoneNumber;
    //       contact.functionality = data.functionality;
    //       contact.hasWhatsapp = data.hasWhatsapp;
    //       contact.note = data.note;
    //       contact.gender = data.gender;
    //       contact.status = "updated";
    //     }
    //   });
    // }

    // //add contact
    // if (!contactId) {
    //   updatedContacts.push({
    //     id: nextcontactId,
    //     firstName: data.firstName,
    //     lastName: data.lastName,
    //     email: data.email,
    //     phoneNumber: data.phoneNumber,
    //     functionality: data.functionality,
    //     hasWhatsapp: data.hasWhatsapp,
    //     note: data.note,
    //     gender: data.gender,
    //     status: "new",
    //   });
    // }

    // setData({ contacts: updatedContacts });

    const input = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      functionality: data.functionality,
      hasWhatsapp: data.hasWhatsapp,
      note: data.note,
      gender: data.gender,
    };

    if (contactId) {
      await updateContactMutation({ id: contactId, ...input });
    }

    if (!contactId) {
      await createContactMutation({ companyId, ...input });
    }

    handleClose();
  };

  useEffect(() => {
    setData({ contacts: clientData?.contacts });
  }, [contactId, setData, clientData?.contacts]);

  if (!contact && contactId && contactId > 0) return <></>;

  return (
    <Form<FormValues>
      resolverSchema={newContactSchema}
      onSubmit={handleSubmit}
      options={{
        defaultValues: localContact
          ? localContact
          : contact
            ? contact
            : { hasWhatsapp: false, gender: "MALE" },
      }}
      className="w-full"
      isLoading={isPendingCreate || isPendingUpdate || isLoading}
      id="upload-form"
    >
      <ContactFormWrapper
        contact={contact}
        localContact={localContact}
        handleClose={handleClose}
        isLoading={isPendingCreate || isPendingUpdate || isLoading}
      />
    </Form>
  );
};
