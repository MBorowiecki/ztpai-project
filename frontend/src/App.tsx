import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from 'core/router';
import { store } from 'core/store';
import { Provider } from 'react-redux';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
