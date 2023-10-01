import { ErrorMessage, Field, FormikProvider, useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import * as Yup from 'yup';

import { Submenu } from '../../../components/submenu/submenu.tsx';
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
  const navigate = useNavigate();
  const { userId, startYear } = useParams();
  const { data: schoolYear, isLoading: isLoadingSchoolYear } = useSchoolYear(startYear ? parseInt(startYear) : 0);
  const schoolYearId = (schoolYear && schoolYear[0].id) ?? 0;
  const { data: projectUser, isLoading } = useProjectUser(userId);
  const { data: studentOnSchoolYear } = useStudentOnSchoolYear(schoolYearId, projectUser?.id);
  const { isLoading: isLoadingCreateStudentOnSchoolYear, createStudentOnSchoolYear } = useCreateStudentOnSchoolYear(
    projectUser?.id ?? 0,
    schoolYearId,
  );
  const { updateStudentOnSchoolYear, isLoading: isLoadingUpdateStudentOnSchoolYear } = useUpdateStudentOnSchoolYear();
  const formik = useFormik({
    initialValues: {
      sourceSystem: (studentOnSchoolYear && studentOnSchoolYear[0] && studentOnSchoolYear[0].sourceSystem) ?? 'czss',
      protectionType: (studentOnSchoolYear && studentOnSchoolYear[0] && studentOnSchoolYear[0].protectionType) ?? 'zmn',
      dateOfEnrollment:
        studentOnSchoolYear &&
        studentOnSchoolYear[0] &&
        frontendFormattedDate(studentOnSchoolYear[0].dateOfEnrollment || frontendFormattedDate()),
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (formData) => {
      console.log('onsubmit', formData);
      console.log('studentOnSchoolYear', studentOnSchoolYear);
      if (studentOnSchoolYear?.length === 0) {
        try {
          await createStudentOnSchoolYear(formData.sourceSystem, formData.protectionType, formData.dateOfEnrollment);
          navigate(-1);
        } catch (e) {
          console.log(e);
        }
      }
      const enrollment = studentOnSchoolYear?.[0];
      if (formData && enrollment) {
        await updateStudentOnSchoolYear(enrollment.id.toString(), {
          ...enrollment,
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
    return (
      <PageContainer>
        <CenterContent>
          <PuffLoader color="#2196f3" />
        </CenterContent>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <CenterContent>
        <Submenu />
        <h1>Upisi korisnika na skolsku godinu</h1>

        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <FormField>
              <label htmlFor="sourceSystem">Izvorisni sustav </label>
              <Field as="select" id="sourceSystem" {...formik.getFieldProps('sourceSystem')}>
                <option value="czss">CZSS</option>
                <option value="obiteljskicentar">Obiteljski centar</option>
              </Field>
              <ErrorMessage name="sourceSystem" component="div" />
            </FormField>

            <FormField>
              <label htmlFor="protectionType">Osnova za prijam </label>
              <Field as="select" id="protectionType" {...formik.getFieldProps('protectionType')}>
                <option value="zmn">ZMN</option>
                <option value="preporuka">Preporuka</option>
                <option value="udomiteljstvo">Udomiteljstvo</option>
              </Field>
              <ErrorMessage name="protectionType" component="div" />
            </FormField>

            <FormField>
              <label htmlFor="dateOfEnrollment">Datum upisa </label>
              <Field type="date" id="dateOfEnrollment" {...formik.getFieldProps('dateOfEnrollment')} />
              <ErrorMessage name="dateOfEnrollment" component="div" />
            </FormField>

            <CenterContent>
              <button type="submit">Pošalji</button>
            </CenterContent>
          </Form>
        </FormikProvider>
      </CenterContent>
    </PageContainer>
  );
};
