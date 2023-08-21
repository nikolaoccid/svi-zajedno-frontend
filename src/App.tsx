import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './components/header/header.tsx';
import { RouteGuard } from './components/route-guard/route-guard.tsx';
import { ManageActivity } from './pages/activity/manage-activity/manage-activity.tsx';
import ManageCategory from './pages/category/manage-category/manage-category.tsx';
import { DashboardPage } from './pages/dashboard-page/dashboard-page.tsx';
import LandingPage from './pages/landing-page/landing-page.tsx';
import LoginPage from './pages/login-page/login-page.tsx';
import { Logout } from './pages/logout/logout.tsx';
import { ManageProjectAssociate } from './pages/project-associate/manage-project-associate/manage-project-associate.tsx';
import ManageProjectUserView from './pages/project-user/create-project-user/manage-project-user-view.tsx';
import { ChooseSchoolYear } from './pages/school-year/choose-school-year/choose-school-year.tsx';
import { CreateSchoolYear } from './pages/school-year/create-school-year/create-school-year.tsx';
import { SearchAssociate } from './pages/search/search-associate/search-associate.tsx';
import { SearchUser } from './pages/search/search-user/search-user.tsx';

const publicRoutes = ['/', '/login', '/logout'];

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RouteGuard publicRoutes={publicRoutes} redirectTo="/logout">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />

            {/*School year paths*/}
            <Route path="/school-year" element={<ChooseSchoolYear />} />
            <Route path="/school-year/new" element={<CreateSchoolYear />} />
            <Route path="/:startYear/dashboard" element={<DashboardPage />} />

            {/*Project user*/}
            <Route path="/:startYear/user/new" element={<ManageProjectUserView />} />
            <Route path="/:startYear/user/:userId/edit" element={<ManageProjectUserView />} />
            <Route path="/:startYear/user/search" element={<SearchUser />} />

            {/*Project associate*/}
            <Route path="/:startYear/project-associate/new" element={<ManageProjectAssociate />} />
            <Route path="/:startYear/project-associate/:projectAssociateId/edit" element={<ManageProjectAssociate />} />
            <Route path=":startYear/project-associate/search" element={<SearchAssociate />} />

            {/*Category*/}
            <Route path="/category/new" element={<ManageCategory />} />
            <Route path="/category/:categoryId/edit" element={<ManageCategory />} />

            {/*Activity*/}
            <Route path="/activity/new" element={<ManageActivity />} />
            <Route path="/activity/:activityId/edit" element={<ManageActivity />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
          <ToastContainer limit={1} />
        </RouteGuard>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
