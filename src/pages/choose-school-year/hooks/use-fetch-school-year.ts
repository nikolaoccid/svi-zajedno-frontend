import { useAsync } from 'react-async-hook';

import { api } from '../../../api';
import { sortArrayAscending } from '../../../utils/sort-array-ascending.ts';

export function useFetchSchoolYear() {
  return useAsync(async () => {
    try {
      const result = await api.getAllSchoolYears();
      if (result) {
        return sortArrayAscending(result);
      }
    } catch (e) {
      console.error('Could not school years', e);
    }
  }, []);
}
