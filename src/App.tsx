import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/header/header.tsx';
import LandingPage from './components/landing-page/landing-page.tsx';
import LoginPage from './components/login-page/login-page.tsx';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
