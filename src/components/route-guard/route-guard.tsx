import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuthenticatedUser } from '../../hooks/use-authenticated-user.ts';
interface RouteGuardProps {
  children: ReactNode;
  publicRoutes: string[];
  redirectTo: string;
}
export function RouteGuard({ children, publicRoutes, redirectTo }: RouteGuardProps) {
  const { data: user, isLoading } = useAuthenticatedUser();
  const { pathname } = useLocation();
  if (isLoading) {
    return null;
  }
  if (publicRoutes.includes(pathname)) {
    return children;
  }
  if (!user) {
    return <Navigate to={redirectTo} />;
  }

  return children;
}
