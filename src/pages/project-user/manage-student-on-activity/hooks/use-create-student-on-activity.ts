import { useAsyncCallback } from 'react-async-hook';
import { useNavigate } from 'react-router-dom';

import { api } from '../../../../api';
import { toastError, toastSuccess } from '../../../../utils/toast.ts';

export function useCreateStudentOnActivity() {
  const navigate = useNavigate();
  return useAsyncCallback(async (studentOnActivity) => {
    try {
      await api.createStudentOnActivity(studentOnActivity);
      toastSuccess('Uspjesno upisan na aktivnost');
      navigate(-1);
    } catch (e) {
      toastError('Nije moguce upisati korisnika na aktivnost');
    }
  });
}
