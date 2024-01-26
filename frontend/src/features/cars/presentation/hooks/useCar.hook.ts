import { useMutation, useQuery } from '@tanstack/react-query';
import { getCarById, updateCar } from 'features/cars/data/cars.dataSource';
import { UpdateCar } from 'features/cars/data/models/car.model';
import { useEffect } from 'react';

export const useCar = (carId: string, token: string) => {
  const {
    data: car,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['car', carId, token],
    queryFn: async () => getCarById(token, carId)
  });

  const {
    mutate: updateCarMutation,
    isError: isUpdatingCarError,
    error: updateCarError,
    data: updatedCar,
    isSuccess: isCarUpdated
  } = useMutation({
    mutationKey: ['updateCar', token, carId],
    mutationFn: async ({ _car }: { _car: UpdateCar; carId: string }) =>
      updateCar(token, _car, carId)
  });

  useEffect(() => {
    if (isCarUpdated) {
      refetch();
    }
  }, [isCarUpdated]);

  return {
    car,
    isLoading,
    isError,
    error,
    refetch,
    updateCarMutation,
    isUpdatingCarError,
    updateCarError,
    updatedCar,
    isCarUpdated
  };
};
