import axios from 'axios';
import { UserCredentials, UserProfile } from 'features/login/types/user.types';

export const login = async (credentials: UserCredentials): Promise<UserProfile> => {
  const response = await axios.post(`${process.env.SERVER_ADDRESS}/auth/login`, credentials);

  return response.data;
};

export const register = async (credentials: UserCredentials): Promise<UserProfile> => {
  const response = await axios.post(`${process.env.SERVER_ADDRESS}/auth/register`, credentials);

  return response.data;
};
