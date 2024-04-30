import { useQuery } from '@tanstack/react-query';

import { api } from '../../../../api';
import { UserRequest } from '../../../../api/codegen';

export const useGetUserRequests = (studentOnSchoolYearId: number, studentOnActivityId?: number) => {
  return useQuery({
    queryKey: ['getUserRequests', studentOnSchoolYearId],
    queryFn: () => api.getUserRequests(studentOnSchoolYearId, studentOnActivityId),
    enabled: studentOnSchoolYearId !== undefined,
  });
};

export const useUserAndActivityRequests = (
  studentOnSchoolYearId: number,
): { userRequests: UserRequest[]; activityRequests: UserRequest[] } => {
  const { data: allActivities } = useGetUserRequests(studentOnSchoolYearId);

  if (!allActivities) return { userRequests: [], activityRequests: [] };

  const userRequests = allActivities.filter((activity: any) => !activity.studentOnActivityId);
  const activityRequests = allActivities.filter((activity: any) => activity.studentOnActivityId);

  return { userRequests, activityRequests };
};

export const useGetUserRequest = (requestId: number | undefined, userRequests: UserRequest[] | undefined) => {
  if (!userRequests || !requestId) return undefined;
  return userRequests.find((request) => request.id === requestId);
};
