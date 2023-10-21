import useQueryState from '@/utils/hooks/useQueryState';
import { usersService } from '@teslo/services';

async function fetchUsers() {
	const { data } = await usersService.getUsers();
	return data;
}

export function useFetcUsers() {
	return useQueryState(['user-all'], fetchUsers, []);
}
