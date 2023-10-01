import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';

import { Status } from '../../../components/status/status.tsx';
import { Submenu } from '../../../components/submenu/submenu.tsx';
import {
  Button,
  CenterContent,
  PageContainer,
  ProfileSubmenu,
  SecondaryButton,
} from '../../common-styles/common-styles';
import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { useGetProjectAssociate } from '../manage-project-associate/hooks/use-get-project-associate.ts';

const ProfileHeader = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const ProfileItem = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const Value = styled.span`
  font-weight: normal;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
`;
const Section = styled.div`
  width: 50%;
`;
export const FullWidthSection = styled.div`
  width: 100%;
`;
export const Row = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`;

const Center = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;
const Right = styled.div`
  display: flex;
  align-items: center;
`;
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    padding: 10px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
`;

const ProjectAssociateView = () => {
  const navigate = useNavigate();
  const { projectAssociateId, startYear } = useParams();
  const { data: schoolYear } = useSchoolYear(parseInt(startYear ?? '0'));
  const { data: projectAssociate, isLoading, isError } = useGetProjectAssociate(projectAssociateId);

  if (isError || !projectAssociateId || typeof parseInt(projectAssociateId) !== 'number') {
    navigate(`${startYear}/project-associates`);
  }

  if (isLoading) {
    return (
      <PageContainer>
        <CenterContent>
          <PropagateLoader color="#2196f3" />
        </CenterContent>
      </PageContainer>
    );
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const filteredActivities = projectAssociate?.activity?.filter(
    (activity) => activity.schoolYearId === (schoolYear ? schoolYear[0]?.id : 0),
  );

  return (
    projectAssociate !== undefined && (
      <PageContainer>
        <CenterContent>
          <Submenu />
          <HeaderSection>
            <Center>
              <ProfileHeader>
                {projectAssociate.category?.categoryName} - {projectAssociate.clubName}
              </ProfileHeader>
            </Center>
            <Right>
              <Status status={projectAssociate.projectAssociateStatus} />
            </Right>
          </HeaderSection>
          <ProfileSubmenu>
            <Button
              onClick={() => navigate(`/${startYear}/project-associate/${projectAssociateId}/activity/new`)}
              disabled={projectAssociate.projectAssociateStatus === 'inactive'}
            >
              Dodaj aktivnost
            </Button>
            <SecondaryButton onClick={() => navigate(`/${startYear}/project-associate/${projectAssociateId}/edit`)}>
              Uredi suradnika
            </SecondaryButton>
          </ProfileSubmenu>
          <Content>
            <Row>
              <Section>
                <ProfileItem>
                  <Label>Email:</Label>
                  <Value>{projectAssociate.email}</Value>
                </ProfileItem>
                <ProfileItem>
                  <Label>Mobitel:</Label>
                  <Value>{projectAssociate.mobilePhone}</Value>
                </ProfileItem>
                <ProfileItem>
                  <Label>Kontakt osoba:</Label>
                  <Value>{projectAssociate.contactPerson}</Value>
                </ProfileItem>
                <ProfileItem>
                  <Label>Adresa:</Label>
                  <Value>{projectAssociate.address}</Value>
                </ProfileItem>
                <ProfileItem>
                  <Label>Grad:</Label>
                  <Value>{projectAssociate.city}</Value>
                </ProfileItem>
              </Section>
            </Row>
            <Row>
              <FullWidthSection>
                <h2>Aktivnosti</h2>
                {filteredActivities !== undefined && filteredActivities?.length > 0 ? (
                  <Table>
                    <thead>
                      <tr>
                        <th>Aktivnost</th>
                        <th>Cijena</th>
                        <th>Status</th>
                        <th>Akcije</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredActivities.map((activity) => (
                        <tr key={activity.id}>
                          <td>{activity.activityName}</td>
                          <td>{activity.activityPrice > 0 ? activity.activityPrice + 'EUR' : 'Besplatno'}</td>
                          <td>
                            <Status status={activity.activityStatus} />
                          </td>
                          <td>
                            <SecondaryButton
                              onClick={() =>
                                navigate(
                                  `/${startYear}/project-associate/${projectAssociateId}/activity/${activity.id}/edit`,
                                )
                              }
                              disabled={projectAssociate.projectAssociateStatus === 'inactive'}
                            >
                              Uredi
                            </SecondaryButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p>Suradnik nema aktivnosti u ovoj skolskoj godini.</p>
                )}
              </FullWidthSection>
            </Row>
          </Content>
        </CenterContent>
      </PageContainer>
    )
  );
};

export default ProjectAssociateView;
