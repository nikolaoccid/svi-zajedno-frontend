import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useAsyncCallback } from 'react-async-hook';
import { useNavigate } from 'react-router-dom';

import { api } from '../../../../api';
import { toastError, toastSuccess } from '../../../../utils/toast.ts';

export function useCreateSchoolYear() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState<string[]>(['']);

  const { loading: isLoading, execute: createSchoolYear } = useAsyncCallback(async (startYear: number) => {
    try {
      const { startYear: apiStartYear, endYear: apiEndYear } = await api.createSchoolYear(startYear);
      toastSuccess(`Successfully created school year ${apiStartYear}/${apiEndYear}`);
      await queryClient.invalidateQueries(['getAllSchoolYears']);
      navigate('/school-year');
    } catch (e) {
      toastError('Could not create school year');
      console.error(e);
      const err = e as AxiosError<any>;

      if (err && err.response && err.response.data && err.response.data.message) {
        setErrorMessages([err.response.data.message]);
      }
    }
  });

  return { isLoading, createSchoolYear, errorMessages };
}
