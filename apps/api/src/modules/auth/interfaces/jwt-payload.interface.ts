import { ValidRoles } from "@teslo/interfaces";

export interface JwtPayload {
  iduser: string;
  roles: ValidRoles[];
}
