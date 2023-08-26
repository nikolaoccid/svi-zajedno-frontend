import { useAsyncCallback } from 'react-async-hook';

import { api } from '../../../../api';
import { toastError } from '../../../../utils/toast.ts';

export function useProjectUsers(page) {
  return useAsyncCallback(async () => {
    try {
      return await api.getProjectUsers(page);
    } catch (e) {
      toastError('Pogreska pri dohvacanju korisnika');
    }
  });
}
