import i18n from 'i18next';
import { useAsyncCallback } from 'react-async-hook';

import { api } from '../../../../api';
import { toastError } from '../../../../utils/toast.ts';

export function useProjectAssociates(page) {
  return useAsyncCallback(async (query?: string) => {
    try {
      return await api.getProjectAssociates(page, query);
    } catch (e) {
      console.log('error', e);
      toastError(i18n.t('Error fetching users'));
    }
  });
}
