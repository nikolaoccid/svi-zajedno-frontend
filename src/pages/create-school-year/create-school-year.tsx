import styled from '@emotion/styled';
import { useState } from 'react';
import { GridLoader } from 'react-spinners';

import { generateSchoolYears } from '../../utils/generate-school-years.ts';
import { useFetchSchoolYear } from '../choose-school-year/hooks/use-fetch-school-year.ts';
import { Button, CenterContent, PageContainer, Select } from '../common-styles/common-styles.ts';
import { useCreateSchoolYear } from './hooks/use-create-school-year.ts';

const ErrorMessage = styled.p`
  color: red;
  margin-top: 0.5rem;
`;
export const CreateSchoolYear = () => {
  const { result: schoolYears } = useFetchSchoolYear();
  const [selectedYear, setSelectedYear] = useState('');
  const generatedSchoolYears = generateSchoolYears(schoolYears?.map((schoolYear) => schoolYear.startYear));
  const { createSchoolYear, isLoading, errorMessages } = useCreateSchoolYear();

  const handleClick = () => {
    createSchoolYear(parseInt(selectedYear));
  };
  if (isLoading) {
    return (
      <PageContainer>
        <CenterContent>
          <GridLoader color="#2196f3" />
        </CenterContent>
      </PageContainer>
    );
  }
  return (
    <PageContainer>
      <CenterContent>
        <h2>Create a school year</h2>
        <Select onChange={(e) => setSelectedYear(e.target.value)}>
          <option selected value="">
            Choose one
          </option>
          {generatedSchoolYears?.map((schoolYear) => (
            <option key={schoolYear} value={schoolYear}>
              {schoolYear} / {schoolYear + 1}
            </option>
          ))}
        </Select>
        <Button onClick={handleClick}>Create</Button>
        {errorMessages.map((error, index) => (
          <ErrorMessage key={index}>{error}</ErrorMessage>
        ))}
      </CenterContent>
    </PageContainer>
  );
};
