import styled from '@emotion/styled';
import { useState } from 'react';
import { useAsync } from 'react-async-hook';
import { useNavigate } from 'react-router-dom';

import { api } from '../../api';
import { useFetchSchoolYear } from './hooks/use-fetch-school-year.ts';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: pink;
  flex: 1;
`;
export function SchoolYear() {
  const navigate = useNavigate();
  const { result: schoolYears } = useFetchSchoolYear();
  const [selectedYear, setSelectedYear] = useState('');
  useAsync(async () => {
    try {
      await api.getAuthenticatedUser();
    } catch (e) {
      console.error('Could not authenticate user');
      navigate('/login');
    }
  }, []);
  console.log(selectedYear);
  return (
    <Container>
      <h1>School year</h1>
      <select onChange={(e) => setSelectedYear(e.target.value)}>
        <option disabled selected>
          Choose one
        </option>
        {schoolYears?.map((schoolYear) => (
          <option key={schoolYear.startYear} value={schoolYear.startYear}>
            {schoolYear.startYear} / {schoolYear.endYear}
          </option>
        ))}
      </select>
    </Container>
  );
}
