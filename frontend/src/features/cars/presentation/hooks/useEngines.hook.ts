import { useQuery } from '@tanstack/react-query';
import { getUserEngines } from 'features/engines/data/engine.dataSource';

export const useEngines = (userId: string, token: string) => {
  const {
    data: engines,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['engines', userId, token],
    queryFn: async () => getUserEngines(token, userId)
  });

  return {
    engines,
    isLoading,
    isError,
    error,
    refetch
  };
};
