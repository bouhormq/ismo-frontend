import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type PropsWithChildren } from "react";

import getMe from "../api/auth/get-me";
import { logoutUser } from "../api/auth/logout";
import AuthContext from "../contexts/auth/auth.context";
import { User } from "../types/auth/user.types";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();

  const {
    data: user,
    isFetching,
    status,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const handleInvalidateUser = () => {
    queryClient.invalidateQueries({
      queryKey: ["user"],
    });
  };
  const { mutate: handleLogoutUser, isPending: pendingLogout } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueriesData(
        {
          queryKey: ["user"],
        },
        null,
      );
      queryClient.invalidateQueries({
        queryKey: ["user-logout"],
      });
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-logout"],
      });
    },
  });

  const handleSetUser = (data: User) => {
    queryClient.setQueryData(["user"], data);
  };
  if (isFetching) return <div>Loading...</div>;

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        role: user?.role ?? null,
        isPending: isFetching,
        isPendingLogout: pendingLogout,
        status,
        setUserData: handleSetUser,
        clearUser: handleLogoutUser,
        invalidateUser: handleInvalidateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
