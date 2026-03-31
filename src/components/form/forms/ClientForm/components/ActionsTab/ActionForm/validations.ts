import * as zod from "zod";

export const newCompanyActionSchema = zod.object({
  actionType: zod
    .string({ message: "Ce champ ne peut pas être vide" })
    .or(zod.number({ message: "Ce champ ne peut pas être vide" })),
  actionTypeColor: zod.string({ message: "Ce champ ne peut pas être vide" }),

  createdAt: zod.string().optional().nullable(),
  addedBy: zod.number({ message: "Ce champ ne peut pas être vide" }),
  isDone: zod.boolean(),
  startDate: zod.string(),
  startDateTime: zod.string(),
  endDate: zod.string().optional(),
  endDateTime: zod.string().optional(),
  alarmDate: zod.string().optional(),
  alarmDateTime: zod.string().optional(),
  object: zod
    .string({ message: "Ce champ ne peut pas être vide" })
    .min(1, { message: "Ce champ ne peut pas être vide" }),
  description: zod.string(),

  companyId: zod
    .number({ message: "Ce champ ne peut pas être vide" })
    .optional(),
  contact: zod
    .string({ message: "Ce champ ne peut pas être vide" })
    .or(
      zod
        .number({ message: "Ce champ ne peut pas être vide" })
        .optional()
        .nullable(),
    )
    .optional()
    .nullable(),
});

export type NewCompanyActionDataType = zod.infer<typeof newCompanyActionSchema>;
