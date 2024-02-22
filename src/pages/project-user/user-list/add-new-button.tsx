import styled from '@emotion/styled';
import { IoPersonAdd } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';

import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';

const Button = styled.div`
  font-family: Axiforma;
  font-weight: 400;
  font-size: 14px;
  background-color: #1352f1;
  color: #ffffff;
  border-radius: 5px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 10px 15px;
`;
export function AddNewButton() {
  const { startYear } = useParams();
  const { data: schoolYear } = useSchoolYear(parseInt(startYear ?? '0') ?? 0);
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(`/${schoolYear?.startYear}/users/new`)}>
      Add new <IoPersonAdd />
    </Button>
  );
}
