import * as zod from "zod";

import { DocumentRecord } from "$/types/models/document.types";
import { isEmailValid } from "$/utils/constants/validations/common.constants";

export const editCompanySchema = zod.object({
  companyName: zod
    .string()
    .refine((val) => val === "" || val.length >= 3, {
      message: "Nom de l'entreprise doit contenir au moins 3 caractères",
    })
    .optional(),
  phoneNumber: zod
    .string({
      message:
        "Le numéro de téléphone doit être valide et ne contenir que des chiffres (avec un '+' optionnel au début).",
    })
    .optional()
    .nullable(),
  address: zod.string().optional().nullable(),
  email: zod
    .string()
    .refine((val) => (val === "" ? true : isEmailValid(val)), {
      message: "E-mail invalide",
    })
    .optional()
    .nullable(),
  compl: zod.string().optional().nullable(),
  zipCode: zod.string().optional().nullable(),
  city: zod.string().optional().nullable(),
  website: zod.string().optional().nullable(),
  country: zod.string().optional().nullable(),
  siret: zod.string().optional().nullable(),
  vatNumber: zod.string().optional().nullable(),

  companyType: zod
    .string({
      message: "Le type de fiche ne doit pas être vide",
    })
    .or(zod.number().optional().nullable())
    .optional()
    .nullable(),
  code: zod.string().optional(),
  followedBy: zod
    .number({
      message: "Le Suivi par ne doit pas être vide",
    })
    .optional()
    .nullable(),
  usedItems: zod.array(zod.string().or(zod.number())).optional(),
  desiredItems: zod.array(zod.string().or(zod.number())).optional(),
  activityDescription: zod.string().optional().nullable(),

  companyPotential: zod
    .string({
      message: "Vous devez sélectionner une option.",
    })
    .optional(),
  contactOrigin: zod
    .string({
      message: "Vous devez sélectionner une option.",
    })
    .or(zod.number().optional().nullable())
    .optional()
    .nullable(),
  industries: zod
    .array(
      zod
        .string({
          message:
            "Vous devez sélectionner une option ou en créer une en saisissant sa valeur.",
        })
        .or(zod.number()),
    )
    .optional()
    .nullable(),
  categories: zod
    .array(
      zod
        .string({
          message:
            "Vous devez sélectionner une option ou en créer une en saisissant sa valeur.",
        })
        .or(zod.number()),
    )
    .optional()
    .nullable(),
  sections: zod
    .array(
      zod
        .string({
          message:
            "Vous devez sélectionner une option ou en créer une en saisissant sa valeur.",
        })
        .or(zod.number()),
    )
    .optional()
    .nullable(),
  documents: zod
    .array(
      zod.object({
        id: zod.number(),
        name: zod.string(),
        url: zod.string().optional().nullable(),
        description: zod.string().optional().nullable(),
        createdAt: zod
          .preprocess(
            (value) => (typeof value === "string" ? new Date(value) : value),
            zod.date(),
          )
          .optional()
          .nullable(),
        status: zod.string().optional().nullable(),
        file: zod
          .custom<File>((val) => val instanceof File)
          .optional()
          .nullable(),
      }),
    )
    .optional()
    .nullable(),
  lastProspectionCall: zod.string().optional(),
  contacts: zod
    .array(
      zod.object({
        id: zod.number(),
        firstName: zod.string(),
        lastName: zod.string(),
        phoneNumber: zod.string(),
        email: zod.string(),
        functionality: zod.string().optional(),
        note: zod.string().optional(),
        status: zod.string().optional(),
        companyId: zod.number().optional(),
        gender: zod.custom<string>((val) => val === "MALE" || val === "FEMALE"),
        hasWhatsapp: zod.boolean(),
      }),
    )
    .optional(),

  memo: zod.string().optional().nullable(),
  _memo: zod.string().optional().nullable(),
});

export type EditCompanyDataType = zod.infer<typeof editCompanySchema>;

export type EditCompanyData = {
  companyName?: string;
  phoneNumber?: string;
  address?: string;
  email?: string;
  compl?: string;
  zipCode?: string;
  city?: string;
  website?: string;
  country?: string;
  siret?: string;
  vatNumber?: string;

  companyType?: string;
  code?: string;
  followedBy?: number;
  usedItems?: string[];
  desiredItems?: string[];
  activityDescription?: string;

  companyPotential?: string;
  contactOrigin?: string;
  industries?: string[];
  categories?: string[];
  sections?: string[];
  documents?: DocumentRecord[];
  // contacts?: ContactRecord[];
};

export const newDocumentSchema = zod.object({
  name: zod
    .string({
      message: "Le nom du document ne doit pas être vide",
    })
    .optional(),
  url: zod.custom<FileList>(
    (val) => val instanceof FileList && val.length > 0,
    {
      message: "Vous devez sélectionner un fichier",
    },
  ),
  description: zod.string().optional().nullable(),
});

export const updateDocumentSchema = zod.object({
  id: zod.number(),
  name: zod.string().min(1).optional(),
  description: zod.string().optional(),
  url: zod.string(),
  file: zod.custom<File>((val) => val instanceof File).optional(),
});

export type NewDocumentDataType = zod.infer<typeof newDocumentSchema>;

export type UpdateDocumentDataType = zod.infer<typeof updateDocumentSchema>;

export const newContactSchema = zod.object({
  firstName: zod.string().refine((val) => val.length >= 3, {
    message: "Prénom doit contenir au moins 3 caractères",
  }),
  lastName: zod.string().refine((val) => val.length >= 3, {
    message: "Nom doit contenir au moins 3 caractères",
  }),
  phoneNumber: zod.string({
    message:
      "Le numéro de téléphone doit être valide et ne contenir que des chiffres (avec un '+' optionnel au début).",
  }),
  email: zod.string().refine((val) => !val || val === "" || isEmailValid(val), {
    message: "E-mail invalide",
  }),
  functionality: zod.string().optional().nullable(),
  note: zod.string().optional().nullable(),
  // companyId: zod.number(),
  hasWhatsapp: zod.boolean(),
  // status: zod.string().optional(),
  gender: zod.custom<string>((val) => val === "MALE" || val === "FEMALE"),
});

export const updateContactSchema = zod.object({
  id: zod.number(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  phoneNumber: zod
    .string({
      message:
        "Le numéro de téléphone doit être valide et ne contenir que des chiffres (avec un '+' optionnel au début).",
    })
    .optional()
    .nullable(),
  email: zod
    .string()
    .refine((val) => (val === "" ? true : isEmailValid(val)), {
      message: "E-mail invalide",
    })
    .optional()
    .nullable(),
  functionality: zod.string().optional(),
  note: zod.string().optional(),
  hasWhatsapp: zod.boolean().optional(),
  gender: zod.custom<string>((val) => val === "MALE" || val === "FEMALE"),
});

export type NewContactDataType = zod.infer<typeof newContactSchema> & {
  companyId: number;
};

export type UpdateContactDataType = zod.infer<typeof updateContactSchema>;
