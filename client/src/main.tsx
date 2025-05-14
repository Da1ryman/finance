import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './utile/PrivateRoute';
import { MainPage } from './page/MainPage';
import { ChartPage } from './page/ChartPage';
import { LoginPage } from './page/LoginPage';
import { SignupPage } from './page/SignupPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<MainPage />} />

          <Route path='/chart' element={<ChartPage />} />
        </Route>

        <Route path='/login' element={<LoginPage />} />

        <Route path='/signup' element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
