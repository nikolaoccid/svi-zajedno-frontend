import { useQuery } from '@tanstack/react-query';

import { api } from '../../../../api';

export function useGetProjectAssociate(projectAssociateId: string | undefined) {
  return useQuery({
    queryKey: ['getProjectAssociateById'],
    queryFn: () => api.getProjectAssociateById((projectAssociateId ?? 0).toString()),
    enabled: projectAssociateId !== undefined,
  });
}
