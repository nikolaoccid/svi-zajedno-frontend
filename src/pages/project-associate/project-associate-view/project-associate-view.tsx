import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';

import { useGetCategory } from '../../category/manage-category/hooks/use-get-category.ts';
import { CenterContent, PageContainer } from '../../common-styles/common-styles';
import { useGetProjectAssociate } from '../manage-project-associate/hooks/use-get-project-associate.ts';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ProfileHeader = styled.h2`
  margin-bottom: 10px;
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

const ProjectAssociateView = () => {
  const navigate = useNavigate();
  const { projectAssociateId, startYear } = useParams();
  const { data: projectAssociate, isLoading, isError } = useGetProjectAssociate(projectAssociateId);
  const { data: category } = useGetCategory(projectAssociate?.categoryId?.toString());

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

  return (
    projectAssociate !== undefined && (
      <ProfileContainer>
        <ProfileHeader>Project Associate Profile</ProfileHeader>
        <ProfileItem>
          <Label>Club Name:</Label>
          <Value>{projectAssociate.clubName}</Value>
        </ProfileItem>
        <ProfileItem>
          <Label>Email:</Label>
          <Value>{projectAssociate.email}</Value>
        </ProfileItem>
        <ProfileItem>
          <Label>Mobile Phone:</Label>
          <Value>{projectAssociate.mobilePhone}</Value>
        </ProfileItem>
        <ProfileItem>
          <Label>Contact Person:</Label>
          <Value>{projectAssociate.contactPerson}</Value>
        </ProfileItem>
        <ProfileItem>
          <Label>Address:</Label>
          <Value>{projectAssociate.address}</Value>
        </ProfileItem>
        <ProfileItem>
          <Label>City:</Label>
          <Value>{projectAssociate.city}</Value>
        </ProfileItem>
        <ProfileItem>
          <Label>Status:</Label>
          <Value>{projectAssociate.projectAssociateStatus}</Value>
        </ProfileItem>
        <ProfileItem>
          <Label>Category:</Label>
          <Value>{category?.categoryName}</Value>
        </ProfileItem>
      </ProfileContainer>
    )
  );
};

export default ProjectAssociateView;
