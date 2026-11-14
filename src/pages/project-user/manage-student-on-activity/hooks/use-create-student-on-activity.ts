import i18n from 'i18next';
import { useAsyncCallback } from 'react-async-hook';
import { useNavigate } from 'react-router-dom';

import { api } from '../../../../api';
import { toastError, toastSuccess } from '../../../../utils/toast.ts';

export function useCreateStudentOnActivity() {
  const navigate = useNavigate();
  return useAsyncCallback(async (studentOnActivity) => {
    try {
      await api.createStudentOnActivity(studentOnActivity);
      toastSuccess(i18n.t('Successfully enrolled on the activity'));
      navigate(-1);
    } catch (e) {
      toastError(i18n.t('Could not enroll the user on the activity'));
    }
  });
}
