import * as zod from "zod";

export const emailValidator = zod
  .string()
  .min(1, "L'e-mail ne peut pas être vide")
  .toLowerCase()
  .email("E-mail invalide");

export const isEmailValid = (email: string): boolean => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};
