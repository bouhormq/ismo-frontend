import * as zod from "zod";

import { isEmailValid } from "$/utils/constants/validations/common.constants";

export const newCompanySchema = zod.object({
  companyName: zod
    .string()
    .min(3, "Nom de l'entreprise doit contenir au moins 3 caractères"),
  phoneNumber: zod
    .string({
      message:
        "Le numéro de téléphone doit être valide et ne contenir que des chiffres (avec un '+' optionnel au début).",
    })
    .optional(),
  address: zod.string().optional(),
  email: zod
    .string()
    .refine((val) => (val === "" ? true : isEmailValid(val)), {
      message: "E-mail invalide",
    })
    .optional(),
  compl: zod.string().optional(),
  zipCode: zod.string().optional().nullable(),
  city: zod.string().optional().nullable(),
  website: zod.string().optional(),
  country: zod.string().optional().nullable(),
  siret: zod.string().optional().nullable(),
  vatNumber: zod.string().optional(),
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
  activityDescription: zod.string().optional(),
  companyPotential: zod.string({
    message: "Vous devez sélectionner une option.",
  }),
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
    .optional(),
  categories: zod
    .array(
      zod
        .string({
          message:
            "Vous devez sélectionner une option ou en créer une en saisissant sa valeur.",
        })
        .or(zod.number()),
    )
    .optional(),
  sections: zod
    .array(
      zod
        .string({
          message:
            "Vous devez sélectionner une option ou en créer une en saisissant sa valeur.",
        })
        .or(zod.number()),
    )
    .optional(),
  lastProspectionCall: zod.string().optional(),
});

export type NewCompanyDataType = zod.infer<typeof newCompanySchema>;

export type NewCompanyData = {
  companyName: string;
  phoneNumber?: string;
  address?: string;
  email?: string;
  compl?: string;
  zipCode?: string | null;
  city?: string | null;
  website?: string;
  country?: string | null;
  siret?: string | null;
  vatNumber?: string;
  companyType?: { id?: number; name?: string };
  code?: string;
  followedBy?: number | null;
  usedItems?: { id?: number; name?: string }[];
  desiredItems?: { id?: number; name?: string }[];
  activityDescription?: string;
  companyPotential: string;
  contactOrigin?: { id?: number; name?: string };
  industries?: { id?: number; name?: string }[];
  categories?: { id?: number; name?: string }[];
  sections?: { id?: number; name?: string }[];
  lastProspectionCall?: string;
};

