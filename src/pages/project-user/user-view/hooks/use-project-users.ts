import { useQuery } from '@tanstack/react-query';

import { api } from '../../../../api';

export function useProjectUsers(page) {
  return useQuery(['getProjectUsers', page], () => api.getProjectUsers(page));
}
