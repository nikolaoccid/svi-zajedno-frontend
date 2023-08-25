import styled from '@emotion/styled';
import { ErrorMessage, useFormik } from 'formik';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ClockLoader } from 'react-spinners';
import * as Yup from 'yup';

import { api } from '../../../api';
import { CenterContent, PageContainer } from '../../common-styles/common-styles';
import { useProjectUsers } from '../user-view/hooks/use-project-users.ts';

const validationSchema = Yup.object().shape({
  search: Yup.string().required('Unos je obavezan'),
});

const TableWrapper = styled.div`
  margin-top: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
`;

const ColoredTableRow = styled.tr<{ isEven: boolean }>`
  background-color: ${(props) => (props.isEven ? '#f39e21' : 'transparent')};
  &:hover {
    cursor: pointer;
    border: solid 2px black;
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
const Pagination = styled.div`
  padding-top: 20px;
`;

const UserSearchView = () => {
  const { startYear } = useParams();
  const navigate = useNavigate();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: users, isLoading, isError } = useProjectUsers(currentPage);

  const [projectUser] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [queryResults, setQueryResults] = useState<any>([]);

  const formik = useFormik({
    initialValues: {
      search: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (formCategory) => {
      const res = await api.getProjectUserByQuery(formCategory.search);
      setQueryResults(res);
      setFetched(true);
    },
    enableReinitialize: false,
  });

  const totalPages = ((users as any)?.meta?.totalPages ?? 1) as number;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleUsers = (users as any)?.items?.slice(startIndex, startIndex + itemsPerPage) || [];

  return (
    <PageContainer>
      <CenterContent>
        <h1>Korisnici</h1>
        <Form onSubmit={formik.handleSubmit}>
          <FormField>
            <label htmlFor="search">Pronadi korisnika</label>
            <FormContent>
              <input type="text" id="search" {...formik.getFieldProps('search')} />
              <button type="submit">&#x1F50E;</button>
            </FormContent>
            {formik.touched.search && formik.errors.search && <FormError>{formik.errors.search}</FormError>}
          </FormField>
        </Form>
        {fetched && queryResults.length > 0 ? (
          <TableWrapper>
            <StyledTable>
              <thead>
                <tr>
                  <th>Guardian</th>
                  <th>Child</th>
                  <th>Date of Birth</th>
                  <th>Address</th>
                  <th>School</th>
                  <th>Mobile Phone</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {queryResults.map((user, index) => (
                  <ColoredTableRow isEven={index % 2 === 0} onClick={() => navigate(`/${startYear}/user/${user.id}`)}>
                    <td>
                      {user.guardianName} {user.guardianSurname}
                    </td>
                    <td>
                      {user.childName} {user.childSurname}
                    </td>
                    <td>{user.dateOfBirth}</td>
                    <td>
                      {user.address}, {user.city}
                    </td>
                    <td>{user.school}</td>
                    <td>{user.mobilePhone}</td>
                    <td>{user.email}</td>
                  </ColoredTableRow>
                ))}
              </tbody>
            </StyledTable>
          </TableWrapper>
        ) : (
          <TableWrapper>
            <StyledTable>
              <thead>
                <tr>
                  <th>Guardian</th>
                  <th>Child</th>
                  <th>Date of Birth</th>
                  <th>Address</th>
                  <th>School</th>
                  <th>Mobile Phone</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {visibleUsers.map((user, index) => (
                  <ColoredTableRow
                    key={user.id}
                    isEven={index % 2 === 0}
                    onClick={() => navigate(`/${startYear}/user/${user.id}`)}
                  >
                    <td>
                      {user.guardianName} {user.guardianSurname}
                    </td>
                    <td>
                      {user.childName} {user.childSurname}
                    </td>
                    <td>{user.dateOfBirth}</td>
                    <td>
                      {user.address}, {user.city}
                    </td>
                    <td>{user.school}</td>
                    <td>{user.mobilePhone}</td>
                    <td>{user.email}</td>
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
        )}
        {isLoading ? <ClockLoader color="#2196f3" /> : null}
        {isError ? <ErrorMessage>Error loading data.</ErrorMessage> : null}
        {fetched && queryResults.length === 0 && projectUser.length === 0 && (
          <FormError>Nema rezultata za vas upit</FormError>
        )}
        {fetched && projectUser.length > 0 && (
          <FormContent>
            {projectUser.map((item) => (
              <TableLink to="/" key={(item as any)?.id}>
                <Item>
                  {(item as any)?.childName} {(item as any)?.childSurname}
                </Item>
              </TableLink>
            ))}
          </FormContent>
        )}
      </CenterContent>
    </PageContainer>
  );
};

export default UserSearchView;
