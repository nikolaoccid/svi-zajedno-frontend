import styled from '@emotion/styled';
import { useState } from 'react';
import { useAsync } from 'react-async-hook';
import { useNavigate } from 'react-router-dom';

import { SchoolYear } from '../../api/codegen';
import { generateSchoolYears } from '../../utils/generate-school-years.ts';
import { Button, Input, PageContainer, Select } from '../common-styles/common-styles.ts';
import { useFetchSchoolYear } from './hooks/use-fetch-school-year.ts';

const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

export function SchoolYear() {
  const navigate = useNavigate();
  // const { result: schoolYears } = useFetchSchoolYear();
  let schoolYears = [];
  const [selectedYear, setSelectedYear] = useState('');
  const handleClick = () => {
    navigate(`/${selectedYear}/dashboard`);
  };
  const handleCreateClick = () => {
    console.log('handleCreateClick');
  };
  if (!schoolYears || schoolYears.length === 0) {
    schoolYears = generateSchoolYears(schoolYears);
    return (
      <PageContainer>
        <CenterContent>
          <h2>Create a school year</h2>
          <Select onChange={(e) => setSelectedYear(e.target.value)}>
            <option disabled selected>
              Choose one
            </option>
            {schoolYears?.map((schoolYear) => (
              <option key={schoolYear} value={schoolYear}>
                {schoolYear} / {schoolYear + 1}
              </option>
            ))}
          </Select>
          <Button onClick={handleCreateClick}>Create</Button>
        </CenterContent>
      </PageContainer>
    );
  }
  return (
    <PageContainer>
      <CenterContent>
        <h2>Choose a school year</h2>
        <Select onChange={(e) => setSelectedYear(e.target.value)}>
          <option disabled selected>
            Choose one
          </option>
          {schoolYears.length > 0 &&
            schoolYears?.map((schoolYear: SchoolYear) => (
              <option key={schoolYear.startYear} value={schoolYear.startYear}>
                {schoolYear.startYear} / {schoolYear.endYear}
              </option>
            ))}
        </Select>
        <Button onClick={handleClick} disabled={!selectedYear}>
          Confirm
        </Button>
      </CenterContent>
    </PageContainer>
  );
}
