import * as React from "react";
import classNames from "classnames";
import "./styles/_header.css";
import "@/styles/avatar.styles.css";
import { HiOutlineUser, HiOutlineLogout } from "react-icons/hi";
import Dropdown from "@/components/ui/Dropdown";
import DropdownItem from "@/components/ui/Dropdown/DropdownItem";
import NavToggle from "./NavToggle";
import { useDashboardStore } from "./store/dashboardStore";
import { useAuthStore, useConfigApp } from "@/store";
import { getMaximiumRol } from "@/utils/getMaximiumRol";
import { Link } from "react-router-dom";
import I18Dropdown from "./I18nDropdown";
import { translate } from "@/i18n";
import useResponsive from "@/utils/hooks/useResponsive";
import RenderIf from "@/components/ui/RenderIf";
import Logo from "../Logo";

interface IHeaderDashboardProps {}

const HeaderDashboard: React.FC<IHeaderDashboardProps> = (props) => {
  const {} = props;
  const { mobile, desktop } = useResponsive();
  const { colors } = useConfigApp();
  const { isCollapsed, toggleCollapse } = useDashboardStore();
  const { logOut, user } = useAuthStore();

  return (
    <header
      className={classNames("shadow header print:hidden", colors.isThemed && colors.headerTop)}
    >
      <div className={classNames("header-wrapper h-16")}>
        <div className="header-action header-action-start">
          <RenderIf isTrue={!colors.isHeaderTop || mobile}>
            <NavToggle onClick={toggleCollapse} toggled={isCollapsed} />
          </RenderIf>
          <RenderIf isTrue={colors.isHeaderTop && desktop}>
            <Logo mode={colors.isThemed ? "dark" : "light"} />
          </RenderIf>
        </div>

        <div
          className={classNames(
            "header-action header-action-end",
            colors.isThemed && colors.textColor
          )}
        >
          <div className="header-action header-action-item relative gap-2">
            <I18Dropdown />
          </div>
          <Dropdown
            displayButton={
              <div className="header-action header-action-item">
                <div className="avatar avatar-squared avatar-bordered lg:border-2 avatar-group place-content-center">
                  <HiOutlineUser className="text-xl h-auto " />
                </div>
                <div className="ml-1.5 text-xs">
                  <div className="">{getMaximiumRol(user?.roles)}</div>
                  <div className=" font-bold">{user?.firstName}</div>
                </div>
              </div>
            }
          >
            <DropdownItem>
              <Link to={"/profile"} className="flex flex-row">
                <span>
                  <HiOutlineUser className="h-auto text-xl avatar avatar-squared avatar-bordered place-content-center rounded-full p-1 border-2" />
                </span>
                <div className="ml-2 text-xs mt-1 pr-4">
                  <div className="font-semibold">
                    {" "}
                    {user?.firstName} {user?.lastName}{" "}
                  </div>
                  <div> {user?.email} </div>
                </div>
              </Link>
            </DropdownItem>

            <div className="border-[1px] mx-2"></div>

            <DropdownItem onClick={logOut}>
              <div className="flex flex-row items-center text-xs">
                <div className="">
                  <HiOutlineLogout className="h-auto text-lg " />
                </div>
                <div className="ml-1.5 pr-4">
                  <div className="font-bold"> {translate("app.signOut")} </div>
                </div>
              </div>
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default HeaderDashboard;
