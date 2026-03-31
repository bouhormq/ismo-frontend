export type DocumentRecord = {
  id: number;
  name: string;
  url?: string;
  createdAt?: Date;
  description?: string | null;
  status?: string;
  file?: File;
};

export type DocumentRecordResponse = {
  data: DocumentRecord[];
  count: number;
};
