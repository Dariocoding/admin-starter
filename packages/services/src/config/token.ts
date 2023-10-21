import { axiosClient } from './axios';

export const tokenAuth = (token: string | null) => {
	if (token) axiosClient.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	else delete axiosClient.defaults.headers.common['Authorization'];
};
