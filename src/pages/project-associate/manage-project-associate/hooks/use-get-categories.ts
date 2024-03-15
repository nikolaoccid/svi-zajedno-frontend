import { useQuery } from '@tanstack/react-query';

import { api } from '../../../../api';

export function useGetCategories(page = 1, query = '') {
  return useQuery({
    queryKey: ['getCategories'],
    queryFn: () => api.getCategories(page, query),
    enabled: page !== undefined && page > 0,
  });
}
