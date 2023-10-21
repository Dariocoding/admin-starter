import React from "react";
import { HiOutlineMenuAlt2, HiOutlineMenu } from "react-icons/hi";
import classNames from "classnames";
import { useConfigApp } from "@/store";

interface INavToggleProps {
  className?: string;
  toggled: boolean;
  onClick(): void;
}
const NavToggle: React.FC<INavToggleProps> = (props) => {
  const { onClick, toggled, className } = props;
  const { colors } = useConfigApp();
  return (
    <span
      onClick={onClick}
      className={classNames(
        "nav_toggle",
        colors.isThemed && colors.textColor,
        colors.isThemed && colors.hoverNavToggle,
        className
      )}
    >
      {toggled ? <HiOutlineMenu /> : <HiOutlineMenuAlt2 />}
    </span>
  );
};

export default NavToggle;
