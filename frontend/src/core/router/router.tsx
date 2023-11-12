import { UserCompanies } from 'features/companies/presentation';
import { LoginScreen, RegisterScreen } from 'features/login/presentation';
import { type JSX } from 'react';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';

import { ProtectedRoute } from './protectedRoute.component';

const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect('/login'),
    element: <div>Loading</div>
  },
  {
    path: '/login',
    element: <LoginScreen />
  },
  {
    path: '/register',
    element: <RegisterScreen />
  },
  {
    path: '/companies',
    element: (
      <ProtectedRoute>
        <UserCompanies />
      </ProtectedRoute>
    )
  }
]);

export const Router = (): JSX.Element => {
  return <RouterProvider router={BrowserRouter} />;
};
