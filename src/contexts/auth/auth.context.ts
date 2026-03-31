import { createContext } from "react";

import { User } from "../../types/auth/user.types";

type AuthContextType = {
  user: User | null;
  role: "ADMIN" | null;
  isPending: boolean;
  isPendingLogout: boolean;
  status: "pending" | "error" | "success";
  invalidateUser: () => void;
  setUserData: (user: User) => void;
  clearUser: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  isPending: true,
  isPendingLogout: false,
  status: "pending",
  setUserData: () => {},
  invalidateUser: () => {},
  clearUser: () => {},
});

export default AuthContext;
