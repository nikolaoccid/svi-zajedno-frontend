import styled from '@emotion/styled';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { CenterContent, PageContainer } from '../../common-styles/common-styles.ts';

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
export const CreateProjectUser = () => {
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

  const formik = useFormik({
    initialValues: {
      oib: '',
      guardianName: '',
      guardianSurname: '',
      childName: '',
      childSurname: '',
      dateOfBirth: '',
      address: '',
      city: '',
      school: '',
      mobilePhone: '',
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Forma poslana:', values);
    },
  });

  return (
    <PageContainer>
      <CenterContent>
        <h1>Kreiraj novog korisnika</h1>
        <Form onSubmit={formik.handleSubmit}>
          <FormField>
            <label htmlFor="guardianName">Ime skrbnika</label>
            <input type="text" id="guardianName" name="guardianName" {...formik.getFieldProps('guardianName')} />
            {formik.touched.guardianName && formik.errors.guardianName ? (
              <FormError>{formik.errors.guardianName}</FormError>
            ) : null}
          </FormField>

          <FormField>
            <label htmlFor="guardianSurname">Prezime skrbnika</label>
            <input
              type="text"
              id="guardianSurname"
              name="guardianSurname"
              {...formik.getFieldProps('guardianSurname')}
            />
            {formik.touched.guardianSurname && formik.errors.guardianSurname ? (
              <FormError>{formik.errors.guardianSurname}</FormError>
            ) : null}
          </FormField>
          <FormField>
            <label htmlFor="oib">OIB djeteta</label>
            <input type="text" id="oib" name="oib" {...formik.getFieldProps('oib')} />
            {formik.touched.oib && formik.errors.oib ? <FormError>{formik.errors.oib}</FormError> : null}
          </FormField>

          <FormField>
            <label htmlFor="childName">Ime djeteta</label>
            <input type="text" id="childName" name="childName" {...formik.getFieldProps('childName')} />
            {formik.touched.childName && formik.errors.childName ? (
              <FormError>{formik.errors.childName}</FormError>
            ) : null}
          </FormField>

          <FormField>
            <label htmlFor="childSurname">Prezime djeteta</label>
            <input type="text" id="childSurname" name="childSurname" {...formik.getFieldProps('childSurname')} />
            {formik.touched.childSurname && formik.errors.childSurname ? (
              <FormError>{formik.errors.childSurname}</FormError>
            ) : null}
          </FormField>

          <FormField>
            <label htmlFor="dateOfBirth">Datum rođenja</label>
            <input type="text" id="dateOfBirth" name="dateOfBirth" {...formik.getFieldProps('dateOfBirth')} />
            {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
              <FormError>{formik.errors.dateOfBirth}</FormError>
            ) : null}
          </FormField>

          <FormField>
            <label htmlFor="mobilePhone">Broj mobitela</label>
            <input type="text" id="mobilePhone" name="mobilePhone" {...formik.getFieldProps('mobilePhone')} />
            {formik.touched.mobilePhone && formik.errors.mobilePhone ? (
              <FormError>{formik.errors.mobilePhone}</FormError>
            ) : null}
          </FormField>

          <FormField>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" {...formik.getFieldProps('email')} />
            {formik.touched.email && formik.errors.email ? <FormError>{formik.errors.email}</FormError> : null}
          </FormField>

          <FormField>
            <label htmlFor="address">Adresa</label>
            <input type="text" id="address" name="address" {...formik.getFieldProps('address')} />
            {formik.touched.address && formik.errors.address ? <FormError>{formik.errors.address}</FormError> : null}
          </FormField>

          <FormField>
            <label htmlFor="city">Grad</label>
            <input type="text" id="city" name="city" {...formik.getFieldProps('city')} />
            {formik.touched.city && formik.errors.city ? <FormError>{formik.errors.city}</FormError> : null}
          </FormField>

          <FormField>
            <label htmlFor="school">Škola</label>
            <input type="text" id="school" name="school" {...formik.getFieldProps('school')} />
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

export default CreateProjectUser;
