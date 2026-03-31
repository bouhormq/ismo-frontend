import * as zod from "zod";

export const loginSchema = zod.object({
  username: zod.string().min(1, "Identifiant ne peut pas être vide"),
  password: zod.string().min(1, "Mot de passe ne peut pas être vide"),
});

export type LoginDataType = zod.infer<typeof loginSchema>;

export type DataLogin = {
  email: string;
  password: string;
};
