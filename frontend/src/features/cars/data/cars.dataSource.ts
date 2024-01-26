import axios from 'axios';
import { serverAddress } from 'core/config/server';
import { Response } from 'core/models';

import { Car, NewCar, UpdateCar } from './models/car.model';

export const getUserCars = async (token: string, userId: string): Promise<Response<Car[]>> => {
  const res = await axios.get(`${serverAddress}/cars/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data as Response<Car[]>;
};

export const createCar = async (token: string, car: NewCar): Promise<Response<Car>> => {
  try {
    const res = await axios.post(
      `${serverAddress}/cars/create`,
      {
        ...car,
        userId: parseInt(car.userId, 10),
        length: car.length.toFixed(2)
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return res.data as Response<Car>;
  } catch (err) {
    return {
      message: 'Error while creating car',
      statusCode: 400
    };
  }
};

export const valuateCar = async (
  token: string,
  car: NewCar
): Promise<Response<{ valuation: number }>> => {
  try {
    const res = await axios.post(
      `${serverAddress}/cars/valuate`,
      {
        ...car,
        userId: parseInt(car.userId, 10),
        length: car.length.toFixed(2)
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log(res.data);

    return res.data as Response<{ valuation: number }>;
  } catch (err) {
    console.log(err);
    return {
      message: 'Error while valuating car',
      statusCode: 400
    };
  }
};

export const updateCar = async (
  token: string,
  car: UpdateCar,
  carId: string
): Promise<Response<Car>> => {
  try {
    const res = await axios.post(
      `${serverAddress}/cars/update/${carId}`,
      {
        ...car,
        userId: parseInt(car.userId, 10),
        length: car.length?.toFixed(2)
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return res.data as Response<Car>;
  } catch (err) {
    return {
      message: 'Error while updating car',
      statusCode: 400
    };
  }
};

export const getCarById = async (token: string, carId: string): Promise<Response<Car>> => {
  try {
    const res = await axios.get(`${serverAddress}/cars/${carId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data as Response<Car>;
  } catch (err) {
    return {
      message: 'Error while getting car',
      statusCode: 400
    };
  }
};
