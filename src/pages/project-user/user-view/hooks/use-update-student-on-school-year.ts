import { useQueryClient } from '@tanstack/react-query';
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
        toastSuccess('Uspjesno azuriran korisnik na skolskoj godini.');
      } catch (e) {
        toastError('Korisnik nije azuriran na skolsku godinu');
      }
    },
  );

  return { isLoading, updateStudentOnSchoolYear };
}
