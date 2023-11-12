import axios from 'axios';
import { serverAddress } from 'core/config/server';
import { UserCredentials, UserProfile } from 'features/login/types';

export const login = async (credentials: UserCredentials): Promise<UserProfile> => {
  const response = await axios.post(`${serverAddress}/auth/login`, credentials);

  return response.data as UserProfile;
};

export const register = async (credentials: UserCredentials): Promise<UserProfile> => {
  const response = await axios.post(`${serverAddress}/auth/register`, credentials);

  return response.data as UserProfile;
};

export const verifyToken = async (token: string): Promise<UserProfile> => {
  const response = await axios.post(`${serverAddress}/auth/verify`, { token });

  return response.data as UserProfile;
};
