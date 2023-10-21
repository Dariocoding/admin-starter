import { axiosClient } from '../../config/axios';
import { LoginUserDto, ReturnValuesLogin, SignUpUserDto } from './interfaces';

export const authService = {
	logIn(body: LoginUserDto) {
		return axiosClient.post<ReturnValuesLogin>('/auth/local/login', body);
	},
	refresh() {
		return axiosClient.get<ReturnValuesLogin>('/auth/refresh');
	},
	signUp(body: SignUpUserDto) {
		return axiosClient.post<ReturnValuesLogin>('/auth/local/signup', body);
	},
};

export * from './interfaces';
