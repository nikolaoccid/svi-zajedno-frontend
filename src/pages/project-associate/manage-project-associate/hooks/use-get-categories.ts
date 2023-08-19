import { useQuery } from '@tanstack/react-query';

import { api } from '../../../../api';

export function useGetCategories() {
  return useQuery({
    queryKey: ['getCategories'],
    queryFn: () => api.getCategories(),
  });
}
