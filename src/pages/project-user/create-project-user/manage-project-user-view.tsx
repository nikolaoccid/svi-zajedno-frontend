import styled from '@emotion/styled';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import * as Yup from 'yup';

import { api } from '../../../api';
import { toastError, toastSuccess } from '../../../utils/toast.ts';
import { CenterContent, PageContainer } from '../../common-styles/common-styles.ts';
import { useSchoolYear, useSchoolYearFromParams } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { useGetProjectUser } from './hooks/use-get-project-user.ts';

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 45px;
  width: 100%;
`;

const FormError = styled.div`
  color: #e74c3c;
  font-weight: 500;
`;
const validationSchema = Yup.object({
  oib: Yup.string().required('OIB je obavezan').length(11, 'OIB mora imati točno 11 znakova'),
  guardianName: Yup.string().required('Ime skrbnika je obavezno'),
  guardianSurname: Yup.string().required('Prezime skrbnika je obavezno'),
  childName: Yup.string().required('Ime djeteta je obavezno'),
  childSurname: Yup.string().required('Prezime djeteta je obavezno'),
  dateOfBirth: Yup.string().required('Datum rođenja je obavezan'),
  address: Yup.string().required('Adresa je obavezna'),
  city: Yup.string().required('Grad je obavezan'),
  school: Yup.string().notRequired(), // Optional field
  mobilePhone: Yup.string().required('Broj mobitela je obavezan'),
  email: Yup.string().email('Neispravna email adresa').required('Email je obavezan'),
});
//This component creates and updates project user
export const ManageProjectUserView = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const schoolYearFromParams = useSchoolYearFromParams();
  const { data: projectUser } = useGetProjectUser(userId);
  const { data: currentSchoolYear } = useSchoolYear(schoolYearFromParams);

  const formik = useFormik({
    initialValues: {
      id: projectUser?.id ?? 0,
      oib: projectUser?.oib ?? '',
      guardianName: projectUser?.guardianName ?? '',
      guardianSurname: projectUser?.guardianSurname ?? '',
      childName: projectUser?.childName ?? '',
      childSurname: projectUser?.childSurname ?? '',
      dateOfBirth: projectUser?.dateOfBirth ?? '',
      address: projectUser?.address ?? '',
      city: projectUser?.city ?? '',
      school: projectUser?.school ?? '',
      mobilePhone: projectUser?.mobilePhone ?? '',
      email: projectUser?.email ?? '',
    },
    validationSchema: validationSchema,
    onSubmit: async (formData) => {
      if (userId && projectUser && projectUser.oib) {
        try {
          await api.updateProjectUser(userId, formData);
          toastSuccess('Korisnik azuriran');
        } catch (e) {
          toastError('Korisnik nije azuriran, pokusajte ponovno');
        }
      } else {
        try {
          const user = await api.createProjectUser(formData);
          console.log('create form user', user);
          console.log('create form schoolyear', currentSchoolYear);
          user && currentSchoolYear && (await api.createProjetUserOnSchoolYear(user.id, currentSchoolYear[0].id));
          toastSuccess('Korisnik kreiran');
          navigate(`/${schoolYearFromParams}/dashboard`);
        } catch (e) {
          toastError('Korisnik nije kreiran, pokusajte ponovno');
        }
      }
    },
    enableReinitialize: true,
  });

  if (formik.isSubmitting) {
    return (
      <PageContainer>
        <CenterContent>
          <CircleLoader color="#2196f3" />
        </CenterContent>
      </PageContainer>
    );
  }
  return (
    <PageContainer>
      <CenterContent>
        <h1>{projectUser ? 'Uredi korisnika' : 'Kreiraj novog korisnika'}</h1>

        <Form onSubmit={formik.handleSubmit}>
          <FormField>
            <label htmlFor="guardianName">Ime skrbnika</label>
            <input type="text" id="guardianName" {...formik.getFieldProps('guardianName')} />
            {formik.touched.guardianName && formik.errors.guardianName ? (
              <FormError>{formik.errors.guardianName}</FormError>
            ) : null}
          </FormField>

          <FormField>
            <label htmlFor="guardianSurname">Prezime skrbnika</label>
            <input type="text" id="guardianSurname" {...formik.getFieldProps('guardianSurname')} />
            {formik.touched.guardianSurname && formik.errors.guardianSurname ? (
              <FormError>{formik.errors.guardianSurname}</FormError>
            ) : null}
          </FormField>
          <FormField>
            <label htmlFor="oib">OIB djeteta</label>
            <input type="text" id="oib" {...formik.getFieldProps('oib')} />
            {formik.touched.oib && formik.errors.oib ? <FormError>{formik.errors.oib}</FormError> : null}
          </FormField>

          <FormField>
            <label htmlFor="childName">Ime djeteta</label>
            <input type="text" id="childName" {...formik.getFieldProps('childName')} />
            {formik.touched.childName && formik.errors.childName ? (
              <FormError>{formik.errors.childName}</FormError>
            ) : null}
          </FormField>

          <FormField>
            <label htmlFor="childSurname">Prezime djeteta</label>
            <input type="text" id="childSurname" {...formik.getFieldProps('childSurname')} />
            {formik.touched.childSurname && formik.errors.childSurname ? (
              <FormError>{formik.errors.childSurname}</FormError>
            ) : null}
          </FormField>

          <FormField>
            <label htmlFor="dateOfBirth">Datum rođenja</label>
            <input type="text" id="dateOfBirth" {...formik.getFieldProps('dateOfBirth')} />
            {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
              <FormError>{formik.errors.dateOfBirth}</FormError>
            ) : null}
          </FormField>

          <FormField>
            <label htmlFor="mobilePhone">Broj mobitela</label>
            <input type="text" id="mobilePhone" {...formik.getFieldProps('mobilePhone')} />
            {formik.touched.mobilePhone && formik.errors.mobilePhone ? (
              <FormError>{formik.errors.mobilePhone}</FormError>
            ) : null}
          </FormField>

          <FormField>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" {...formik.getFieldProps('email')} />
            {formik.touched.email && formik.errors.email ? <FormError>{formik.errors.email}</FormError> : null}
          </FormField>

          <FormField>
            <label htmlFor="address">Adresa</label>
            <input type="text" id="address" {...formik.getFieldProps('address')} />
            {formik.touched.address && formik.errors.address ? <FormError>{formik.errors.address}</FormError> : null}
          </FormField>

          <FormField>
            <label htmlFor="city">Grad</label>
            <input type="text" id="city" {...formik.getFieldProps('city')} />
            {formik.touched.city && formik.errors.city ? <FormError>{formik.errors.city}</FormError> : null}
          </FormField>

          <FormField>
            <label htmlFor="school">Škola</label>
            <input type="text" id="school" {...formik.getFieldProps('school')} />
            {formik.touched.school && formik.errors.school ? <FormError>{formik.errors.school}</FormError> : null}
          </FormField>

          <CenterContent>
            <button type="submit">Pošalji</button>
          </CenterContent>
        </Form>
      </CenterContent>
    </PageContainer>
  );
};

export default ManageProjectUserView;
