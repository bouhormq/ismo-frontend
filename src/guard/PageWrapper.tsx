import { type PropsWithChildren, useEffect } from "react";

import AuthRoute from "./AuthRoute";
import ProtectedRoute from "./ProtectedRoute";

type ProtectedPageProps =
  | {
      authenticated?: true;
      unAuthenticated?: false;
    }
  | {
      authenticated?: false;
      unAuthenticated?: true;
    };
type Props = {
  title?: string;
} & ProtectedPageProps;

const PageWrapper = ({
  title,
  authenticated,
  unAuthenticated,
  children,
}: PropsWithChildren<Props>) => {
  useEffect(() => {
    const previousTitle = window.document.title;

    return () => {
      window.document.title = previousTitle;
    };
  }, [title]);

  if (authenticated) return <ProtectedRoute>{children}</ProtectedRoute>;
  if (unAuthenticated) return <AuthRoute>{children}</AuthRoute>;

  return children;
};

export default PageWrapper;
