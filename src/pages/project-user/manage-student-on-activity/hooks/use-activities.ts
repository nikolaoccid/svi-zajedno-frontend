import { useAsyncCallback } from 'react-async-hook';

import { api } from '../../../../api';
import { toastError } from '../../../../utils/toast.ts';

export function useActivities(activityStatus, schoolYearId) {
  const {
    loading: isLoading,
    execute: getActivities,
    result: activities,
  } = useAsyncCallback(async (query = undefined) => {
    try {
      const res = await api.getActivities(query, activityStatus, schoolYearId);
      return res;
    } catch (e) {
      toastError('Nije moguce dohvatiti aktivnosti');
    }
  });
  return { isLoading, getActivities, activities };
}
