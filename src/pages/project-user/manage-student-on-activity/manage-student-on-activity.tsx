import styled from '@emotion/styled';
import { FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { useAsync } from 'react-async-hook';
import { useParams } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import * as Yup from 'yup';

import { Button, CenterContent, FormError, FormField, PageContainer } from '../../common-styles/common-styles.ts';
import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { ColoredTableRow } from '../../project-associate/project-associate-search-view/project-associate-search-view.tsx';
import { useStudentOnSchoolYear } from '../../student-on-school-year/hooks/get-student-on-school-year.ts';
import { useProjectUser } from '../user-view/hooks/use-project-user.ts';
import { useActivities } from './hooks/use-activities.ts';
import { useCreateStudentOnActivity } from './hooks/use-create-student-on-activity.ts';

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 12px 8px;
  background-color: #f5f5f5;
  text-align: left;
  font-weight: bold;
`;

const TableCell = styled.td`
  padding: 12px 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  gap: 45px;
  width: 100%;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

const validationSchema = Yup.object({
  query: Yup.string(),
});
export const ManageStudentOnActivity = () => {
  const { startYear, userId, activityId } = useParams();
  const startYearInt = parseInt(startYear ?? '0');
  const { data: schoolYear, isLoading: isLoadingSchoolYear } = useSchoolYear(startYearInt);
  const { data: projectUser, isLoading: isLoadingProjectUser } = useProjectUser(userId);
  const { data: studentOnSchoolYear, isLoading: isLoadingStudentOnSchoolYear } = useStudentOnSchoolYear(
    schoolYear ? schoolYear[0]?.id : 0,
    projectUser?.id,
  );
  const { execute: createStudentOnActivity, loading: isLoadingCreateStudentOnActivity } = useCreateStudentOnActivity();
  const [query, setQuery] = useState<any>(undefined);
  console.log(studentOnSchoolYear, activityId);

  const {
    getActivities,
    activities,
    isLoading: isLoadingActivities,
  } = useActivities('active', schoolYear ? schoolYear[0]?.id : 0);

  useAsync(async () => {
    await getActivities(query);
  }, []);

  const formik = useFormik({
    initialValues: {
      query: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (form) => {
      const query = form.query === '' ? undefined : form.query;
      setQuery(query);
      await getActivities(query);
    },
  });
  const handleActivityClick = async (item) => {
    console.log('handleActivityClick', item);
    await createStudentOnActivity({
      activityId: item.id,
      activityStatus: 'active',
      studentOnSchoolYearId: studentOnSchoolYear ? studentOnSchoolYear[0]?.id : 0,
    });
  };

  if (
    isLoadingSchoolYear ||
    isLoadingCreateStudentOnActivity ||
    isLoadingProjectUser ||
    isLoadingStudentOnSchoolYear ||
    isLoadingActivities
  ) {
    return (
      <PageContainer>
        <CenterContent>
          <PuffLoader color="#2196f3" />
        </CenterContent>
      </PageContainer>
    );
  }
  return (
    <PageContainer>
      <CenterContent>
        <h1>Upisi korisnika na aktivnost</h1>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <FormField>
              <label htmlFor="query">Naziv aktivnosti</label>
              <FormContent>
                <input type="text" id="query" {...formik.getFieldProps('query')} />
                <Button>&#x1F50E;</Button>
              </FormContent>
              {formik.touched.query && formik.errors.query ? <FormError>{formik.errors.query}</FormError> : null}
            </FormField>
          </Form>
        </FormikProvider>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <TableHeader>Club Name</TableHeader>
                <TableHeader>Activity Name</TableHeader>
              </tr>
            </thead>
            <tbody>
              {activities ? (
                activities.map((item, index) => (
                  <ColoredTableRow key={item.id} isEven={index % 2 === 0} onClick={() => handleActivityClick(item)}>
                    <TableCell>{item.projectAssociate.clubName}</TableCell>
                    <TableCell>{item.activityName}</TableCell>
                  </ColoredTableRow>
                ))
              ) : (
                <tr>
                  <TableCell>Nema dostupnih aktivnosti.</TableCell>
                </tr>
              )}
            </tbody>
          </Table>
        </TableContainer>
      </CenterContent>
    </PageContainer>
  );
};
