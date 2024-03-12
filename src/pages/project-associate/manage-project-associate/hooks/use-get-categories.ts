import { useQuery } from '@tanstack/react-query';

import { api } from '../../../../api';

export function useGetCategories(query) {
  return useQuery({
    queryKey: ['getCategories'],
    queryFn: () => api.getCategories(query),
  });
}
