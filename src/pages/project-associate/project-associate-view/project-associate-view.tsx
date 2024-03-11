import styled from '@emotion/styled';
import { MdEdit } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';

import { Status } from '../../../components/status/status.tsx';
import { CenterContent, PageContainer } from '../../common-styles/common-styles';
import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { AddNewButton } from '../../project-user/user-list/add-new-button.tsx';
import { HeaderText } from '../../project-user/user-list/user-list-container.tsx';
import { useGetProjectAssociate } from '../manage-project-associate/hooks/use-get-project-associate.ts';
import { ProjectAssociateActivityTable } from './project-associate-activity-table.tsx';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Axiforma;
`;

const ProfileHeader = styled.h2`
  //margin-bottom: 10px;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const HeaderContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ProfileItem = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 10px;
  font-size: 14px;
`;

const Value = styled.span`
  font-weight: normal;
  font-size: 14px;
`;

export const TdWithGap = styled.td`
  display: flex;
  justify-content: center;
  gap: 20px;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 20px;
  height: 30vh;
`;
const HeaderWithShadow = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: white;
  box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.2);
`;
const CenterContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const RightContainer = styled.div`
  margin-left: auto;
  padding: 10px;
`;

const ProjectAssociateView = ({ onClose }: { onClose?: () => void }) => {
  const navigate = useNavigate();
  const { projectAssociateId, startYear } = useParams();
  const { data: schoolYear } = useSchoolYear(parseInt(startYear ?? '0'));
  const { data: projectAssociate, isLoading } = useGetProjectAssociate(projectAssociateId);

  if (isLoading) {
    return (
      <PageContainer>
        <CenterContent>
          <PropagateLoader color="#2196f3" />
        </CenterContent>
      </PageContainer>
    );
  }

  const filteredActivities = projectAssociate?.activity?.filter(
    (activity) => activity.schoolYearId === (schoolYear ? schoolYear?.id : 0),
  );

  return (
    projectAssociate !== undefined && (
      <ProfileContainer>
        <Row>
          <HeaderContainer>
            <ProfileHeader>{projectAssociate.clubName}</ProfileHeader>
            <Status status={projectAssociate.projectAssociateStatus}></Status>
          </HeaderContainer>
          <MdEdit
            size={18}
            color={'#00193f'}
            onClick={() => {
              navigate(`/${schoolYear ? schoolYear.startYear : 0}/project-associates/${projectAssociate?.id}/edit`);
              onClose?.();
            }}
            style={{ marginRight: '25px' }}
          />
        </Row>
        <Section>
          <ProfileItem>
            <Label>Kategorija:</Label>
            <Value>{projectAssociate?.category?.categoryName}</Value>
          </ProfileItem>
          <ProfileItem>
            <Label>Email:</Label>
            <Value>{projectAssociate?.email}</Value>
          </ProfileItem>
          <ProfileItem>
            <Label>Kontakt:</Label>
            <Value>
              {projectAssociate?.mobilePhone} - {projectAssociate?.contactPerson}
            </Value>
          </ProfileItem>
          <ProfileItem>
            <Label>Adresa:</Label>
            <Value>
              {projectAssociate?.address}, {projectAssociate?.city}
            </Value>
          </ProfileItem>
        </Section>

        <HeaderWithShadow>
          <HeaderContainer>
            <CenterContainer>
              <HeaderText>Aktivnosti</HeaderText>
            </CenterContainer>

            <RightContainer>
              <AddNewButton
                text={'Dodaj'}
                onClick={() =>
                  navigate(`/${schoolYear?.startYear}/project-associates/${projectAssociate?.id}/activities/new`)
                }
                disabled={(projectAssociate as any)?.projectAssociateStatus === 'inactive'}
              />
            </RightContainer>
          </HeaderContainer>
        </HeaderWithShadow>

        <ProjectAssociateActivityTable activities={filteredActivities} />
      </ProfileContainer>
    )
  );
};

export default ProjectAssociateView;
