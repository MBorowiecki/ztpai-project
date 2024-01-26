import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from 'core/router';
import { store } from 'core/store';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider maxSnack={3}>
          <Router />
        </SnackbarProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
