import styled from '@emotion/styled';
import { Flyout } from 'pivotal-ui/react/flyout';
import { useEffect, useState } from 'react';
import { useAsync } from 'react-async-hook';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { getProjectUserByPageAndQuery, getProjectUsersBySchoolYear } from '../../../api/api.ts';
import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import ManageProjectUserView from '../create-project-user/manage-project-user-view.tsx';
import UserView from '../user-view/user-view.tsx';
import { UserList } from './user-list.tsx';

export const HeaderText = styled.span`
  font-family: Axiforma;
  font-weight: bold;
  font-size: 24px;
`;
const HeaderSubtext = styled.span`
  font-style: normal;
  font-size: 12px;
  color: #606060;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export function UserListContainer() {
  const { startYear, userId } = useParams();
  const { data: schoolYear } = useSchoolYear(startYear ? parseInt(startYear ?? '0') : 0);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { pathname } = useLocation();
  const [userType, setUserType] = useState('all');
  const [showAddEditFlyout, setShowAddEditFlyout] = useState(false);
  const [showUserFlyout, setShowUserFlyout] = useState(false);
  const [flyoutTitle, setFlyoutTitle] = useState('Uredi korisnika');

  const [users, setUsers] = useState({
    items: [],
    meta: { totalItems: 1, itemCount: 1, itemsPerPage: 1, totalPages: 1, currentPage: 1 },
  } as any);

  const setCurrentPage = (page: number) => {
    setUsers((prevState) => ({ ...prevState, meta: { ...prevState.meta, currentPage: page } }));
  };

  useAsync(async () => {
    let res;
    if (userType === 'all') {
      res = await getProjectUserByPageAndQuery(users.meta.currentPage, searchQuery);
    } else {
      res = await getProjectUsersBySchoolYear(schoolYear?.id.toString() ?? '0', users.meta.currentPage, searchQuery);
      res.items = res.items.filter((item) => item.schoolYearStatus === 'active');
    }
    setUsers(res);
  }, [userType, searchQuery, users.meta.currentPage, schoolYear]);

  useEffect(() => {
    if (userId && pathname.includes('edit')) {
      setFlyoutTitle('Uredi korisnika');
      setShowAddEditFlyout(true);
    } else if (pathname.includes('users/new')) {
      setFlyoutTitle('Dodaj novog korisnika');
      setShowAddEditFlyout(true);
    } else if (pathname.includes('users/') && !pathname.includes('edit')) {
      setFlyoutTitle('Pregled korisnika');
      setShowUserFlyout(true);
    }
  }, [userId, pathname, setShowAddEditFlyout, setShowUserFlyout, setFlyoutTitle]);

  return (
    <div>
      <UserList
        users={users}
        setUserType={setUserType}
        setSearchQuery={setSearchQuery}
        setCurrentPage={setCurrentPage}
      />
      <Flyout
        animationDuration={100}
        show={showAddEditFlyout}
        header={
          <Column>
            <HeaderText>{flyoutTitle}</HeaderText>
          </Column>
        }
        onHide={() => {
          setShowAddEditFlyout(false);
          navigate(-1);
        }}
      >
        <ManageProjectUserView onClose={() => setShowAddEditFlyout(false)} />
      </Flyout>
      <Flyout
        animationDuration={100}
        show={showUserFlyout}
        header={
          <Column>
            <HeaderText>{flyoutTitle}</HeaderText>
            <HeaderSubtext>
              Skolska godina: {schoolYear?.startYear} / {schoolYear?.endYear}
            </HeaderSubtext>
          </Column>
        }
        onHide={() => {
          navigate(-1);
          setShowUserFlyout(false);
        }}
      >
        <UserView onClose={() => setShowUserFlyout(false)} />
      </Flyout>
    </div>
  );
}
