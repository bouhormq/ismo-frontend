import { useFormContext } from "react-hook-form";

import FormStyledTextAreaInput from "$/components/common/FormStyledTextAreaInput";
import FormStyledTextinput from "$/components/common/FormStyledTextInput";
import FormCheckbox from "$/components/form/FormCheckbox";
import FormRadioInput from "$/components/form/FormRadioInput";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import CountryPhoneNumberInput from "$/components/ui/PhoneNumber/_components/SelectCountryComponent";
import WhatsAppIcon from "$/icons/Table/WhatsAppIcon";
import { ContactRecord } from "$/types/models/contact.types";

type Props = {
  localContact:
    | {
        hasWhatsapp: boolean;
        email: string;
        id: number;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        gender: string;
        note?: string | undefined;
        status?: string | undefined;
        functionality?: string | undefined;
        companyId?: number | undefined;
      }
    | undefined;

  contact: ContactRecord | undefined;
  handleClose: VoidFunction;

  isLoading: boolean;
};

export const ContactFormWrapper = ({
  localContact,
  contact,
  handleClose,
  isLoading,
}: Props) => {
  const { setValue } = useFormContext();

  return (
    <Flexbox
      fullWidth
      justify="center"
      align="center"
      className="gap-4 rounded-[34px] bg-white px-3 py-5 md:px-6"
    >
      <h1 className="text-center text-xl text-blue-primary md:text-[28px]">
        Contact
      </h1>
      <Flexbox
        row
        fullWidth
        align="center"
        className="rounded-full border-1 border-[#f6f6f6]"
      >
        <Flexbox
          justify="center"
          align="center"
          className="w-1/3 rounded-bl-[34px] rounded-tl-[34px] bg-blue-inputBg py-2"
        >
          <p className="text-center">Civilitié</p>
        </Flexbox>
        <Flexbox row align="center" className="w-2/3 gap-2.5">
          <FormRadioInput
            name="gender"
            options={[
              { value: "FEMALE", label: "Madame" },
              { value: "MALE", label: "Monsieur" },
            ]}
            defaultValue={contact?.gender}
            className="w-full justify-around"
          />
        </Flexbox>
      </Flexbox>
      <Flexbox fullWidth row className="flex-wrap gap-x-2 gap-y-8">
        <FormStyledTextinput
          name="firstName"
          labelWrapperClassName="flex-grow-[0.5] smallTabletScreen:flex-grow smallTabletScreen:!w-full !min-w-[unset]"
          label="Prénom"
          defaultValue={localContact?.firstName ?? contact?.firstName}
        />
        <FormStyledTextinput
          name="lastName"
          labelWrapperClassName="flex-grow-[0.5] smallTabletScreen:flex-grow smallTabletScreen:!w-full !min-w-[unset]"
          label="Nom"
          defaultValue={localContact?.lastName ?? contact?.lastName}
        />
      </Flexbox>

      <FormStyledTextinput
        name="functionality"
        labelWrapperClassName="!w-full !min-w-[unset]"
        label="Fonctionnalité"
        defaultValue={localContact?.functionality ?? contact?.functionality}
      />
      <Flexbox
        fullWidth
        align="center"
        justify="between"
        className="gap-5 md:flex-row"
      >
        <CountryPhoneNumberInput
          name="phoneNumber"
          label=""
          isFormElement
          wrapperClassName="!w-full !min-w-[unset]"
        />
        <Flexbox row className="w-fit !min-w-[unset] gap-2 md:justify-end">
          <FormCheckbox
            name="hasWhatsapp"
            onChange={(value) => {
              setValue("hasWhatsapp", value);
            }}
          />
          <WhatsAppIcon className="size-4" />
          <p className="text-xs font-medium">Whatsapp</p>
        </Flexbox>
      </Flexbox>
      <FormStyledTextinput
        name="email"
        labelWrapperClassName="w-full"
        label="Email"
        // defaultValue={localContact?.email ?? contact?.email}
      />
      <FormStyledTextAreaInput
        name="note"
        label="Note"
        defaultValue={localContact?.note ?? contact?.note}
        className="min-h-32 !w-full !rounded-[30px] border-none outline-none"
        labelWrapperClassName="flex-grow !min-w-[unset] !w-full"
      />

      <Flexbox row fullWidth justify="center" align="center" className="gap-4">
        <Button
          type="button"
          className="w-1/2 rounded-full border-[2px] border-blue-primary text-blue-primary md:w-1/5"
          onClick={handleClose}
          disabled={isLoading}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          className="w-1/2 border-[2px] border-blue-primary bg-blue-primary text-white md:w-1/5"
          isLoading={isLoading}
        >
          Ajouter
        </Button>
      </Flexbox>
    </Flexbox>
  );
};
