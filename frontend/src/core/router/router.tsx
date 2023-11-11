import { LoginScreen, RegisterScreen } from 'features/login/presentation';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useEffect, type JSX } from 'react';
import { useAppSelector } from 'core/hooks';
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
