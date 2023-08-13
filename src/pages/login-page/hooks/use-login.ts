import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useAsyncCallback } from 'react-async-hook';
import { useNavigate } from 'react-router-dom';

import { api } from '../../../api';
import { persistToken } from '../../../api/api.ts';
import { LoginDto } from '../../../api/codegen';
import { toastSuccess } from '../../../utils/toast.ts';

export function useLogin({ email, password }: LoginDto) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [errorApiMessages, setErrorApiMessages] = useState<string[]>(['']);

  const { loading: isLoading, execute: login } = useAsyncCallback(async () => {
    try {
      const { token } = await api.login({ email, password });
      persistToken(token);
      await queryClient.invalidateQueries();
      toastSuccess('Successfully logged in.');
      navigate('/school-year');
    } catch (e) {
      console.error(e);
      const err = e as AxiosError<any>;

      if (err && err.response && err.response.data && err.response.data.message) {
        setErrorApiMessages([err.response.data.message]);
      }
    }
  });

  return { isLoading, login, errorApiMessages };
}
