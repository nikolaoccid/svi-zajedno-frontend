import { useQuery } from '@tanstack/react-query';

import { api } from '../../../../api';

export function useGetProjectUser(userId: string | undefined) {
  return useQuery({
    queryKey: ['getProjectUserById', userId],
    queryFn: () => api.getProjectUserById((userId ?? 0).toString()),
    enabled: userId !== undefined,
  });
}
