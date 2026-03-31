import { PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "$/hooks/contexts/useAuth";
import { PATHS } from "$/routes/constants";

const AuthRoute = ({ children }: PropsWithChildren) => {
  const [hasPushed, setHasPushed] = useState(false);

  const { user, isPending } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isPending || hasPushed) return;
    const route = user ? PATHS.DASHBOARD : PATHS.LOGIN;
    if (route) {
      navigate(route);
      setHasPushed(true);
    }
  }, [isPending, user, hasPushed, navigate]);
  if (isPending || !!user) return <div>Loading...</div>;

  return children;
};

export default AuthRoute;
