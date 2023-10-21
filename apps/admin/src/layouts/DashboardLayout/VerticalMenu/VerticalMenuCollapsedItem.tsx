import AuthorityCheck from "@/components/AuthorityCheck";
import classNames from "classnames";
import * as React from "react";
import { FaChevronDown, FaCircleNotch } from "react-icons/fa";
import { IMenuItem, SubNavItem } from "../data/data-menu";
import { Collapse } from "react-collapse";
import { useDashboardStore } from "../store/dashboardStore";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "@/components/ui/Dropdown";
import DropdownItem from "@/components/ui/Dropdown/DropdownItem";
import useResponsive from "@/utils/hooks/useResponsive";
import { useConfigApp } from "@/store";
import ToolTip from "@/components/ui/Tooltip";

interface IDefaultItemProps {
  item: IMenuItem;
}

const LinkSubNavItem: React.FC<{ item: SubNavItem }> = ({ item }) => {
  const { colors } = useConfigApp();
  const { desktop } = useResponsive();

  return (
    <Link
      to={item.path}
      className={classNames(
        "side-nav-item-collapsed",
        colors.isThemed && desktop && colors.sidebarItemDropdown
      )}
    >
      <FaCircleNotch className="mr-1.5 text-xs" />
      {item.title()}
    </Link>
  );
};

const DefaultItem: React.FunctionComponent<IDefaultItemProps> = (props) => {
  const { item } = props;
  const navigate = useNavigate();
  const title = item.title();
  const isCollapsed = useDashboardStore((state) => state.isCollapsed);
  const setExpanded = useDashboardStore((state) => state.setExpanded);
  const expanded = useDashboardStore((state) => state.expanded);
  const { desktop } = useResponsive();
  const isExpanded = expanded === title;
  const toggleExpand = () => {
    desktop && !isExpanded && item.path && navigate(item.path);
    setExpanded(isExpanded ? null : title);
  };
  const { colors } = useConfigApp();

  return (
    <React.Fragment>
      <div
        className={classNames(
          "side-nav-item",
          colors.isThemed && desktop && colors.sidebarItemHover
        )}
        onClick={toggleExpand}
      >
        <span className="flex items-center">
          <item.Icon />
          {!isCollapsed ? null : title}
        </span>

        <FaChevronDown className={classNames("text-xs transition", isExpanded && "rotate-90")} />
      </div>
      <div
        className={classNames(
          "side-nav-item-collapsed-container",
          colors.isThemed && desktop && colors.sidebarDropdownCollapsedContainer,
          !isCollapsed && "hidden"
        )}
      >
        <Collapse isOpened={isExpanded}>
          <div>
            {item.subNav.map((nav, idx) => (
              <AuthorityCheck key={idx} validRoles={nav.permissions}>
                <LinkSubNavItem item={nav} key={idx} />
              </AuthorityCheck>
            ))}
          </div>
        </Collapse>
      </div>
    </React.Fragment>
  );
};

interface ICollapsedItemProps {
  item: IMenuItem;
}

const SubNavDropdownItem: React.FC<{ item: SubNavItem }> = (props) => {
  const { item } = props;
  const navigate = useNavigate();
  const handleClick = () => navigate(item.path);
  return (
    <DropdownItem
      className="flex items-center pr-12 hover:text-black whitespace-nowrap"
      onClick={handleClick}
    >
      <FaCircleNotch className="mr-1 text-xs" /> {item.title()}
    </DropdownItem>
  );
};

const CollapsedItem: React.FunctionComponent<ICollapsedItemProps> = (props) => {
  const { item } = props;
  const { colors } = useConfigApp();
  return (
    <ToolTip placement="right" message={item.title()}>
      <Dropdown
        className="w-full"
        placement="right"
        displayButton={
          <span
            className={classNames(
              "px-3 py-2.5 flex items-center justify-center transition rounded-xl pr-8",
              !colors.isThemed ? "hover:bg-gray-200" : colors.sidebarItemHover
            )}
          >
            <item.Icon />
          </span>
        }
      >
        {item.subNav.map((subNavItem, idx) => (
          <AuthorityCheck key={idx} validRoles={subNavItem.permissions}>
            <SubNavDropdownItem item={subNavItem} key={idx} />
          </AuthorityCheck>
        ))}
      </Dropdown>
    </ToolTip>
  );
};

interface IVerticalMenuCollapsedItemProps {
  item: IMenuItem;
}

const VerticalMenuCollapsedItem: React.FC<IVerticalMenuCollapsedItemProps> = (props) => {
  const { item } = props;
  const isCollapsed = useDashboardStore((state) => state.isCollapsed);

  return (
    <AuthorityCheck validRoles={item.permissions}>
      {!isCollapsed ? <CollapsedItem item={item} /> : <DefaultItem item={item} />}
    </AuthorityCheck>
  );
};

export default React.memo(VerticalMenuCollapsedItem);
