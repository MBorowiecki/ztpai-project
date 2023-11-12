import axios from 'axios';
import { serverAddress } from 'core/config/server';

import { Company } from '../types';

export const getAllCompanies = async (): Promise<Company[]> => {
  const response = await axios.get(`${serverAddress}/companies`);

  return response.data as Company[];
};

export const getUserCompany = async (userId: number): Promise<Company | undefined> => {
  const response = await axios.get(`${serverAddress}/companies/${userId}`);

  return response.data as Company | undefined;
};

export const createCompany = async (
  name: string,
  userId: number,
  token: string
): Promise<Company> => {
  const response = await axios.post(
    `${serverAddress}/companies/create`,
    { name, userId },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data as Company;
};
