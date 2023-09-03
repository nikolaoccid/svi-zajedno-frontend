import { useQuery } from '@tanstack/react-query';

import { api } from '../../../../api';

export function useActivity(activityId: string | undefined) {
  return useQuery({
    queryKey: ['getActivity', activityId],
    queryFn: () => api.getActivity((activityId ?? 0).toString()),
    enabled: activityId !== undefined,
  });
}
