import { useMutation, useQuery } from '@tanstack/react-query';
import { createCar, getUserCars, updateCar, valuateCar } from 'features/cars/data/cars.dataSource';
import { NewCar, UpdateCar } from 'features/cars/data/models/car.model';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useCars = (userId: string, token: string) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const {
    data: cars,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['cars', userId, token],
    queryFn: async () => getUserCars(token, userId)
  });

  const {
    mutate: createCarMutation,
    isError: isCreatingCarError,
    error: createCarError,
    data: createdCar,
    isSuccess: isCarCreated
  } = useMutation({
    mutationKey: ['createCar', token],
    mutationFn: async ({ car }: { car: NewCar }) => createCar(token, car)
  });

  const {
    mutate: createValuationMutation,
    isError: isCreatingValuationError,
    error: createValuationError,
    data: createdValuation,
    isSuccess: isValuationCreated
  } = useMutation({
    mutationKey: ['createValuation', token],
    mutationFn: async ({ car }: { car: NewCar }) => valuateCar(token, car)
  });

  const {
    mutate: updateCarMutation,
    isError: isUpdatingCarError,
    error: updateCarError,
    data: updatedCar,
    isSuccess: isCarUpdated
  } = useMutation({
    mutationKey: ['updateCar', token],
    mutationFn: async ({ car, carId }: { car: UpdateCar; carId: string }) =>
      updateCar(token, car, carId)
  });

  useEffect(() => {
    if (isCarCreated) {
      enqueueSnackbar('Car created', {
        autoHideDuration: 5000
      });
      navigate('/cars');
      refetch();
    }

    if (isCreatingCarError) {
      enqueueSnackbar(createCarError?.message || '');
    }
  }, [createdCar]);

  useEffect(() => {
    if (isCarUpdated) {
      enqueueSnackbar('Car updated', {
        autoHideDuration: 5000
      });
      refetch();
    }

    if (isUpdatingCarError) {
      enqueueSnackbar(updateCarError?.message || '');
    }
  }, [updatedCar]);

  useEffect(() => {
    refetch();
  }, [userId]);

  return {
    cars,
    isLoading,
    isError,
    error,
    refetch,
    createCarMutation,
    isCreatingCarError,
    createCarError,
    createdCar,
    isCarCreated,
    createValuationMutation,
    isCreatingValuationError,
    createValuationError,
    createdValuation,
    isValuationCreated,
    updateCarMutation,
    isUpdatingCarError,
    updateCarError,
    updatedCar,
    isCarUpdated
  };
};
