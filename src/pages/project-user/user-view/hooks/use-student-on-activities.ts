import { useQuery } from '@tanstack/react-query';

import { api } from '../../../../api';
import { toastError } from '../../../../utils/toast.ts';

export const useStudentOnActivities = (studentOnSchoolYearId: number | undefined) => {
  return useQuery({
    queryKey: ['getStudentOnActivities', studentOnSchoolYearId],
    enabled: studentOnSchoolYearId !== undefined,
    queryFn: async () => {
      try {
        return await api.getStudentOnActivity(studentOnSchoolYearId);
      } catch (e) {
        toastError('Greska u dohvacanju aktivnosti');
        return null;
      }
    },
  });
};
