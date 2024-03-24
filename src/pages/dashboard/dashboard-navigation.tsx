import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useSchoolYear } from '../dashboard-page/hooks/use-fetch-school-year.ts';

export enum navEnum {
  overview = 'overview',
  users = 'users',
  associates = 'associateStatistics',
}
export const HeaderTitle = styled.span<{ active: boolean }>`
  font-family: Axiforma;
  font-weight: bold;
  font-size: 14px;
  text-decoration: ${(props) => (props.active ? 'underline' : 'none')};

  &:hover {
    text-decoration: underline;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 35px;
`;
export function DashboardNavigation({ nav, setNav }: { nav: string; setNav: (nav: string) => void }) {
  const { t } = useTranslation();
  const { startYear } = useParams();
  const { data: schoolYear } = useSchoolYear(parseInt(startYear ?? '0') ?? 0);
  return (
    <Container>
      <HeaderTitle onClick={() => setNav(navEnum.overview)} active={nav === navEnum.overview}>
        {t('Overview')} {schoolYear?.startYear}/{schoolYear?.endYear}
      </HeaderTitle>
      <HeaderTitle onClick={() => setNav(navEnum.users)} active={nav === navEnum.users}>
        {t('Users statistics')}
      </HeaderTitle>
      <HeaderTitle onClick={() => setNav(navEnum.associates)} active={nav === navEnum.associates}>
        {t('Associates statistics')}
      </HeaderTitle>
    </Container>
  );
}
