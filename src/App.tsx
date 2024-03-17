import './utils/fonts/AxiformaRegular.ttf';
import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { RouteGuard } from './components/route-guard/route-guard.tsx';
import { CategoriesContainer } from './pages/category/categories-container/categories-container.tsx';
import { Dashboard } from './pages/dashboard/dashboard.tsx';
import { DashboardPage } from './pages/dashboard-page/dashboard-page.tsx';
import LandingPage from './pages/landing-page/landing-page.tsx';
import LoginPage from './pages/login-page/login-page.tsx';
import { Logout } from './pages/logout/logout.tsx';
import { ProjectAssociateListViewWrapper } from './pages/project-associate/project-associate-list-view-wrapper/project-associate-list-view-wrapper.tsx';
import { UserListContainer } from './pages/project-user/user-list/user-list-container.tsx';
import { ChooseSchoolYear } from './pages/school-year/choose-school-year/choose-school-year.tsx';
import { CreateSchoolYear } from './pages/school-year/create-school-year/create-school-year.tsx';
import { SchoolYearsContainer } from './pages/school-year/school-years-container.tsx';
import { Statistics } from './pages/statistics/statistics.tsx';

const publicRoutes = ['/', '/login', '/logout'];

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RouteGuard publicRoutes={publicRoutes} redirectTo="/logout">
          <Routes>
            <Route path="/" element={<LandingPage />} />

            {/*Dashboard*/}
            <Route path="/:startYear" element={<DashboardPage />} />

            {/*School year paths*/}
            <Route path="/school-year" element={<ChooseSchoolYear />} />
            <Route path="/school-year/new" element={<CreateSchoolYear />} />

            {/*Student on school year */}
            {/*<Route path="/:startYear/user/:userId/enroll" element={<EnrollStudentOnSchoolYear />} />*/}

            {/*Project user*/}
            {/*<Route path="/:startYear/user/new" element={<ManageProjectUserView />} />*/}
            {/*<Route path="/:startYear/user/:userId/edit" element={<ManageProjectUserView />} />*/}
            {/*<Route path="/:startYear/user/:userId" element={<UserView />} />*/}
            {/*<Route path="/:startYear/user/:userId/activity/new" element={<ManageStudentOnActivity />} />*/}
            {/*<Route path="/:startYear/user/:userId/activity/:activityId/edit" element={<ManageStudentOnActivity />} />*/}
            {/*<Route path="/:startYear/user/search" element={<SearchUser />} />*/}
            {/*<Route path="/:startYear/users/" element={<UserSearchView />} />*/}

            {/*Project associate*/}
            {/*<Route path="/:startYear/project-associate/new" element={<ManageProjectAssociate />} />*/}
            {/*<Route path="/:startYear/project-associate/:projectAssociateId/edit" element={<ManageProjectAssociate />} />*/}
            {/*<Route path="/:startYear/project-associate/:projectAssociateId" element={<ProjectAssociateView />} />*/}
            {/*<Route path=":startYear/project-associate/search" element={<SearchAssociate />} />*/}
            {/*<Route path=":startYear/project-associates" element={<ProjectAssociateSearchView />} />*/}

            {/*Activity*/}
            {/*<Route path="/:startYear/project-associate/:projectAssociateId/activity/new" element={<ManageActivity />} />*/}
            {/*<Route*/}
            {/*  path="/:startYear/project-associate/:projectAssociateId/activity/:activityId/edit"*/}
            {/*  element={<ManageActivity />}*/}
            {/*/>*/}

            {/*Category*/}
            {/*<Route path=":startYear/category/new" element={<ManageCategory />} />*/}
            {/*<Route path=":startYear/categories" element={<CategoriesView />} />*/}
            {/*<Route path=":startYear/category/:categoryId/edit" element={<ManageCategory />} />*/}

            {/*Statistics*/}
            <Route path="/:startYear/statistics" element={<Statistics />} />

            {/* v2 routes */}

            {/*Dashboard*/}
            <Route path="/:startYear/dashboard" element={<Dashboard />} />

            {/*Login / Logout*/}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<Logout />} />

            {/*User*/}
            <Route path="/:startYear/users/" element={<UserListContainer />} />
            <Route path="/:startYear/users/new" element={<UserListContainer />} />
            <Route path="/:startYear/users/:userId/edit" element={<UserListContainer />} />
            <Route path="/:startYear/users/:userId" element={<UserListContainer />} />

            <Route path="/:startYear/users/:userId/enroll" element={<UserListContainer />} />
            <Route path="/:startYear/users/:userId/activities/new" element={<UserListContainer />} />
            <Route path="/:startYear/users/:userId/activities/:activityId/edit" element={<UserListContainer />} />

            {/*Project associates*/}
            <Route path="/:startYear/project-associates" element={<ProjectAssociateListViewWrapper />} />
            <Route path="/:startYear/project-associates/new" element={<ProjectAssociateListViewWrapper />} />
            <Route
              path="/:startYear/project-associates/:projectAssociateId"
              element={<ProjectAssociateListViewWrapper />}
            />
            <Route
              path="/:startYear/project-associates/:projectAssociateId/edit"
              element={<ProjectAssociateListViewWrapper />}
            />
            <Route
              path="/:startYear/project-associates/:projectAssociateId/activities/new"
              element={<ProjectAssociateListViewWrapper />}
            />
            <Route
              path="/:startYear/project-associates/:projectAssociateId/activities/:activityId/edit"
              element={<ProjectAssociateListViewWrapper />}
            />

            {/* Category*/}
            <Route path="/:startYear/categories" element={<CategoriesContainer />} />
            <Route path=":startYear/categories/new" element={<CategoriesContainer />} />
            <Route path=":startYear/categories/:categoryId/edit" element={<CategoriesContainer />} />

            {/* School year */}
            <Route path={':startYear/school-years'} element={<SchoolYearsContainer />} />
          </Routes>
          <ToastContainer />
        </RouteGuard>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
