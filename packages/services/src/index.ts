import { axiosClient } from './config';

export * from './services';
export * from './config';

export default function setAxiosBaseURL(baseURL: string) {
	axiosClient.defaults.baseURL = baseURL;
}
