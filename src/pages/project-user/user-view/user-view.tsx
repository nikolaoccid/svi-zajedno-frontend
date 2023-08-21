import styled from '@emotion/styled';
import { ErrorMessage } from 'formik';
import { useState } from 'react';
import { ClockLoader } from 'react-spinners';

import { CenterContent, PageContainer } from '../../common-styles/common-styles.ts';
import { useProjectUsers } from './hooks/use-project-users';

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
const Pagination = styled.div`
  padding-top: 20px;
`;

const ColoredTableRow = styled.tr<{ isEven: boolean }>`
  background-color: ${(props) => (props.isEven ? '#f39e21' : 'transparent')};
`;

const UserView = () => {
  const itemsPerPage = 10; // Assuming each page should display 10 items
  const [currentPage, setCurrentPage] = useState(1);
  const { data: users, isLoading, isError } = useProjectUsers(currentPage);

  const totalPages = (users as any).meta.totalPages ?? 1;

  const handlePaginationClick = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleUsers = (users as any).items.slice(startIndex, startIndex + itemsPerPage) || [];

  return (
    <PageContainer>
      <CenterContent>
        <h1>Korisnici</h1>
        {isLoading ? (
          <ClockLoader color="#2196f3" />
        ) : isError ? (
          <ErrorMessage>Error loading data.</ErrorMessage>
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
                  <ColoredTableRow key={user.id} isEven={index % 2 === 0}>
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
            <Pagination>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePaginationClick(index + 1)}
                  disabled={currentPage === index + 1}
                >
                  {index + 1}
                </button>
              ))}
            </Pagination>
          </TableWrapper>
        )}
      </CenterContent>
    </PageContainer>
  );
};

export default UserView;
