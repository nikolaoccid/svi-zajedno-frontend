//TODO implement
import { ErrorMessage, Field, FormikProvider, useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { RiseLoader } from 'react-spinners';
import * as Yup from 'yup';

import { api } from '../../../api';
import { Submenu } from '../../../components/submenu/submenu.tsx';
import { toastError, toastSuccess } from '../../../utils/toast.ts';
import { CenterContent, Form, FormError, FormField, PageContainer } from '../../common-styles/common-styles.ts';
import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { useGetProjectAssociate } from '../../project-associate/manage-project-associate/hooks/use-get-project-associate.ts';
import { useActivity } from './hooks/use-activity.ts';

const validationSchema = Yup.object({
  activityName: Yup.string().required('Ime aktivnosti je obavezno'),
  activityPrice: Yup.number().required('Cijena je obavezna, ako je besplatno staviti 0'),
});

export function ManageActivity() {
  const navigate = useNavigate();
  const { projectAssociateId, activityId, startYear } = useParams();
  const startYearInt = startYear ? parseInt(startYear) : 0;
  const { data: activity } = useActivity(activityId);
  const { data: schoolYear } = useSchoolYear(startYearInt);
  const { data: projectAssociate, isLoading: isLoadingProjectAssociate } = useGetProjectAssociate(projectAssociateId);
  // console.log('schoolYear', schoolYear, 'projectAssociate', projectAssociate, 'activity', activity);

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
      console.log('actityFormData', activityFormData);
      try {
        if (activity && activity.id) {
          await api.updateActivity(activity.id.toString(), activityFormData);
          toastSuccess('Aktivnost uspjesno azurirana.');
          navigate(`/${startYear}/project-associate/${projectAssociateId}`);
        } else {
          await api.createActivity(activityFormData);
          toastSuccess('Aktivnost uspjesno kreirana.');
          navigate(`/${startYear}/project-associate/${projectAssociateId}`);
        }
      } catch (e) {
        toastError('Dogodila se pogreska');
      }
    },
    enableReinitialize: true,
  });

  if (formik.isSubmitting || isLoadingProjectAssociate) {
    return (
      <PageContainer>
        <CenterContent>
          <RiseLoader color="#2196f3" />
        </CenterContent>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <CenterContent>
        <Submenu />
        <h1>{activity !== null ? 'Uredi aktivnosti' : 'Kreiraj novu aktivnost'}</h1>

        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <FormField>
              <label htmlFor="activityName">Naziv aktivnosti</label>
              <input type="text" id="activityName" {...formik.getFieldProps('activityName')} />
              {formik.touched.activityName && formik.errors.activityName ? (
                <FormError>{formik.errors.activityName}</FormError>
              ) : null}
            </FormField>
            <FormField>
              <label htmlFor="activityPrice">Cijena za aktivnost (u EUR)</label>
              <input type="number" id="activityPrice" {...formik.getFieldProps('activityPrice')} />
              {formik.touched.activityPrice && formik.errors.activityPrice ? (
                <FormError>{formik.errors.activityPrice}</FormError>
              ) : null}
            </FormField>

            <FormField>
              <label htmlFor="activityStatus">Status</label>
              <Field as="select" id="activityStatus" {...formik.getFieldProps('activityStatus')}>
                <option value="active">Aktivan</option>
                <option value="pending">U obradi</option>
                <option value="inactive">Neaktivan</option>
              </Field>
              <ErrorMessage name="activityStatus" component="div" />
            </FormField>

            <CenterContent>
              <button type="submit">Pošalji</button>
            </CenterContent>
          </Form>
        </FormikProvider>
      </CenterContent>
    </PageContainer>
  );
}
