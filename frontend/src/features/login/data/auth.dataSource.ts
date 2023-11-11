import axios from 'axios';
import { UserCredentials, UserProfile } from 'features/login/types/user.types';
import { serverAddress } from 'core/config/server';

export const login = async (credentials: UserCredentials): Promise<UserProfile> => {
  const response = await axios.post(`${serverAddress}/auth/login`, credentials);

  return await response.data;
};

export const register = async (credentials: UserCredentials): Promise<UserProfile> => {
  const response = await axios.post(`${serverAddress}/auth/register`, credentials);

  return response.data;
};