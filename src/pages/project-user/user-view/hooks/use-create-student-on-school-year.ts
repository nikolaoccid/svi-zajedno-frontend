import { useQueryClient } from '@tanstack/react-query';
import { useAsyncCallback } from 'react-async-hook';

import { api } from '../../../../api';
import { toastError, toastSuccess } from '../../../../utils/toast.ts';

export function useCreateStudentOnSchoolYear(userId: number, schoolYearId: number) {
  const queryClient = useQueryClient();

  const { loading: isLoading, execute: createStudentOnSchoolYear } = useAsyncCallback(async () => {
    try {
      await api.createProjetUserOnSchoolYear(userId, schoolYearId);
      await queryClient.invalidateQueries(['getStudentOnSchoolYear', 'getProjectUserById']);
      toastSuccess('Uspjesno upisan na skolsku godinu.');
    } catch (e) {
      toastError('Korisnik nije upisan na skolsku godinu');
    }
  });

  return { isLoading, createStudentOnSchoolYear };
}
