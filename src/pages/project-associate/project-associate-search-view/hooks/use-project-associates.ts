import { useAsyncCallback } from 'react-async-hook';

import { api } from '../../../../api';
import { toastError } from '../../../../utils/toast.ts';

export function useProjectAssociates(page) {
  return useAsyncCallback(async (query?: string) => {
    try {
      return await api.getProjectAssociates(page, query);
    } catch (e) {
      console.log('error', e);
      toastError('Pogreska pri dohvacanju korisnika');
    }
  });
}
