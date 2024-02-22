import { useQuery } from '@tanstack/react-query';

import { api } from '../../../../api';

export function useProjectUser(id: string | undefined) {
  return useQuery({
    queryKey: ['getProjectUser', id],
    queryFn: () => {
      if (id !== undefined) {
        return api.getProjectUser(id);
      } else {
        return Promise.resolve(undefined);
      }
    },
    enabled: id !== undefined,
  });
}
