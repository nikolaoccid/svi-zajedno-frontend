import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { ClockLoader } from 'react-spinners';

import { CenterContent } from '../../common-styles/common-styles.ts';
import { ChooserWidget } from './chooser-widget.tsx';
import { useSchoolYears } from './hooks/use-fetch-school-years.ts';

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
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
export const HeaderText = styled.span`
  font-family: Axiforma;
  font-weight: bold;
  font-size: 20px;
`;
const HeaderSubtext = styled.span`
  font-style: normal;
  font-size: 12px;
  color: #606060;
`;
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 15px;
  width: 60%;
  padding-left: 14px;
  @media (max-width: 800px) {
    width: 70%;
  }
`;
const InnerContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  width: 100%;
  padding: 20px;

  @media (max-width: 670px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;
const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 25px;
`;
export function ChooseSchoolYear() {
  const { t } = useTranslation();
  const { data: schoolYears, isLoading } = useSchoolYears();

  if (isLoading) {
    return (
      <PageContainer>
        <CenterContent>
          <ClockLoader color="#2196f3" />
        </CenterContent>
      </PageContainer>
    );
  }

  if (!schoolYears || (schoolYears as any)?.items.length === 0) {
    return <Navigate to="/school-year/new" />;
  }
  return (
    <PageContainer>
      <HeroWrapper>
        <HeroContainer>
          <CenterLogo>
            <Logo>{t('applicationName')}</Logo>
          </CenterLogo>
        </HeroContainer>
      </HeroWrapper>

      <Content>
        <Center>
          <HeaderContainer>
            <HeaderText>{t('Choose the school year')}</HeaderText>
            <HeaderSubtext>{t('Select the school year you wish to administer')}</HeaderSubtext>
          </HeaderContainer>
          <InnerContent>
            {schoolYears &&
              (schoolYears as any).items.map((item, index) => (
                <div key={index}>
                  <ChooserWidget item={item} index={index} />
                </div>
              ))}
          </InnerContent>
        </Center>
      </Content>
    </PageContainer>
  );
}
