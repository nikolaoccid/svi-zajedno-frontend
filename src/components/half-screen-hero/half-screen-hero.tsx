import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

const HeroContainer = styled.div`
  background-image: url('/hero-school-year-chooser.png');
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
`;
const HeroWrapper = styled.div`
  display: flex;

  width: 50%;
  height: 100vh;
  background-color: #041643;
  @media (max-width: 670px) {
    width: 30%;
  }
`;
const Logo = styled.span`
  font-family: 'Mr Dafoe', cursive;
  line-height: 1.5;
  font-weight: 400;
  font-style: normal;
  font-size: 2.5em;
  transform: rotate(-4deg);
  color: #ffffff;

  @media (max-width: 670px) {
    font-size: 1.5em;
  }
`;
const CenterLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
`;
export function HalfScreenHero() {
  const { t } = useTranslation();
  return (
    <HeroWrapper>
      <HeroContainer>
        <CenterLogo>
          <Logo>{t('applicationName')}</Logo>
        </CenterLogo>
      </HeroContainer>
    </HeroWrapper>
  );
}
