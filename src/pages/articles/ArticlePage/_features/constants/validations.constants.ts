import * as zod from "zod";

export const editArticleSchema = zod.object({
  title: zod
    .string()
    .min(3, "Le titre de l'article doit contenir au moins 3 caractères")
    .optional(),
  reference: zod.string().optional().nullable(),
  equipmentCondition: zod.string().optional().nullable(),
  industry: zod
    .string({
      message: "Vous devez sélectionner une option.",
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
  HSCode: zod.string().optional().nullable(),
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

  description: zod.string().nullable().optional(),
  catalogDescription: zod.string().nullable().optional(),
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

export type EditArticleDataType = zod.infer<typeof editArticleSchema> & {
  _description?: string;
};
