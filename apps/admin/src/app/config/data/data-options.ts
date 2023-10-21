import {
  BsFillCreditCard2BackFill,
  BsDatabaseFillCheck,
  BsDatabaseFillDown,
  BsCodeSlash,
} from "react-icons/bs";
import { ICardProps } from "../Card";
import { MdOutlineSupervisedUserCircle } from "react-icons/md";
import { AiOutlineBgColors } from "react-icons/ai";
import { validPaths } from "@/utils";
import { BiImages } from "react-icons/bi";
import { translate } from "@/i18n";
import { ValidRol, ValidRoles } from "@teslo/interfaces";

export interface DataOption extends ICardProps {
  id: "images-enterprise" | "colors-admin" | "app-data" | "app-exports-data" | "developer-options";
  permission: ValidRol[] | "*";
}

const dataOptions: DataOption[] = [
  {
    id: "images-enterprise",
    icon: BiImages,
    title: () => translate("settings.imagesEnterprise.title"),
    description: () => translate("settings.imagesEnterprise.description"),
    className: "bg-teal-600",
    btnLinkText: "Edit images enterprise",
    classNameButton: "btn-success",
    to: validPaths.imagesEnterpriseConfig.path,
    permission: validPaths.imagesEnterpriseConfig.authoritys,
  },
  {
    id: "colors-admin",
    icon: AiOutlineBgColors,
    title: () => translate("settings.colorsAdmin.title"),
    to: validPaths.colorsAdmin.path,
    description: () => translate("settings.colorsAdmin.description"),
    className: "bg-yellow-600",
    btnLinkText: "Edit colors admin",
    classNameButton: "btn-warning",
    permission: validPaths.colorsAdmin.authoritys,
  },
  {
    id: "app-data",
    icon: BsDatabaseFillCheck,
    title: () => translate("settings.appData.title"),
    to: validPaths.appData.path,
    description: () => translate("settings.appData.description"),
    className: "bg-pink-600",
    btnLinkText: "Edit App Data",
    classNameButton: "bg-pink-600 hover:bg-pink-700 text-white",
    permission: validPaths.appData.authoritys,
  },

  {
    id: "developer-options",
    icon: BsCodeSlash,
    title: () => "Developer options",
    description: () => "",
    className: "bg-sky-500",
    classNameButton: "bg-sky-500 hover:bg-sky-600 text-white",
    btnLinkText: "Set developer options",
    permission: [ValidRoles.SUPER_USER],
  },
];

export default dataOptions;
