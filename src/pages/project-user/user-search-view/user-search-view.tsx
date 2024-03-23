import styled from '@emotion/styled';
import { ErrorMessage, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClockLoader } from 'react-spinners';
import * as Yup from 'yup';

import { api } from '../../../api';
import { Submenu } from '../../../components/submenu/submenu.tsx';
import { AlignRight, CenterContent, PageContainer, SecondaryButton } from '../../common-styles/common-styles';
import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { ColoredTableRow } from '../../project-associate/project-associate-search-view/project-associate-search-view.tsx';
import { useProjectUsers } from '../user-view/hooks/use-project-users.ts';

const validationSchema = Yup.object().shape({
  search: Yup.string().required('Unos je obavezan'),
});

const TableWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    padding: 10px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
`;

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

const Pagination = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  padding-top: 20px;
`;

const UserSearchView = () => {
  const { startYear } = useParams();
  const navigate = useNavigate();
  const { data: schoolYear } = useSchoolYear(startYear ? parseInt(startYear ?? '0') : 0);
  const [currentPage, setCurrentPage] = useState(1);
  const { loading: isLoading, error: isError, execute: getProjectUsersPage } = useProjectUsers(currentPage);

  const [fetched, setFetched] = useState(false);
  const [queryResults, setQueryResults] = useState<any>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const formik = useFormik({
    initialValues: {
      search: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (formCategory) => {
      const res = await api.getProjectUserByQuery(formCategory.search, schoolYear?.id);
      setQueryResults(res);
      setFetched(true);
      setTotalPages(1);
    },
    enableReinitialize: false,
  });
  const onFormReset = async () => {
    formik.resetForm();

    const response = await getProjectUsersPage();
    setQueryResults((response as any).items);
    setTotalPages((response as any).meta.totalPages);
    setFetched(true);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await getProjectUsersPage();
      setQueryResults((response as any).items);
      setTotalPages((response as any).meta.totalPages);
      setFetched(true);
    };
    getData();
  }, [currentPage, getProjectUsersPage]);

  return (
    <PageContainer>
      <CenterContent>
        <Submenu />
        <h1>Korisnici</h1>
        <AlignRight>
          <SecondaryButton onClick={() => navigate(`/${schoolYear ? schoolYear?.startYear : 0}/user/new`)}>
            Kreiraj novog korisnika
          </SecondaryButton>
        </AlignRight>
        <Form onSubmit={formik.handleSubmit}>
          <FormField>
            <label htmlFor="search">Pronadi korisnika</label>
            <FormContent>
              <input type="text" id="search" {...formik.getFieldProps('search')} />
              <button type="submit">&#x1F50E;</button>
              <button type="reset" onClick={onFormReset}>
                Ponisti
              </button>
            </FormContent>
            {formik.touched.search && formik.errors.search && <FormError>{formik.errors.search}</FormError>}
          </FormField>
        </Form>
        {fetched ? (
          <TableWrapper>
            <StyledTable>
              <thead>
                <tr>
                  <th>Dijete</th>
                  <th>Skrbnik</th>
                  <th>Datum rodenja</th>
                </tr>
              </thead>
              <tbody>
                {queryResults.map((user, index) => (
                  <ColoredTableRow
                    key={user.id}
                    isEven={index % 2 === 0}
                    onClick={() => navigate(`/${startYear}/user/${user.id}`)}
                  >
                    <td>
                      <b>
                        {user.childName} {user.childSurname}
                      </b>
                    </td>
                    <td>
                      {user.guardianName} {user.guardianSurname}
                    </td>
                    <td>{user.dateOfBirth}</td>
                  </ColoredTableRow>
                ))}
              </tbody>
            </StyledTable>
            {!isLoading && !isError && (
              <Pagination>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    disabled={currentPage === index + 1}
                  >
                    {index + 1}
                  </button>
                ))}
              </Pagination>
            )}
          </TableWrapper>
        ) : (
          <div>Loading...</div>
        )}
        {isLoading ? <ClockLoader color="#2196f3" /> : null}
        {isError ? <ErrorMessage>Error loading data.</ErrorMessage> : null}
        {fetched && queryResults.length === 0 && <FormError>Nema rezultata za vaš upit</FormError>}
      </CenterContent>
    </PageContainer>
  );
};

export default UserSearchView;
