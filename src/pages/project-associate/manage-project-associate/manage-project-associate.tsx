import { useQueryClient } from '@tanstack/react-query';
import { ErrorMessage, Field, FormikProvider, useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import * as Yup from 'yup';

import { api } from '../../../api';
import { toastError, toastSuccess } from '../../../utils/toast.ts';
import { Button, CenterContent, Form, FormError, FormField, PageContainer } from '../../common-styles/common-styles.ts';
import { useGetCategories } from './hooks/use-get-categories.ts';
import { useGetProjectAssociate } from './hooks/use-get-project-associate.ts';

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
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { projectAssociateId } = useParams();
  const { data: projectAssociate } = useGetProjectAssociate(projectAssociateId);
  const { data: categories } = useGetCategories('');

  const formik = useFormik({
    initialValues: {
      id: projectAssociate?.id ?? 0,
      clubName: projectAssociate?.clubName ?? '',
      email: projectAssociate?.email ?? '',
      mobilePhone: projectAssociate?.mobilePhone ?? '',
      contactPerson: projectAssociate?.contactPerson ?? '',
      address: projectAssociate?.address ?? '',
      city: projectAssociate?.city ?? '',
      projectAssociateStatus: projectAssociate?.projectAssociateStatus ?? 'active',
      categoryId: projectAssociate?.categoryId ?? 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (formAssociate) => {
      if (projectAssociateId && projectAssociate) {
        try {
          await api.updateProjectAssociate(projectAssociate.id, formAssociate);
          await queryClient.invalidateQueries({ queryKey: ['getProjectAssociateById'] });
          toastSuccess('Suradnik uspjesno azuriran.');
          navigate(-1);
        } catch (e) {
          toastError('Dogodila se pogreska, suradnik nije azuriran');
        }
      } else {
        try {
          await api.createProjectAssociate(formAssociate);
          toastSuccess('Suradnik uspjesno kreiran.');
          navigate(-1);
        } catch (e) {
          toastError('Dogodila se pogreska, suradnik nije kreiran.');
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
            <label htmlFor="mobilePhone">Mobitel</label>
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

          <FormikProvider value={formik}>
            <FormField>
              <label htmlFor="projectAssociateStatus">Status</label>
              <Field as="select" id="projectAssociateStatus" {...formik.getFieldProps('projectAssociateStatus')}>
                <option value="active">Aktivan</option>
                <option value="pending">U obradi</option>
                <option value="inactive">Neaktivan</option>
              </Field>
              <ErrorMessage name="projectAssociateStatus" component="div" />
            </FormField>

            <FormField>
              <label htmlFor="categoryId">Kategorija</label>
              <Field as="select" id="categoryId" {...formik.getFieldProps('categoryId')}>
                <option value="">Odaberi kategoriju</option>
                {categories &&
                  (categories as any).map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option>
                  ))}
              </Field>
              <ErrorMessage name="categoryId" component="div" />
            </FormField>
          </FormikProvider>

          <CenterContent>
            <Button type="submit">Pošalji</Button>
          </CenterContent>
        </Form>
      </CenterContent>
    </PageContainer>
  );
};

export default ManageProjectAssociate;
