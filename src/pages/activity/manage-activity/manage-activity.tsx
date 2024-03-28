import { ErrorMessage, Field, FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { RiseLoader } from 'react-spinners';
import * as Yup from 'yup';

import { api } from '../../../api';
import { Spinner } from '../../../components/spinner/spinner.tsx';
import { toastError, toastSuccess } from '../../../utils/toast.ts';
import { Button, CenterContent, Form, FormError, FormField, PageContainer } from '../../common-styles/common-styles.ts';
import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { useGetProjectAssociate } from '../../project-associate/manage-project-associate/hooks/use-get-project-associate.ts';
import { useActivity } from './hooks/use-activity.ts';

const validationSchema = Yup.object({
  activityName: Yup.string().required('Ime aktivnosti je obavezno'),
  activityPrice: Yup.number().required('Cijena je obavezna, ako je besplatno staviti 0'),
});

export function ManageActivity() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { projectAssociateId, activityId, startYear } = useParams();
  const startYearInt = startYear ? parseInt(startYear) : 0;
  const { data: activity } = useActivity(activityId);
  const { data: schoolYear } = useSchoolYear(startYearInt);
  const { data: projectAssociate, isLoading: isLoadingProjectAssociate } = useGetProjectAssociate(projectAssociateId);

  const formik = useFormik({
    initialValues: {
      id: activity?.id ?? 0,
      activityName: activity?.activityName ?? '',
      activityPrice: activity?.activityPrice ?? 0,
      projectAssociateId: projectAssociate?.id ?? 0,
      activityStatus: activity?.activityStatus ?? 'active',
      schoolYearId: schoolYear ? schoolYear.id : 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (activityFormData) => {
      try {
        if (activity && activity.id) {
          await api.updateActivity(activity.id.toString(), activityFormData);
          toastSuccess(t('Activity successfully updated'));
          navigate(`/${startYear}/project-associates/${projectAssociateId}`);
        } else {
          await api.createActivity(activityFormData);
          toastSuccess(t('Activity successfully created'));
          navigate(`/${startYear}/project-associates/${projectAssociateId}`);
        }
      } catch (e) {
        toastError(t('Error, try again'));
      }
    },
    enableReinitialize: true,
  });

  if (formik.isSubmitting || isLoadingProjectAssociate) {
    return <Spinner SpinnerComponent={RiseLoader} color={'#2196f3'} />;
  }

  return (
    <PageContainer>
      <CenterContent>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <FormField>
              <label htmlFor="activityName">{t('Activity name')}</label>
              <input type="text" id="activityName" {...formik.getFieldProps('activityName')} />
              {formik.touched.activityName && formik.errors.activityName ? (
                <FormError>{formik.errors.activityName}</FormError>
              ) : null}
            </FormField>
            <FormField>
              <label htmlFor="activityPrice">{t('Activity price (EUR)')}</label>
              <input type="number" id="activityPrice" {...formik.getFieldProps('activityPrice')} />
              {formik.touched.activityPrice && formik.errors.activityPrice ? (
                <FormError>{formik.errors.activityPrice}</FormError>
              ) : null}
            </FormField>

            <FormField>
              <label htmlFor="activityStatus">Status</label>
              <Field as="select" id="activityStatus" {...formik.getFieldProps('activityStatus')}>
                <option value="active">{t('Active')}</option>
                <option value="pending">{t('Pending')}</option>
                <option value="inactive">{t('Inactive')}</option>
              </Field>
              <ErrorMessage name="activityStatus" component="div" />
            </FormField>

            <CenterContent>
              <Button type="submit">{t('Confirm')}</Button>
            </CenterContent>
          </Form>
        </FormikProvider>
      </CenterContent>
    </PageContainer>
  );
}
