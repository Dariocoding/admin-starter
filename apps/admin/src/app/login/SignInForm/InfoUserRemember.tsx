import { useConfigApp } from "@/store";
import classNames from "classnames";
import * as React from "react";
import { RenderIf } from "react-rainbow-components";
import { BsFillShieldLockFill } from "react-icons/bs";
import { User } from "@teslo/interfaces";

interface IInfoUserRememberProps {
  userRemember: User;
}

const InfoUserRemember: React.FunctionComponent<IInfoUserRememberProps> = (props) => {
  const { userRemember } = props;
  const { colors } = useConfigApp();
  return (
    <RenderIf isTrue={userRemember}>
      <div className="form-group">
        <div className="flex items-center justify-center mb-1 mt-2">
          <BsFillShieldLockFill
            className={classNames(
              '"text-xl',
              colors.isThemed && colors.isThemeDarkLogin && "text-white"
            )}
          />
        </div>
        <h6
          className={classNames(
            "text-sm text-center",
            colors.isThemed && colors.isThemeDarkLogin && "text-gray-100"
          )}
        >
          {userRemember?.firstName + " " + userRemember?.lastName}
        </h6>
        <p
          className={classNames(
            colors.isThemeDarkLogin && colors.isThemed && "text-gray-100",
            "text-xs text-center mt-0"
          )}
        >
          {userRemember?.email}
        </p>
      </div>
    </RenderIf>
  );
};

export default InfoUserRemember;
