import { useConfigApp } from "@/store";
import * as React from "react";
import { useDashboardStore } from "../store/dashboardStore";
import {
  LOGO_X_GUTTER,
  SIDE_NAV_COLLAPSED_WIDTH,
  SIDE_NAV_CONTENT_GUTTER,
  SIDE_NAV_WIDTH,
  validPaths,
} from "@/utils";
import classNames from "classnames";
import Logo from "@/layouts/Logo";
import { Link } from "react-router-dom";
import VerticalMenuContent from "./VerticalMenuContent";

interface IVerticalMenuProps {}

const sideNavCollapseStyle = {
  width: SIDE_NAV_WIDTH,
  minWidth: SIDE_NAV_WIDTH,
};

const sideNavStyle = {
  width: SIDE_NAV_COLLAPSED_WIDTH,
  minWidth: SIDE_NAV_COLLAPSED_WIDTH,
};

const VerticalMenu: React.FunctionComponent<IVerticalMenuProps> = (props) => {
  const { isCollapsed } = useDashboardStore();
  const { colors } = useConfigApp();

  return (
    <div
      style={isCollapsed ? sideNavCollapseStyle : sideNavStyle}
      className={classNames(
        "side-nav side-nav-light print:hidden",
        colors.isThemed && colors.textColor,
        colors.isThemed && colors.sidebarContainer,
        !isCollapsed && "side-nav-expand"
      )}
    >
      <div
        className={classNames(
          "side-nav-header fixed py-[0.95rem]",
          colors.isThemed && colors.topLogoContainer
        )}
        style={isCollapsed ? sideNavCollapseStyle : sideNavStyle}
      >
        <Link to={validPaths.dashboard.path}>
          <Logo
            type={isCollapsed ? "full" : "streamline"}
            mode={colors.isThemed ? "dark" : "light"}
            gutter={!isCollapsed ? SIDE_NAV_CONTENT_GUTTER : LOGO_X_GUTTER}
          />
        </Link>
      </div>
      <VerticalMenuContent />
    </div>
  );
};

export default VerticalMenu;
