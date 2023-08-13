import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';

import { useAuthenticatedUser } from '../../hooks/use-authenticated-user.ts';
import { CenterContent, PageContainer } from '../../pages/common-styles/common-styles.ts';
interface RouteGuardProps {
  children: ReactNode;
  publicRoutes: string[];
  redirectTo: string;
}
export function RouteGuard({ children, publicRoutes, redirectTo }: RouteGuardProps) {
  const { data: user, isLoading } = useAuthenticatedUser();
  const { pathname } = useLocation();
  if (isLoading) {
    return (
      <PageContainer>
        <CenterContent>
          <ClimbingBoxLoader color="#2196f3" />
        </CenterContent>
      </PageContainer>
    );
  }
  if (publicRoutes.includes(pathname)) {
    return children;
  }
  if (!user) {
    return <Navigate to={redirectTo} />;
  }

  return children;
}
