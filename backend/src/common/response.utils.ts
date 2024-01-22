import { Response } from './types.utils';

export function createOkResponse<T>(data, statusCode = 200): Response<T> {
  return {
    statusCode,
    data
  };
}

export function createErrorResponse(
  message,
  statusCode = 500
): Response<undefined> {
  return {
    statusCode,
    message
  };
}

export function createBadRequestResponse(
  message,
  statusCode = 400
): Response<undefined> {
  return {
    statusCode,
    message
  };
}
