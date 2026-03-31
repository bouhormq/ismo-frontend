import * as zod from "zod";

export const sendWhatsAppSchema = zod.object({
  contactIds: zod
    .array(zod.number())
    .min(1, { message: "Veuillez sélectionner au moins un contact" }),
  articleIds: zod.array(zod.number()).optional(),
});

export type SendWhatsAppDataType = zod.infer<typeof sendWhatsAppSchema>;
