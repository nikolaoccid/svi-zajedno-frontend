import { useQuery } from '@tanstack/react-query';

import { api } from '../../../../api';

export function useSchoolYears(page = 1, query = '') {
  return useQuery({
    queryKey: ['getAllSchoolYears'],
    queryFn: async () => {
      try {
        const result = await api.getAllSchoolYears(page, query);
        return result;
      } catch (e) {
        console.error('Could not fetch school years', e);
        throw e;
      }
    },
  });
}
