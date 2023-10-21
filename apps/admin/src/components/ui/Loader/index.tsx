import classNames from "classnames";
import * as React from "react";
import ReactDOM from "react-dom";
//@ts-ignore
import Spinner from "@/components/ui/Spinner";
import { useConfigApp } from "@/store";

interface ILoaderProps {
  loading?: boolean;
  className?: string;
}

const Loader: React.FunctionComponent<ILoaderProps> = (props) => {
  const { loading, className } = props;
  const { colors } = useConfigApp();
  if (!loading) return null;
  return (
    <div className={classNames(className || "fixed h-screen w-full bg-white z-50")}>
      <div className="flex items-center justify-center w-full h-full">
        <Spinner
          size={40}
          className={classNames(
            !colors.isThemed && "text-blue-600",
            colors.isThemed && colors.loaderColor
          )}
        />
      </div>
    </div>
  );
};

export default Loader;

export const PortalLoader: React.FunctionComponent = () =>
  ReactDOM.createPortal(<Loader loading={true} />, document.getElementById("portal-loader"));

export const showLoader = () => {
  document.getElementById("portal-loader").classList.remove("hidden");
};

export const hideLoader = () => {
  document.getElementById("portal-loader").classList.toggle("hidden");
};
