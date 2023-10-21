export interface User {
  iduser?: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  isActive?: boolean;
  token?: string;
  isDelete?: boolean;
  roles?: ValidRol[];
  dateCreated?: Date;
  p;
}

export type ValidRol = "admin" | "super-user" | "user" | "seller" | "supervisor";

export interface UserDto {
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
  phone?: string;
  isActive?: boolean;
  roles?: ValidRol[];
}
