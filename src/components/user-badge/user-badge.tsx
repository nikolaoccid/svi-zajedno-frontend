import styled from '@emotion/styled';
import { FaUserTie } from 'react-icons/fa6';

import { useAuthenticatedUser } from '../../hooks/use-authenticated-user.ts';

const BadgeContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-family: Axiforma;
  gap: 10px;
`;
const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`;
const UserText = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: #252424;
`;
const UserSubtext = styled.span`
  font-style: normal;
  font-size: 12px;
  color: #606060;
`;
const ProfileImage = styled.div`
  width: 42px;
  height: 42px;
  background-color: #f1c40f;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export function UserBadge() {
  const { data: user } = useAuthenticatedUser();
  return (
    <BadgeContainer>
      <UserDetails>
        <UserText>{user?.name}</UserText>
        <UserSubtext>{user?.role === 'admin' ? 'Administrator' : 'Korisnik'}</UserSubtext>
      </UserDetails>
      <ProfileImage>
        <FaUserTie />
      </ProfileImage>
    </BadgeContainer>
  );
}
