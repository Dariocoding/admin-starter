import { translate } from "@/i18n";
import { useConfigApp } from "@/store";
import { removeUserRememberLocalStorage } from "@/utils/transformUserToUserRemember";
import { User } from "@teslo/interfaces";
import classNames from "classnames";
import * as React from "react";
import { RenderIf } from "react-rainbow-components";

interface IUAreNotThisUserRememberProps {
  userRemember: User;
  setUserRemember(user: User): void;
}

const UAreNotThisUserRemember: React.FunctionComponent<IUAreNotThisUserRememberProps> = (props) => {
  const { userRemember, setUserRemember } = props;
  const { colors } = useConfigApp();
  return (
    <RenderIf isTrue={userRemember}>
      <p
        className={classNames(
          "text-center text-xs transition font-semibold mt-3 cursor-pointer hover:underline",
          colors.isThemed && colors.isThemeDarkLogin
            ? "text-red-400 hover:text-red-300"
            : "text-red-500 hover:text-red-400"
        )}
        onClick={() => {
          setUserRemember(null);
          removeUserRememberLocalStorage();
        }}
      >
        {translate("login.imNotThisUser", {
          user: userRemember?.firstName + " " + userRemember?.lastName,
        })}
      </p>
    </RenderIf>
  );
};

export default UAreNotThisUserRemember;
