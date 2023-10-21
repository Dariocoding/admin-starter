import { SetMetadata } from "@nestjs/common";
import { ValidRol } from "@teslo/interfaces";

export const META_ROLES = "roles";

export const RoleProtected = (...args: ValidRol[]) => {
  return SetMetadata(META_ROLES, args);
};
