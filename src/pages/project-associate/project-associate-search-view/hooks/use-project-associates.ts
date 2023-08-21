import { useQuery } from '@tanstack/react-query';

import { api } from '../../../../api';

export function useProjectAssociates(page) {
  return useQuery(['getProjectAssociates', page], () => api.getProjectAssociates(page));
}
