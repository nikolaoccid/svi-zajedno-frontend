import { useQuery } from '@tanstack/react-query';

import { getProjectUserByPageAndQuery, getProjectUsersBySchoolYear } from '../../../api/api/api.ts';

export function useGetProjectUserByPageAndQuery(page: number = 1, query: string = '', schoolYearId?: number) {
  return useQuery({
    queryKey: ['getProjectUsers'],
    queryFn: async () => {
      return await getProjectUserByPageAndQuery(page, query, schoolYearId);
    },
    enabled: schoolYearId !== undefined,
  });
}

export function useGetProjectUsersBySchoolYear(
  schoolYearId: string,
  page: number = 1,
  query: string = '',
  status: 'active' | 'inactive' | 'pending' | undefined = 'active',
  sortBy: 'dateOfEnrollment' | undefined = 'dateOfEnrollment',
) {
  return useQuery({
    queryKey: ['getProjectUsersBySchoolYear'],
    queryFn: async () => {
      return await getProjectUsersBySchoolYear(schoolYearId, page, query, status, sortBy);
    },
    enabled: schoolYearId !== '' && schoolYearId !== '0',
  });
}
