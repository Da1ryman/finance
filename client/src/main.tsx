import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { PrivateRoute } from './utile/PrivateRoute';
import { AppProvider } from '@toolpad/core/AppProvider';

import { MainPage } from './page/MainPage';
import { ChartPage } from './page/ChartPage';
import { LoginPage } from './page/LoginPage';
import { SignupPage } from './page/SignupPage';
import { routes } from './routes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppProvider branding={{ title: 'Finance' }}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path={routes.main} element={<MainPage />} />

              <Route path={routes.chart} element={<ChartPage />} />
            </Route>

            <Route path={routes.login} element={<LoginPage />} />

            <Route path={routes.signup} element={<SignupPage />} />
          </Routes>
        </AppProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
