import axios from 'axios';
import { serverAddress } from 'core/config/server';
import { Response } from 'core/models';

import { Engine, EngineValuationResponse, NewEngine } from './models/engine.models';

export const valuateEngine = async (
  engine: NewEngine,
  token: string
): Promise<Response<EngineValuationResponse>> => {
  try {
    const response = await axios.post(`${serverAddress}/engines/valuate`, engine, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data as Response<EngineValuationResponse>;
  } catch (err) {
    return {
      message: 'Error while valuating engine',
      statusCode: 400
    };
  }
};

export const createEngine = async (
  engine: NewEngine,
  token: string
): Promise<Response<EngineValuationResponse>> => {
  try {
    const response = await axios.post(`${serverAddress}/engines/create`, engine, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log(response.data);

    return response.data as Response<EngineValuationResponse>;
  } catch (err) {
    return {
      message: 'Error while creating engine',
      statusCode: 400
    };
  }
};

export const stopEngineProduction = async (
  engineId: string,
  token: string
): Promise<Response<string>> => {
  try {
    const response = await axios.put(
      `${serverAddress}/engines/stop-production/${engineId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    return response.data as Response<string>;
  } catch (err) {
    return err as Response<string>;
  }
};

export const getUserEngines = async (
  token: string,
  userId: string
): Promise<Response<Engine[]>> => {
  try {
    const response = await axios.get(`${serverAddress}/engines/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log('Engines: ', response.data);

    return response.data as Response<Engine[]>;
  } catch (err) {
    return {
      message: 'Error while fetching user engines',
      statusCode: 400
    };
  }
};
