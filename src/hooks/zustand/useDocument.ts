import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";

import { FileData } from "$/components/DocumentUpload/FormDocumentPreview";
import { DocumentRecord } from "$/types/models/document.types";

type AllDocuments = {
  companyDocuments?: DocumentRecord[];
  articlePhotos?: DocumentRecord[];
  selectedPhotos?: FileData[];
};

type DocumentState = {
  data: AllDocuments | undefined;
  setData: Dispatch<SetStateAction<AllDocuments | undefined>>;
};

export const useDocument = create<DocumentState>((set) => ({
  data: undefined,
  setData: (data) =>
    set((state) => ({
      data: {
        ...(state.data ?? {}),
        ...data,
      },
    })),
}));
