import { useQueryClient } from '@tanstack/react-query';
import { useAsyncCallback } from 'react-async-hook';

import { api } from '../../../../api';
import { toastError, toastSuccess } from '../../../../utils/toast.ts';

export function useUpdateStudentOnSchoolYear(studentOnSchoolYearId: string, studentOnSchoolYear) {
  const queryClient = useQueryClient();

  const { loading: isLoading, execute: updateStudentOnSchoolYear } = useAsyncCallback(async () => {
    try {
      await api.updateProjetUserOnSchoolYear(studentOnSchoolYearId, studentOnSchoolYear);
      await queryClient.invalidateQueries(['getStudentOnSchoolYear', 'getProjectUserById', 'getProjectUser']);
      toastSuccess('Uspjesno azuriran korisnik na skolskoj godini.');
    } catch (e) {
      toastError('Korisnik nije azuriran na skolsku godinu');
    }
  });

  return { isLoading, updateStudentOnSchoolYear };
}
