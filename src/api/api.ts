import { AxiosResponse } from 'axios';

import { AuthApi, Configuration, LoginDto, SchoolYearApi, UsersApi } from './codegen';

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

export async function getAllSchoolYears() {
  return getData(schoolYearApi.schoolYearControllerFindAll());
}

export function createSchoolYear(startYear: number) {
  const endYear = startYear + 1;
  return getData(schoolYearApi.schoolYearControllerCreate({ startYear, endYear }));
}

export function login(loginDto: LoginDto) {
  return getData(authApi.authControllerLoginJwt(loginDto));
}
export function getAuthenticatedUser() {
  return getData(usersApi.usersControllerMe());
}
