export type User = {
  id: number;
  createdAt?: string;
  updatedAt?: string;
  username: string;
  role: "ADMIN" | null;
  profileImageUrl?: string | null;
};
