import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ClockLoader } from 'react-spinners';

import { SchoolYear } from '../../../api/codegen';
import { BackButton } from '../../../components/back-button/back-button.tsx';
import {
  Button,
  CenterContent,
  PageContainer,
  ProfileSubmenu,
  SecondaryButton,
  Select,
} from '../../common-styles/common-styles.ts';
import { useSchoolYears } from './hooks/use-fetch-school-years.ts';

export function ChooseSchoolYear() {
  const navigate = useNavigate();
  const { data: schoolYears, isLoading } = useSchoolYears();
  const [selectedYear, setSelectedYear] = useState('');
  const handleClick = () => {
    navigate(`/${selectedYear}`);
  };

  const goToCreateSchoolYear = () => navigate('/school-year/new');

  if (isLoading) {
    return (
      <PageContainer>
        <CenterContent>
          <ClockLoader color="#2196f3" />
        </CenterContent>
      </PageContainer>
    );
  }

  if (!schoolYears || schoolYears?.length === 0) {
    return <Navigate to="/school-year/new" />;
  }
  return (
    <PageContainer>
      <CenterContent>
        <ProfileSubmenu>
          <BackButton />
          <SecondaryButton onClick={goToCreateSchoolYear}>Kreiraj skolsku godinu</SecondaryButton>
        </ProfileSubmenu>
        <h2>Odaberi skolsku godinu</h2>
        <Select onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="">Odaberi</option>
          {schoolYears?.map((schoolYear: SchoolYear) => (
            <option key={schoolYear.startYear} value={schoolYear.startYear}>
              {schoolYear.startYear} / {schoolYear.endYear}
            </option>
          ))}
        </Select>
        <Button onClick={handleClick} disabled={!selectedYear}>
          Potvrdi
        </Button>
      </CenterContent>
    </PageContainer>
  );
}
