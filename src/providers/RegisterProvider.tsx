import { PropsWithChildren, createContext, useContext } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

export type RegisterContextType<TFieldValues extends FieldValues> = {
  register?: UseFormRegister<TFieldValues>;
};

export const RegisterContext = createContext<
  RegisterContextType<any> | undefined
>(undefined);

export default function RegisterContextProvider<
  TFieldValues extends FieldValues,
>({
  register,
  children,
}: PropsWithChildren<{
  register?: UseFormRegister<TFieldValues>;
}>) {
  return (
    <RegisterContext.Provider value={{ register }}>
      {children}
    </RegisterContext.Provider>
  );
}

export function useRegisterContext<TFieldValues extends FieldValues>() {
  const context = useContext(RegisterContext) as
    | RegisterContextType<TFieldValues>
    | undefined;
  if (context === undefined) {
    throw new Error(
      "useRegisterContext must be used within a RegisterContextProvider",
    );
  }
  return context;
}
