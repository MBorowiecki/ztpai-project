import { useMutation, useQuery } from '@tanstack/react-query';
import { getUserEngines, stopEngineProduction } from 'features/engines/data/engine.dataSource';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

export const useEngines = (userId: string, token: string) => {
  const { enqueueSnackbar } = useSnackbar();
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
  const {
    mutate: stopEngineProductionMutation,
    isError: isStopEngineProductionError,
    error: stopEngineProductionError,
    isSuccess: isStopEngineProductionSuccess,
    data: stopEngineProductionData
  } = useMutation({
    mutationKey: ['stopEngineProduction', token],
    mutationFn: async (engineId: string) => stopEngineProduction(engineId, token)
  });

  useEffect(() => {
    if (isStopEngineProductionSuccess) {
      enqueueSnackbar(stopEngineProductionData?.data || '', {
        autoHideDuration: 5000
      });
      refetch();
    }

    if (isStopEngineProductionError) {
      enqueueSnackbar(stopEngineProductionError?.message || '');
    }
  }, [stopEngineProductionData]);

  return {
    engines,
    isLoading,
    isError,
    error,
    refetch,
    stopEngineProductionMutation,
    isStopEngineProductionError,
    stopEngineProductionError
  };
};
