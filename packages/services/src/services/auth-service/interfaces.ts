import { User, UserDto } from '@teslo/interfaces';

export interface ReturnValuesLogin {
	user: User;
	token: string;
}

export interface LoginUserDto {
	username: string;
	password: string;
}

export interface SignUpUserDto extends UserDto {}
