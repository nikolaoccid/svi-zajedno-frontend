import styled from '@emotion/styled';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import * as Yup from 'yup';

import { api } from '../../../api';
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
const Item = styled.div`
  display: flex;
  gap: 25px;
`;
const TableLink = styled(Link)`
  color: black;
  text-decoration: none;
  &:hover {
    color: #e74c3c;
    text-decoration: underline;
  }
`;
export function SearchUser(): JSX.Element {
  const [projectUser, setProjectUser] = useState<any>([]);
  const [fetched, setFetched] = useState(false);
  const formik = useFormik({
    initialValues: {
      search: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (formCategory) => {
      console.log(formCategory);
      const res = await api.getProjectUserByQuery(formCategory.search);
      setProjectUser(res);
      setFetched(true);
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
        {fetched && projectUser.length === 0 && <FormError>Nema rezultata za vas upit</FormError>}
        {fetched &&
          projectUser &&
          projectUser.map((item) => (
            <TableLink to="/" key={item.id}>
              <Item>
                {item?.childName} {item?.childSurname}
              </Item>
            </TableLink>
          ))}
      </CenterContent>
    </PageContainer>
  );
}
