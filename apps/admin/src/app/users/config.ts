import React from "react";
import { User } from "@teslo/interfaces";

export interface UserTable extends User {
  actions: React.ReactNode;
  userRol: string;
  isActiveFormatted: React.ReactNode;
  dateCreatedFormatted: string;
  fullName: React.ReactNode;
}

export interface PasswordDto {
  password?: string;
  passwwordConfirm?: string;
}
