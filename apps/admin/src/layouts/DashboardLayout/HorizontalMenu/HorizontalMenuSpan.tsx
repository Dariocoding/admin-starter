import * as React from "react";
import MenuItems, { IMenuItem } from "../data/data-menu";
import { useConfigApp } from "@/store";
import classNames from "classnames";
import useResponsive from "@/utils/hooks/useResponsive";
import { useLocation } from "react-router-dom";
import RenderIf from "@/components/ui/RenderIf";

interface IHorizontalMenuSpanProps {
  item: IMenuItem;
  idx: number;
  onClick?: () => void;
  as?: React.ElementType;
}

const HorizontalMenuSpan: React.FunctionComponent<IHorizontalMenuSpanProps> = (props) => {
  const { item, onClick, idx } = props;
  const { colors } = useConfigApp();
  const { desktop } = useResponsive();
  const location = useLocation();
  const lastItem = idx === MenuItems.length - 1;

  return (
    <div className="flex items-center gap-1">
      <span
        className={classNames(
          "flex items-center cursor-pointer py-2 px-2 rounded-lg transition whitespace-nowrap",
          colors.isThemed && desktop && colors.sidebarItemHover,
          colors.isThemed &&
            location.pathname === item.path &&
            colors.sidebarItemHover.replaceAll("hover:", ""),
          !colors.isThemed && "hover:bg-gray-100",
          !colors.isThemed && location.pathname === item.path && "bg-gray-100"
          // border right till last item
        )}
        onClick={onClick}
      >
        <item.Icon sm />
        <span className="text-sm">{item.title()}</span>
      </span>
      <RenderIf isTrue={!lastItem}>
        <span className="h-full dark:bg-gray-700 mx-0.5 w-px inline-block select-none font-thin">
          |
        </span>
      </RenderIf>
    </div>
  );
};

export default HorizontalMenuSpan;
