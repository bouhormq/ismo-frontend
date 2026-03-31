import * as zod from "zod";

export const newArticleSchema = zod.object({
  title: zod
    .string()
    .min(3, "Le titre de l'article doit contenir au moins 3 caractères"),
  reference: zod.string().optional(),
  equipmentCondition: zod.string().optional(),
  industry: zod
    .string({
      message:
        "Vous devez sélectionner une option ou en créer une en saisissant sa valeur.",
    })
    .or(zod.number()),
  category: zod.string().nullable().optional().or(zod.number().optional()),
  section: zod.string().nullable().optional().or(zod.number().optional()),
  availability: zod.string().optional().nullable(),

  company: zod.number({
    message: "Vous devez sélectionner une société",
  }),

  purchasePriceWithoutTVA: zod
    .string()
    .optional()
    .refine(
      (val) => {
        return val === undefined || /^(\d+(\.\d+)?)?$/.test(val);
      },
      {
        message: "Les nombres négatifs ne sont pas autorisés",
      },
    ),
  HSCode: zod.string().optional(),
  marginRate: zod
    .string()
    .optional()
    .refine(
      (val) => {
        return val === undefined || /^(\d+(\.\d+)?)?$/.test(val);
      },
      {
        message: "Les nombres négatifs ne sont pas autorisés",
      },
    ),
  purchasePriceWithTVA: zod
    .string()
    .optional()
    .refine(
      (val) => {
        return val === undefined || /^(\d+(\.\d+)?)?$/.test(val);
      },
      {
        message: "Les nombres négatifs ne sont pas autorisés",
      },
    ),
  sellingPriceWithoutTVA: zod
    .string()
    .optional()
    .refine(
      (val) => {
        return val === undefined || /^(\d+(\.\d+)?)?$/.test(val);
      },
      {
        message: "Les nombres négatifs ne sont pas autorisés",
      },
    ),
  sellingPriceWithTVA: zod
    .string()
    .optional()
    .refine(
      (val) => {
        return val === undefined || /^(\d+(\.\d+)?)?$/.test(val);
      },
      {
        message: "Les nombres négatifs ne sont pas autorisés",
      },
    ),

  description: zod.string().optional(),
  catalogDescription: zod.string().optional(),
  photos: zod
    .array(
      zod.object({
        name: zod.string(),
        url: zod.string().optional(),
        description: zod.string().optional().nullable(),
      }),
    )
    .optional(),
});

export type NewArticleDataType = zod.infer<typeof newArticleSchema> & {
  _description?: string;
};

export type NewArticleType = {
  title: string;
  reference?: string;
  equipmentCondition?: string;
  industry: { id?: number; name?: string };
  category?: { id?: number; name?: string };
  section?: { id?: number; name?: string };
  availability?: string | null;

  company: number;

  purchasePriceWithoutTVA?: string;
  HSCode?: string;
  marginRate?: string;
  purchasePriceWithTVA?: string;
  sellingPriceWithoutTVA?: string;
  sellingPriceWithTVA?: string;

  description?: string;
  catalogDescription?: string;

  photos?: {
    name: string;
    url?: string;
    description?: string | null;
  }[];
};
