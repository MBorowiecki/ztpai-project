import { useMutation } from '@tanstack/react-query';
import { createEngine, valuateEngine } from 'features/engines/data/engine.dataSource';
import { NewEngine } from 'features/engines/data/models/engine.models';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useEngine = () => {
  const {
    data: engineValuationData,
    error: engineValuationError,
    mutate: engineValuationMutate,
    isPending: engineValuationIsPending
  } = useMutation({
    mutationKey: ['valuateEngine'],
    mutationFn: ({ engine, token }: { engine: NewEngine; token: string }) =>
      valuateEngine(engine, token)
  });
  const {
    data: engineCreationData,
    error: engineCreationError,
    mutate: engineCreationMutate,
    isPending: engineCreationIsPending
  } = useMutation({
    mutationKey: ['createEngine'],
    mutationFn: ({ engine, token }: { engine: NewEngine; token: string }) =>
      createEngine(engine, token)
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (engineCreationData?.statusCode === 200) {
      navigate(`/engines`);
    }
  }, [engineCreationData]);

  return {
    engineValuationData,
    engineValuationIsPending,
    engineValuationError,
    engineValuationMutate,
    engineCreationData,
    engineCreationIsPending,
    engineCreationError,
    engineCreationMutate
  };
};
