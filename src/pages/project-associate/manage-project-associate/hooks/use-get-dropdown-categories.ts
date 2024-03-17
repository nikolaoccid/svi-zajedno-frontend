import { useQuery } from '@tanstack/react-query';

import { api } from '../../../../api';

export function useGetDropdownCategories() {
  return useQuery({
    queryKey: ['getDropdownCategories'],
    queryFn: () => api.getDropdownCategories(),
  });
}
