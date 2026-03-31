import * as zod from "zod";

export const EMAIL_TEMPLATES = [
  {
    value: "fr-presentation",
    label: "FR - Présentation matériel",
    defaultSubject: "Présentation du matériel",
    defaultMessage: "<p>Bonjour,</p><p>Veuillez trouver ci-joint la présentation du matériel.</p><p>Je reste à votre disposition pour toute question.</p><p>Meilleures salutations,</p>",
  },
  {
    value: "fr-materiel-occasion",
    label: "FR - Matériel d'occasion",
    defaultSubject: "Matériel d'occasion",
    defaultMessage: "<p>Bonjour,</p><p>Je souhaiterais savoir svp, si vous avez du matériel d'occasion à vendre en ce moment ou dans un avenir proche.</p><p>Merci pour votre retour,</p><p>Meilleures salutations,</p>",
  },
  {
    value: "fr-suite-conversation",
    label: "FR - Suite conversation téléphonique",
    defaultSubject: "Suite à notre conversation téléphonique",
    defaultMessage: "<p>Bonjour,</p><p>Suite à notre conversation téléphonique, veuillez trouver ci-joint la présentation du matériel.</p><p>Meilleures salutations,</p>",
  },
  {
    value: "es-presentacion",
    label: "ES - Presentación material",
    defaultSubject: "Presentación del material",
    defaultMessage: "<p>Buenos días,</p><p>Le adjunto la presentación del material.</p><p>Quedo a su disposición para cualquier consulta.</p><p>Saludos cordiales,</p>",
  },
  {
    value: "es-material-ocasion",
    label: "ES - Material de ocasión",
    defaultSubject: "Material de ocasión",
    defaultMessage: "<p>Buenos días,</p><p>Me gustaría saber, por favor, si disponen de material de ocasión para vender en este momento o en un futuro próximo.</p><p>Gracias por su respuesta,</p><p>Saludos cordiales,</p>",
  },
  {
    value: "es-conversacion",
    label: "ES - Conversación telefónica",
    defaultSubject: "En referencia a nuestra conversación telefónica",
    defaultMessage: "<p>Buenos días,</p><p>En referencia a nuestra conversación telefónica, le adjunto la presentación del material.</p><p>Saludos cordiales,</p>",
  },
  {
    value: "en-presentation",
    label: "EN - Equipment presentation",
    defaultSubject: "Equipment presentation",
    defaultMessage: "<p>Dear Sir/Madam,</p><p>Please find attached the equipment presentation.</p><p>I remain at your disposal for any questions.</p><p>Best regards,</p>",
  },
  {
    value: "en-used-equipment",
    label: "EN - Used equipment",
    defaultSubject: "Used equipment",
    defaultMessage: "<p>Dear Sir/Madam,</p><p>I would like to know, please, if you have any used equipment for sale at the moment or in the near future.</p><p>Thank you for your reply,</p><p>Best regards,</p>",
  },
  {
    value: "en-following-conversation",
    label: "EN - Following our phone conversation",
    defaultSubject: "Following our phone conversation",
    defaultMessage: "<p>Dear Sir/Madam,</p><p>Following our phone conversation, please find attached the equipment presentation.</p><p>Best regards,</p>",
  },
  {
    value: "aucun",
    label: "Aucun modèle",
    defaultSubject: "",
    defaultMessage: "",
  },
] as const;

export type EmailTemplateValue = (typeof EMAIL_TEMPLATES)[number]["value"];

export const sendEmailSchema = zod.object({
  template: zod.string().min(1, {
    message: "Veuillez sélectionner un modèle",
  }),
  object: zod
    .string({
      message: "Le champ objet ne doit pas être vide",
    })
    .min(1, {
      message: "Le champ objet ne doit pas être vide",
    }),
  message: zod
    .string({
      message: "Le champ message ne doit pas être vide",
    })
    .min(1, {
      message: "Le champ message ne doit pas être vide",
    }),
  contactIds: zod.array(zod.number()).optional(),
  articleIds: zod.array(zod.number()).optional(),
  sendCatalog: zod.boolean().optional(),
  documents: zod.instanceof(FileList).optional(),
  _companyId: zod.number().optional(),
});

export type SendEmailDataType = zod.infer<typeof sendEmailSchema>;

export const newDocumentSchema = zod.object({
  name: zod
    .string({
      message: "Le nom du document ne doit pas être vide",
    })
    .min(1, {
      message: "le nom du document ne peut pas être vide",
    }),
  url: zod.string().optional().nullable(),
  file: zod
    .custom<File>((val) => val instanceof File)
    .optional()
    .nullable(),
  description: zod.string().optional().nullable(),
});

export type NewDocumentDataType = zod.infer<typeof newDocumentSchema>;
