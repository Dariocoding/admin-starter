import * as React from "react";
import HeaderDashboard from "./HeaderDashboard";
import SidebarDashboard from "./SidebarDashboard";
import { useAuthStore, useConfigApp } from "@/store";
import RenderIf from "@/components/ui/RenderIf";
import classNames from "classnames";
import useResponsive from "@/utils/hooks/useResponsive";
import axios from "axios";
import { hideLoader, showLoader } from "@/components/ui/Loader";

interface IDashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<IDashboardLayoutProps> = (props) => {
  const {} = props;
  const { colors } = useConfigApp();
  const { desktop } = useResponsive();

  return (
    <div className="app-layout-classic flex flex-auto">
      <div className="flex flex-auto min-w-0">
        <RenderIf isTrue={!colors.isHeaderTop}>
          <SidebarDashboard />
        </RenderIf>
        <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
          <HeaderDashboard />
          <RenderIf isTrue={colors.isHeaderTop}>
            <SidebarDashboard />
          </RenderIf>

          <div
            className={classNames(
              "h-full flex flex-auto flex-col bg-gray-100",
              colors.isHeaderTop && desktop && "pt-[4.5rem]"
            )}
          >
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
