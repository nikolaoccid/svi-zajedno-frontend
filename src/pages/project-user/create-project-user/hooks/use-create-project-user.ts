import { AxiosError } from 'axios';
import { useState } from 'react';
import { useAsyncCallback } from 'react-async-hook';
import { useNavigate, useParams } from 'react-router-dom';

import { api } from '../../../../api';
import { CreateProjectUserDto } from '../../../../api/codegen';
import { toastError, toastSuccess } from '../../../../utils/toast.ts';

export const useCreateProjectUser = () => {
  const { startYear } = useParams();
  const navigate = useNavigate();
  const [errorApiMessages, setErrorApiMessages] = useState<string[]>(['']);

  const { loading: isLoading, execute: createUser } = useAsyncCallback(async (user: CreateProjectUserDto) => {
    try {
      await api.createProjectUser(user);
      toastSuccess('Uspjesno kreiran korisnik');
      navigate(`/${startYear}/dashboard`);
    } catch (e) {
      const err = e as AxiosError<any>;
      toastError('Nije moguce kreirati korisnika - ' + err.message);
      if (err && err.response && err.response.data && err.response.data.message) {
        setErrorApiMessages([err.response.data.message]);
      }
    }
  });

  return { isLoading, createUser, errorApiMessages };
};
