import AuthLayout from "@/layouts/AuthLayout";
import * as React from "react";
import SignInForm from "./SignInForm";
import { useConfigApp } from "@/store";
import classNames from "classnames";
import { User } from "@teslo/interfaces";
import { RenderIf } from "react-rainbow-components";
import { translate } from "@/i18n";

interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const {} = props;
  const [userRember, setUserRember] = React.useState<User>(null);
  const { colors } = useConfigApp();
  return (
    <AuthLayout showLogo={!Boolean(userRember)}>
      <RenderIf isTrue={!userRember}>
        <div className="mb-3 mt-1">
          <h6
            className={classNames(
              "text-center",
              colors.isThemed && colors.isThemeDarkLogin && "text-gray-50"
            )}
          >
            {translate("login.welcomeBack")}
          </h6>
        </div>
      </RenderIf>
      <RenderIf isTrue={userRember}></RenderIf>
      <SignInForm userRemember={userRember} setUserRemember={setUserRember} />
    </AuthLayout>
  );
};

export default LoginPage;
