import { useQuery } from '@tanstack/react-query';

import { api } from '../../../api';
import { sortArrayAscending } from '../../../utils/sort-array-ascending.ts';

export function useSchoolYears() {
  return useQuery({
    queryKey: ['getAllSchoolYears'],
    queryFn: async () => {
      try {
        const result = await api.getAllSchoolYears();
        return sortArrayAscending(result);
      } catch (e) {
        console.error('Could not fetch school years', e);
        throw e;
      }
    },
  });
}
