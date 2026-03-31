import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";

import { EditCompanyDataType } from "$/pages/ClientPage/_features/constants/validations.constants";

type ClientFormState = {
  data: EditCompanyDataType | undefined;
  setData: Dispatch<SetStateAction<EditCompanyDataType | undefined>>;
};

export const useClient = create<ClientFormState>((set) => ({
  data: undefined,
  setData: (data) =>
    set((state) => ({
      data: {
        ...(state.data ?? {}),
        ...data,
      },
    })),
}));
