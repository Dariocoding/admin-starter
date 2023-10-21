import AuthorityCheck from "@/components/AuthorityCheck";
import RenderIf from "@/components/ui/RenderIf";
import ToolTip from "@/components/ui/Tooltip";
import useResponsive from "@/utils/hooks/useResponsive";
import classNames from "classnames";
import * as React from "react";
import { Link, LinkProps, useNavigate } from "react-router-dom";
import { IMenuItem } from "../data/data-menu";
import { useDashboardStore } from "../store/dashboardStore";
import { useConfigApp } from "@/store";
import { flushSync } from "react-dom";

interface ICollpasedItemProps {
  title: string;
  children?: React.ReactNode;
}

const CollpasedItem: React.FunctionComponent<ICollpasedItemProps> = (props) => {
  const { title, children } = props;
  return (
    <ToolTip placement="right" message={title}>
      {children}
    </ToolTip>
  );
};

interface IDefaultItemProps {
  item: IMenuItem;
}

const DefaultItem: React.FunctionComponent<IDefaultItemProps> = (props) => {
  const { item } = props;
  const { isCollapsed } = useDashboardStore();
  const { desktop } = useResponsive();
  const { colors } = useConfigApp();

  return (
    <Link
      to={item.path}
      className={classNames(
        "side-nav-item justify-start",
        colors.isThemed && desktop && colors.sidebarItemHover
      )}
    >
      <item.Icon /> {isCollapsed ? item.title() : null}
    </Link>
  );
};

interface IVerticalMenuSingleItemProps {
  item: IMenuItem;
}

const VerticalMenuSingleItem: React.FunctionComponent<IVerticalMenuSingleItemProps> = (props) => {
  const { item } = props;
  const { isCollapsed } = useDashboardStore();

  return (
    <AuthorityCheck validRoles={item.permissions}>
      <RenderIf isTrue={!isCollapsed}>
        <CollpasedItem title={item.title()}>
          <DefaultItem item={item} />
        </CollpasedItem>
      </RenderIf>
      <RenderIf isTrue={isCollapsed}>
        <DefaultItem item={item} />
      </RenderIf>
    </AuthorityCheck>
  );
};

export default React.memo(VerticalMenuSingleItem);
