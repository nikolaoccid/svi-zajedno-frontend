import styled from '@emotion/styled';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GridLoader } from 'react-spinners';

import { generateSchoolYears } from '../../../utils/generate-school-years.ts';
import { Button, CenterContent, PageContainer, Select } from '../../common-styles/common-styles.ts';
import { useSchoolYears } from '../choose-school-year/hooks/use-fetch-school-years.ts';
import { useCreateSchoolYear } from './hooks/use-create-school-year.ts';

const ErrorMessage = styled.p`
  color: red;
  margin-top: 0.1rem;
`;
export const CreateSchoolYear = () => {
  const { t } = useTranslation();
  const { data: schoolYears, isLoading: schoolYearLoading } = useSchoolYears();
  const [selectedYear, setSelectedYear] = useState('choose');
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
        <h2>{t('Create a school year')}</h2>
        <Select onChange={(e) => setSelectedYear(e.target.value)} value={selectedYear}>
          <option value="choose">{t('Choose a school year')}</option>
          {generatedSchoolYears?.map((schoolYear) => (
            <option key={schoolYear} value={schoolYear}>
              {schoolYear} / {schoolYear + 1}
            </option>
          ))}
        </Select>
        <Button onClick={handleClick} disabled={selectedYear === ''}>
          {t('Confirm')}
        </Button>
        {(errorMessages as any).map((error, index) => (
          <ErrorMessage key={index}>{error}</ErrorMessage>
        ))}
      </CenterContent>
    </PageContainer>
  );
};
