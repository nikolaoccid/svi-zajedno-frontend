import { useQuery } from '@tanstack/react-query';

import { api } from '../../../api';

export function useStudentOnSchoolYear(schoolYearId, userId) {
  return useQuery({
    queryKey: ['getStudentOnSchoolYear', schoolYearId, userId],
    queryFn: () => api.getProjetUserOnSchoolYear(userId, schoolYearId),
    enabled: schoolYearId !== undefined && userId != undefined,
  });
}
