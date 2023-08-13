import { useState } from 'react';

import { generateSchoolYears } from '../../utils/generate-school-years.ts';
import { useFetchSchoolYear } from '../choose-school-year/hooks/use-fetch-school-year.ts';
import { Button, CenterContent, PageContainer, Select } from '../common-styles/common-styles.ts';

export const CreateSchoolYear = () => {
  const { result: schoolYears } = useFetchSchoolYear();
  const [selectedYear, setSelectedYear] = useState('');
  const generatedSchoolYears = generateSchoolYears(schoolYears?.map((schoolYear) => schoolYear.startYear));

  const handleClick = () => {
    console.log('CreateSchoolYear');
    console.log('selectedYear', selectedYear);
  };
  return (
    <PageContainer>
      <CenterContent>
        <h2>Create a school year</h2>
        <Select onChange={(e) => setSelectedYear(e.target.value)}>
          <option disabled selected>
            Choose one
          </option>
          {generatedSchoolYears?.map((schoolYear) => (
            <option key={schoolYear} value={schoolYear}>
              {schoolYear} / {schoolYear + 1}
            </option>
          ))}
        </Select>
        <Button onClick={handleClick}>Create</Button>
      </CenterContent>
    </PageContainer>
  );
};
