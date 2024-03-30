import { useQueryClient } from '@tanstack/react-query';
import { ErrorMessage, Field, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { api } from '../../../api';
import { frontendFormattedDate } from '../../../utils/frontend-formatted-date.ts';
import { toastError, toastSuccess } from '../../../utils/toast.ts';
import { Button, CenterContent, Form, FormError, FormField } from '../../common-styles/common-styles.ts';
import { useSelectedSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { useStudentOnSchoolYear } from '../../student-on-school-year/hooks/get-student-on-school-year.ts';
import { useProjectUser } from './hooks/use-project-user.ts';
import { useStudentOnActivities } from './hooks/use-student-on-activities.ts';
const validationSchema = Yup.object({
  // activityName: Yup.string().required('Ime aktivnosti je obavezno'),
  // activityPrice: Yup.number().required('Cijena je obavezna, ako je besplatno staviti 0'),
});
export function EditUserOnActivity() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { activityId, userId } = useParams();
  const { data: schoolYear } = useSelectedSchoolYear();
  const { data: projectUser } = useProjectUser(userId);
  const { data: studentOnSchoolYear } = useStudentOnSchoolYear(schoolYear?.id, projectUser?.id);
  const queryClient = useQueryClient();
  const { data: studentOnActivities } = useStudentOnActivities((studentOnSchoolYear as any)?.id);

  const activity = studentOnActivities?.filter((activity) => activity.id === parseInt(activityId ?? '0'))[0];
  const [disableUnenrollmentDate, setDisableUnenrollmentDate] = useState(
    activity?.activityStatus !== 'inactive' ?? false,
  );
  const formik = useFormik({
    initialValues: {
      id: activity?.activity?.id ?? 0,
      activityName: activity?.activity?.activityName ?? '',
      activityPrice: activity?.activity?.activityPrice ?? 0,
      actualActivityCost: activity?.actualActivityCost ?? 0,
      activityStatus: activity?.activityStatus ?? 'active',
      enrollmentDate: frontendFormattedDate(activity?.enrollmentDate ?? activity?.createdAt),
      unenrollmentDate: frontendFormattedDate(activity?.unenrollmentDate),
    },
    validationSchema: validationSchema,
    onSubmit: async (activityFormData) => {
      try {
        await api.updateStudentOnActivity((activity?.id ?? '').toString(), {
          id: activity?.id ?? 0,
          activityStatus: activityFormData.activityStatus,
          studentOnSchoolYearId: activity?.studentOnSchoolYearId,
          actualActivityCost: activityFormData.actualActivityCost,
          enrollmentDate: activityFormData.enrollmentDate,
          unenrollmentDate:
            activityFormData.activityStatus === 'inactive' ? activityFormData.unenrollmentDate : undefined,
        });
        await queryClient.invalidateQueries(['getStudentOnActivities']);
        toastSuccess(t('Operation successful'));
        navigate(-1);
      } catch (e) {
        toastError(t('Error, try again'));
        console.log(e);
      }
    },
    enableReinitialize: true,
  });
  const associateInfo = `${activity?.activity?.activityName}, ${activity?.activity?.projectAssociate?.clubName}, ${
    activity?.activity?.activityPrice !== 0 ? activity?.activity?.activityPrice + 'EUR' : t('Free')
  }`;
  const projectUserInfo = `${projectUser?.childName} ${projectUser?.childSurname}`;

  function shouldDisableUnenrollmentDate(e) {
    const activityStatus = e?.target?.value;
    if (activityStatus !== 'inactive') {
      setDisableUnenrollmentDate(true);
    } else {
      setDisableUnenrollmentDate(false);
    }
  }

  return (
    <>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <FormField>
            <label>{t("Guardian's details")}</label>
            <input value={associateInfo} disabled />
          </FormField>
          <FormField>
            <label>{t("Child's details")}</label>
            <input type={'text'} value={projectUserInfo} disabled />
          </FormField>

          <FormField onChange={shouldDisableUnenrollmentDate}>
            <label htmlFor="activityStatus">Status</label>
            <Field as="select" id="activityStatus" {...formik.getFieldProps('activityStatus')}>
              <option value="active">{t('Active')}</option>
              <option value="pending">{t('Pending')}</option>
              <option value="inactive">{t('Inactive')}</option>
            </Field>
            <ErrorMessage name="activityStatus" component="div" />
          </FormField>

          <FormField>
            <label htmlFor="actualActivityCost">{t('Actual activity price (EUR)')}</label>
            <input type="number" id="actualActivityCost" {...formik.getFieldProps('actualActivityCost')} />
            {formik.touched.actualActivityCost && formik.errors.actualActivityCost ? (
              <FormError>{formik.errors.actualActivityCost}</FormError>
            ) : null}
          </FormField>

          <FormField>
            <label htmlFor="enrollmentDate">{t('Enrollment date')}</label>
            <input type="date" id="enrollmentDate" {...formik.getFieldProps('enrollmentDate')} />
            {formik.touched.enrollmentDate && formik.errors.enrollmentDate ? (
              <FormError>{formik.errors.enrollmentDate}</FormError>
            ) : null}
          </FormField>

          <FormField>
            <label htmlFor="unenrollmentDate">{t('Activity withdrawal date')}</label>
            <input
              type="date"
              id="unenrollmentDate"
              {...formik.getFieldProps('unenrollmentDate')}
              disabled={disableUnenrollmentDate}
            />
            {formik.touched.unenrollmentDate && formik.errors.unenrollmentDate ? (
              <FormError>{formik.errors.unenrollmentDate}</FormError>
            ) : null}
          </FormField>

          <CenterContent>
            <Button type="submit">{t('Confirm')}</Button>
          </CenterContent>
        </Form>
      </FormikProvider>
    </>
  );
}
