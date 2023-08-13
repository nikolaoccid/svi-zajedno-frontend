import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './components/header/header.tsx';
import { RouteGuard } from './components/route-guard/route-guard.tsx';
import { ChooseSchoolYear } from './pages/choose-school-year/choose-school-year.tsx';
import { CreateSchoolYear } from './pages/create-school-year/create-school-year.tsx';
import { DashboardPage } from './pages/dashboard-page/dashboard-page.tsx';
import LandingPage from './pages/landing-page/landing-page.tsx';
import LoginPage from './pages/login-page/login-page.tsx';
import { Logout } from './pages/logout/logout.tsx';

const publicRoutes = ['/', '/login', '/logout'];

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RouteGuard publicRoutes={publicRoutes} redirectTo="/login">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/school-year" element={<ChooseSchoolYear />} />
            <Route path="/create-school-year" element={<CreateSchoolYear />} />
            <Route path="/:startYear/dashboard" element={<DashboardPage />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
          <ToastContainer limit={1} />
        </RouteGuard>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
