import * as bcrypt from "bcryptjs";
import { ValidRol, ValidRoles } from "@teslo/interfaces";
import { CreateConfigEnterpriseDto } from "src/modules/config-enterprise/dto/create-config-enterprise.dto";
import { CreateConfigAppDto } from "src/modules/config-app/dto/create-config-app.dto";

interface SeedConfigEnterprise extends CreateConfigEnterpriseDto {}

interface SeedConfigApp extends CreateConfigAppDto {}

interface SeedUser {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  password: string;
  roles: ValidRol[];
}

interface SeedData {
  users: SeedUser[];
  configEnterprise: SeedConfigEnterprise;
  configApp: SeedConfigApp;
}

export const initialData: SeedData = {
  users: [
    {
      email: "darioflores170@gmail.com",
      firstName: "Dario",
      lastName: "Flores",
      phone: "016206210",
      password: bcrypt.hashSync("darkmax", 10),
      roles: [ValidRoles.SUPER_USER, ValidRoles.ADMIN],
    },
    {
      email: "test2@gmail.com",
      firstName: "Melissa",
      lastName: "Flores",
      phone: "50206102610",
      password: bcrypt.hashSync("darkmax", 10),
      roles: [ValidRoles.USER],
    },
  ],

  configEnterprise: {
    name: "Teslo",
    phone: "042406210601",
    email: "teslo@gmail.com",
    address: "",
  },

  configApp: {
    colorsAdmin: {
      topLogoContainer: "bg-slate-900 border-slate-800 border-t-0",
      headerTop: "bg-slate-800",
      textColor: "text-gray-50",
      textSubtitleSidebar: "text-gray-50",
      hoverNavToggle: "hover:bg-slate-700",
      sidebarContainer: "bg-slate-800 border-0",
      sidebarItemHover: "hover:bg-slate-700",
      sidebarItemDropdown: "hover:bg-slate-500",
      sidebarDropdownCollapsedContainer: "bg-slate-700",
      loaderColor: "text-slate-700",
      backgroundHome: "bg-slate-800",
      isThemed: true,
      isThemeDarkLogin: true,
      enableClothesShopping: true,
    },
    emailFrom: "",
    emailHost: "",
    emailName: "",
    emailPassword: "",
    emailPort: 0,
    emailSecure: "",
    emailUser: "",
  },
};
