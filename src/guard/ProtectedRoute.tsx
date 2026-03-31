import { type PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "$/hooks/contexts/useAuth";
import { PATHS } from "$/routes/constants";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const [hasPushed, setHasPushed] = useState(false);
  const { user, isPending } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isPending || hasPushed) return;

    let route;

    if (!user) route = PATHS.LOGIN;

    if (route) {
      navigate(route);
      setHasPushed(true);
    }
  }, [isPending, user, hasPushed, navigate]);

  if (isPending) return <div>Loading...</div>;

  return <>{children}</>;
};

export default ProtectedRoute;
