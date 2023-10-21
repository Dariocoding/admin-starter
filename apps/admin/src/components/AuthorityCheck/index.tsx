import { useAuthStore } from "@/store";
import { ValidRol } from "@teslo/interfaces";
import * as React from "react";
import RenderIf from "@/components/ui/RenderIf";
import { useNavigate } from "react-router-dom";

interface IAuthorityCheckProps {
  children?: React.ReactNode;
  validRoles: ValidRol[] | "*";
  redirectOnNotValidRol?: string;
}

const AuthorityCheck: React.FunctionComponent<IAuthorityCheckProps> = (props) => {
  const { validRoles, children, redirectOnNotValidRol } = props;
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const userRoles = user?.roles || [];
  const isTrue = userRoles.some((role) => validRoles?.includes(role)) || validRoles === "*";

  React.useEffect(() => {
    if (!isTrue && !loading && redirectOnNotValidRol) {
      navigate(redirectOnNotValidRol);
    }
  }, [isTrue, redirectOnNotValidRol, loading]);

  if (validRoles === "*") return <>{children}</>;

  return <RenderIf isTrue={isTrue}>{children}</RenderIf>;
};

export default AuthorityCheck;
