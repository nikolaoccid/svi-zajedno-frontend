import styled from '@emotion/styled';
import { ErrorMessage, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useAsync } from 'react-async-hook';
import { useNavigate, useParams } from 'react-router-dom';
import { ClockLoader } from 'react-spinners';
import * as Yup from 'yup';

import { api } from '../../../api';
import { CenterContent, PageContainer } from '../../common-styles/common-styles';
import { useGetCategories } from '../manage-project-associate/hooks/use-get-categories.ts';
import { useProjectAssociates } from './hooks/use-project-associates.ts';

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
    background-color: #2196f3;
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
  padding-top: 20px;
`;

const ProjectAssociateSearchView = () => {
  const navigate = useNavigate();
  const { startYear } = useParams();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const { execute: getProjectAssociates, error: isError, loading: isLoading } = useProjectAssociates(currentPage);
  const { data: categories } = useGetCategories();
  const [categoryMap, setCategoryMap] = useState({});
  const [queryResults, setQueryResults] = useState([]);
  const [projectAssociates, setProjectAssociates] = useState();
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (categories) {
      const map = categories.reduce((acc, category) => {
        acc[category.id] = category.categoryName;
        return acc;
      }, {});
      setCategoryMap(map);
    }
  }, [categories]);

  const formik = useFormik({
    initialValues: {
      search: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (formCategory) => {
      try {
        const res = await api.getProjectAssociateByQuery(formCategory.search);
        setQueryResults(res as any);
        setTotalPages(1);
      } catch (error) {
        console.error('Error searching project associates:', error);
      }
    },
    enableReinitialize: false,
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleAssociates = (queryResults.length > 0 ? queryResults : projectAssociates) || [];
  const slicedAssociates = visibleAssociates.slice(startIndex, startIndex + itemsPerPage);

  useAsync(async () => {
    const res = await getProjectAssociates();
    setProjectAssociates((res as any)?.items);
    setCurrentPage((res as any)?.meta?.currentPage);
    setTotalPages((res as any)?.meta?.totalPages);
  }, [currentPage]);

  return (
    <PageContainer>
      <CenterContent>
        <h1>Project Associates</h1>
        <Form onSubmit={formik.handleSubmit}>
          <FormField>
            <label htmlFor="search">Search Project Associates</label>
            <FormContent>
              <input type="text" id="search" {...formik.getFieldProps('search')} />
              <button type="submit">&#x1F50E;</button>
            </FormContent>
            {formik.touched.search && formik.errors.search && <FormError>{formik.errors.search}</FormError>}
          </FormField>
        </Form>
        <TableWrapper>
          <StyledTable>
            <thead>
              <tr>
                <th>Club Name</th>
                <th>Email</th>
                <th>Mobile Phone</th>
                <th>Contact Person</th>
                <th>Address</th>
                <th>City</th>
                <th>Status</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {slicedAssociates?.map((associate, index) => (
                <ColoredTableRow
                  key={(associate as any).id}
                  isEven={index % 2 === 0}
                  onClick={() => navigate(`/${startYear}/project-associate/${(associate as any).id}`)}
                >
                  <td>{(associate as any).clubName}</td>
                  <td>{(associate as any).email}</td>
                  <td>{(associate as any).mobilePhone}</td>
                  <td>{(associate as any).contactPerson}</td>
                  <td>{(associate as any).address}</td>
                  <td>{(associate as any).city}</td>
                  <td>{(associate as any).projectAssociateStatus}</td>
                  <td>{categoryMap[(associate as any).categoryId]}</td>
                </ColoredTableRow>
              ))}
            </tbody>
          </StyledTable>
          {!isLoading && !isError && (
            <Pagination>
              {Array.from({ length: totalPages || 1 }, (_, index) => (
                <button key={index + 1} onClick={() => setCurrentPage(index + 1)} disabled={currentPage === index + 1}>
                  {index + 1}
                </button>
              ))}
            </Pagination>
          )}
        </TableWrapper>
        {isLoading ? <ClockLoader color="#2196f3" /> : null}
        {isError ? <ErrorMessage>Error loading data.</ErrorMessage> : null}
        {queryResults.length === 0 && visibleAssociates?.length === 0 && <FormError>No results found.</FormError>}
      </CenterContent>
    </PageContainer>
  );
};

export default ProjectAssociateSearchView;
