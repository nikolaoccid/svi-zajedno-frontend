export interface GetAssociatesStatisticsResponse {
  totalAssociates: number;
  totalAssociatesPerCategory: number;
  categoryName: string;
  totalFreeActivities: number;
  totalPaidActivities: number;
  usersAttendingFreeActivities: number;
  usersAttendingPaidActivities: number;
  totalUsersPerCategory: number;
}
