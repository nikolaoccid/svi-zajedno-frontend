import { useQueryClient } from '@tanstack/react-query';
import i18n from 'i18next';
import { useAsyncCallback } from 'react-async-hook';

import { api } from '../../../../api';
import { toastError, toastSuccess } from '../../../../utils/toast.ts';

export function useCreateStudentOnSchoolYear(userId: number, schoolYearId: number) {
  const queryClient = useQueryClient();

  const { loading: isLoading, execute: createStudentOnSchoolYear } = useAsyncCallback(
    async (sourceSystem, protectionType, dateOfEnrollment?) => {
      try {
        await api.createProjetUserOnSchoolYear(userId, schoolYearId, protectionType, sourceSystem, dateOfEnrollment);
        await queryClient.invalidateQueries(['getStudentOnSchoolYear']);
        await queryClient.invalidateQueries(['getProjectUserById']);
        await queryClient.invalidateQueries(['getProjectUser']);
        await queryClient.invalidateQueries(['getStudentOnSchoolYear']);
        toastSuccess(i18n.t('Successfully enrolled on the academic year.'));
      } catch (e) {
        toastError(i18n.t('The user was not enrolled on the academic year'));
      }
    },
  );

  return { isLoading, createStudentOnSchoolYear };
}
