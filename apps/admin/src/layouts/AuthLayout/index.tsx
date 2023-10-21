import * as React from "react";
import styled from "styled-components";
import Logo from "../Logo";
import BackgroundAuth from "./backgroundAuth";
import classNames from "classnames";
import { useConfigApp } from "@/store";
import { RenderIf } from "react-rainbow-components";

interface IAuthLayoutProps {
  children?: React.ReactNode;
  showLogo?: boolean;
  showCard?: boolean;
}

const AuthLayout: React.FunctionComponent<IAuthLayoutProps> = (props) => {
  const { showLogo, showCard = true } = props;
  const { colors } = useConfigApp();
  return (
    <div className="min-h-screen">
      <Material className={classNames(colors.isThemed && colors.backgroundHome)}>
        <BackgroundAuth />
      </Material>
      <div className="flex flex-col flex-auto items-center justify-center min-w-0 min-h-screen">
        <RenderIf isTrue={showCard}>
          <div
            className={classNames(
              "max-w-[340px] backdrop-filter backdrop-blur-[9px] w-full rounded-md shadow-2xl px-4 py-8",
              colors.isThemeDarkLogin && "bg-opacity-5 bg-gray-400",
              !colors.isThemeDarkLogin && "bg-white bg-opacity-95"
            )}
          >
            <RenderIf isTrue={showLogo}>
              <div className="text-center">
                <Logo type="streamline" imgClass="mx-auto mb-1" />
              </div>
            </RenderIf>
            <div>{props.children}</div>
          </div>
        </RenderIf>
        <RenderIf isTrue={!showCard}>
          <div className="max-w-[600px] w-full">{props.children}</div>
        </RenderIf>
      </div>
    </div>
  );
};

export default AuthLayout;

const Material = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: -1;
`;
