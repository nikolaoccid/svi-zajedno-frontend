import styled from '@emotion/styled';
import { useFormik } from 'formik';
import { useState } from 'react';
import { PacmanLoader } from 'react-spinners';
import * as Yup from 'yup';

import { api } from '../../../api';
import ProjectAssociateTable from '../../../components/project-associate-table/project-asociate-tabel.tsx';
import { CenterContent, PageContainer } from '../../common-styles/common-styles.ts';

const validationSchema = Yup.object().shape({
  search: Yup.string().required('Unos je obavezan'),
});
const FormField = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  gap: 10px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: row;
  gap: 45px;
  width: 100%;
`;
const FormError = styled.div`
  color: #e74c3c;
  font-weight: 500;
`;
const FormContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;
export function SearchUser(): JSX.Element {
  const [projectUser, setProjectUser] = useState({});
  const [fetched, setFetched] = useState(false);
  const formik = useFormik({
    initialValues: {
      search: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (formCategory) => {
      console.log(formCategory);
      const res = await api.getProjectAssociateByQuery(formCategory.search);
      if (res) {
        setProjectUser(res);
        setFetched(true);
      }

      console.log(res);
    },
    enableReinitialize: false,
  });

  if (formik.isSubmitting) {
    return (
      <PageContainer>
        <CenterContent>
          <PacmanLoader color="#2196f3" />
        </CenterContent>
      </PageContainer>
    );
  }
  return (
    <PageContainer>
      <CenterContent>
        <h1>Pronadi korisnika projekta</h1>
        <Form onSubmit={formik.handleSubmit}>
          <FormField>
            <label htmlFor="search">Pronadi korisnika projekta</label>
            <FormContent>
              <input type="text" id="search" {...formik.getFieldProps('search')} />
              <button type="submit">&#x1F50E;</button>
            </FormContent>
            {formik.touched.search && formik.errors.search ? <FormError>{formik.errors.search}</FormError> : null}
          </FormField>
        </Form>
        {fetched && <ProjectAssociateTable data={projectUser} goTo="/" />}
      </CenterContent>
    </PageContainer>
  );
}
