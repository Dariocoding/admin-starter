import { ConfigEnterprise, ConfigEnterpriseDto } from '@teslo/interfaces';
import { axiosClient } from '../../config';

export const configEnterpriseService = {
	find: () => axiosClient.get<ConfigEnterprise>('/config-enterprise'),
	update: (data: ConfigEnterpriseDto) =>
		axiosClient.put<ConfigEnterprise>('/config-enterprise', data),
};
