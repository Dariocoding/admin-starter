import { useConfigApp } from "@/store";
import classNames from "classnames";
import * as React from "react";
import MenuItems, { IMenuItem } from "../data/data-menu";
import HorizontalMenuSingleItem from "./HorizontalMenuSingleItem";
import HorizontalMenuCollapsedItem from "./HorizontalMenuCollapsedItem";

interface IHorizontalMenuProps {}

const HorizontalMenu: React.FunctionComponent<IHorizontalMenuProps> = (props) => {
  const {} = props;
  const { colors } = useConfigApp();

  return (
    <div
      className={classNames(
        "p-4 z-10 border-t border-[2px_solid_rgba(0,0,0,0.05)] fixed w-full top-16 border-opacity-30 side-nav side-nav-light print:hidden",
        colors.isThemed && colors.textColor,
        colors.isThemed && colors.sidebarContainer
      )}
    >
      <div className="flex items-center gap-2 overflow-auto">{MenuItems.map(MapMenuItem)}</div>
    </div>
  );
};

export default HorizontalMenu;

const MapMenuItem = (item: IMenuItem, idx: number) =>
  item.subNav ? (
    <HorizontalMenuCollapsedItem key={idx} idx={idx} item={item} />
  ) : (
    <HorizontalMenuSingleItem key={idx} idx={idx} item={item} />
  );
