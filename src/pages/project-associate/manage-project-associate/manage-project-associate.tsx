import styled from '@emotion/styled';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import * as Yup from 'yup';

import { api } from '../../../api';
import { toastError, toastSuccess } from '../../../utils/toast.ts';
import { CenterContent, PageContainer } from '../../common-styles/common-styles.ts';
import { useSchoolYear, useSchoolYearFromParams } from '../../dashboard-page/hooks/use-fetch-school-year.ts';

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

const validationSchema = Yup.object().shape({
  clubName: Yup.string().required('Ime kluba je obavezno'),
  email: Yup.string().email('Invalid email').required('Email je obavezan'),
  mobilePhone: Yup.string().required('Broj mobilnog telefona je obavezan'),
  contactPerson: Yup.string().required('Kontakt osoba je obavezna'),
  address: Yup.string().required('Adresa je obavezna'),
  city: Yup.string().required('Grad je obavezan'),
});

//This component creates and updates project associate
export const ManageProjectAssociate = () => {
  const navigate = useNavigate();
  const { projectAssociateId } = useParams();
  const schoolYearFromParams = useSchoolYearFromParams();

  const formik = useFormik({
    initialValues: {
      id: 0,
      clubName: '',
      email: '',
      mobilePhone: '',
      contactPerson: '',
      address: '',
      city: '',
      projectAssociateStatus: '',
      categoryId: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (formData) => {
      console.log('formData', formData);
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
        <h1>{true ? 'Uredi korisnika' : 'Kreiraj novog korisnika'}</h1>

        <Form onSubmit={formik.handleSubmit}>
          <FormField>
            <label htmlFor="clubName">Ime organizacije</label>
            <input type="text" id="clubName" {...formik.getFieldProps('clubName')} />
            {formik.touched.clubName && formik.errors.clubName ? <FormError>{formik.errors.clubName}</FormError> : null}
          </FormField>

          <FormField>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" {...formik.getFieldProps('email')} />
            {formik.touched.email && formik.errors.email ? <FormError>{formik.errors.email}</FormError> : null}
          </FormField>
          <FormField>
            <label htmlFor="mobilePhone">Mobile phone</label>
            <input type="tel" id="mobilePhone" {...formik.getFieldProps('mobilePhone')} />
            {formik.touched.mobilePhone && formik.errors.mobilePhone ? (
              <FormError>{formik.errors.mobilePhone}</FormError>
            ) : null}
          </FormField>

          <FormField>
            <label htmlFor="contactPerson">Kontakt osoba</label>
            <input type="text" id="contactPerson" {...formik.getFieldProps('contactPerson')} />
            {formik.touched.contactPerson && formik.errors.contactPerson ? (
              <FormError>{formik.errors.contactPerson}</FormError>
            ) : null}
          </FormField>

          <FormField>
            <label htmlFor="childSurname">Adresa</label>
            <input type="text" id="address" {...formik.getFieldProps('address')} />
            {formik.touched.address && formik.errors.address ? <FormError>{formik.errors.address}</FormError> : null}
          </FormField>

          <FormField>
            <label htmlFor="city">Grad</label>
            <input type="text" id="city" {...formik.getFieldProps('city')} />
            {formik.touched.city && formik.errors.city ? <FormError>{formik.errors.city}</FormError> : null}
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
            <label htmlFor="school">Status</label>
            <input type="text" id="projectAssociateStatus" {...formik.getFieldProps('projectAssociateStatus')} />
            {formik.touched.projectAssociateStatus && formik.errors.projectAssociateStatus ? (
              <FormError>{formik.errors.projectAssociateStatus}</FormError>
            ) : null}
          </FormField>

          <FormField>
            <label htmlFor="category">Kategorija</label>
            <input type="text" id="categoryId" {...formik.getFieldProps('categoryId')} />
            {formik.touched.categoryId && formik.errors.categoryId ? (
              <FormError>{formik.errors.categoryId}</FormError>
            ) : null}
          </FormField>

          <CenterContent>
            <button type="submit">Pošalji</button>
          </CenterContent>
        </Form>
      </CenterContent>
    </PageContainer>
  );
};

export default ManageProjectAssociate;
