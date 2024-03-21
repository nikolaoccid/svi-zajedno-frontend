import styled from '@emotion/styled';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GridLoader } from 'react-spinners';

import { HalfScreenHero } from '../../../components/half-screen-hero/half-screen-hero.tsx';
import { HeaderTextWithSubtext } from '../../../components/header-text-with-subtext/header-text-with-subtext.tsx';
import { Spinner } from '../../../components/spinner/spinner.tsx';
import { generateSchoolYears } from '../../../utils/generate-school-years.ts';
import { Button, CenterContent, FlexRowContainer, Select } from '../../common-styles/common-styles.ts';
import { useSchoolYears } from '../choose-school-year/hooks/use-fetch-school-years.ts';
import { useCreateSchoolYear } from './hooks/use-create-school-year.ts';

const ErrorMessage = styled.p`
  color: red;
  margin-top: 0.1rem;
`;
const Content = styled(CenterContent)`
  width: 50%;
  padding: 4em;
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
    return <Spinner SpinnerComponent={GridLoader} color="#2196f3" />;
  }
  return (
    <FlexRowContainer>
      <HalfScreenHero />
      <Content>
        <HeaderTextWithSubtext title={'Create a school year'} subtext="Choose a school year you would like to create" />
        <Select onChange={(e) => setSelectedYear(e.target.value)} value={selectedYear}>
          <option value="choose">{t('Choose a school year')}</option>
          {generatedSchoolYears?.map((schoolYear) => (
            <option key={schoolYear} value={schoolYear}>
              {schoolYear} / {schoolYear + 1}
            </option>
          ))}
        </Select>
        <Button onClick={handleClick} disabled={selectedYear === 'choose'}>
          {t('Confirm')}
        </Button>
        {(errorMessages as any).map((error, index) => (
          <ErrorMessage key={index}>{error}</ErrorMessage>
        ))}
      </Content>
    </FlexRowContainer>
  );
};
