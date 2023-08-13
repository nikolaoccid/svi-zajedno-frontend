import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/header/header.tsx';
import { DashboardPage } from './pages/dashboard-page/dashboard-page.tsx';
import LandingPage from './pages/landing-page/landing-page.tsx';
import LoginPage from './pages/login-page/login-page.tsx';
import { Logout } from './pages/logout/logout.tsx';
import { SchoolYear } from './pages/school-year/school-year.tsx';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/school-year" element={<SchoolYear />} />
          <Route path="/:year/dashboard" element={<DashboardPage />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
