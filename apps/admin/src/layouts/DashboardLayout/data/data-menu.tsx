import { validPaths } from "@/utils";
import { ValidRol, ValidRoles } from "@teslo/interfaces";
import React from "react";
import { FaBoxes, FaHome, FaUsers, FaCogs } from "react-icons/fa";
import VerticalMenuIcon, { IVerticalMenuIconProps } from "../VerticalMenu/VerticalMenuIcon";
import { translate } from "@/i18n";

export interface IMenuItem {
  title: () => string;
  path?: string;
  pathTreeView?: string;
  Icon: React.FunctionComponent<IVerticalMenuIconProps>;
  permissions: ValidRol[] | "*";
  subNav?: SubNavItem[];
}

export interface SubNavItem {
  title: () => string;
  path: string;
  permissions: ValidRol[] | "*";
}

const MenuItems: IMenuItem[] = [
  {
    title: () => translate("sidebar.dashboard"),
    path: validPaths.dashboard.path,
    Icon: (props) => (
      <VerticalMenuIcon {...props}>
        <FaHome />
      </VerticalMenuIcon>
    ),
    permissions: "*",
  },
  {
    title: () => translate("sidebar.users"),
    Icon: (props) => (
      <VerticalMenuIcon {...props}>
        <FaUsers />
      </VerticalMenuIcon>
    ),

    permissions: [ValidRoles.ADMIN, ValidRoles.SUPER_USER],
    path: validPaths.users.path,
  },

  {
    title: () => translate("sidebar.settings"),
    Icon: (props) => (
      <VerticalMenuIcon {...props}>
        <FaCogs />
      </VerticalMenuIcon>
    ),
    permissions: [ValidRoles.ADMIN, ValidRoles.SUPER_USER],
    path: validPaths.settings.path,
  },
];

export default MenuItems;
