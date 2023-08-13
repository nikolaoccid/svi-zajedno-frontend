import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { SchoolYear } from '../../api/codegen';
import {
  AlignRight,
  Button,
  CenterContent,
  PageContainer,
  SecondaryButton,
  Select,
} from '../common-styles/common-styles.ts';
import { useFetchSchoolYear } from './hooks/use-fetch-school-year.ts';

export function ChooseSchoolYear() {
  const navigate = useNavigate();
  const { result: schoolYears, loading } = useFetchSchoolYear();
  const [selectedYear, setSelectedYear] = useState('');
  const handleClick = () => {
    navigate(`/${selectedYear}/dashboard`);
  };

  const goToCreateSchoolYear = () => navigate('/create-school-year');

  if (loading) {
    return null;
  }

  if (!schoolYears || schoolYears?.length === 0) {
    return <Navigate to="/create-school-year" />;
  }
  return (
    <PageContainer>
      <CenterContent>
        <AlignRight>
          <SecondaryButton onClick={goToCreateSchoolYear}>Create a school year</SecondaryButton>
        </AlignRight>
        <h2>Choose a school year</h2>
        <Select onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="">Choose one</option>
          {schoolYears?.map((schoolYear: SchoolYear) => (
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
