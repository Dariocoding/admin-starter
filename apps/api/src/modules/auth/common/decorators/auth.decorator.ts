import { applyDecorators, UseGuards, HttpStatus } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserRoleGuard } from "../guards/user-role.guard";
import { RoleProtected } from "./role-protected.decorator";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { ValidRol } from "@teslo/interfaces";

export function Auth(...roles: ValidRol[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
    ApiResponse({
      status: HttpStatus.FORBIDDEN,
      description: "Forbidden. Token related.",
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: "Unauthorized.",
    }),
    ApiBearerAuth("JWT-auth")
  );
}
