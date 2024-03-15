import styled from '@emotion/styled';
import { useState } from 'react';
import { GridLoader } from 'react-spinners';

import { BackButton } from '../../../components/back-button/back-button.tsx';
import { generateSchoolYears } from '../../../utils/generate-school-years.ts';
import { AlignLeft, Button, CenterContent, PageContainer, Select } from '../../common-styles/common-styles.ts';
import { useSchoolYears } from '../choose-school-year/hooks/use-fetch-school-years.ts';
import { useCreateSchoolYear } from './hooks/use-create-school-year.ts';

const ErrorMessage = styled.p`
  color: red;
  margin-top: 0.5rem;
`;
export const CreateSchoolYear = () => {
  const { data: schoolYears, isLoading: schoolYearLoading } = useSchoolYears();
  const [selectedYear, setSelectedYear] = useState('');
  const generatedSchoolYears = generateSchoolYears(
    (schoolYears as any)?.items?.map((schoolYear) => schoolYear.startYear),
  );
  const { createSchoolYear, isLoading, errorMessages } = useCreateSchoolYear();

  const handleClick = () => {
    createSchoolYear(parseInt(selectedYear));
  };
  if (isLoading || schoolYearLoading) {
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
        <AlignLeft>
          <BackButton />
        </AlignLeft>
        <h2>Kreiraj skolsku godinu</h2>
        <Select onChange={(e) => setSelectedYear(e.target.value)}>
          <option selected value="">
            Odaberite jedno
          </option>
          {generatedSchoolYears?.map((schoolYear) => (
            <option key={schoolYear} value={schoolYear}>
              {schoolYear} / {schoolYear + 1}
            </option>
          ))}
        </Select>
        <Button onClick={handleClick} disabled={selectedYear === ''}>
          Potvrdi
        </Button>
        {errorMessages.map((error, index) => (
          <ErrorMessage key={index}>{error}</ErrorMessage>
        ))}
      </CenterContent>
    </PageContainer>
  );
};
