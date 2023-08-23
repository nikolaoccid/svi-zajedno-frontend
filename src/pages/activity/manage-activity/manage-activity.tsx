//TODO implement
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { RiseLoader } from 'react-spinners';
import * as Yup from 'yup';

import { CenterContent, FormError, FormField, PageContainer } from '../../common-styles/common-styles.ts';
import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { useGetProjectAssociate } from '../../project-associate/manage-project-associate/hooks/use-get-project-associate.ts';
import { useActivity } from './hooks/use-activity.ts';

const validationSchema = Yup.object({
  activityName: Yup.string().required('Ime aktivnosti je obavezno'),
  price: Yup.string().required('Cijena je obavezna, ako je besplatno staviti 0'),
});

export function ManageActivity() {
  const { startYear, projectAssociateId, activityId } = useParams();
  const startYearNumber = startYear ? parseInt(startYear) : undefined;
  const { data: schoolYear, isLoading: isLoadingSchoolYear } = useSchoolYear(startYearNumber);
  const { data: activity } = useActivity(activityId);
  const { data: projectAssociate, isLoading: isLoadingProjectAssociate } = useGetProjectAssociate(projectAssociateId);
  console.log('schoolYear', schoolYear, 'projectAssociate', projectAssociate, 'activity', activity);

  const formik = useFormik({
    initialValues: {
      id: activity?.id ?? 0,
      activityName: activity?.activityName ?? '',
      activityPrice: activity?.activityPrice ?? 0,
      projectAssociateId: projectAssociate?.id,
      activityStatus: activity?.activityStatus ?? 'active',
    },
    validationSchema: validationSchema,
    onSubmit: async (activityFormData) => {
      console.log('actityFormData', activityFormData);
    },
    enableReinitialize: true,
  });

  if (formik.isSubmitting || isLoadingProjectAssociate || isLoadingSchoolYear) {
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
              <input type="text" id="activityPrice" {...formik.getFieldProps('activityPrice')} />
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
