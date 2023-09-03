import { useQuery } from '@tanstack/react-query';

import { api } from '../../../../api';

export function useGetCategory(categoryId: string | undefined) {
  return useQuery({
    queryKey: ['getCategory', categoryId],
    queryFn: () => api.getCategory((categoryId ?? 0).toString()),
    enabled: categoryId !== undefined,
  });
}
