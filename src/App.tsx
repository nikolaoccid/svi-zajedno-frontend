import './utils/fonts/AxiformaRegular.ttf';
import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { RouteGuard } from './components/route-guard/route-guard.tsx';
import { ManageActivity } from './pages/activity/manage-activity/manage-activity.tsx';
import { CategoriesView } from './pages/category/categories-view/categories-view.tsx';
import ManageCategory from './pages/category/manage-category/manage-category.tsx';
import { Dashboard } from './pages/dashboard/dashboard.tsx';
import { DashboardPage } from './pages/dashboard-page/dashboard-page.tsx';
import LandingPage from './pages/landing-page/landing-page.tsx';
import LoginPage from './pages/login-page/login-page.tsx';
import { Logout } from './pages/logout/logout.tsx';
import { ManageProjectAssociate } from './pages/project-associate/manage-project-associate/manage-project-associate.tsx';
import ProjectAssociateSearchView from './pages/project-associate/project-associate-search-view/project-associate-search-view.tsx';
import ProjectAssociateView from './pages/project-associate/project-associate-view/project-associate-view.tsx';
import { EnrollStudentOnSchoolYear } from './pages/project-user/enroll-student-on-school-year/enroll-student-on-school-year.tsx';
import { UserListContainer } from './pages/project-user/user-list/user-list-container.tsx';
import { ChooseSchoolYear } from './pages/school-year/choose-school-year/choose-school-year.tsx';
import { CreateSchoolYear } from './pages/school-year/create-school-year/create-school-year.tsx';
import { SearchAssociate } from './pages/search/search-associate/search-associate.tsx';
import { Statistics } from './pages/statistics/statistics.tsx';

const publicRoutes = ['/', '/login', '/logout'];

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RouteGuard publicRoutes={publicRoutes} redirectTo="/logout">
          {/*<Header />*/}
          <Routes>
            <Route path="/" element={<LandingPage />} />

            {/*Dashboard*/}
            <Route path="/:startYear" element={<DashboardPage />} />

            {/*School year paths*/}
            <Route path="/school-year" element={<ChooseSchoolYear />} />
            <Route path="/school-year/new" element={<CreateSchoolYear />} />

            {/*Student on school year */}
            <Route path="/:startYear/user/:userId/enroll" element={<EnrollStudentOnSchoolYear />} />

            {/*Project user*/}
            {/*<Route path="/:startYear/user/new" element={<ManageProjectUserView />} />*/}
            {/*<Route path="/:startYear/user/:userId/edit" element={<ManageProjectUserView />} />*/}
            {/*<Route path="/:startYear/user/:userId" element={<UserView />} />*/}
            {/*<Route path="/:startYear/user/:userId/activity/new" element={<ManageStudentOnActivity />} />*/}
            {/*<Route path="/:startYear/user/:userId/activity/:activityId/edit" element={<ManageStudentOnActivity />} />*/}
            {/*<Route path="/:startYear/user/search" element={<SearchUser />} />*/}
            {/*<Route path="/:startYear/users/" element={<UserSearchView />} />*/}

            {/*Project associate*/}
            <Route path="/:startYear/project-associate/new" element={<ManageProjectAssociate />} />
            <Route path="/:startYear/project-associate/:projectAssociateId/edit" element={<ManageProjectAssociate />} />
            <Route path="/:startYear/project-associate/:projectAssociateId" element={<ProjectAssociateView />} />
            <Route path=":startYear/project-associate/search" element={<SearchAssociate />} />
            <Route path=":startYear/project-associates" element={<ProjectAssociateSearchView />} />

            {/*Activity*/}
            <Route path="/:startYear/project-associate/:projectAssociateId/activity/new" element={<ManageActivity />} />
            <Route
              path="/:startYear/project-associate/:projectAssociateId/activity/:activityId/edit"
              element={<ManageActivity />}
            />

            {/*Category*/}
            <Route path=":startYear/category/new" element={<ManageCategory />} />
            <Route path=":startYear/categories" element={<CategoriesView />} />
            <Route path=":startYear/category/:categoryId/edit" element={<ManageCategory />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<Logout />} />

            {/*Statistics*/}
            <Route path="/:startYear/statistics" element={<Statistics />} />

            {/* v2 routes */}

            {/*Dashboard*/}
            <Route path="/:startYear/dashboard" element={<Dashboard />} />

            {/*User*/}
            <Route path="/:startYear/users/" element={<UserListContainer />} />
            <Route path="/:startYear/users/new" element={<UserListContainer />} />
            <Route path="/:startYear/users/:userId/edit" element={<UserListContainer />} />
            <Route path="/:startYear/users/:userId" element={<UserListContainer />} />

            <Route path="/:startYear/users/:userId/activities/new" element={<UserListContainer />} />
          </Routes>
          <ToastContainer />
        </RouteGuard>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
