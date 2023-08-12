import { useQuery } from '@tanstack/react-query';

import { api } from '../api';
export function useAuthenticatedUser() {
  return useQuery({
    queryKey: ['getAuthenticatedUser'],
    queryFn: async () => {
      try {
        return await api.getAuthenticatedUser();
      } catch (e) {
        console.log('Could not authenticate user', e);
        return null;
      }
    },
  });
}
