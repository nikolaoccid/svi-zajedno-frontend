import { useQuery } from '@tanstack/react-query';

import { api } from '../../../api';

export const useProjectUserStatistics = (schoolYearId) => {
  return useQuery({
    queryKey: ['getProjectUserStatistics', schoolYearId],
    queryFn: () => api.getProjectUserStatistics(schoolYearId),
  });
};
