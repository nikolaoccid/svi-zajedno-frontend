import { useQuery } from '@tanstack/react-query';

import { api } from '../../../api';

export const useAssociateStatistics = (schoolYearId) => {
  return useQuery({
    queryKey: ['getAssociateStatistics', schoolYearId],
    queryFn: () => api.getAssociateStatistics(schoolYearId),
  });
};
