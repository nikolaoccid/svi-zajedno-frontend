import { ErrorMessage, Field, FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import * as Yup from 'yup';

import { Spinner } from '../../../components/spinner/spinner.tsx';
import { frontendFormattedDate } from '../../../utils/frontend-formatted-date.ts';
import { CenterContent, Form, FormField, PageContainer } from '../../common-styles/common-styles.ts';
import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { useStudentOnSchoolYear } from '../../student-on-school-year/hooks/get-student-on-school-year.ts';
import { useCreateStudentOnSchoolYear } from '../user-view/hooks/use-create-student-on-school-year.ts';
import { useProjectUser } from '../user-view/hooks/use-project-user.ts';
import { useUpdateStudentOnSchoolYear } from '../user-view/hooks/use-update-student-on-school-year.ts';

const validationSchema = Yup.object({
  sourceSystem: Yup.string().required('Izvorisni sustav mora biti odabran'),
  protectionType: Yup.string().required('Osnova mora biti odabrana'),
  dateOfEnrollment: Yup.date().required('Datum upisa je obavezan'),
});
export const EnrollStudentOnSchoolYear = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userId, startYear } = useParams();
  const { data: schoolYear, isLoading: isLoadingSchoolYear } = useSchoolYear(startYear ? parseInt(startYear) : 0);
  const schoolYearId = (schoolYear && schoolYear.id) ?? 0;
  const { data: projectUser, isLoading } = useProjectUser(userId);
  const { data: studentOnSchoolYear } = useStudentOnSchoolYear(schoolYearId, projectUser?.id);
  const { isLoading: isLoadingCreateStudentOnSchoolYear, createStudentOnSchoolYear } = useCreateStudentOnSchoolYear(
    projectUser?.id ?? 0,
    schoolYearId,
  );
  const { updateStudentOnSchoolYear, isLoading: isLoadingUpdateStudentOnSchoolYear } = useUpdateStudentOnSchoolYear();
  const formik = useFormik({
    initialValues: {
      sourceSystem:
        (studentOnSchoolYear && studentOnSchoolYear && (studentOnSchoolYear as any).sourceSystem) ?? 'odaberi',
      protectionType:
        (studentOnSchoolYear && studentOnSchoolYear && (studentOnSchoolYear as any).protectionType) ?? 'odaberi',
      dateOfEnrollment:
        (studentOnSchoolYear && frontendFormattedDate((studentOnSchoolYear as any).dateOfEnrollment)) ||
        frontendFormattedDate(),
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (formData) => {
      console.log('enrollStudentOnSchoolYear formData', formData);
      if (!studentOnSchoolYear) {
        try {
          await createStudentOnSchoolYear(formData.sourceSystem, formData.protectionType, formData.dateOfEnrollment);
          navigate(-1);
        } catch (e) {
          console.log(e);
        }
      }
      const enrollment = studentOnSchoolYear;
      if (formData && enrollment) {
        await updateStudentOnSchoolYear((enrollment as any).id.toString(), {
          ...(enrollment as any),
          status: 'active',
          protectionType: formData.protectionType,
          sourceSystem: formData.sourceSystem,
          dateOfEnrollment: formData.dateOfEnrollment,
        });
        navigate(-1);
      }
    },
  });

  if (
    isLoading ||
    isLoadingSchoolYear ||
    isLoadingCreateStudentOnSchoolYear ||
    isLoadingUpdateStudentOnSchoolYear ||
    formik.getFieldProps('sourceSystem') === undefined
  ) {
    return <Spinner SpinnerComponent={PuffLoader} color={'#2196f3'} />;
  }

  return (
    <PageContainer>
      <CenterContent>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <FormField>
              <label>{t("Child's full name")}</label>
              <input type="text" value={`${projectUser?.childName} ${projectUser?.childSurname}`} disabled />
            </FormField>

            <FormField>
              <label htmlFor="sourceSystem">{t('User source system')} </label>
              <Field as="select" id="sourceSystem" {...formik.getFieldProps('sourceSystem')}>
                <option defaultChecked value="odaberi">
                  {t('Choose source system')}
                </option>
                <option value="czss">{t('Social welfare')}</option>
                <option value="obiteljskicentar">{t('Family center')}</option>
              </Field>
              <ErrorMessage name="sourceSystem" component="div" />
            </FormField>

            <FormField>
              <label htmlFor="protectionType">{t('Enrollment basis')} </label>
              <Field as="select" id="protectionType" {...formik.getFieldProps('protectionType')}>
                <option defaultChecked value="odaberi">
                  {t('Choose enrollment basis')}
                </option>
                <option value="zmn">{t('ZMN')}</option>
                <option value="preporuka">{t('Recommendation')}</option>
                <option value="udomiteljstvo">{t('Foster parents')}</option>
              </Field>
              <ErrorMessage name="protectionType" component="div" />
            </FormField>

            <FormField>
              <label htmlFor="dateOfEnrollment">{t('Enrollment date')} </label>
              <Field type="date" id="dateOfEnrollment" {...formik.getFieldProps('dateOfEnrollment')} />
              <ErrorMessage name="dateOfEnrollment" component="div" />
            </FormField>

            <CenterContent>
              <button type="submit">{t('Confirm')}</button>
            </CenterContent>
          </Form>
        </FormikProvider>
      </CenterContent>
    </PageContainer>
  );
};
