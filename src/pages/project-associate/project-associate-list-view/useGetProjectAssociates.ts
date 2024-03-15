import { useQuery } from '@tanstack/react-query';

import { api } from '../../../api';

export function useGetProjectAssociates(page: number, query: string) {
  return useQuery({
    queryKey: ['getProjectAssociates'],
    queryFn: async () => {
      return await api.getProjectAssociates(page, query);
    },
  });
}
