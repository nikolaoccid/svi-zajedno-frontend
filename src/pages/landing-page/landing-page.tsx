import styled from '@emotion/styled';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { Link } from 'react-router-dom';

import hero from '/hero.jpeg';
import academicYearPicker from '/landing-page/academic-year-picker.png';
import projectAssociateView from '/landing-page/project-associate-view.png';
import projectUsersPicture from '/landing-page/project-users.png';

import { useAuthenticatedUser } from '../../hooks/use-authenticated-user.ts';
import { LandingSection } from './landing-section.tsx';

const LandingPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-position: 50% 50%;
  background-image: url(${hero});
  background-size: cover;
`;

const Heading = styled.h1`
  color: white;
  font-size: 2rem;
  text-align: center;
`;
const SubHeading = styled.h2`
  font-size: 1.5rem;
  color: white;
  text-align: center;
`;
const CTALink = styled(Link)`
  background-color: #2196f3;
  font-weight: 800;
  text-transform: uppercase;
  border-radius: 5px;
  padding: 15px 30px;
  color: white;
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 25px;
  padding: 1em;
`;
const CenterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ArrowContainer = styled.div`
  position: absolute;
  top: 90%;
  right: 50%;
`;

function LandingPage() {
  const { t } = useTranslation();
  const { data: user } = useAuthenticatedUser();
  const firstSectionRef = useRef(null);
  const landingSections = [
    {
      title: 'Track each academic cycle',
      subtext: [
        'Easily organize activities according to the academic year.',
        'Track user engagement separately for each academic cycle for better analysis and management.',
        'Efficiently monitor progress and outcomes across multiple academic cycles.',
      ],
      picture: academicYearPicker,
      forwardRef: firstSectionRef,
    },
    {
      title: 'Project User Tracking',
      subtext: [
        ' Seamlessly enroll project users for specific academic years.',
        'Allow users to enroll in various activities offered within the academic year.',
        'Easily change user enrollment status between active and inactive as needed.',
        'Keep track of enrollment and withdrawal dates for accurate project user management.',
      ],
      picture: projectUsersPicture,
    },
    {
      title: 'Project Associate Management',
      subtext: [
        'Seamlessly add sport clubs and categorize them according to their specific attributes or characteristics.',
        'Easily manage activities for each sport club, allowing them to be marked as active or inactive as needed.',
        'Offer activities that are either paid or free, providing flexibility for both the clubs and participants.',
      ],
      picture: projectAssociateView,
    },
  ];

  const handleArrowClick = () => {
    if (firstSectionRef.current) {
      window.scrollTo({
        top: (firstSectionRef as any)?.current?.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <LandingPageContainer>
        <Overlay>
          <Center>
            <Heading>
              {t('Platform')} {t('applicationName')}
            </Heading>
            <SubHeading>{t("Efficiently track and manage your users' activities")}</SubHeading>
            <CenterContent>
              <CTALink to={user ? '/school-year' : '/login'}>{user ? 'Admin portal' : 'Try for free'}</CTALink>
            </CenterContent>
            <ArrowContainer onClick={handleArrowClick}>
              <IoIosArrowDropdownCircle color="white" size={50} />
            </ArrowContainer>
          </Center>
        </Overlay>
      </LandingPageContainer>
      {landingSections.map((section) => (
        <LandingSection
          title={section.title}
          subtext={section.subtext}
          picture={section.picture}
          forwardRef={section.forwardRef}
        />
      ))}
    </>
  );
}

export default LandingPage;
