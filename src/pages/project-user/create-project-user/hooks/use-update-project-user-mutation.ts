import { useMutation } from '@tanstack/react-query';

import { api } from '../../../../api';

export function useUpdateProjectUserMutation() {
  return useMutation({
    mutationFn: ({ userId, user }: any) => {
      return api.updateProjectUser(userId, user);
    },
  });
}
