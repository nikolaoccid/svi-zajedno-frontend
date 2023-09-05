import styled from '@emotion/styled';
import { ErrorMessage, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClockLoader } from 'react-spinners';
import * as Yup from 'yup';

import { api } from '../../../api';
import { Status } from '../../../components/status/status.tsx';
import { Submenu } from '../../../components/submenu/submenu.tsx';
import { AlignRight, CenterContent, PageContainer, SecondaryButton } from '../../common-styles/common-styles';
import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { useGetCategories } from '../manage-project-associate/hooks/use-get-categories.ts';
import { useProjectAssociates } from './hooks/use-project-associates.ts';

const validationSchema = Yup.object().shape({
  search: Yup.string().required('Unos je obavezan'),
});

export const TableWrapper = styled.div`
  margin-top: 20px;
`;

export const StyledTable = styled.table`
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

export const ColoredTableRow = styled.tr<{ isEven: boolean }>`
  background-color: ${(props) => (props.isEven ? '#f3ba77' : 'transparent')};
  &:hover {
    cursor: pointer;
    background-color: #82ca9d;
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
  const { data: schoolYear } = useSchoolYear(startYear ? parseInt(startYear ?? '0') : 0);
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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getProjectAssociates();
        setProjectAssociates((response as any).items || []);
        setCurrentPage((response as any)?.meta?.currentPage);
        setTotalPages((response as any)?.meta?.totalPages);
        setQueryResults((response as any)?.items || []);
      } catch (error) {
        console.error('Error fetching project associates:', error);
      }
    }
    fetchData();
  }, [currentPage, getProjectAssociates]);
  return (
    <PageContainer>
      <CenterContent>
        <Submenu />
        <h1>Suradnici</h1>
        <AlignRight>
          <SecondaryButton onClick={() => navigate(`/${schoolYear && schoolYear[0].startYear}/project-associate/new`)}>
            Kreiraj novog suradnika
          </SecondaryButton>
        </AlignRight>
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
                  <td>
                    <Status status={(associate as any).projectAssociateStatus} />
                  </td>
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
