import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from 'core/store';

import { LoginScreen, RegisterScreen } from 'features/login/presentation';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'core/hooks';
import { useEffect } from 'react';
import { Router } from 'core/router';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
