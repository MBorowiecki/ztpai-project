import { UserCompany } from 'features/companies/presentation';
import { EnginesScreen, NewEngineScreen } from 'features/engines/presentation';
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
    path: '/company',
    element: (
      <ProtectedRoute>
        <UserCompany />
      </ProtectedRoute>
    )
  },
  {
    path: '/engines',
    element: (
      <ProtectedRoute>
        <EnginesScreen />
      </ProtectedRoute>
    )
  },
  {
    path: '/engines/new',
    element: (
      <ProtectedRoute>
        <NewEngineScreen />
      </ProtectedRoute>
    )
  }
]);

export const Router = (): JSX.Element => {
  return <RouterProvider router={BrowserRouter} />;
};
