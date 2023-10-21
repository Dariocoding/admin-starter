import { ValidRol, ValidRoles } from "@teslo/interfaces";
import { capitalize } from "./capitalize";

export const getMaximiumRol = (roles: ValidRol[] = []) => {
  let rol: string;

  if (roles.includes(ValidRoles.SUPER_USER)) {
    rol = "Super Admin"; // ValidRoles.SUPER_USER;
  } else if (roles.includes(ValidRoles.ADMIN)) {
    rol = ValidRoles.ADMIN;
  } else if (roles.includes(ValidRoles.USER)) {
    rol = ValidRoles.USER;
  }

  return capitalize(rol);
};
