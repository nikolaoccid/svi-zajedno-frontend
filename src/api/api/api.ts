import { AxiosResponse } from 'axios';

import { frontendFormattedDate } from '../../utils/frontend-formatted-date.ts';
import {
  ActivityActivityStatusEnum,
  ActivityApi,
  AuthApi,
  CategoryApi,
  CategoryDto,
  Configuration,
  CreateActivityDto,
  CreateProjectAssociateDto,
  CreateProjectUserDto,
  CreateStudentOnActivityDto,
  CreateUserRequestDto,
  LoginDto,
  ProjectAssociateApi,
  ProjectUserApi,
  SchoolYearApi,
  StatisticsApi,
  StudentOnActivityApi,
  StudentOnSchoolYearApi,
  UpdateActivityDto,
  UpdateProjectAssociateDto,
  UpdateProjectUserDto,
  UpdateStudentOnActivityDto,
  UpdateStudentOnSchoolYearDto,
  UpdateUserRequestDto,
  UserRequestsApi,
  UsersApi,
} from '../codegen';

const basePath = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

const configuration = new Configuration({
  basePath,
  accessToken() {
    const token = localStorage.getItem('token');
    return token ?? '';
  },
});

const schoolYearApi = new SchoolYearApi(configuration);
const authApi = new AuthApi(configuration);
const usersApi = new UsersApi(configuration);
const projectUserApi = new ProjectUserApi(configuration);
const studentOnSchoolYear = new StudentOnSchoolYearApi(configuration);
const projectAssociate = new ProjectAssociateApi(configuration);
const categories = new CategoryApi(configuration);
const activities = new ActivityApi(configuration);
const studentOnActivity = new StudentOnActivityApi(configuration);
const statistics = new StatisticsApi(configuration);
const requests = new UserRequestsApi(configuration);

export function persistToken(token: string) {
  localStorage.setItem('token', token);
}

export function clearToken() {
  localStorage.removeItem('token');
}

export async function getData<T>(response: Promise<AxiosResponse<T, any>>) {
  try {
    return (await response).data;
  } catch (e) {
    console.log('api error', e);
    throw e;
  }
}

export function getAllSchoolYears(page: number, query: string) {
  return getData(schoolYearApi.schoolYearControllerFindAll(undefined, page, query));
}

export function createSchoolYear(startYear: number) {
  const endYear = startYear + 1;
  return getData(schoolYearApi.schoolYearControllerCreate({ startYear, endYear }));
}

export function fetchSchoolYear(startYear: string) {
  return getData(schoolYearApi.schoolYearControllerFindOneByStartYear(startYear));
}

export function login(loginDto: LoginDto) {
  return getData(authApi.authControllerLoginJwt(loginDto));
}

export function getAuthenticatedUser() {
  return getData(usersApi.usersControllerMe());
}

export function getProjectUsers(page: number) {
  return getData(projectUserApi.projectUserControllerFindAll(10, page));
}

export function getProjectUser(id: string) {
  return getData(projectUserApi.projectUserControllerFindOne(id));
}

export function createProjectUser(user: CreateProjectUserDto) {
  return getData(projectUserApi.projectUserControllerCreate(user));
}

export function getProjectUserById(userId: string) {
  return getData(projectUserApi.projectUserControllerFindOne(userId));
}

export function updateProjectUser(userId: string, user: UpdateProjectUserDto) {
  return getData(projectUserApi.projectUserControllerUpdate(userId, user));
}

export function getProjectUserByQuery(query: string, schoolYearId: number | undefined) {
  return getData(projectUserApi.projectUserControllerFindAll(schoolYearId, undefined, undefined, query));
}

export function getProjectUserByPageAndQuery(page: number, query: string, schoolYearId: number | undefined) {
  return getData(projectUserApi.projectUserControllerFindAll(schoolYearId, undefined, page, query));
}
export function getProjectUsersBySchoolYear(
  schoolYearId: string,
  page: number,
  query: string,
  status: 'active' | 'inactive' | 'pending' | undefined,
  sortBy: 'dateOfEnrollment' | undefined,
) {
  return getData(
    studentOnSchoolYear.studentOnSchoolYearControllerFindUsersBySchoolYear(
      schoolYearId,
      sortBy,
      undefined,
      page,
      status,
      query,
      undefined,
    ),
  );
}

export function createProjetUserOnSchoolYear(
  userId: number,
  schoolYearId: number,
  protectionType,
  sourceSystem,
  dateOfEnrollment?,
) {
  return getData(
    studentOnSchoolYear.studentOnSchoolYearControllerCreate({
      schoolYearId,
      userId,
      status: 'active',
      protectionType,
      sourceSystem,
      dateOfEnrollment: dateOfEnrollment ?? frontendFormattedDate(),
    }),
  );
}
export function updateProjectUserOnSchoolYear(id: string, updateStudentOnSchoolYear: any) {
  return getData(studentOnSchoolYear.studentOnSchoolYearControllerUpdate(id, updateStudentOnSchoolYear));
}
export function getProjetUserOnSchoolYear(userId: number, schoolYearId: number) {
  return getData(studentOnSchoolYear.studentOnSchoolYearControllerFindAll(schoolYearId, userId));
}
export function updateProjetUserOnSchoolYear(id: string, updateStudentOnSchoolYear: UpdateStudentOnSchoolYearDto) {
  return getData(studentOnSchoolYear.studentOnSchoolYearControllerUpdate(id, updateStudentOnSchoolYear));
}

export function getActivities(
  query: string | undefined,
  activityStatus: ActivityActivityStatusEnum | undefined,
  schoolYearId: number | undefined,
  studentOnSchoolYearId,
) {
  return getData(activities.activityControllerFindAll(activityStatus, query, studentOnSchoolYearId, schoolYearId));
}

export function getCategories(page?: number, query?: string) {
  return getData(categories.categoryControllerFindAll(undefined, page, query));
}

export function getDropdownCategories() {
  return getData(categories.categoryControllerGetAllCategories());
}

export function getCategory(categoryId: string) {
  return getData(categories.categoryControllerFindOne(categoryId));
}

export function createCategory(categoryDto: CategoryDto) {
  return getData(categories.categoryControllerCreate(categoryDto));
}

export function updateCategory(id: string, category) {
  return getData(categories.categoryControllerUpdate(id, category));
}

export function createProjectAssociate(associate: CreateProjectAssociateDto) {
  return getData(projectAssociate.projectAssociateControllerCreate(associate));
}

export function getProjectAssociates(page: number, query?: string) {
  return getData(projectAssociate.projectAssociateControllerFindAll(undefined, page, query));
}

export function updateProjectAssociate(associateId: number, associate: UpdateProjectAssociateDto) {
  return getData(projectAssociate.projectAssociateControllerUpdate(associateId.toString(), associate));
}

export function getProjectAssociateById(userId: string) {
  return getData(projectAssociate.projectAssociateControllerFindOne(userId));
}

export function getProjectAssociateByQuery(query: string) {
  return getData(projectAssociate.projectAssociateControllerFindAll(undefined, undefined, query));
}

export function getActivity(activityId: string) {
  return getData(activities.activityControllerFindOne(activityId));
}

export function updateActivity(activityId: string, activity: UpdateActivityDto) {
  return getData(activities.activityControllerUpdate(activityId, activity));
}

export function createActivity(activity: CreateActivityDto) {
  return getData(activities.activityControllerCreate(activity));
}

export function deleteActivity(id: string) {
  return getData(activities.activityControllerRemove(id));
}

export function createStudentOnActivity(createStudentOnActivity: CreateStudentOnActivityDto) {
  return getData(studentOnActivity.studentOnActivityControllerCreate(createStudentOnActivity));
}
export function getStudentOnActivity(studentOnSchoolYearId) {
  return getData(studentOnActivity.studentOnActivityControllerFindAll(studentOnSchoolYearId));
}
export function updateStudentOnActivity(studentOnActivityId: string, student: UpdateStudentOnActivityDto) {
  return getData(studentOnActivity.studentOnActivityControllerUpdate(studentOnActivityId, student));
}

export function deleteStudentOnActivity(studentOnActivityId: string) {
  return getData(studentOnActivity.studentOnActivityControllerRemove(studentOnActivityId));
}

export function getAssociateStatistics(schoolYearId: string) {
  return getData(statistics.statisticsControllerProjectAssociateStatistics(schoolYearId));
}

export function getProjectUserStatistics(schoolYearId: string) {
  return getData(statistics.statisticsControllerProjectUsersStatistics(schoolYearId));
}

export function deleteSchoolYear(schoolYearId: string) {
  return getData(schoolYearApi.schoolYearControllerRemove(schoolYearId));
}

export function deleteCategory(categoryId: string) {
  return getData(categories.categoryControllerRemove(categoryId));
}

export function getUserRequests(studentOnSchoolYearId?: number, studentOnActivityId?: number) {
  return getData(requests.userRequestControllerFindAll(studentOnActivityId, studentOnSchoolYearId));
}

export function createUserRequests(userRequest: CreateUserRequestDto) {
  return getData(requests.userRequestControllerCreate(userRequest));
}

export function updateUserRequests(id: string, userRequest: UpdateUserRequestDto) {
  return getData(requests.userRequestControllerUpdate(id, userRequest));
}

export function deleteUserRequests(id: string) {
  return getData(requests.userRequestControllerRemove(id));
}
