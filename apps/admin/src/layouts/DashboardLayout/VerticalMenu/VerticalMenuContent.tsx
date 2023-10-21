import { SIDE_NAV_COLLAPSED_WIDTH, SIDE_NAV_WIDTH } from "@/utils";
import useResponsive from "@/utils/hooks/useResponsive";
import classNames from "classnames";
import * as React from "react";
import MenuItems, { IMenuItem } from "../data/data-menu";
import { useDashboardStore } from "../store/dashboardStore";
import "../styles/_menu.css";
import VerticalMenuCollapsedItem from "./VerticalMenuCollapsedItem";
import VerticalMenuSingleItem from "./VerticalMenuSingleItem";
import { useConfigApp } from "@/store";
import { translate } from "@/i18n";

interface IVerticalMenuContentProps {}

const sideNavCollapseStyle = {
  width: SIDE_NAV_WIDTH,
  minWidth: SIDE_NAV_WIDTH,
};

const sideNavStyle = {
  width: SIDE_NAV_COLLAPSED_WIDTH,
  minWidth: SIDE_NAV_COLLAPSED_WIDTH,
};

const MenuItemMap: React.FunctionComponent<{ item: IMenuItem }> = ({ item }) =>
  !item.subNav ? <VerticalMenuSingleItem item={item} /> : <VerticalMenuCollapsedItem item={item} />;

const VerticalMenuContent: React.FC<IVerticalMenuContentProps> = (props) => {
  const { desktop, mobile } = useResponsive();
  const isCollapsed = useDashboardStore((state) => state.isCollapsed);
  const { colors } = useConfigApp();

  return (
    <div
      className="px-4 pb-4 mt-8 flex flex-col md:fixed md:pt-16"
      style={desktop ? (isCollapsed ? sideNavCollapseStyle : sideNavStyle) : {}}
    >
      <span
        className={classNames(
          "font-bold select-none mb-2 ml-2 overflow-hidden",
          desktop && colors.isThemed ? colors.textSubtitleSidebar : "text-gray-500",
          mobile && "text-gray-700"
        )}
      >
        {translate("sidebar.app")}
      </span>
      {MenuItems.map((menuItem, idx) => (
        <MenuItemMap item={menuItem} key={idx} />
      ))}
    </div>
  );
};

export default VerticalMenuContent;
