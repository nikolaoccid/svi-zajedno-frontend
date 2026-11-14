import i18n from 'i18next';
import { useAsyncCallback } from 'react-async-hook';

import { api } from '../../../../api';
import { toastError } from '../../../../utils/toast.ts';

export function useActivities() {
  const {
    loading: isLoading,
    execute: getActivities,
    result: activities,
  } = useAsyncCallback(
    async (query = undefined, activityStatus = 'active', schoolYearId = 0, studentOnSchoolYearId = 0) => {
      try {
        const res = await api.getActivities(query, activityStatus, schoolYearId, studentOnSchoolYearId);
        return res;
      } catch (e) {
        toastError(i18n.t('Could not fetch activities'));
      }
    },
  );
  return { isLoading, getActivities, activities };
}
