import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ArrayContains, FindOperator, FindOptionsWhere, Not, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcryptjs";
import { handleDBErrors } from "src/common/utils/handleDBErros";
import { isUUID } from "class-validator";
import { validateEmail } from "src/common/utils";
import { MailService } from "src/mail/mail.service";
import {
  RecoverPasswordDto,
  RequestPasswordEmailDto,
  CreateUserDto,
  UpdateUserDto,
  OptionsQueryGetUser,
} from "./dto";
import { v4 as UUID } from "uuid";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "../auth/interfaces";
import { ValidRol, ValidRoles } from "@teslo/interfaces";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
    private readonly configService: ConfigService
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.password) {
      createUserDto.password = await bcrypt.hash(UUID(), 10);
    }

    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: this.hashPassword(password),
      });

      await this.userRepository.save(user);
      delete user.password;

      return user;
    } catch (error) {
      handleDBErrors(error);
    }
  }

  findAll(user: JwtPayload) {
    let whereUserRoles: FindOptionsWhere<User> = {};

    return this.userRepository.find({
      where: { ...whereUserRoles },
      order: { dateCreated: "DESC" },
    });
  }

  async findOne(term: string, optionsQueryGetUser?: OptionsQueryGetUser) {
    const {} = optionsQueryGetUser || {};
    let user: User;
    if (+term > 0) {
      user = await this.userRepository.findOneBy({
        iduser: term,
      });
    } else {
      user = await this.userRepository.findOne({
        where: [{ email: term.toLowerCase().trim() }],
      });
    }

    if (!user) throw new NotFoundException("User not found");

    return user;
  }

  async findByIDUserAndToken(iduser: string, token: string) {
    const user = await this.userRepository.findOneBy({ iduser, token });

    if (!user) throw new NotFoundException("User not found");

    return user;
  }

  async update(iduser: string, updateUserDto: UpdateUserDto, returnUser = true) {
    try {
      if (returnUser) {
        await this.findOne(iduser);
      }

      if (updateUserDto.password) {
        updateUserDto.password = this.hashPassword(updateUserDto.password);
      }

      if (updateUserDto.email) {
        updateUserDto.email = updateUserDto.email.trim().toLocaleLowerCase();
      }

      await this.userRepository.update({ iduser }, updateUserDto);

      if (returnUser) {
        return this.findOne(iduser);
      }
    } catch (error) {
      handleDBErrors(error);
    }
  }

  async remove(iduser: string) {
    await this.userRepository.delete({ iduser });
  }

  async sendRequestPassword(requestPasswordEmailDto: RequestPasswordEmailDto) {
    const { email } = requestPasswordEmailDto;
    const user = await this.findOne(email);
    const token = UUID();
    await this.userRepository.update({ iduser: user.iduser }, { token });
    const HOST_APP = this.configService.get("HOST_APP");
    const url = `${HOST_APP}/recover/password/${token}/${user.iduser}`;
    await this.mailService.forgetPassword({ urlRecovery: url, user });
  }

  async recoverPassword(recoverPasswordDto: RecoverPasswordDto) {
    const { password, passwordConfirm, email, token, iduser } = recoverPasswordDto;

    if (password !== passwordConfirm) {
      throw new BadRequestException("Passwords do not match");
    }

    const user = await this.userRepository.findOneBy({
      email,
      token,
      iduser,
    });

    if (!user) {
      throw new NotFoundException("This user does not exist or the tokens do not match");
    }

    await this.userRepository.update(
      { iduser },
      { token: null, password: this.hashPassword(password) }
    );
  }

  private hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }
}
