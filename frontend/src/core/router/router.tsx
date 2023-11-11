import { LoginScreen, RegisterScreen } from 'features/login/presentation';
import { type JSX } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ProtectedRoute } from './protectedRoute.component';

const BrowserRouter = createBrowserRouter([
  {
    path: '/login',
    element: <LoginScreen />
  },
  {
    path: '/register',
    element: <RegisterScreen />
  }
]);

export const Router = (): JSX.Element => {
  return <RouterProvider router={BrowserRouter} />;
};
