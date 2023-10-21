import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsSelect, Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { User } from "../users/entities/user.entity";
import { LoginUserDto } from "./dto";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { CreateUserDto } from "../users/dto";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  private selectUser: FindOptionsSelect<User> = {
    email: true,
    password: true,
    iduser: true,
    firstName: true,
    lastName: true,
    phone: true,
    roles: true,
    isActive: true,
  };

  async localSignup(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return { user, token: this.getJwtToken(user) };
  }

  async localLogin(loginUserDto: LoginUserDto) {
    const { password, username } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email: username.trim().toLowerCase() },
      select: this.selectUser,
    });

    if (!user) throw new UnauthorizedException("Credentials are not valid (username)");

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException("Credentials are not valid (password)");

    if (!user.isActive)
      throw new UnauthorizedException("Your account is not active please talk with an admin");

    delete user.password;

    return { user, token: this.getJwtToken(user) };
  }

  async refresh(iduser: string) {
    const user = await this.userRepository.findOne({
      where: { iduser },
      select: this.selectUser,
    });

    return { user, token: this.getJwtToken(user) };
  }

  private getJwtToken(user: User) {
    const token = this.jwtService.sign(
      {
        iduser: user.iduser,
        roles: user?.roles,
      } as JwtPayload,
      { expiresIn: "999 years" }
    );

    return token;
  }
}
