import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import * as Yup from 'yup';

import { api } from '../../../api';
import { toastError, toastSuccess } from '../../../utils/toast.ts';
import { CenterContent, PageContainer } from '../../common-styles/common-styles.ts';
import { useGetCategory } from './hooks/use-get-category.ts';

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
  categoryName: Yup.string().required('Ime kategorije je obavezno'),
});

//This component creates and updates category
function ManageCategory() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { data: category } = useGetCategory(categoryId);

  const formik = useFormik({
    initialValues: {
      id: category?.id ?? 0,
      categoryName: category?.categoryName ?? '',
    },
    validationSchema: validationSchema,
    onSubmit: async (formCategory) => {
      console.log('form data', formCategory);
      if (categoryId && category) {
        try {
          await api.updateCategory(category.id.toString(), formCategory);
          await queryClient.invalidateQueries(['getCategories']);
          await queryClient.invalidateQueries(['getCategory']);
          toastSuccess('Kategorija uspjesno azurirana.');
          navigate(-1);
        } catch (e) {
          toastError('Dogodila se pogreska, kategorija nije azurirana.');
        }
      } else {
        try {
          await api.createCategory(formCategory);
          await queryClient.invalidateQueries(['getCategories']);
          await queryClient.invalidateQueries(['getCategory']);
          toastSuccess('Kategorija uspjesno kreirana.');
          navigate(-1);
        } catch (e) {
          toastError('Dogodila se pogreska, kategorija nije kreirana.');
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
            <label htmlFor="categoryName">Ime kategorije</label>
            <input type="text" id="categoryName" {...formik.getFieldProps('categoryName')} />
            {formik.touched.categoryName && formik.errors.categoryName ? (
              <FormError>{formik.errors.categoryName}</FormError>
            ) : null}
          </FormField>

          <CenterContent>
            <button type="submit">Potvrdi</button>
          </CenterContent>
        </Form>
      </CenterContent>
    </PageContainer>
  );
}

export default ManageCategory;
