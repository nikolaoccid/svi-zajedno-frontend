import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

const HeaderSubtext = styled.span`
  font-style: normal;
  font-size: 12px;
  color: #606060;
`;
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderText = styled.span`
  font-family: Axiforma;
  font-weight: bold;
  font-size: 1.5vw;
`;
interface HeaderProps {
  title: string;
  subtext?: string;
}
export function HeaderTextWithSubtext({ title, subtext = '' }: HeaderProps) {
  const { t } = useTranslation();
  return (
    <HeaderContainer>
      <HeaderText>{t(title)}</HeaderText>
      <HeaderSubtext>{t(subtext)}</HeaderSubtext>
    </HeaderContainer>
  );
}
