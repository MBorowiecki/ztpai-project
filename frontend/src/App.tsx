import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { LoginScreen } from 'features/login/presentation/screens/login.screen';

const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <LoginScreen />
  }
]);

function App() {
  return <RouterProvider router={BrowserRouter} />;
}

export default App;
