import { useQueryClient } from '@tanstack/react-query';
import i18n from 'i18next';
import { useAsyncCallback } from 'react-async-hook';

import { api } from '../../../../api';
import { UpdateStudentOnSchoolYearDto } from '../../../../api/codegen';
import { toastError, toastSuccess } from '../../../../utils/toast.ts';

export function useUpdateStudentOnSchoolYear() {
  const queryClient = useQueryClient();

  const { loading: isLoading, execute: updateStudentOnSchoolYear } = useAsyncCallback(
    async (studentOnSchoolYearId: string, studentOnSchoolYear: UpdateStudentOnSchoolYearDto) => {
      try {
        await api.updateProjetUserOnSchoolYear(studentOnSchoolYearId, studentOnSchoolYear);
        await queryClient.invalidateQueries(['getProjectUserById']);
        await queryClient.invalidateQueries(['getStudentOnSchoolYear']);
        await queryClient.invalidateQueries(['getProjectUser']);
        toastSuccess(i18n.t('The user was successfully updated for the academic year.'));
      } catch (e) {
        toastError(i18n.t('The user was not updated for the academic year'));
      }
    },
  );

  return { isLoading, updateStudentOnSchoolYear };
}
