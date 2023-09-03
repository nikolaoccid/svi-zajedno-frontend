import { AxiosResponse } from 'axios';

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
  LoginDto,
  ProjectAssociateApi,
  ProjectUserApi,
  SchoolYearApi,
  StudentOnActivityApi,
  StudentOnSchoolYearApi,
  UpdateActivityDto,
  UpdateProjectAssociateDto,
  UpdateProjectUserDto,
  UpdateStudentOnActivityDto,
  UpdateStudentOnSchoolYearDto,
  UsersApi,
} from './codegen';

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

export function getAllSchoolYears() {
  return getData(schoolYearApi.schoolYearControllerFindAll());
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

export function getProjectUserByQuery(query: string) {
  return getData(projectUserApi.projectUserControllerFindAll(undefined, undefined, query));
}

export function createProjetUserOnSchoolYear(userId: number, schoolYearId: number) {
  return getData(studentOnSchoolYear.studentOnSchoolYearControllerCreate({ schoolYearId, userId, status: 'active' }));
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
) {
  return getData(activities.activityControllerFindAll(activityStatus, query, schoolYearId));
}

export function getCategories() {
  return getData(categories.categoryControllerFindAll());
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

export function getProjectAssociates(page: number) {
  return getData(projectAssociate.projectAssociateControllerFindAll(undefined, page));
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

export function createStudentOnActivity(createStudentOnActivity: CreateStudentOnActivityDto) {
  return getData(studentOnActivity.studentOnActivityControllerCreate(createStudentOnActivity));
}
export function getStudentOnActivity(studentOnSchoolYearId) {
  return getData(studentOnActivity.studentOnActivityControllerFindAll(studentOnSchoolYearId));
}
export function updateStudentOnActivity(studentOnActivityId: string, student: UpdateStudentOnActivityDto) {
  return getData(studentOnActivity.studentOnActivityControllerUpdate(studentOnActivityId, student));
}
