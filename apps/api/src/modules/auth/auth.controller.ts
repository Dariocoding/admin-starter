import { Controller, Post, Body, HttpStatus, Get } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { Auth, GetUser } from './common/decorators';
import { LoginUserDto, ReturnValuesLogin } from './dto';

@ApiTags('2 - Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local/signup')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: HttpStatus.OK, type: ReturnValuesLogin })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.localSignup(createUserDto);
  }

  @Post('local/login')
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: HttpStatus.OK, type: ReturnValuesLogin })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.localLogin(loginUserDto);
  }

  @Get('/refresh')
  @Auth()
  refresh(@GetUser() user: User) {
    return this.authService.refresh(user.iduser);
  }
}
